namespace ball {
    let football: Sprite;
    let shadow: Sprite;

    export function toss() {
        clear();
        currentGame.clock.start();
        ai.setTeamDefense(currentGame.defense, currentGame.offense, true);
        ai.setTeamOffense(currentGame.offense, true);
        text.util.showInstruction("CATCH!", 1000);

        const newFootball = sprites.create(img`
            . . 5 5 5 5 . .
            . 5 8 7 7 7 5 .
            5 1 9 1 1 7 8 5
            a 1 9 9 7 7 1 a
            . a 9 9 9 8 a .
            . . a a a a . .
        `, SpriteKind.Ball);
        newFootball.setPosition(20, 100);
        newFootball.setVelocity(60, -70);
        newFootball.ay = 50;
        newFootball.z = zindex.BALL;
        animation.runImageAnimation(newFootball, [
            img`
                . . 5 5 5 5 . .
                . 5 8 7 7 7 5 .
                5 1 9 1 1 7 8 5
                a 1 9 9 7 7 1 a
                . a 9 9 9 8 a .
                . . a a a a . .
            `,
            img`
                . . 5 5 5 5 . .
                . 5 1 7 7 7 5 .
                5 8 7 7 7 7 7 5
                a 9 9 1 1 7 8 a
                . a 9 9 7 1 a .
                . . a a a a . .
            `,
            img`
                . . 5 5 5 5 . .
                . 5 8 7 7 7 5 .
                5 8 7 7 7 7 8 5
                a 1 9 7 7 7 8 a
                . a 9 1 1 7 a .
                . . a a a a . .
            `,
            img`
                . . 5 5 5 5 . .
                . 5 8 8 7 7 5 .
                5 8 7 7 7 7 8 5
                a 9 9 7 7 7 8 a
                . a 9 9 7 8 a .
                . . a a a a . .
            `,
            img`
                . . 5 5 5 5 . .
                . 5 8 8 7 7 5 .
                5 8 7 7 7 7 8 5
                a 9 9 7 7 7 8 a
                . a 9 9 7 8 a .
                . . a a a a . .
            `,
            img`
                . . 5 5 5 5 . .
                . 5 8 1 1 7 5 .
                5 8 7 7 7 7 1 5
                a 9 9 7 7 7 8 a
                . a 9 9 7 8 a .
                . . a a a a . .
            `
        ], 30, true);
        scene.cameraFollowSprite(newFootball);

        const newShadow = sprites.create(img`
            . . a a a a . .
            . a f f f f a .
            a f f f f f f a
            a f f f f f f a
            . a f f f f a .
            . . a a a a . .
        `, SpriteKind.Shadow);
        newShadow.z = zindex.SHADOW;
        newShadow.setPosition(20, 100);
        newShadow.setVelocity(60, 0);
        newShadow.setFlag(SpriteFlag.Ghost, true);

        // small delay so overlap doesn't occur immediately
        control.runInParallel(() => {
            pause(200);
            shadow.setFlag(SpriteFlag.Ghost, false);
        });

        shadow = newShadow;
        football = newFootball
    }

    export function clear() {
        if (football) football.destroy();
        if (shadow) shadow.destroy();
    }

    export function initializeEvents() {
        sprites.onOverlap(SpriteKind.Ball, SpriteKind.Shadow, (sprite, otherSprite) => {
            otherSprite.setFlag(SpriteFlag.Ghost, true);
            const heldBy = currentGame.offense.players.find(player => sprite.overlapsWith(player));
            if (heldBy) {
                currentGame.playerWhoHasBall = heldBy;
                sprite.destroy();
                otherSprite.destroy();
                scene.cameraFollowSprite(heldBy);
                pauseUntil(() => !heldBy || heldBy.right > 19 * 16);
                touchDown();
            } else {
                bounceBall();
                text.util.showInstruction("MISS!", 1500);
                const stopPosition = otherSprite.bottom;
                pauseUntil(() => sprite && sprite.bottom >= stopPosition);
                currentGame.clock.stop();
                otherSprite.destroy();
                animation.stopAnimation(animation.AnimationTypes.ImageAnimation, sprite);
                sprite.ay = 0;
                sprite.vy = 0;
                sprite.vx = 0;
            }
        });
    }

    function bounceBall() {
        football.vy = football.vy * -0.33;
        football.vx = football.vx * .6;
        shadow.vx = shadow.vx * .6;
    }

    // move to game.ts
    function touchDown() {
        text.util.showInstruction("TOUCHDOWN!", 1500);
        currentGame.clock.stop();
        currentGame.offense.score += 7;
        ai.setTeamDefense(currentGame.defense, currentGame.offense, false);
        ai.setTeamOffense(currentGame.offense, false);
        currentGame.offense.stop();
        currentGame.defense.stop();
        currentGame.offense.players.forEach(p => animation.setAction(p, PlayerAnimation.Celebrate));

        control.runInParallel(() => {
            effects.confetti.startScreenEffect(1000);
            pause(2500);
            currentGame.resetPlayers();
        });
    }
}