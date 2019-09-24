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
            . . 6 6 6 6 . .
            . 6 d 4 4 4 6 .
            6 1 b 1 1 4 d 6
            c 1 b b 4 4 1 c
            . c b b b d c .
            . . c c c c . .
        `, SpriteKind.Ball);
        newFootball.setPosition(20, 100);
        newFootball.setVelocity(60, -70);
        newFootball.ay = 50;
        newFootball.z = zindex.BALL;
        animation.runImageAnimation(newFootball, [
            img`
                . . 6 6 6 6 . .
                . 6 d 4 4 4 6 .
                6 1 b 1 1 4 d 6
                c 1 b b 4 4 1 c
                . c b b b d c .
                . . c c c c . .
            `, 
            img`
                . . 6 6 6 6 . .
                . 6 1 4 4 4 6 .
                6 d 4 4 4 4 4 6
                c b b 1 1 4 d c
                . c b b 4 1 c .
                . . c c c c . .
            `, 
            img`
                . . 6 6 6 6 . .
                . 6 d 4 4 4 6 .
                6 d 4 4 4 4 d 6
                c 1 b 4 4 4 d c
                . c b 1 1 4 c .
                . . c c c c . .
            `, 
            img`
                . . 6 6 6 6 . .
                . 6 d d 4 4 6 .
                6 d 4 4 4 4 d 6
                c b b 4 4 4 d c
                . c b b 4 d c .
                . . c c c c . .
            `, 
            img`
                . . 6 6 6 6 . .
                . 6 d d 4 4 6 .
                6 d 4 4 4 4 d 6
                c b b 4 4 4 d c
                . c b b 4 d c .
                . . c c c c . .
            `, 
            img`
                . . 6 6 6 6 . .
                . 6 d 1 1 4 6 .
                6 d 4 4 4 4 1 6
                c b b 4 4 4 d c
                . c b b 4 d c .
                . . c c c c . .
            `
        ], 30, true);
        scene.cameraFollowSprite(newFootball);

        const newShadow = sprites.create(img`
            . . c c c c . .
            . c f f f f c .
            c f f f f f f c
            c f f f f f f c
            . c f f f f c .
            . . c c c c . .
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