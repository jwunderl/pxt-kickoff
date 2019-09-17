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
        return scene.createRenderable(20, (target, camera) => {
            const activePlayer = playerTeam.activePlayer;
            if (!activePlayer)
                return;

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
        });
    }
}

namespace ui.scoreboard {
    export function create(playerTeam: Team, opposingTeam: Team) {
        return scene.createRenderable(100, (target, camera) => {
            const FONT = image.font8
            const HEIGHT = 10;
            const PADDING = 2;
            const TOP = screen.height - HEIGHT;

            target.fillRect(
                0,
                TOP,
                screen.width,
                HEIGHT,
                0xF
            );
            let xPos = 1;
            const printAndUpdate = (data: string) => {
                target.print(data, xPos, TOP + PADDING, 0x1, FONT);
                xPos += data.length * FONT.charWidth + 1;
            }

            const teamOneText = teamScoreBoard(playerTeam);
            const teamOneWidth = teamOneText.length * FONT.charWidth;
            const teamTwoText = teamScoreBoard(opposingTeam);
            const teamTwoWidth = teamTwoText.length * FONT.charWidth;

            target.fillRect(
                0,
                TOP,
                teamOneWidth,
                HEIGHT,
                playerTeam.mainColor
            );
            target.fillRect(
                teamOneWidth,
                TOP,
                teamTwoWidth,
                HEIGHT,
                opposingTeam.mainColor
            );

            printAndUpdate(teamOneText);
            printAndUpdate(teamTwoText);

            const testQuarter = "2nd "
            printAndUpdate(testQuarter);
            printAndUpdate(secondsToDisplay(testRemainingTime));
        });
    }

    function teamScoreBoard(team: Team) {
        return `${team.abbrev}:${`  ${team.score}`.slice(-3)} `;
    }

    function secondsToDisplay(time: number) {
        const minutes = (testRemainingTime / 60) | 0;
        const seconds = testRemainingTime % 60;
        const secondsDisplay = `0${seconds}`.slice(-2);
        return minutes + ":" + secondsDisplay;
    }
}