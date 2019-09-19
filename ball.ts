namespace ball {
    let football: Sprite;
    let shadow: Sprite;
    // player that currently possesses the football
    let heldBy: Sprite;

    export function toss() {
        clear();
        ai.setTeamDefense(opposingTeam, playerTeam, true);
        ai.setTeamOffense(playerTeam, true);
        text.util.showInstruction("CATCH!", 1000);

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
        football.z = zindex.BALL;
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
        scene.cameraFollowSprite(football);

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
            heldBy = playerTeam.players.find(player => sprite.overlapsWith(player));
            if (heldBy) {
                let playerScored = false;
                otherSprite.destroy();
                animation.stopAnimation(animation.AnimationTypes.ImageAnimation, sprite);
                pauseUntil(() => !heldBy || heldBy.right > 19 * 16);
                text.util.showInstruction("TOUCHDOWN!", 1500);

                playerScored = true;
                playerTeam.score += 7;
                ai.setTeamDefense(opposingTeam, playerTeam, false);
                ai.setTeamOffense(playerTeam, false);
            } else {
                bounceBall();
                text.util.showInstruction("MISS!", 1500);
                const stopPosition = otherSprite.bottom;
                pauseUntil(() => sprite && sprite.bottom >= stopPosition);
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
}