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
        scene.setTile(3, img`
            c c b b b b b b b b b b b b c c
            c c b b b b c b b b b b b b c c
            c c b b b b b b b b b b b b c c
            c c b b b b b b b b b b b b c c
            c c b b b b b b c b b b b b c c
            c c b b b b b b b b b b b b c c
            c c b b b b c b b b b b b b c c
            c c b b b b c b b b b b b b c c
            c c b b b b b b b b b b b b c c
            c c b b b b b b b b b b b b c c
            c c b b b b b b c b b b b b c c
            c c b b b b c b c b b b b b c c
            c c b b b b b b b b b b b b c c
            c c b b b b b b b b b b b b c c
            c c b b b b b b c b b b b b c c
            c c b b b b b b c b b b b b c c
        `, false);
        scene.setTile(4, img`
            e e d d d d d d d d d d d d e e
            e e d d d d e d d d d d d d e e
            e e d d d d e d d d d d d d e e
            e e d d d d d d e d d d d d e e
            e e d d d d d d d d d d d d e e
            e e d d d d e d e d d d d d e e
            e e d d d d e d d d d d d d e e
            e e d d d d d d d d d d d d e e
            e e d d d d d d d d d d d d e e
            e e d d d d e d d d d d d d e e
            e e d d d d d d d d d d d d e e
            e e d d d d d d e d d d d d e e
            e e d d d d d d e d d d d d e e
            e e d d d d d d d d d d d d e e
            e e d d d d d d d d d d d d e e
            e e d d d d e d d d d d d d e e
        `, false);
        scene.setTile(5, img`
            a a f f f f f f f a a a a f f f
            9 a 5 5 a f f f f a a a a a f a
            9 5 5 5 5 a f f a a a f a a a 8
            5 f 5 5 f 5 f f a a f 9 a f 8 a
            5 a 5 5 a 5 a 6 6 a f 8 8 f 8 9
            5 5 5 5 5 a 6 6 6 6 a 9 8 a 8 8
            a 5 f f a 6 f 6 6 f 6 a 9 9 a 8
            a a 5 5 a 6 5 6 6 5 6 a a 9 9 a
            a a a a a 6 6 6 6 6 6 a a a 9 9
            f f f a 5 5 5 5 5 5 5 5 5 5 5 5
            f a 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, true);
        scene.setTile(6, img`
            f f f f a a a a f f f f f f f a
            8 8 a f a a a f f a 9 9 a f a a
            8 8 8 a f f f f a 9 9 9 9 a a a
            8 8 a 8 f a 9 f 9 f 9 9 f 9 f a
            8 8 9 8 f 8 8 f 4 a 4 4 a 4 f f
            a a 8 8 a 8 9 f 4 4 4 4 4 4 a 9
            9 9 8 a 9 a f f 9 4 a a 4 9 8 8
            8 8 a 9 9 f f f f 9 4 4 9 8 9 8
            9 9 9 9 a f f f a a a a a 8 a 8
            5 5 5 5 5 5 5 5 5 5 5 5 a f f f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 a f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, true);
        scene.setTile(7, img`
            a f f f f f f f f f f f a 6 6 a
            a a f f f f f f f f f a 6 6 6 6
            a a f a 9 9 a f 9 f f 6 f 6 6 f
            a f a 9 9 9 9 a 6 6 f 6 5 6 6 5
            f f 9 f 9 9 f 9 9 6 5 6 6 a a 6
            9 f 9 a 9 9 a 9 f 9 9 a 6 9 9 6
            8 8 f 9 f f 9 9 f a 9 a a 6 6 9
            8 9 8 a a a 9 a f f a 9 9 9 9 a
            8 a 8 a 9 9 a f f f f f a 9 9 a
            f f f a 5 5 5 5 5 5 5 5 5 5 5 5
            f a 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, true);
        scene.setTile(8, img`
            f f f a 9 9 9 9 a a f f f f f f
            a f f 9 a 9 9 a 9 a 5 5 a f f f
            6 f f 9 a 9 9 a 9 5 5 5 5 a f f
            6 f f 9 9 9 9 9 5 f 5 5 f 5 f f
            6 a 9 9 a 9 9 a 5 a 5 5 a 5 a 6
            9 e e e e a a a 5 5 5 5 5 a 6 6
            e d e e d e a a a 5 f f a 6 f 6
            d e d d e d f f a a 5 5 a 6 5 6
            d d d d d d f f a a a a a 6 6 6
            5 5 5 5 5 5 5 5 5 5 5 5 a f f f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 a f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, true);
        scene.setTile(9, img`
            f a a a a f f f f f f f a a a a
            f a a a a a f a 8 8 a f a a a f
            a a a f a a a 8 8 8 8 a f f f f
            a a f 9 a f 8 a 8 8 a 8 f a 9 f
            6 a f 8 8 f 8 9 8 8 9 8 f 8 8 f
            6 6 a 9 8 a 8 8 a a 8 8 a 8 9 f
            6 f 6 a 9 9 a 8 9 9 8 a 9 a f f
            6 5 6 a a 9 9 a 8 8 a 9 9 f f f
            6 6 6 a a a 9 9 9 9 9 9 a f f f
            f f f a 5 5 5 5 5 5 5 5 5 5 5 5
            f a 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, true);
        scene.setTile(10, img`
            f f f f f f f a a f f f f f f f
            f a 9 9 a f a a a a f f f f f f
            a 9 9 9 9 a a a a a f a 9 9 a f
            9 f 9 9 f 9 f a a f a 9 9 9 9 a
            4 a 4 4 a 4 f f f f 9 f 9 9 f 9
            4 4 4 4 4 4 a 9 9 f 9 a 9 9 a 9
            9 4 a a 4 9 8 8 8 8 f 9 f f 9 9
            f 9 4 4 9 8 9 8 8 9 8 a a a 9 a
            a a a a a 8 a 8 8 a 8 a 9 9 a f
            5 5 5 5 5 5 5 5 5 5 5 5 a f f f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 a f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, true);
        scene.setTile(11, img`
            f f f f a 6 6 a f f f a 9 9 9 9
            f f f a 6 6 6 6 a f f 9 a 9 9 a
            9 f f 6 f 6 6 f 6 f f 9 a 9 9 a
            6 6 f 6 5 6 6 5 6 f f 9 9 9 9 9
            9 6 5 6 6 a a 6 6 a 9 9 a 9 9 a
            f 9 9 a 6 9 9 6 9 e e e e a a a
            f a 9 a a 6 6 9 e 9 e e 9 e a a
            f f a 9 9 9 9 a d a d d a d f f
            f f f f a 9 9 a d d d d d d f f
            f f f a 5 5 5 5 5 5 5 5 5 5 5 5
            f a 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, true);
        scene.setTile(12, img`
            a a f f f f f f f a a a a f f f
            9 a 5 5 a f f f f a a a a a f a
            9 5 5 5 5 a f f a a a f a a a 8
            5 f 5 5 f 5 f f a a f 9 a f 8 a
            5 a 5 5 a 5 a 6 6 a f 8 8 f 8 9
            5 5 5 5 5 a 6 6 6 6 a 9 8 a 8 8
            a 5 f f a 6 f 6 6 f 6 a 9 9 a 8
            a a 5 5 a 6 5 6 6 5 6 a a 9 9 a
            a a a a a 6 6 6 6 6 6 a a a 9 9
            5 5 5 5 5 5 5 5 5 5 5 5 a f f f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 a f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, true);
        scene.setTile(13, img`
            f f f f a a a a f f f f f f f a
            8 8 a f a a a f f a 9 9 a f a a
            8 8 8 a f f f f a 9 9 9 9 a a a
            8 8 a 8 f a 9 f 9 f 9 9 f 9 f a
            8 8 9 8 f 8 8 f 4 a 4 4 a 4 f f
            a a 8 8 a 8 9 f 4 4 4 4 4 4 a 9
            9 9 8 a 9 a f f 9 4 a a 4 9 8 8
            8 8 a 9 9 f f f f 9 4 4 9 8 9 8
            9 9 9 9 a f f f a a a a a 8 a 8
            f f f a 5 5 5 5 5 5 5 5 5 5 5 5
            f a 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, true);
        scene.setTile(14, img`
            a f f f f f f f f f f f a 6 6 a
            a a f f f f f f f f f a 6 6 6 6
            a a f a 9 9 a f 9 f f 6 f 6 6 f
            a f a 9 9 9 9 a 6 6 f 6 5 6 6 5
            f f 9 f 9 9 f 9 9 6 5 6 6 a a 6
            9 f 9 a 9 9 a 9 f 9 9 a 6 9 9 6
            d d f 9 f f 9 9 f a 9 a a 6 6 9
            d 9 d a a a 9 a f f a 9 9 9 9 a
            d a d a 9 9 a f f f f f a 9 9 a
            5 5 5 5 5 5 5 5 5 5 5 5 a f f f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 a f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
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
        `, SpriteKind.Logo);
        output.setFlag(SpriteFlag.Ghost, true);
        output.setPosition(10 * 16, 4 * 16);
        output.z = zindex.BACKGROUND;
        return output;
    }
}