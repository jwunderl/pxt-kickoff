namespace SpriteKind {
    export const Ball = SpriteKind.create()
    export const Shadow = SpriteKind.create()
}
namespace DataKeys {
    export const PlayerHasBall = "__PLAYER_HAS_BALL";
}
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
                    textHelper.showInstruction("MISS!", 1500)
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

scene.setTileMap(img`
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
    4 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8
    4 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8
    4 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8
    4 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8
    4 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8
    4 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8
`)
scene.setTile(3, img`
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e 1 1 1 e e e e e e e e e e e e
    e 1 e 1 1 e e e e e e e e e e e
    e 1 e e 1 e e e e e e e e e e e
    e 1 e e e e e e e e e e e e e e
    e 1 e e e e e e e e e e e e e e
    1 1 1 e 1 1 1 e e 1 e 1 e e e e
    e 1 e 1 1 e 1 e e 1 1 e 1 e e e
    e 1 e 1 e 1 1 e e 1 e e 1 e e e
    e 1 e 1 1 1 e 1 e 1 e e 1 e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
`, true)
scene.setTile(7, img`
    7 7 7 7 7 7 7 1 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 1 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 1 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 1 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 1 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 1 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 1 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 1 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 1 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 1 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 1 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 1 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 1 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 1 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 1 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 1 7 7 7 7 7 7 7 7
`, false)
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
scene.cameraFollowSprite(football)

let currentPlayer = 0;
const players = [
    createPlayer(),
    createPlayer(),
    createPlayer()
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

pause(200)
shadow.setFlag(SpriteFlag.Ghost, false)

function createPlayer() {
    const player = sprites.create(img`
        . . . . . . . . f f . .
        . . . . . . . f f f f .
        . . . . . . . f f 8 . .
        . . . . . 1 1 1 f 8 8 .
        . . . . 8 8 1 1 8 f f .
        . . . . 8 8 f 1 1 8 8 .
        . . . . . f 8 8 1 8 8 .
        . . . . . f 8 8 1 8 8 .
        . . . . f 1 f f f . . .
        . . . . f f 1 1 f f . .
        f f 1 f . f f f 1 f f .
        f f 1 f f f . . f 1 f .
        f . . f f f . . . f f .
        . . . . . . . . . 1 . .
        . . . . . . . . . f f .
        . . . . . . . . . f f f
    `, SpriteKind.Player)
    player.z = 2;

    animation.runImageAnimation(player, [img`
        . . . . . . . . f f . .
        . . . . . . . f f f f .
        . . . . . . . f f 8 . .
        . . . . . 1 1 1 f 8 8 .
        . . . . 8 8 1 1 8 f f .
        . . . . 8 8 f 1 1 8 8 .
        . . . . . f 8 8 1 8 8 .
        . . . . . f 8 8 1 8 8 .
        . . . . f 1 f f f . . .
        . . . . f f 1 1 f f . .
        f f 1 f . f f f 1 f f .
        f f 1 f f f . . f 1 f .
        f . . f f f . . . f f .
        . . . . . . . . . 1 . .
        . . . . . . . . . f f .
        . . . . . . . . . f f f
    `, img`
        . . . . . . . . f f . .
        . . . . . . . f f f f .
        . . . . . . . f f 8 . .
        . . . . . 1 1 1 f 8 8 .
        . . . . 8 8 1 1 8 f f .
        . . . . 8 8 f 1 1 8 8 .
        . . . . . f 8 8 1 8 8 .
        . . . . . f 8 8 1 8 8 .
        . . . . f 1 f f . . . .
        . . . . f f f f . . . .
        . . . . . f 1 f f . . .
        . . . . f f f 1 f . . .
        . . . . 1 f . f f . . .
        . . . . f . . 1 . . . .
        . . . . f f . f f . . .
        . . . . f f f f f f . .
    `], 200, true)
    return player;
}

const playerPositionIndicater = scene.createRenderable(20, (target, camera) => {
    if (activePlayer) {
        const xPos = activePlayer.x - camera.offsetX;
        const yPos = activePlayer.top - camera.offsetY;

        // player is either:
        // off screen to left
        // off screen to right
        // in the screen
        if (xPos < 0) {
            const indicator = testRemainingTime % 2 ? img`
                . . . 5
                . . 5 4
                . 5 4 5
                5 4 5 5
                . 5 4 5
                . . 5 4
                . . . 5
            ` : img`
                . . . 2
                . . 2 5
                . 2 5 2
                2 5 2 2
                . 2 5 2
                . . 2 5
                . . . 2
            `

            target.drawTransparentImage(
                indicator,
                0,
                yPos + 5
            );
        } else if (xPos > screen.width) {
            const indicator = testRemainingTime % 2 ? img`
                5 . . .
                4 5 . .
                5 4 5 .
                5 5 4 5
                5 4 5 .
                4 5 . .
                5 . . .
            ` : img`
                2 . . .
                5 2 . .
                2 5 2 .
                2 2 5 2
                2 5 2 .
                5 2 . .
                2 . . .
            `

            target.drawTransparentImage(
                indicator,
                screen.width - indicator.width,
                yPos + 5
            );
        } else {
            const indicator = testRemainingTime % 2 ? img`
                5 4 5 5 5 4 5
                . 5 4 5 4 5 .
                . . 5 4 5 . .
                . . . 5 . . .
            ` : img`
                2 5 2 2 2 5 2
                . 2 5 2 5 2 .
                . . 2 5 2 . .
                . . . 2 . . .
            `
            target.drawTransparentImage(
                indicator,
                xPos + 1,
                yPos - 5
            );
        }
    }
})

textHelper.showInstruction("CATCH!", 1000)
namespace textHelper {
    export function showInstruction(text: string, duration: number): void {
        control.runInParallel(function () {
            let renderable = showText(text);
            pause(duration);
            renderable.destroy();
        });
    }

    function showText(text: string): scene.Renderable {
        const largeFont = image.scaledFont(image.font8, 2);
        return scene.createRenderable(
            scene.HUD_Z,
            function (target: Image, camera: scene.Camera) {
                let x = (target.width - ((text.length - 0.5) * largeFont.charWidth)) / 2;
                let y = (target.height / 2) - (largeFont.charHeight / 2);

                printShadow(target, text, x, y, 0x2, largeFont);
                target.print(text, x, y, 0, largeFont);
            })
    }

    function printBorder(img: Image, txt: string, x: number, y: number, c: number, f: image.Font) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                img.print(txt, x + i * 2, y + j * 2, c, f);
            }
        }
    }
    function printShadow(img: Image, txt: string, x: number, y: number, c: number, f: image.Font, up?: boolean, left?: boolean) {
        for (let i = (left ? -1 : 0); i <= (left ? 0 : 1); i++) {
            for (let j = (up ? -1 : 0); j <= (up ? 0 : 1); j++) {
                img.print(txt, x + i * 2, y + j * 2, c, f);
            }
        }
    }
}