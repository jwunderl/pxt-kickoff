namespace ball {
    let ball: Sprite;
    let shadow: Sprite;
    let target: Sprite;
    let throwXPos: number;

    export function toss() {
        clear();
        const currentGame = football.activeGame();

        target = sprites.create(img`
            a a . . . . . . . . a a
            a a a . . . . . . a a a
            1 a a a . . . . a a a 1
            1 1 a a a . . a a a 1 1
            . 1 1 a a a a a a 1 1 .
            . . 1 1 a a a a 1 1 . .
            . . . a a a a a a . . .
            . . a a a 1 1 a a a . .
            . a a a 1 1 1 1 a a a .
            a a a 1 1 . . 1 1 a a a
            a a 1 1 . . . . 1 1 a a
            1 1 1 . . . . . . 1 1 1
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
        ball.z = zindex.BALL;
        ball.setFlag(SpriteFlag.Ghost, true);
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
        const speed = 90;
        const diffY = target.y - shadow.y;
        const diffX = target.x - shadow.x;
        const angleToTarget = Math.atan2(diffY, diffX);
        shadow.setVelocity(Math.cos(angleToTarget) * speed, Math.sin(angleToTarget) * speed);
        throwXPos = shadow.x;

        scene.cameraFollowSprite(shadow);

        currentGame.clock.start();
        ai.setTeamDefense(currentGame.defense, currentGame.offense, true);
        ai.setTeamOffense(currentGame.offense, true);
        text.util.showInstruction("CATCH!", 1000);
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
                    ball.y = shadow.y - yOffset(throwXPos, ball.x, target.x, 50); /** result of eq */
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
        // sprites.onOverlap(SpriteKind.Ball, SpriteKind.Shadow, (sprite, otherSprite) => {
        //     if (target) target.destroy();
        //     otherSprite.setFlag(SpriteFlag.Ghost, true);
        //     const currentGame = football.activeGame();

        //     const heldBy = currentGame.offense.players.find(player => sprite.overlapsWith(player));
        //     if (heldBy) {
        //         currentGame.playerWhoHasBall = heldBy;
        //         sprite.destroy();
        //         otherSprite.destroy();
        //         scene.cameraFollowSprite(heldBy);
        //         pauseUntil(() => !heldBy || heldBy.right > 19 * 16);
        //         touchDown();
        //     } else {
        //         bounceBall();
        //         text.util.showInstruction("MISS!", 1500);
        //         const stopPosition = otherSprite.bottom;
        //         pauseUntil(() => sprite && sprite.bottom >= stopPosition);
        //         currentGame.clock.stop();
        //         otherSprite.destroy();
        //         animation.stopAnimation(animation.AnimationTypes.ImageAnimation, sprite);
        //         sprite.ay = 0;
        //         sprite.vy = 0;
        //         sprite.vx = 0;
        //     }
        // });
    }

    // a quick calculation for a position on a parabola containing the points
    // (start, 0), ((start + end) / 2, maxDisplacement), and (end,0)
    function yOffset(start: number, curr: number, end: number, maxDisplacement: number) {
        // map to a value between 0 and 100
        const x = Math.map(curr, start, end, 0, 100);
        // takes a known parabola path - the parabola containing (0,0), (50,1), and (100,0)
        //     -x^2/2500 + x/25
        // scaled to a hit (0,0), (50,maxDisplacement), and (100,0)
        const a = -maxDisplacement / 2500;
        const b = maxDisplacement / 25;

        return a * (x ** 2) + b * x;
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