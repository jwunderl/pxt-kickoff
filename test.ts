sprites.onOverlap(SpriteKind.Ball, SpriteKind.Shadow, function (sprite, otherSprite) {
    otherSprite.setFlag(SpriteFlag.Ghost, true)
    const playerWhoCaught = playerTeam.players.find(player => sprite.overlapsWith(player));
    if (playerWhoCaught) {
        let playerScored = false;
        otherSprite.destroy()
        animation.stopAnimation(animation.AnimationTypes.ImageAnimation, sprite)
        game.onUpdate(function () {
            sprite.x = playerWhoCaught.x
            sprite.y = playerWhoCaught.y

            if (playerScored) return;

            if (playerWhoCaught.right > 19 * 16) {
                playerScored = true;
                playerTeam.score += 7;
                control.runInParallel(function () {
                    pause(500)
                    game.over(true)
                })
            }
        })
    } else {
        sprite.vy = sprite.vy * -0.33
        sprite.vx = sprite.vx * .6
        otherSprite.vx = otherSprite.vx * .6
        const stopPosition = otherSprite.bottom
        game.onUpdate(function () {
            if (!sprite.ay) return;
            if (sprite && sprite.bottom >= stopPosition) {
                otherSprite.destroy()
                animation.stopAnimation(animation.AnimationTypes.ImageAnimation, sprite)
                sprite.ay = 0;
                sprite.vy = 0;
                sprite.vx = 0;
                control.runInParallel(function () {
                    text.util.showInstruction("MISS!", 1500)
                })
            }
        })
    }
})

let testRemainingTime = 195;

game.onUpdateInterval(1000, function () {
    testRemainingTime--;
    if (testRemainingTime === 0) {
        game.over();
    }
})

const lineOfScrimmage = 60;
const playerTeam = teams.create("Browns", "CLE", 0x4, 0xE, true);
const opposingTeam = teams.create("Seahawks", "SEA", 0x8, 0x7, false);

let football = sprites.create(img`
    . . . . . . . .
    . . d d d d . .
    . d e e e e d .
    d e e e d d e d
    d e d d e e e d
    . d e e e e d .
    . . d d d d . .
    . . . . . . . .
`, SpriteKind.Ball)
football.setPosition(20, 100)
football.setVelocity(60, -70)
football.ay = 50
football.z = 5
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
`], 100, true)

let shadow = sprites.create(img`
    . . . . . . . .
    . . . . . . . .
    . . c c c c . .
    . c f f f f c .
    c f f f f f f c
    . c f f f f c .
    . . c c c c . .
    . . . . . . . .
`, SpriteKind.Shadow)
shadow.z = 1
shadow.setPosition(20, 100)
shadow.setVelocity(60, 0)
shadow.setFlag(SpriteFlag.Ghost, true)
scene.cameraFollowSprite(football)

ui.player.createIndicator();
field.create()
ui.scoreboard.create(playerTeam, opposingTeam);
text.util.showInstruction("CATCH!", 1000)

pause(500)
shadow.setFlag(SpriteFlag.Ghost, false)


