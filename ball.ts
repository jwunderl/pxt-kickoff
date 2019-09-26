namespace ball {
    let fball: Sprite;
    let shadow: Sprite;
    let target: Sprite;
    let lastXPos: number;
    let ballOffsetMagnitude: number;

    export function toss() {
        clear();
        const currentGame = football.activeGame();
        text.util.showInstruction("THROW!", 500);
        currentGame.resetPlayerPositions();
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

        shadow = sprites.create(img`
            . . a a a a . .
            . a f f f f a .
            a f f f f f f a
            a f f f f f f a
            . a f f f f a .
            . . a a a a . .
        `, SpriteKind.Shadow);
        shadow.z = zindex.SHADOW;
        shadow.setPosition(
            currentGame.lineOfScrimmage - (40 * currentGame.offenseDirection()),
            Math.randomRange(30, 110)
        );
        // todo: create qb on top of shadow

        pauseUntil(() => controller.A.isPressed() && target.x > currentGame.lineOfScrimmage);
        target.z = zindex.THROW_TARGET;
        controller.moveSprite(target, 0, 0);

        fball = sprites.create(img`
            . . 5 5 5 5 . .
            . 5 8 7 7 7 5 .
            5 1 9 1 1 7 8 5
            a 1 9 9 7 7 1 a
            . a 9 9 9 8 a .
            . . a a a a . .
        `, SpriteKind.Ball);
        fball.setPosition(20, 100);
        fball.z = zindex.BALL;
        fball.setFlag(SpriteFlag.Ghost, true);
        animation.runImageAnimation(fball, [
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

        // TODO: qb animation here
        scene.cameraFollowSprite(shadow);
        pause(500);
        
        // make it so user can control speed / control with timing
        const speed = 90;
        ballOffsetMagnitude = speed >> 1;
        const diffY = target.y - shadow.y;
        const diffX = target.x - shadow.x;
        const angleToTarget = Math.atan2(diffY, diffX);
        shadow.setVelocity(
            Math.cos(angleToTarget) * speed,
            Math.sin(angleToTarget) * speed
        );
        lastXPos = shadow.x;

        currentGame.startClock();
        text.util.showInstruction("CATCH!", 1000);
    }

    export function clear() {
        if (target) target.destroy();
        if (fball) fball.destroy();
        if (shadow) shadow.destroy();
        const currentGame = football.activeGame();
        if (currentGame) {
            currentGame.playerWhoHasBall = undefined;
        }
    }

    export function initializeEvents() {
        game.onUpdate(
            () => {
                if (fball && shadow) {
                    fball.x = shadow.x;
                    fball.y = shadow.y - yOffset(lastXPos, fball.x, target.x, ballOffsetMagnitude);
                }
            }
        );

        sprites.onOverlap(
            SpriteKind.Shadow,
            SpriteKind.ThrowTarget,
            (s, os) => {
                // past the center line and no catch; make ball bounce once and move on
                if (s.x >= os.x) {
                    // move target a bit to the right to give somewhere to bounce to
                    os.setFlag(SpriteFlag.Ghost, true);
                    os.setFlag(SpriteFlag.Invisible, true);
                    s.setFlag(SpriteFlag.Ghost, true);
                    os.x += 30;
                    ballOffsetMagnitude /= 3;
                    s.vx *= .6;
                    s.vy *= .6;
                    lastXPos = s.x;
                    text.util.showInstruction("MISS!", 1500);

                    const stopPosition = os.bottom;
                    pauseUntil(() => fball && fball.x > os.x - 2);
                    const currentGame = football.activeGame()
                    currentGame.stopClock();
                    football
                    s.destroy();
                    os.destroy();
                    s = undefined;
                    animation.stopAnimation(animation.AnimationTypes.ImageAnimation, fball);
                    pause(500);
                    currentGame.startPlay();
                }
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
        //         currentGame.touchDown();
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
}