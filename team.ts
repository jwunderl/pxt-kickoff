// a 3 person team lined up on the field
class Team {
    public score: number;
    public players: Sprite[];
    protected controlledPlayer: number;
    public animations: animation.Animation[];

    constructor(
        protected teamData: TeamData,
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

    get name() {
        return this.teamData.name;
    }

    get abbrev() {
        return this.teamData.abbreviation;
    }

    get mainColor() {
        return 0xB + (this.controlled ? 2 : 0); 
    }

    get secondaryColor() {
        return 0xC + (this.controlled ? 2 : 0);
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
                    . . . . . . e 7 7 7 7 7 . . . .
                    . . . . . e 7 7 d 7 7 7 7 . . .
                    . . . . . e 7 7 7 7 7 7 7 e . .
                    . . . . . e 7 7 7 7 7 7 7 e . .
                    . . . c c f f e 7 7 7 7 7 e . .
                    . . . c b f f f f e 7 7 e e . .
                    . . . c d f f f b 7 e f e e e .
                    . . . c b 1 1 1 1 7 f d 7 7 e e
                    . . . . . c c c e e f d 7 7 e e
                    . . . . . . c e e 7 7 e d 1 1 b
                    . . . . . . . e 7 7 7 7 e f f .
                    . . . . d d f f 7 7 d d f f . .
                    . . . . d d f f e e d d f f . .
                    . . . . . . . . . f f f f . . .
                    . . . . . . . . f f f e e e . .
                    . . . . . . . f f f e e e e . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . e 7 7 7 7 7 . . . . . .
                    . . . e 7 7 d 7 7 7 7 . . . . .
                    . . . e 7 7 7 7 7 7 7 e . . . .
                    . . . e 7 7 7 7 7 7 7 e . . . .
                    . c c f f e 7 7 7 7 7 e . . . .
                    . c b f f f f e 7 7 e e . . . .
                    . c d f f f b 7 e f e e e . . .
                    . c b 1 1 1 1 7 f d 7 7 e e . .
                    . . . c c c e e f d 7 7 e e . .
                    . . . . . c e e 7 e d 1 1 b . .
                    . . . . . . . f d d f f f f . .
                    . . . . . . . . d d f f f f f f
                    . . . . . . . . e f f f . f f f
                    . . . . . . . e e e . . . . f f
                    . . . . . . e e e e . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . e 7 7 7 7 7 . . . . . .
                    . . . e 7 7 d 7 7 7 7 . . . . .
                    . . . e 7 7 7 7 7 7 7 e . . . .
                    . . . e 7 7 7 7 7 7 7 e . . . .
                    . c c f f e 7 7 7 7 7 e . . . .
                    . c b f f f f e 7 7 e e . . . .
                    . c d f f f b 7 7 e f e e e . .
                    . c b 1 1 1 1 7 e f d 7 7 e e .
                    . . . c c c e e e f d 7 7 e e .
                    . . . . . c e e 7 7 e e 1 1 b .
                    . . . d d f f f 7 7 7 d d f . .
                    . . . d d f f . e e e d d f e e
                    . . . . . . . . f f f f f e e e
                    . . . . . . . f f f . . . . e e
                    . . . . . . f f f f . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . e 7 7 7 7 7 . . . . . . .
                    . . e 7 7 d 7 7 7 7 . . . . . .
                    . . e 7 7 7 7 7 7 7 e . . . . .
                    . . e 7 7 7 7 7 7 7 e . . . . .
                    c c f f e 7 7 7 7 7 e . . . . .
                    c b f f f f e 7 7 e e . . . . .
                    c d f f f b 7 7 e f e e e . . .
                    c b 1 1 1 1 7 e f d 7 7 e e . .
                    . . c c c e e e f d 7 7 e e . .
                    . . . . c e e 7 7 e d 1 1 b . .
                    . . . d d f 7 7 d d f f f . . .
                    . . . d d f e e d d f f . . . .
                    . . . . . . f f f f f . . . . .
                    . . . . . . . f f e e e . . . .
                    . . . . . . f f e e e e . . . .
                `
            ],
            [
                img`
                    . . . . . . e 7 7 7 7 7 . . . .
                    . . . . . e 7 7 d 7 7 7 7 . . .
                    . . . . . e 7 7 7 7 7 7 7 e . .
                    . . . . . e 7 7 7 7 7 7 7 e . .
                    . . . c c f f e 7 7 7 7 7 e . .
                    . . . c b f f f f e 7 7 e e . .
                    . . . c d f f f b 7 e f e e e .
                    . . . c b f f f e 7 f d 7 7 e e
                    . . . . c 4 4 b c e f d 7 7 e e
                    . . . . c 4 1 1 4 c e e d 1 1 b
                    . . . . c 4 4 4 4 e e e e f f .
                    . . . . c b 4 4 4 e d d f f . .
                    . . . . d c c c c e d d f f . .
                    . . . . . . . . . f f f f . . .
                    . . . . . . . . e e e f f f . .
                    . . . . . . . e e e f f f f . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . e 7 7 7 7 7 . . . . . .
                    . . . e 7 7 d 7 7 7 7 . . . . .
                    . . . e 7 7 7 7 7 7 7 e . . . .
                    . . . e 7 7 7 7 7 7 7 e . . . .
                    . c c f f e 7 7 7 7 7 e . . . .
                    . c b f f f f e 7 7 e e . . . .
                    . c d f f f f e e f e e e . . .
                    . c b c 4 4 b c f d 7 7 e e . .
                    . . . c 4 1 1 4 c b 7 7 e e . .
                    . . . c 4 4 4 4 c e b 1 1 b . .
                    . . . c b 4 4 4 d d f f f f . .
                    . . . . c c c c d d f f f f f f
                    . . . . . c c c f f f f . f f f
                    . . . . . . . e e e . . . . f f
                    . . . . . . e e e e . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . e 7 7 7 7 7 . . . . . .
                    . . . e 7 7 d 7 7 7 7 . . . . .
                    . . . e 7 7 7 7 7 7 7 e . . . .
                    . . . e 7 7 7 7 7 7 7 e . . . .
                    . c c f f e 7 7 7 7 7 e . . . .
                    . c b f f f f e 7 7 e e . . . .
                    . c d f f f f f e e f e e e . .
                    . c b 1 c 4 4 b c f d 7 7 e e .
                    . . . c c 4 1 1 4 c b 7 7 e e .
                    . . . . c 4 4 4 4 c e b 1 1 b .
                    . . . d c b 4 4 4 d d f f f . .
                    . . . d d c c c c d d f f f e e
                    . . . . . . c c c f f f f e e e
                    . . . . . . . f f f . . . . e e
                    . . . . . . f f f f . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . e 7 7 7 7 7 . . . . . . .
                    . . e 7 7 d 7 7 7 7 . . . . . .
                    . . e 7 7 7 7 7 7 7 e . . . . .
                    . . e 7 7 7 7 7 7 7 e . . . . .
                    c c f f e 7 7 7 7 7 e . . . . .
                    c b f f f f e 7 7 e e . . . . .
                    c d f f f e 7 7 e f e e e . . .
                    c c 4 4 b c 7 e f d 7 7 e e . .
                    . c 4 1 1 4 c e f d 7 7 e e . .
                    . c 4 4 4 4 c e e e d 1 1 b . .
                    . c b 4 4 4 d d f f f f f . . .
                    . . c c c c d d f f f f . . . .
                    . . . c c c f f f f f . . . . .
                    . . . . . . . f f e e e . . . .
                    . . . . . . f f e e e e . . . .
                `
            ],
            [
                img`
                    . . . . 7 7 7 7 7 e . . . . . .
                    . . . 7 7 7 7 d 7 7 e . . . . .
                    . . e 7 7 7 7 7 7 7 e . . . . .
                    . . e 7 7 7 7 7 7 7 e . . . . .
                    . . e 7 7 7 7 7 e f f c c . . .
                    . . e e 7 7 e f f f f b c . . .
                    . e e e f e 7 b f f f d c . . .
                    e e 7 7 d f 7 1 1 1 1 b c . . .
                    e e 7 7 d f e e c c c . . . . .
                    b 1 1 d e 7 7 e e c . . . . . .
                    . f f e 7 7 7 7 e . . . . . . .
                    . . f f d d 7 7 f f d d . . . .
                    . . f f d d e e f f d d . . . .
                    . . . f f f f . . . . . . . . .
                    . . e e e f f f . . . . . . . .
                    . . e e e e f f f . . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . 7 7 7 7 7 e . . . .
                    . . . . . 7 7 7 7 d 7 7 e . . .
                    . . . . e 7 7 7 7 7 7 7 e . . .
                    . . . . e 7 7 7 7 7 7 7 e . . .
                    . . . . e 7 7 7 7 7 e f f c c .
                    . . . . e e 7 7 e f f f f b c .
                    . . . e e e f e 7 b f f f d c .
                    . . e e 7 7 d f 7 1 1 1 1 b c .
                    . . e e 7 7 d f e e c c c . . .
                    . . b 1 1 d e 7 e e c . . . . .
                    . . f f f f d d f . . . . . . .
                    f f f f f f d d . . . . . . . .
                    f f f . f f f e . . . . . . . .
                    f f . . . . e e e . . . . . . .
                    . . . . . . e e e e . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . 7 7 7 7 7 e . . . .
                    . . . . . 7 7 7 7 d 7 7 e . . .
                    . . . . e 7 7 7 7 7 7 7 e . . .
                    . . . . e 7 7 7 7 7 7 7 e . . .
                    . . . . e 7 7 7 7 7 e f f c c .
                    . . . . e e 7 7 e f f f f b c .
                    . . e e e f e 7 7 b f f f d c .
                    . e e 7 7 d f e 7 1 1 1 1 b c .
                    . e e 7 7 d f e e e c c c . . .
                    . b 1 1 e e 7 7 e e c . . . . .
                    . . f d d 7 7 7 f f f d d . . .
                    e e f d d e e e . f f d d . . .
                    e e e f f f f f . . . . . . . .
                    e e . . . . f f f . . . . . . .
                    . . . . . . f f f f . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . 7 7 7 7 7 e . . .
                    . . . . . . 7 7 7 7 d 7 7 e . .
                    . . . . . e 7 7 7 7 7 7 7 e . .
                    . . . . . e 7 7 7 7 7 7 7 e . .
                    . . . . . e 7 7 7 7 7 e f f c c
                    . . . . . e e 7 7 e f f f f b c
                    . . . e e e f e 7 7 b f f f d c
                    . . e e 7 7 d f e 7 1 1 1 1 b c
                    . . e e 7 7 d f e e e c c c . .
                    . . b 1 1 d e 7 7 e e c . . . .
                    . . . f f f d d 7 7 f d d . . .
                    . . . . f f d d e e f d d . . .
                    . . . . . f f f f f . . . . . .
                    . . . . e e e f f . . . . . . .
                    . . . . e e e e f f . . . . . .
                `
            ],
            [
                img`
                    . . . . 7 7 7 7 7 e . . . . . .
                    . . . 7 7 7 7 d 7 7 e . . . . .
                    . . e 7 7 7 7 7 7 7 e . . . . .
                    . . e 7 7 7 7 7 7 7 e . . . . .
                    . . e 7 7 7 7 7 e f f c c . . .
                    . . e e 7 7 e f f f f b c . . .
                    . e e e f e 7 b f f f d c . . .
                    e e 7 7 d f 7 e f f f b c . . .
                    e e 7 7 d f e c b 4 4 c . . . .
                    b 1 1 d e e c 4 1 1 4 c . . . .
                    . f f e e e e 4 4 4 4 c . . . .
                    . . f f d d e 4 4 4 b c . . . .
                    . . f f d d e c c c c d . . . .
                    . . . f f f f . . . . . . . . .
                    . . f f f e e e . . . . . . . .
                    . . f f f f e e e . . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . 7 7 7 7 7 e . . . .
                    . . . . . 7 7 7 7 d 7 7 e . . .
                    . . . . e 7 7 7 7 7 7 7 e . . .
                    . . . . e 7 7 7 7 7 7 7 e . . .
                    . . . . e 7 7 7 7 7 e f f c c .
                    . . . . e e 7 7 e f f f f b c .
                    . . . e e e f e e f f f f d c .
                    . . e e 7 7 d f c b 4 4 c b c .
                    . . e e 7 7 b c 4 1 1 4 c . . .
                    . . b 1 1 b e c 4 4 4 4 c . . .
                    . . f f f f d d 4 4 4 b c . . .
                    f f f f f f d d c c c c . . . .
                    f f f . f f f f c c c . . . . .
                    f f . . . . e e e . . . . . . .
                    . . . . . . e e e e . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . 7 7 7 7 7 e . . . .
                    . . . . . 7 7 7 7 d 7 7 e . . .
                    . . . . e 7 7 7 7 7 7 7 e . . .
                    . . . . e 7 7 7 7 7 7 7 e . . .
                    . . . . e 7 7 7 7 7 e f f c c .
                    . . . . e e 7 7 e f f f f b c .
                    . . e e e f e e f f f f f d c .
                    . e e 7 7 d f c b 4 4 c 1 b c .
                    . e e 7 7 b c 4 1 1 4 c c . . .
                    . b 1 1 b e c 4 4 4 4 c . . . .
                    . . f f f d d 4 4 4 b c d . . .
                    e e f f f d d c c c c d d . . .
                    e e e f f f f c c c . . . . . .
                    e e . . . . f f f . . . . . . .
                    . . . . . . f f f f . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . 7 7 7 7 7 e . . .
                    . . . . . . 7 7 7 7 d 7 7 e . .
                    . . . . . e 7 7 7 7 7 7 7 e . .
                    . . . . . e 7 7 7 7 7 7 7 e . .
                    . . . . . e 7 7 7 7 7 e f f c c
                    . . . . . e e 7 7 e f f f f b c
                    . . . e e e f e 7 7 e f f f d c
                    . . e e 7 7 d f e 7 c b 4 4 c c
                    . . e e 7 7 d f e c 4 1 1 4 c .
                    . . b 1 1 d e e e c 4 4 4 4 c .
                    . . . f f f f f d d 4 4 4 b c .
                    . . . . f f f f d d c c c c . .
                    . . . . . f f f f f c c c . . .
                    . . . . e e e f f . . . . . . .
                    . . . . e e e e f f . . . . . .
                `
            ],
            [
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . f f f f f . . . . . .
                    . . . . f f 7 7 7 f f . . . . .
                    . . . . f 7 f 7 f 7 f . . . . .
                    . . . . f f 7 7 7 f f . . . . .
                    . . . . . f f 7 f f . . . . . .
                    . . . . . 1 1 1 1 1 . . . . . .
                    . . . 1 1 1 7 7 7 1 1 1 . . . .
                    . . 1 1 7 7 7 7 7 7 7 1 1 . . .
                    . . 1 7 7 1 1 1 1 1 7 7 1 . . .
                    . . 1 7 1 1 1 1 1 1 1 7 1 . . .
                    . . 1 7 1 1 1 1 1 1 1 7 1 . . .
                    . . . 1 f f f f f f f 1 . . . .
                    . . . . f 1 . . . 1 f . . . . .
                    . . . . f 1 . . . 1 f . . . . .
                    . . . f f 1 . . . 1 f f . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . f f f f f . . . . . .
                    . . . . f f 7 7 7 f f . . . . .
                    . . . . f 7 f 7 f 7 f . . . . .
                    . . 1 . f f 7 7 7 f f . 1 . . .
                    . 1 7 1 . f f 7 f f . 1 7 1 . .
                    . 1 7 1 . 1 1 1 1 1 . 1 7 1 . .
                    . 1 7 7 1 1 7 7 7 1 1 7 7 1 . .
                    . . 1 7 7 7 7 7 7 7 7 7 1 . . .
                    . . . 1 7 1 1 1 1 1 7 1 . . . .
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
                frame.replace(7, this.mainColor)
            });
        });

        this.animations[PlayerAnimation.Left] = animation.createAnimation(PlayerAnimation.Left, 150);
        this.animations[PlayerAnimation.LeftWithBall] = animation.createAnimation(PlayerAnimation.LeftWithBall, 150);
        this.animations[PlayerAnimation.Right] = animation.createAnimation(PlayerAnimation.Right, 150);
        this.animations[PlayerAnimation.RightWithBall] = animation.createAnimation(PlayerAnimation.RightWithBall, 150);
        this.animations[PlayerAnimation.Celebrate] = animation.createAnimation(PlayerAnimation.Celebrate, 200);

        animationFrames.forEach((frames, index) =>
            frames.forEach(im => this.animations[index].addAnimationFrame(im))
        );
    }
}

namespace teams {
    export function create(
        teamData: TeamData,
        controlled: boolean
    ) {
        return new Team(
            teamData,
            controlled
        );
    }
}