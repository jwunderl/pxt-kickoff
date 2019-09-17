// behaves as a singleton object; if you try to create a new ball,
// the previous one will be cleared.
namespace ball {
    let football: Sprite;
    let shadow: Sprite;

    export function toss() {
        clear();
        football = sprites.create(img`
            . . . . . . . .
            . . d d d d . .
            . d e e e e d .
            d e e e d d e d
            d e d d e e e d
            . d e e e e d .
            . . d d d d . .
            . . . . . . . .
        `, SpriteKind.Ball);
        football.setPosition(20, 100);
        football.setVelocity(60, -70);
        football.ay = 50;
        football.z = 5;
        animation.runImageAnimation(football, [img`
            . . . . . . . .
            . . d d d d . .
            . d e e e e d .
            d e d d e e e d
            d e e e d d e d
            . d e e e e d .
            . . d d d d . .
            . . . . . . . .
        `, img`
            . . . . . . . .
            . . d d d d . .
            . d e e e e d .
            d e e e d d e d
            d e d d e e e d
            . d e e e e d .
            . . d d d d . .
            . . . . . . . .
        `], 100, true);

        shadow = sprites.create(img`
            . . . . . . . .
            . . . . . . . .
            . . c c c c . .
            . c f f f f c .
            c f f f f f f c
            . c f f f f c .
            . . c c c c . .
            . . . . . . . .
        `, SpriteKind.Shadow);
        shadow.z = 1;
        shadow.setPosition(20, 100);
        shadow.setVelocity(60, 0);
        shadow.setFlag(SpriteFlag.Ghost, true);
        scene.cameraFollowSprite(football);
        text.util.showInstruction("CATCH!", 1000);

        let cachedShadow = shadow;

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
    }

    // moved for now, but this needs a lot of clean up to maintain state in an appropriate way
    // / to allow a few frames for catching
    sprites.onOverlap(SpriteKind.Ball, SpriteKind.Shadow, (sprite, otherSprite) => {
        otherSprite.setFlag(SpriteFlag.Ghost, true);
        const playerWhoCaught = playerTeam.players.find(player => sprite.overlapsWith(player));
        if (playerWhoCaught) {
            let playerScored = false;
            otherSprite.destroy();
            animation.stopAnimation(animation.AnimationTypes.ImageAnimation, sprite);
            game.onUpdate(() => {
                sprite.x = playerWhoCaught.x;
                sprite.y = playerWhoCaught.y;

                if (playerScored)
                    return;

                if (playerWhoCaught.right > 19 * 16) {
                    playerScored = true;
                    playerTeam.score += 7;
                    ball.toss()
                }
            })
        } else {
            sprite.vy = sprite.vy * -0.33;
            sprite.vx = sprite.vx * .6;
            otherSprite.vx = otherSprite.vx * .6;
            const stopPosition = otherSprite.bottom;
            game.onUpdate(() => {
                if (!sprite.ay)
                    return;
                if (sprite && sprite.bottom >= stopPosition) {
                    otherSprite.destroy();
                    animation.stopAnimation(animation.AnimationTypes.ImageAnimation, sprite);
                    sprite.ay = 0;
                    sprite.vy = 0;
                    sprite.vx = 0;
                    control.runInParallel(() => {
                        text.util.showInstruction("MISS!", 1500);
                    })
                }
            })
        }
    })
}