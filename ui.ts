namespace ui.player {
    enum IndicatorImage {
        Left,
        Right,
        Down
    }

    function indicatorImage(dir: IndicatorImage) {
        if (gameClock.secondsRemaining % 2) {
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
        }
        // this ought to be in an else branch, but leaving it as 
        // an implicit else works around the compiler issue of not all branches
        // having a return / needing to have a default return
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

    export function createIndicator() {
        return scene.createRenderable(zindex.PLAYER_INDICATOR, (target, camera) => {
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
                // offset here is very hacky, probably just store state in data instead I guess
                target.drawTransparentImage(
                    indicator,
                    xPos + (activePlayer._action === PlayerAnimation.Left ? -8 : 1),
                    yPos - 5
                );
            }
        });
    }
}

namespace ui.scoreboard {
    export function create(playerTeam: Team, opposingTeam: Team) {
        return scene.createRenderable(zindex.HUD, (target, camera) => {
            const FONT = image.font8
            const HEIGHT = 10;
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
                target.print(data, xPos, TOP + 2, 0x1, FONT);
                xPos += data.length * FONT.charWidth + 1;
            }

            const teamOneText = playerTeam + "";
            const teamOneWidth = teamOneText.length * FONT.charWidth;
            const teamTwoText = opposingTeam + "";
            const teamTwoWidth = teamTwoText.length * FONT.charWidth;

            target.fillRect(
                0,
                TOP + 1,
                teamOneWidth,
                HEIGHT,
                playerTeam.mainColor
            );
            target.fillRect(
                teamOneWidth,
                TOP + 1,
                teamTwoWidth,
                HEIGHT,
                opposingTeam.mainColor
            );

            printAndUpdate(teamOneText);
            printAndUpdate(teamTwoText);
            printAndUpdate(gameClock + "");
        });
    }
}