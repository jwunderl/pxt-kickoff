namespace player {
    export function create() {
        const player = sprites.create(img`
            . . . . . . . . . . . .
            . . . . . . . . . . . .
            . . . . . . . . f f . .
            . . . . . . . f f f f .
            . . . . . . . f f 4 . .
            . . . . . 1 1 1 f 4 4 .
            . . . . 4 4 1 1 4 f f .
            . . . . . f 4 4 1 4 4 .
            . . . . . f 4 4 1 4 4 .
            . . . . f 1 f f f f . .
            f f 1 f . f f f 1 f f .
            f f 1 f f f . . f 1 f .
            f . . f f f . . . f f .
            . . . . . . . . . 1 . .
            . . . . . . . . . f f .
            . . . . . . . . . f f f
        `, SpriteKind.Player);
        player.z = 2;

        animation.runImageAnimation(player, [img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . f f f f f . .
            . . . . . . . . f f f f f f f .
            . . . . . . . . f f f f f 4 . .
            . . . . . . 1 1 1 f f f f 4 4 .
            . . . . . 4 4 1 1 4 4 4 4 f f .
            . . . . . . f 4 4 4 4 1 1 4 4 .
            . . . . . . f 4 4 1 1 1 1 4 4 .
            . . . . . f 1 f f f f f f f . .
            f f 1 f f 1 f f f f 1 1 1 f f .
            f f 1 f f f f . . f f f f 1 f .
            f . . . f f f . . . . . . f f .
            . . . . . . . . . . . . . 1 . .
            . . . . . . . . . . . . . f f .
            . . . . . . . . . . . . . f f f
        `,img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . f f f f f . .
            . . . . . . . . f f f f f f f .
            . . . . . . . . f f f f f 4 . .
            . . . . . . 1 1 1 f f f f 4 4 .
            . . . . . 4 4 1 1 1 1 4 4 f f .
            . . . . . 4 4 f 1 1 4 1 1 4 4 .
            . . . . . . f 4 4 1 1 1 1 4 4 .
            . . . . . f 1 f f f f f . . . .
            . . . . . . f 1 f f f f f . . .
            . . . . . f f f 1 . f f f . . .
            . . . . . 1 f . . . . f f . . .
            . . . . . f . . . . . 1 . . . .
            . . . . . f f . . . . f f . . .
            . . . . . f f f . . . f f f . .
        `], 200, true);
        return player;
    }
} 























