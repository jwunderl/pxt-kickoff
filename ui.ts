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