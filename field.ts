namespace field {
    export function initialize() {
        scene.setTileMap(img`
            5 6 7 8 9 a b c d e 5 6 7 8 9 a b c d e
            3 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 4
            3 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 4
            3 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 4
            3 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 4
            3 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 4
            3 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 4
        `);
        // grass
        scene.setTile(2, img`
            6 6 6 6 6 6 6 1 6 6 6 6 6 6 6 6
            6 6 6 6 6 6 6 1 6 6 6 6 6 6 6 6
            6 6 6 6 6 6 6 1 6 6 6 6 6 6 6 6
            6 6 6 6 6 6 6 1 6 6 6 6 6 6 6 6
            6 6 6 6 6 6 6 1 6 6 6 6 6 6 6 6
            6 6 6 6 6 6 6 1 6 6 6 6 6 6 6 6
            6 6 6 6 6 6 6 1 6 6 6 6 6 6 6 6
            6 6 6 6 6 6 6 1 6 6 6 6 6 6 6 6
            6 6 6 6 6 6 6 1 6 6 6 6 6 6 6 6
            6 6 6 6 6 6 6 1 6 6 6 6 6 6 6 6
            6 6 6 6 6 6 6 1 6 6 6 6 6 6 6 6
            6 6 6 6 6 6 6 1 6 6 6 6 6 6 6 6
            6 6 6 6 6 6 6 1 6 6 6 6 6 6 6 6
            6 6 6 6 6 6 6 1 6 6 6 6 6 6 6 6
            6 6 6 6 6 6 6 1 6 6 6 6 6 6 6 6
            6 6 6 6 6 6 6 1 6 6 6 6 6 6 6 6
        `, false);
        scene.setTile(5, img`
            c c f f f f f f f c c c c f f f
            b c 6 6 c f f f f c c c c c f c
            b 6 6 6 6 c f f c c c f c c c d
            6 f 6 6 f 6 f f c c f b c f d c
            6 c 6 6 c 6 c 7 7 c f d d f d b
            6 6 6 6 6 c 7 7 7 7 c b d c d d
            c 6 f f c 7 f 7 7 f 7 c b b c d
            c c 6 6 c 7 6 7 7 6 7 c c b b c
            c c c c c 7 7 7 7 7 7 c c c b b
            f f f c 5 5 5 5 5 5 5 5 5 5 5 5
            f c 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
        `, true);
        scene.setTile(6, img`
            f f f f c c c c f f f f f f f c
            d d c f c c c f f c b b c f c c
            d d d c f f f f c b b b b c c c
            d d c d f c b f b f b b f b f c
            d d b d f d d f 3 c 3 3 c 3 f f
            c c d d c d b f 3 3 3 3 3 3 c b
            b b d c b c f f b 3 c c 3 b d d
            d d c b b f f f f b 3 3 b d b d
            b b b b c f f f c c c c c d c d
            5 5 5 5 5 5 5 5 5 5 5 5 c f f f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 c f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
        `, true);
        scene.setTile(7, img`
            c f f f f f f f f f f f c 7 7 c
            c c f f f f f f f f f c 7 7 7 7
            c c f c b b c f b f f 7 f 7 7 f
            c f c b b b b c 7 7 f 7 6 7 7 6
            f f b f b b f b b 7 6 7 7 c c 7
            b f b c b b c b f b b c 7 b b 7
            d d f b f f b b f c b c c 7 7 b
            d b d c c c b c f f c b b b b c
            d c d c b b c f f f f f c b b c
            f f f c 5 5 5 5 5 5 5 5 5 5 5 5
            f c 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
        `, true);
        scene.setTile(8, img`
            f f f c b b b b c c f f f f f f
            c f f b c b b c b c 6 6 c f f f
            7 f f b c b b c b 6 6 6 6 c f f
            7 f f b b b b b 6 f 6 6 f 6 f f
            7 c b b c b b c 6 c 6 6 c 6 c 7
            b d d d d c c c 6 6 6 6 6 c 7 7
            d b d d b d c c c 6 f f c 7 f 7
            9 c 9 9 c 9 f f c c 6 6 c 7 6 7
            9 9 9 9 9 9 f f c c c c c 7 7 7
            5 5 5 5 5 5 5 5 5 5 5 5 c f f f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 c f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
        `, true);
        scene.setTile(9, img`
            f c c c c f f f f f f f c c c c
            f c c c c c f c d d c f c c c f
            c c c f c c c d d d d c f f f f
            c c f b c f d c d d c d f c b f
            7 c f d d f d b d d b d f d d f
            7 7 c b d c d d c c d d c d b f
            7 f 7 c b b c d b b d c b c f f
            7 6 7 c c b b c d d c b b f f f
            7 7 7 c c c b b b b b b c f f f
            f f f c 5 5 5 5 5 5 5 5 5 5 5 5
            f c 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
        `, true);
        scene.setTile(10, img`
            f f f f f f f c c f f f f f f f
            f c b b c f c c c c f f f f f f
            c b b b b c c c c c f c b b c f
            b f b b f b f c c f c b b b b c
            3 c 3 3 c 3 f f f f b f b b f b
            3 3 3 3 3 3 c b b f b c b b c b
            b 3 c c 3 b d d d d f b f f b b
            f b 3 3 b d b d d b d c c c b c
            c c c c c d c d d c d c b b c f
            5 5 5 5 5 5 5 5 5 5 5 5 c f f f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 c f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
        `, true);
        scene.setTile(11, img`
            f f f f c 7 7 c f f f c b b b b
            f f f c 7 7 7 7 c f f b c b b c
            b f f 7 f 7 7 f 7 f f b c b b c
            7 7 f 7 6 7 7 6 7 f f b b b b b
            b 7 6 7 7 c c 7 7 c b b c b b c
            f b b c 7 b b 7 b d d d d c c c
            f c b c c 7 7 b d b d d b d c c
            f f c b b b b c 9 c 9 9 c 9 f f
            f f f f c b b c 9 9 9 9 9 9 f f
            f f f c 5 5 5 5 5 5 5 5 5 5 5 5
            f c 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
        `, true);
        scene.setTile(12, img`
            c c f f f f f f f c c c c f f f
            b c 6 6 c f f f f c c c c c f c
            b 6 6 6 6 c f f c c c f c c c d
            6 f 6 6 f 6 f f c c f b c f d c
            6 c 6 6 c 6 c 7 7 c f d d f d b
            6 6 6 6 6 c 7 7 7 7 c b d c d d
            c 6 f f c 7 f 7 7 f 7 c b b c d
            c c 6 6 c 7 6 7 7 6 7 c c b b c
            c c c c c 7 7 7 7 7 7 c c c b b
            5 5 5 5 5 5 5 5 5 5 5 5 c f f f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 c f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
        `, true);
        scene.setTile(13, img`
            f f f f c c c c f f f f f f f c
            d d c f c c c f f c b b c f c c
            d d d c f f f f c b b b b c c c
            d d c d f c b f b f b b f b f c
            d d b d f d d f 3 c 3 3 c 3 f f
            c c d d c d b f 3 3 3 3 3 3 c b
            b b d c b c f f b 3 c c 3 b d d
            d d c b b f f f f b 3 3 b d b d
            b b b b c f f f c c c c c d c d
            f f f c 5 5 5 5 5 5 5 5 5 5 5 5
            f c 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
        `, true);
        scene.setTile(14, img`
            c f f f f f f f f f f f c 7 7 c
            c c f f f f f f f f f c 7 7 7 7
            c c f c b b c f b f f 7 f 7 7 f
            c f c b b b b c 7 7 f 7 6 7 7 6
            f f b f b b f b b 7 6 7 7 c c 7
            b f b c b b c b f b b c 7 b b 7
            d d f b f f b b f c b c c 7 7 b
            d b d c c c b c f f c b b b b c
            d c d c b b c f f f f f c b b c
            5 5 5 5 5 5 5 5 5 5 5 5 c f f f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 c f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
        `, true);
        createLogo();
    }

    function createLogo() {
        const output = sprites.create(img`
            . . . . . . . . . . 1 1 1 1 1 1 1 . . . . . . . . . . . . . . . . . . . . . . . 1 1 1 1 1 1 1 . . . . . . . . . .
            . . . . . . . . . 1 b b b b b b 1 . . . . . . . . . . . . . . . . . . . . . . . 1 b b b b b b 1 . . . . . . . . .
            . . . . . . . . 1 b b b b b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b b b b b 1 . . . . . . . .
            . . . . . . . 1 b b b b 1 1 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 1 1 b b b b 1 . . . . . . .
            . . . . . . . 1 b b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b b 1 . . . . . . .
            . . . . . . 1 b b b 1 . . . . . . . . . . . . . . . 1 1 1 1 1 . . . . . . . . . . . . . . . 1 b b b 1 . . . . . .
            . . . . . . 1 b b b 1 . . . . . . . . . . . . . 1 1 d d d d d 1 1 . . . . . . . . . . . . . 1 b b b 1 . . . . . .
            . . . . . 1 b b b 1 . . . . . . . . . . . . . 1 d d d d d d d d d 1 . . . . . . . . . . . . . 1 b b b 1 . . . . .
            . . . . . 1 b b b 1 . . . . . . . . . . . . . 1 d d d d d d d d d 1 . . . . . . . . . . . . . 1 b b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . . . . . . . 1 d d d d d d d d d 1 . . . . . . . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . . . . . . . . 1 d d d d d d d 1 . . . . . . . . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . . . . . . . . 1 d d d d d d d 1 . . . . . . . . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . . . . . . . . . 1 d d d d d 1 . . . . . . . . . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . . 1 1 1 1 1 1 1 1 d d d d d 1 1 1 1 1 1 1 1 . . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 1 d d d d d d d d d d d d d d d d d d d 1 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d d d d d d d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d d d d d d d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d d d d d d d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . 1 b b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d 1 1 1 d d d 1 . . . . . . . . 1 b b b 1 . . . .
            . . . 1 b b b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d 1 . . . 1 1 d 1 . . . . . . . . 1 b b b b 1 . . .
            . . 1 b b b b 1 . . . . . . . . . 1 d d d d d d d d d d d d d d 1 . . . . . 1 1 . . . . . . . . . 1 b b b b 1 . .
            . 1 b b b b b 1 . . . . . . . . . 1 d d d d d d d d d d d d d 1 . . . . . . . 1 . . . . . . . . . 1 b b b b b 1 .
            1 b b b b 1 1 . . . . . . . . . . 1 d d d d d d d d d d d d d 1 . . . . . . . . . . . . . . . . . . 1 1 b b b b 1
            . 1 b b b b b 1 . . . . . . . . . 1 d d d d d d d d d d d d d 1 . . . . . . . . . . . . . . . . . 1 b b b b b 1 .
            . . 1 b b b b 1 . . . . . . . . . 1 d d d d d d d d d d d d d 1 . . . . . . . . . . . . . . . . . 1 b b b b 1 . .
            . . . 1 b b b b 1 . . . . . . . . 1 d d d d d d d d d d d d d 1 . . . . . . . 1 . . . . . . . . 1 b b b b 1 . . .
            . . . . 1 b b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d 1 . . . . . 1 1 . . . . . . . . 1 b b b 1 . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d 1 . . . 1 1 d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d 1 1 1 d d d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d d d d d d d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d d d d d d d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d d d d d d d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d d d d d d d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 1 d d d d d d d d d d d d d d d d d d d 1 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b b 1 . . . . .
            . . . . . 1 b b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b b 1 . . . . .
            . . . . . . 1 b b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b b 1 . . . . . .
            . . . . . . 1 b b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b b 1 . . . . . .
            . . . . . . . 1 b b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b b 1 . . . . . . .
            . . . . . . . 1 b b b b 1 1 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 1 1 b b b b 1 . . . . . . .
            . . . . . . . . 1 b b b b b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b b b b b 1 . . . . . . . .
            . . . . . . . . . 1 b b b b b b 1 . . . . . . . . . . . . . . . . . . . . . . . 1 b b b b b b 1 . . . . . . . . .
            . . . . . . . . . . 1 1 1 1 1 1 1 . . . . . . . . . . . . . . . . . . . . . . . 1 1 1 1 1 1 1 . . . . . . . . . .
        `, SpriteKind.Shield);
        output.setFlag(SpriteFlag.Ghost, true);
        output.setPosition(10 * 16, 4 * 16);
        output.z = zindex.BACKGROUND;
        return output;
    }
}