// a 3 person team lined up on the field
class Team {
    public score: number;
    public players: Sprite[];
    protected controlledPlayer: number;
    public animations: animation.Animation[];

    constructor(
        public name: string,
        public abbrev: string,
        public mainColor: number,
        public secondaryColor: number,
        protected controlled?: boolean
    ) {
        this.score = 0;
        const startX = controlled ? -20 : 20;
        this.initializeFrames();
        if (controlled) {
            this.controlledPlayer = 0;
            controller.B.onEvent(
                ControllerButtonEvent.Pressed,
                () => this.controlNextPlayer()
            );
        }

        this.players = [];
        for (let i = 0; i < 3; i++) {
            this.players[i] = player.create(this);
        }
    }

    resetPlayerPositions(lineOfScrimmage: number) {
        const startX = lineOfScrimmage + (this.isPlayerControlled() ? -20 : 20);
        this.players.forEach((p, i) => {
            p.y = (screen.height >> 1) + (i - 1) * 32;
            p.x = startX;
            animation.setAction(
                p,
                this.isPlayerControlled() ?
                    PlayerAnimation.Right
                    :
                    PlayerAnimation.Left
            );
        });
    }

    isPlayerControlled() {
        return this.controlled;
    }

    get activePlayer() {
        return this.controlled && this.players[this.controlledPlayer];
    }

    controlNextPlayer() {
        controller.moveSprite(this.activePlayer, 0, 0);
        this.controlledPlayer = (this.controlledPlayer + 1) % this.players.length;
        controller.moveSprite(this.activePlayer);
    }

    stop() {
        this.players.forEach(p => {
            p.vx = 0;
            p.vy = 0;
            if (p == this.activePlayer) {
                controller.moveSprite(p, 0, 0);
            }
        });
    }

    toString() {
        return `${this.abbrev}:${`  ${this.score}`.slice(-3)} `;
    }

