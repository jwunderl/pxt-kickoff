namespace player {
    export function create() {
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
        `,img`
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
} 