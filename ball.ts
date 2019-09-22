namespace ball {
    let football: Sprite;
    let shadow: Sprite;
    // player that currently possesses the football
    let heldBy: Sprite;

    export function toss() {
        clear();
        currentGame.clock.start();
        ai.setTeamDefense(currentGame.defense, currentGame.offense, true);
        ai.setTeamOffense(currentGame.offense, true);
        text.util.showInstruction("CATCH!", 1000);

        football = sprites.create(img`
            . . 6 6 6 6 . .
            . 6 d 4 4 4 6 .
            6 1 b 1 1 4 d 6
            c 1 b b 4 4 1 c
            . c b b b d c .
            . . c c c c . .
        `, SpriteKind.Ball);
        football.setPosition(20, 100);
        football.setVelocity(60, -70);
        football.ay = 50;
        football.z = zindex.BALL;
        animation.runImageAnimation(football, [img`
            . . 6 6 6 6 . .
            . 6 d 4 4 4 6 .
            6 1 b 1 1 4 d 6
            c 1 b b 4 4 1 c
            . c b b b d c .
            . . c c c c . .
        `, img`
            . . 6 6 6 6 . .
            . 6 1 4 4 4 6 .
            6 d 4 4 4 4 4 6
            c b b 1 1 4 d c
            . c b b 4 1 c .
            . . c c c c . .
        `, img`
            . . 6 6 6 6 . .
            . 6 d 4 4 4 6 .
            6 d 4 4 4 4 d 6
            c 1 b 4 4 4 d c
            . c b 1 1 4 c .
            . . c c c c . .
        `, img`
            . . 6 6 6 6 . .
            . 6 d d 4 4 6 .
            6 d 4 4 4 4 d 6
            c b b 4 4 4 d c
            . c b b 4 d c .
            . . c c c c . .
        `, img`
            . . 6 6 6 6 . .
            . 6 d d 4 4 6 .
            6 d 4 4 4 4 d 6
            c b b 4 4 4 d c
            . c b b 4 d c .
            . . c c c c . .
        `, img`
            . . 6 6 6 6 . .
            . 6 d 1 1 4 6 .
            6 d 4 4 4 4 1 6
            c b b 4 4 4 d c
            . c b b 4 d c .
            . . c c c c . .
        `], 30, true);
        scene.cameraFollowSprite(football);

        shadow = sprites.create(img`
            . . c c c c . .
            . c f f f f c .
            c f f f f f f c
            c f f f f f f c
            . c f f f f c .
            . . c c c c . .
        `, SpriteKind.Shadow);
        shadow.z = zindex.SHADOW;
        shadow.setPosition(20, 100);
        shadow.setVelocity(60, 0);
        shadow.setFlag(SpriteFlag.Ghost, true);

        const cachedShadow = shadow;

        // small delay so overlap doesn't occur immediately
        control.runInParallel(() => {
            pause(200);
            if (shadow == cachedShadow) {
                shadow.setFlag(SpriteFlag.Ghost, false);
            } // otherwise, ball was immediately rethrown so do nothing.
        });
    }

    export function clear() {
        if (football) football.destroy();
        if (shadow) shadow.destroy();
        if (heldBy) heldBy = undefined;
    }

    export function initializeEvents() {
        sprites.onOverlap(SpriteKind.Ball, SpriteKind.Shadow, (sprite, otherSprite) => {
            otherSprite.setFlag(SpriteFlag.Ghost, true);
            heldBy = currentGame.offense.players.find(player => sprite.overlapsWith(player));
            if (heldBy) {
                otherSprite.destroy();
                animation.stopAnimation(animation.AnimationTypes.ImageAnimation, sprite);
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

        game.onUpdate(() => {
            if (heldBy) {
                football.x = heldBy.x;
                football.y = heldBy.y;
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
        currentGame.defense.players.forEach(p => {
            p.vx = 0;
            p.vy = 0;
        });

        control.runInParallel(() => {
            effects.confetti.startScreenEffect(1000);
            pause(2500);
            currentGame.resetPlayers();
        });
    }
}