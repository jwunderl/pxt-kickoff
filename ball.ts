namespace ball {
    let ball: Sprite;
    let shadow: Sprite;
    let target: Sprite;

    export function toss() {
        clear();
        const currentGame = football.activeGame();

        target = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . a a . . . . . . . . a a . . .
            . a a a . . . . . . a a a . . .
            . 1 a a a . . . . a a a 1 . . .
            . 1 1 a a a . . a a a 1 1 . . .
            . . 1 1 a a a a a a 1 1 . . . .
            . . . 1 1 a a a a 1 1 . . . . .
            . . . . a a a a a a . . . . . .
            . . . a a a 1 1 a a a . . . . .
            . . a a a 1 1 1 1 a a a . . . .
            . a a a 1 1 . . 1 1 a a a . . .
            . a a 1 1 . . . . 1 1 a a . . .
            . 1 1 1 . . . . . . 1 1 1 . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.ThrowTarget);
        controller.moveSprite(target)
        target.z = zindex.HUD - 1;
        scene.cameraFollowSprite(target);

        pauseUntil(() => controller.A.isPressed() && target.x > currentGame.lineOfScrimmage);
        target.z = zindex.THROW_TARGET;
        controller.moveSprite(target, 0, 0);

        ball = sprites.create(img`
            . . 5 5 5 5 . .
            . 5 8 7 7 7 5 .
            5 1 9 1 1 7 8 5
            a 1 9 9 7 7 1 a
            . a 9 9 9 8 a .
            . . a a a a . .
        `, SpriteKind.Ball);
        ball.setPosition(20, 100);
        ball.vy = -70;
        ball.ay = 50;
        ball.z = zindex.BALL;
        animation.runImageAnimation(ball, [
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

        shadow = sprites.create(img`
            . . a a a a . .
            . a f f f f a .
            a f f f f f f a
            a f f f f f f a
            . a f f f f a .
            . . a a a a . .
        `, SpriteKind.Shadow);
        shadow.z = zindex.SHADOW;
        // TODO: change to throw from qb at ~LOS - 30, instead of just 20, 100; 
        shadow.setPosition(20, 100);
        
        // make it so user can control speed / control with timing
        const speed = 50;
        const angleToTarget = Math.atan2(target.y - shadow.y, target.x - shadow.x);
        shadow.setVelocity(Math.cos(angleToTarget) * speed, Math.sin(angleToTarget) * speed);

        scene.cameraFollowSprite(shadow);

        // shadow.setFlag(SpriteFlag.Ghost, true);
        ball.setFlag(SpriteFlag.Ghost, true);

        currentGame.clock.start();
        ai.setTeamDefense(currentGame.defense, currentGame.offense, true);
        ai.setTeamOffense(currentGame.offense, true);
        text.util.showInstruction("CATCH!", 1000);

        // small delay so overlap doesn't occur immediately
        // control.runInParallel(() => {
        //     pause(200);
        //     shadow.setFlag(SpriteFlag.Ghost, false);
        // });
    }

    export function clear() {
        if (target) target.destroy();
        if (ball) ball.destroy();
        if (shadow) shadow.destroy();
        const currentGame = football.activeGame();
        if (currentGame) {
            currentGame.playerWhoHasBall = undefined;
        }
    }

    export function initializeEvents() {
        game.onUpdate(
            () => {
                if (ball && shadow) {
                    ball.x = shadow.x;
                }
            }
        );

        sprites.onOverlap(
            SpriteKind.Shadow,
            SpriteKind.ThrowTarget,
            (s, os) => {
                s.destroy();
                os.destroy();
            }
        )
        sprites.onOverlap(SpriteKind.Ball, SpriteKind.Shadow, (sprite, otherSprite) => {
            if (target) target.destroy();
            otherSprite.setFlag(SpriteFlag.Ghost, true);
            const currentGame = football.activeGame();

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
        ball.vy = ball.vy * -0.33;
        ball.vx = ball.vx * .6;
        shadow.vx = shadow.vx * .6;
    }

    // move to game.ts
    function touchDown() {
        const currentGame = football.activeGame();
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