// a 3 person team lined up on the field
class Team {
    public score: number;
    public players: Sprite[];
    protected controlledPlayer: number;
    public animations: animation.Animation[];

    constructor(
        public readonly teamData: TeamData,
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

        // set color to team colors on creation
        const teamPalette = new color.Palette(2);
        teamPalette.setColor(0, teamData.colorOne);
        teamPalette.setColor(1, teamData.colorTwo);
        color.setPalette(teamPalette, this.primaryColor, 2);

    }

    get name() {
        return this.teamData.name;
    }

    get abbrev() {
        return this.teamData.abbreviation;
    }

    get primaryColor() {
        return 0xB + (this.controlled ? 0 : 2); 
    }

    get secondaryColor() {
        return 0xC + (this.controlled ? 0 : 2);
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
                    . . . . . . c b b b b b . . . .
                    . . . . . c b b 8 b b b b . . .
                    . . . . . c b b b b b b b c . .
                    . . . . . c b b b b b b b c . .
                    . . . a a f f c b b b b b c . .
                    . . . a 9 f f f f c b b c c . .
                    . . . a 8 f f f 9 b c f c c c .
                    . . . a 9 1 1 1 1 b f 8 b b c c
                    . . . . . a a a c c f 8 b b c c
                    . . . . . . a c c b b c 8 1 1 9
                    . . . . . . . c b b b b c f f .
                    . . . . 8 8 f f b b 8 8 f f . .
                    . . . . 8 8 f f c c 8 8 f f . .
                    . . . . . . . . . f f f f . . .
                    . . . . . . . . f f f c c c . .
                    . . . . . . . f f f c c c c . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . c b b b b b . . . . . .
                    . . . c b b 8 b b b b . . . . .
                    . . . c b b b b b b b c . . . .
                    . . . c b b b b b b b c . . . .
                    . a a f f c b b b b b c . . . .
                    . a 9 f f f f c b b c c . . . .
                    . a 8 f f f 9 b c f c c c . . .
                    . a 9 1 1 1 1 b f 8 b b c c . .
                    . . . a a a c c f 8 b b c c . .
                    . . . . . a c c b c 8 1 1 9 . .t
                    . . . . . . . f 8 8 f f f f . .
                    . . . . . . . . 8 8 f f f f f f
                    . . . . . . . . c f f f . f f f
                    . . . . . . . c c c . . . . f f
                    . . . . . . c c c c . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . c b b b b b . . . . . .
                    . . . c b b 8 b b b b . . . . .
                    . . . c b b b b b b b c . . . .
                    . . . c b b b b b b b c . . . .
                    . a a f f c b b b b b c . . . .
                    . a 9 f f f f c b b c c . . . .
                    . a 8 f f f 9 b b c f c c c . .
                    . a 9 1 1 1 1 b c f 8 b b c c .
                    . . . a a a c c c f 8 b b c c .
                    . . . . . a c c b b c c 1 1 9 .
                    . . . 8 8 f f f b b b 8 8 f . .
                    . . . 8 8 f f . c c c 8 8 f c c
                    . . . . . . . . f f f f f c c c
                    . . . . . . . f f f . . . . c c
                    . . . . . . f f f f . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . c b b b b b . . . . . . .
                    . . c b b 8 b b b b . . . . . .
                    . . c b b b b b b b c . . . . .
                    . . c b b b b b b b c . . . . .
                    a a f f c b b b b b c . . . . .
                    a 9 f f f f c b b c c . . . . .
                    a 8 f f f 9 b b c f c c c . . .
                    a 9 1 1 1 1 b c f 8 b b c c . .
                    . . a a a c c c f 8 b b c c . .
                    . . . . a c c b b c 8 1 1 9 . .
                    . . . 8 8 f b b 8 8 f f f . . .
                    . . . 8 8 f c c 8 8 f f . . . .
                    . . . . . . f f f f f . . . . .
                    . . . . . . . f f c c c . . . .
                    . . . . . . f f c c c c . . . .
                `
            ],
            [
                img`
                    . . . . . . c b b b b b . . . .
                    . . . . . c b b 8 b b b b . . .
                    . . . . . c b b b b b b b c . .
                    . . . . . c b b b b b b b c . .
                    . . . a a f f c b b b b b c . .
                    . . . a 9 f f f f c b b c c . .
                    . . . a 8 f f f 9 b c f c c c .
                    . . . a 9 f f f c b f 8 b b c c
                    . . . . a 7 7 9 a c f 8 b b c c
                    . . . . a 7 1 1 7 a c c 8 1 1 9
                    . . . . a 7 7 7 7 c c c c f f .
                    . . . . a 9 7 7 7 c 8 8 f f . .
                    . . . . 8 a a a a c 8 8 f f . .
                    . . . . . . . . . f f f f . . .
                    . . . . . . . . c c c f f f . .
                    . . . . . . . c c c f f f f . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . c b b b b b . . . . . .
                    . . . c b b 8 b b b b . . . . .
                    . . . c b b b b b b b c . . . .
                    . . . c b b b b b b b c . . . .
                    . a a f f c b b b b b c . . . .
                    . a 9 f f f f c b b c c . . . .
                    . a 8 f f f f c c f c c c . . .
                    . a 9 a 7 7 9 a f 8 b b c c . .
                    . . . a 7 1 1 7 a 9 b b c c . .
                    . . . a 7 7 7 7 a c 9 1 1 9 . .
                    . . . a 9 7 7 7 8 8 f f f f . .
                    . . . . a a a a 8 8 f f f f f f
                    . . . . . a a a f f f f . f f f
                    . . . . . . . c c c . . . . f f
                    . . . . . . c c c c . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . c b b b b b . . . . . .
                    . . . c b b 8 b b b b . . . . .
                    . . . c b b b b b b b c . . . .
                    . . . c b b b b b b b c . . . .
                    . a a f f c b b b b b c . . . .
                    . a 9 f f f f c b b c c . . . .
                    . a 8 f f f f f c c f c c c . .
                    . a 9 1 a 7 7 9 a f 8 b b c c .
                    . . . a a 7 1 1 7 a 9 b b c c .
                    . . . . a 7 7 7 7 a c 9 1 1 9 .
                    . . . 8 a 9 7 7 7 8 8 f f f . .
                    . . . 8 8 a a a a 8 8 f f f c c
                    . . . . . . a a a f f f f c c c
                    . . . . . . . f f f . . . . c c
                    . . . . . . f f f f . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . c b b b b b . . . . . . .
                    . . c b b 8 b b b b . . . . . .
                    . . c b b b b b b b c . . . . .
                    . . c b b b b b b b c . . . . .
                    a a f f c b b b b b c . . . . .
                    a 9 f f f f c b b c c . . . . .
                    a 8 f f f c b b c f c c c . . .
                    a a 7 7 9 a b c f 8 b b c c . .
                    . a 7 1 1 7 a c f 8 b b c c . .
                    . a 7 7 7 7 a c c c 8 1 1 9 . .
                    . a 9 7 7 7 8 8 f f f f f . . .
                    . . a a a a 8 8 f f f f . . . .
                    . . . a a a f f f f f . . . . .
                    . . . . . . . f f c c c . . . .
                    . . . . . . f f c c c c . . . .
                `
            ],
            [
                img`
                    . . . . b b b b b c . . . . . .
                    . . . b b b b 8 b b c . . . . .
                    . . c b b b b b b b c . . . . .
                    . . c b b b b b b b c . . . . .
                    . . c b b b b b c f f a a . . .
                    . . c c b b c f f f f 9 a . . .
                    . c c c f c b 9 f f f 8 a . . .
                    c c b b 8 f b 1 1 1 1 9 a . . .
                    c c b b 8 f c c a a a . . . . .
                    9 1 1 8 c b b c c a . . . . . .
                    . f f c b b b b c . . . . . . .
                    . . f f 8 8 b b f f 8 8 . . . .
                    . . f f 8 8 c c f f 8 8 . . . .
                    . . . f f f f . . . . . . . . .
                    . . c c c f f f . . . . . . . .
                    . . c c c c f f f . . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . b b b b b c . . . .
                    . . . . . b b b b 8 b b c . . .
                    . . . . c b b b b b b b c . . .
                    . . . . c b b b b b b b c . . .
                    . . . . c b b b b b c f f a a .
                    . . . . c c b b c f f f f 9 a .
                    . . . c c c f c b 9 f f f 8 a .
                    . . c c b b 8 f b 1 1 1 1 9 a .
                    . . c c b b 8 f c c a a a . . .
                    . . 9 1 1 8 c b c c a . . . . .
                    . . f f f f 8 8 f . . . . . . .
                    f f f f f f 8 8 . . . . . . . .
                    f f f . f f f c . . . . . . . .
                    f f . . . . c c c . . . . . . .
                    . . . . . . c c c c . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . b b b b b c . . . .
                    . . . . . b b b b 8 b b c . . .
                    . . . . c b b b b b b b c . . .
                    . . . . c b b b b b b b c . . .
                    . . . . c b b b b b c f f a a .
                    . . . . c c b b c f f f f 9 a .
                    . . c c c f c b b 9 f f f 8 a .
                    . c c b b 8 f c b 1 1 1 1 9 a .
                    . c c b b 8 f c c c a a a . . .
                    . 9 1 1 c c b b c c a . . . . .
                    . . f 8 8 b b b f f f 8 8 . . .
                    c c f 8 8 c c c . f f 8 8 . . .
                    c c c f f f f f . . . . . . . .
                    c c . . . . f f f . . . . . . .
                    . . . . . . f f f f . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . b b b b b c . . .
                    . . . . . . b b b b 8 b b c . .
                    . . . . . c b b b b b b b c . .
                    . . . . . c b b b b b b b c . .
                    . . . . . c b b b b b c f f a a
                    . . . . . c c b b c f f f f 9 a
                    . . . c c c f c b b 9 f f f 8 a
                    . . c c b b 8 f c b 1 1 1 1 9 a
                    . . c c b b 8 f c c c a a a . .
                    . . 9 1 1 8 c b b c c a . . . .
                    . . . f f f 8 8 b b f 8 8 . . .
                    . . . . f f 8 8 c c f 8 8 . . .
                    . . . . . f f f f f . . . . . .
                    . . . . c c c f f . . . . . . .
                    . . . . c c c c f f . . . . . .
                `
            ],
            [
                img`
                    . . . . b b b b b c . . . . . .
                    . . . b b b b 8 b b c . . . . .
                    . . c b b b b b b b c . . . . .
                    . . c b b b b b b b c . . . . .
                    . . c b b b b b c f f a a . . .
                    . . c c b b c f f f f 9 a . . .
                    . c c c f c b 9 f f f 8 a . . .
                    c c b b 8 f b c f f f 9 a . . .
                    c c b b 8 f c a 9 7 7 a . . . .
                    9 1 1 8 c c a 7 1 1 7 a . . . .
                    . f f c c c c 7 7 7 7 a . . . .
                    . . f f 8 8 c 7 7 7 9 a . . . .
                    . . f f 8 8 c a a a a 8 . . . .
                    . . . f f f f . . . . . . . . .
                    . . f f f c c c . . . . . . . .
                    . . f f f f c c c . . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . b b b b b c . . . .
                    . . . . . b b b b 8 b b c . . .
                    . . . . c b b b b b b b c . . .
                    . . . . c b b b b b b b c . . .
                    . . . . c b b b b b c f f a a .
                    . . . . c c b b c f f f f 9 a .
                    . . . c c c f c c f f f f 8 a .
                    . . c c b b 8 f a 9 7 7 a 9 a .
                    . . c c b b 9 a 7 1 1 7 a . . .
                    . . 9 1 1 9 c a 7 7 7 7 a . . .
                    . . f f f f 8 8 7 7 7 9 a . . .
                    f f f f f f 8 8 a a a a . . . .
                    f f f . f f f f a a a . . . . .
                    f f . . . . c c c . . . . . . .
                    . . . . . . c c c c . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . b b b b b c . . . .
                    . . . . . b b b b 8 b b c . . .
                    . . . . c b b b b b b b c . . .
                    . . . . c b b b b b b b c . . .
                    . . . . c b b b b b c f f a a .
                    . . . . c c b b c f f f f 9 a .
                    . . c c c f c c f f f f f 8 a .
                    . c c b b 8 f a 9 7 7 a 1 9 a .
                    . c c b b 9 a 7 1 1 7 a a . . .
                    . 9 1 1 9 c a 7 7 7 7 a . . . .
                    . . f f f 8 8 7 7 7 9 a 8 . . .
                    c c f f f 8 8 a a a a 8 8 . . .
                    c c c f f f f a a a . . . . . .
                    c c . . . . f f f . . . . . . .
                    . . . . . . f f f f . . . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . b b b b b c . . .
                    . . . . . . b b b b 8 b b c . .
                    . . . . . c b b b b b b b c . .
                    . . . . . c b b b b b b b c . .
                    . . . . . c b b b b b c f f a a
                    . . . . . c c b b c f f f f 9 a
                    . . . c c c f c b b c f f f 8 a
                    . . c c b b 8 f c b a 9 7 7 a a
                    . . c c b b 8 f c a 7 1 1 7 a .
                    . . 9 1 1 8 c c c a 7 7 7 7 a .
                    . . . f f f f f 8 8 7 7 7 9 a .
                    . . . . f f f f 8 8 a a a a . .
                    . . . . . f f f f f a a a . . .
                    . . . . c c c f f . . . . . . .
                    . . . . c c c c f f . . . . . .
                `
            ],
            [
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . f f f f f . . . . . .
                    . . . . f f b b b f f . . . . .
                    . . . . f b f b f b f . . . . .
                    . . . . f f b b b f f . . . . .
                    . . . . . f f b f f . . . . . .
                    . . . . . 1 1 1 1 1 . . . . . .
                    . . . 1 1 1 b b b 1 1 1 . . . .
                    . . 1 1 b b b b b b b 1 1 . . .
                    . . 1 b b 1 1 1 1 1 b b 1 . . .
                    . . 1 b 1 1 1 1 1 1 1 b 1 . . .
                    . . 1 b 1 1 1 1 1 1 1 b 1 . . .
                    . . . 1 f f f f f f f 1 . . . .
                    . . . . f 1 . . . 1 f . . . . .
                    . . . . f 1 . . . 1 f . . . . .
                    . . . f f 1 . . . 1 f f . . . .
                `,
                img`
                    . . . . . . . . . . . . . . . .
                    . . . . . f f f f f . . . . . .
                    . . . . f f b b b f f . . . . .
                    . . . . f b f b f b f . . . . .
                    . . 1 . f f b b b f f . 1 . . .
                    . 1 b 1 . f f b f f . 1 b 1 . .
                    . 1 b 1 . 1 1 1 1 1 . 1 b 1 . .
                    . 1 b b 1 1 b b b 1 1 b b 1 . .
                    . . 1 b b b b b b b b b 1 . . .
                    . . . 1 b 1 1 1 1 1 b 1 . . . .
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
                frame.replace(0xb, this.primaryColor);
                frame.replace(0xc, this.secondaryColor);
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