    protected initializeFrames() {
        const animationFrames = [
            [
                img`
                    . . . . . . e 4 4 4 4 4 . . . .
                    . . . . . e 4 4 d 4 4 4 4 . . .
                    . . . . . e 4 4 4 4 4 4 4 e . .
                    . . . . . e 4 4 4 4 4 4 4 e . .
                    . . . c c f f e 4 4 4 4 4 e . .
                    . . . c b f f f f e 4 4 e e . .
                    . . . c d f f f b 4 e f e e e .
                    . . . c b 1 1 1 1 4 f d 4 4 e e
                    . . . . . c c c e e f d 4 4 e e
                    . . . . . . c e e 4 4 e d 1 1 b
                    . . . . . . . e 4 4 4 4 e f f .
                    . . . . d d f f 4 4 d d f f . .
                    . . . . d d f f e e d d f f . .
                    . . . . . . . . . f f f f . . .
                    . . . . . . . . f f f e e e . .
                    . . . . . . . f f f e e e e . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . e 4 4 4 4 4 . . . . . .
                    . . . e 4 4 d 4 4 4 4 . . . . .
                    . . . e 4 4 4 4 4 4 4 e . . . .
                    . . . e 4 4 4 4 4 4 4 e . . . .
                    . c c f f e 4 4 4 4 4 e . . . .
                    . c b f f f f e 4 4 e e . . . .
                    . c d f f f b 4 e f e e e . . .
                    . c b 1 1 1 1 4 f d 4 4 e e . .
                    . . . c c c e e f d 4 4 e e . .
                    . . . . . c e e 4 e d 1 1 b . .
                    . . . . . . . f d d f f f f . .
                    . . . . . . . . d d f f f f f f
                    . . . . . . . . e f f f . f f f
                    . . . . . . . e e e . . . . f f
                    . . . . . . e e e e . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . e 4 4 4 4 4 . . . . . .
                    . . . e 4 4 d 4 4 4 4 . . . . .
                    . . . e 4 4 4 4 4 4 4 e . . . .
                    . . . e 4 4 4 4 4 4 4 e . . . .
                    . c c f f e 4 4 4 4 4 e . . . .
                    . c b f f f f e 4 4 e e . . . .
                    . c d f f f b 4 4 e f e e e . .
                    . c b 1 1 1 1 4 e f d 4 4 e e .
                    . . . c c c e e e f d 4 4 e e .
                    . . . . . c e e 4 4 e e 1 1 b .
                    . . . d d f f f 4 4 4 d d f . .
                    . . . d d f f . e e e d d f e e
                    . . . . . . . . f f f f f e e e
                    . . . . . . . f f f . . . . e e
                    . . . . . . f f f f . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . e 4 4 4 4 4 . . . . . . .
                    . . e 4 4 d 4 4 4 4 . . . . . .
                    . . e 4 4 4 4 4 4 4 e . . . . .
                    . . e 4 4 4 4 4 4 4 e . . . . .
                    c c f f e 4 4 4 4 4 e . . . . .
                    c b f f f f e 4 4 e e . . . . .
                    c d f f f b 4 4 e f e e e . . .
                    c b 1 1 1 1 4 e f d 4 4 e e . .
                    . . c c c e e e f d 4 4 e e . .
                    . . . . c e e 4 4 e d 1 1 b . .
                    . . . d d f 4 4 d d f f f . . .
                    . . . d d f e e d d f f . . . .
                    . . . . . . f f f f f . . . . .
                    . . . . . . . f f e e e . . . .
                    . . . . . . f f e e e e . . . .
                `
            ],
            [
                img`
                    . . . . 4 4 4 4 4 e . . . . . .
                    . . . 4 4 4 4 d 4 4 e . . . . .
                    . . e 4 4 4 4 4 4 4 e . . . . .
                    . . e 4 4 4 4 4 4 4 e . . . . .
                    . . e 4 4 4 4 4 e f f c c . . .
                    . . e e 4 4 e f f f f b c . . .
                    . e e e f e 4 b f f f d c . . .
                    e e 4 4 d f 4 1 1 1 1 b c . . .
                    e e 4 4 d f e e c c c . . . . .
                    b 1 1 d e 4 4 e e c . . . . . .
                    . f f e 4 4 4 4 e . . . . . . .
                    . . f f d d 4 4 f f d d . . . .
                    . . f f d d e e f f d d . . . .
                    . . . f f f f . . . . . . . . .
                    . . e e e f f f . . . . . . . .
                    . . e e e e f f f . . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . 4 4 4 4 4 e . . . .
                    . . . . . 4 4 4 4 d 4 4 e . . .
                    . . . . e 4 4 4 4 4 4 4 e . . .
                    . . . . e 4 4 4 4 4 4 4 e . . .
                    . . . . e 4 4 4 4 4 e f f c c .
                    . . . . e e 4 4 e f f f f b c .
                    . . . e e e f e 4 b f f f d c .
                    . . e e 4 4 d f 4 1 1 1 1 b c .
                    . . e e 4 4 d f e e c c c . . .
                    . . b 1 1 d e 4 e e c . . . . .
                    . . f f f f d d f . . . . . . .
                    f f f f f f d d . . . . . . . .
                    f f f . f f f e . . . . . . . .
                    f f . . . . e e e . . . . . . .
                    . . . . . . e e e e . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . 4 4 4 4 4 e . . . .
                    . . . . . 4 4 4 4 d 4 4 e . . .
                    . . . . e 4 4 4 4 4 4 4 e . . .
                    . . . . e 4 4 4 4 4 4 4 e . . .
                    . . . . e 4 4 4 4 4 e f f c c .
                    . . . . e e 4 4 e f f f f b c .
                    . . e e e f e 4 4 b f f f d c .
                    . e e 4 4 d f e 4 1 1 1 1 b c .
                    . e e 4 4 d f e e e c c c . . .
                    . b 1 1 e e 4 4 e e c . . . . .
                    . . f d d 4 4 4 f f f d d . . .
                    e e f d d e e e . f f d d . . .
                    e e e f f f f f . . . . . . . .
                    e e . . . . f f f . . . . . . .
                    . . . . . . f f f f . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . 4 4 4 4 4 e . . .
                    . . . . . . 4 4 4 4 d 4 4 e . .
                    . . . . . e 4 4 4 4 4 4 4 e . .
                    . . . . . e 4 4 4 4 4 4 4 e . .
                    . . . . . e 4 4 4 4 4 e f f c c
                    . . . . . e e 4 4 e f f f f b c
                    . . . e e e f e 4 4 b f f f d c
                    . . e e 4 4 d f e 4 1 1 1 1 b c
                    . . e e 4 4 d f e e e c c c . .
                    . . b 1 1 d e 4 4 e e c . . . .
                    . . . f f f d d 4 4 f d d . . .
                    . . . . f f d d e e f d d . . .
                    . . . . . f f f f f . . . . . .
                    . . . . e e e f f . . . . . . .
                    . . . . e e e e f f . . . . . .
                `
            ],
            [
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . f f f f f . . . . . .
                    . . . . f f 4 4 4 f f . . . . .
                    . . . . f 4 f 4 f 4 f . . . . .
                    . . . . f f 4 4 4 f f . . . . .
                    . . . . . f f 4 f f . . . . . .
                    . . . . . 1 1 1 1 1 . . . . . .
                    . . . 1 1 1 4 4 4 1 1 1 . . . .
                    . . 1 1 4 4 4 4 4 4 4 1 1 . . .
                    . . 1 4 4 1 1 1 1 1 4 4 1 . . .
                    . . 1 4 1 1 1 1 1 1 1 4 1 . . .
                    . . 1 4 1 1 1 1 1 1 1 4 1 . . .
                    . . . 1 f f f f f f f 1 . . . .
                    . . . . f 1 . . . 1 f . . . . .
                    . . . . f 1 . . . 1 f . . . . .
                    . . . f f 1 . . . 1 f f . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . f f f f f . . . . . .
                    . . . . f f 4 4 4 f f . . . . .
                    . . . . f 4 f 4 f 4 f . . . . .
                    . . 1 . f f 4 4 4 f f . 1 . . .
                    . 1 4 1 . f f 4 f f . 1 4 1 . .
                    . 1 4 1 . 1 1 1 1 1 . 1 4 1 . .
                    . 1 4 4 1 1 4 4 4 1 1 4 4 1 . .
                    . . 1 4 4 4 4 4 4 4 4 4 1 . . .
                    . . . 1 4 1 1 1 1 1 4 1 . . . .
                    . . . . 1 1 1 1 1 1 1 . . . . .
                    . . . . 1 1 1 1 1 1 1 . . . . .
                    . . . . f f f f f f f . . . . .
                    . . . . f 1 . . . 1 f . . . . .
                    . . . . f 1 . . . 1 f . . . . .
                    . . . f f 1 . . . 1 f f . . . .
                `
            ]
        ];
        this.animations = [];

        animationFrames.forEach(anim => {
            anim.forEach(frame => {
                frame.replace(4, this.mainColor)
            });
        });

        this.animations[PlayerAnimation.Left] = animation.createAnimation(PlayerAnimation.Left, 150);
        this.animations[PlayerAnimation.Right] = animation.createAnimation(PlayerAnimation.Right, 150);
        this.animations[PlayerAnimation.Celebrate] = animation.createAnimation(PlayerAnimation.Celebrate, 200);

        animationFrames.forEach((frames, index) =>
            frames.forEach(im => this.animations[index].addAnimationFrame(im))
        );
    }
}

namespace teams {
    export function create(
        name: string,
        abbrev: string,
        mainColor: number,
        secondaryColor: number,
        controlled: boolean
    ) {
        return new Team(
            name,
            abbrev,
            mainColor,
            secondaryColor,
            controlled
        );
    }
}