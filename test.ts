sprites.onOverlap(SpriteKind.Ball, SpriteKind.Shadow, function (sprite, otherSprite) {
    otherSprite.setFlag(SpriteFlag.Ghost, true)
    const playerWhoCaught = players.find(player => sprite.overlapsWith(player));
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
                testSeahawksScore += 7;
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

const testBrownsScore = 7;
let testSeahawksScore = 7;
const testQuarter = "2nd|"
let testRemainingTime = 195;
const FONT = image.font8

game.onUpdateInterval(1000, function () {
    testRemainingTime--;
    if (testRemainingTime === 0) {
        game.over();
    }
})

const scoreBoard = scene.createRenderable(100, (target, camera) => {
    const HEIGHT = 10;
    const PADDING = 2;
    const TOP = screen.height - HEIGHT;
    const team1 = `CLE:${`  ${testBrownsScore}`.slice(-3)}|`;
    const team2 = `SEA:${`  ${testSeahawksScore}`.slice(-3)}|`;
    let xPos = 1;
    target.fillRect(0, TOP, screen.width, HEIGHT, 0xD)
    const printAndUpdate = (data: string) => {
        target.print(data, xPos, TOP + PADDING, 0xF, FONT);
        xPos += data.length * FONT.charWidth + 1;
    }
    printAndUpdate(team1);
    printAndUpdate(team2);
    printAndUpdate(testQuarter);
    printAndUpdate(secondsToDisplay(testRemainingTime));
});

function secondsToDisplay(time: number) {
    const minutes = (testRemainingTime / 60) | 0;
    const seconds = testRemainingTime % 60;
    const secondsDisplay = `0${seconds}`.slice(-2);
    return minutes + ":" + secondsDisplay;
}

let currentPlayer = 0;
const players = [
    player.create(),
    player.create(),
    player.create()
]
let activePlayer = players[currentPlayer];
players[1].y -= 32
players[2].y += 32

controller.moveSprite(activePlayer)
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    // switch player
    // deactivate current player
    controller.moveSprite(activePlayer, 0, 0);

    currentPlayer = (currentPlayer + 1) % players.length;
    activePlayer = players[currentPlayer];
    controller.moveSprite(activePlayer)
})

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

pause(500)
shadow.setFlag(SpriteFlag.Ghost, false)


text.util.showInstruction("CATCH!", 1000)

