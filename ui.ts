namespace ui.player {
    enum IndicatorImage {
        Left,
        Right,
        Down
    }

    function indicatorImage(dir: IndicatorImage) {
        if (testRemainingTime % 2) {
            switch (dir) {
                case IndicatorImage.Left:
                    return img`
                        . . . 5
                        . . 5 4
                        . 5 4 5
                        5 4 5 5
                        . 5 4 5
                        . . 5 4
                        . . . 5
                    `;
                case IndicatorImage.Right:
                    return img`
                        5 . . .
                        4 5 . .
                        5 4 5 .
                        5 5 4 5
                        5 4 5 .
                        4 5 . .
                        5 . . .
                    `;
                case IndicatorImage.Down:
                    return img`
                        5 4 5 5 5 4 5
                        . 5 4 5 4 5 .
                        . . 5 4 5 . .
                        . . . 5 . . .
                    `;
            }
        } else {
            switch (dir) {
                case IndicatorImage.Left:
                    return img`
                        . . . 2
                        . . 2 5
                        . 2 5 2
                        2 5 2 2
                        . 2 5 2
                        . . 2 5
                        . . . 2
                    `;
                case IndicatorImage.Right:
                    return img`
                        2 . . .
                        5 2 . .
                        2 5 2 .
                        2 2 5 2
                        2 5 2 .
                        5 2 . .
                        2 . . .
                    `;
                case IndicatorImage.Down:
                    return img`
                        2 5 2 2 2 5 2
                        . 2 5 2 5 2 .
                        . . 2 5 2 . .
                        . . . 2 . . .
                    `;
            }
        }
        return undefined; // should never reach here, but ts doesn't like this.
    }

    export function createIndicator() {
        // attach to a team later on, select their random player
        return scene.createRenderable(20, (target, camera) => {
            if (!activePlayer) return

            const xPos = activePlayer.x - camera.offsetX;
            const yPos = activePlayer.top - camera.offsetY;

            // player is either:
            if (xPos < 0) { // off screen to left
                const indicator = indicatorImage(IndicatorImage.Left);

                target.drawTransparentImage(
                    indicator,
                    0,
                    yPos + 5
                );
            } else if (xPos > screen.width) { // off screen to right
                const indicator = indicatorImage(IndicatorImage.Right)

                target.drawTransparentImage(
                    indicator,
                    screen.width - indicator.width,
                    yPos + 5
                );
            } else { // within the screen
                const indicator = indicatorImage(IndicatorImage.Down)
                target.drawTransparentImage(
                    indicator,
                    xPos + 1,
                    yPos - 5
                );
            }
        })
    }
}

namespace ui.scoreboard {
    export function create() {
        return scene.createRenderable(100, (target, camera) => {
            const HEIGHT = 10;
            const PADDING = 2;
            const TOP = screen.height - HEIGHT;
            // for test
            const team1 = `CLE:${`  ${testBrownsScore}`.slice(-3)}|`;
            const team2 = `SEA:${`  ${testSeahawksScore}`.slice(-3)}|`;
            target.fillRect(0, TOP, screen.width, HEIGHT, 0xD);
            let xPos = 1;
            const printAndUpdate = (data: string) => {
                target.print(data, xPos, TOP + PADDING, 0xF, FONT);
                xPos += data.length * FONT.charWidth + 1;
            }
            printAndUpdate(team1);
            printAndUpdate(team2);
            printAndUpdate(testQuarter);
            printAndUpdate(secondsToDisplay(testRemainingTime));
        });

    }

    function secondsToDisplay(time: number) {
        const minutes = (testRemainingTime / 60) | 0;
        const seconds = testRemainingTime % 60;
        const secondsDisplay = `0${seconds}`.slice(-2);
        return minutes + ":" + secondsDisplay;
    }
}