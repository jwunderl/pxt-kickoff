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
        controlled?: boolean
    ) {
        this.score = 0;
        const startX = lineOfScrimmage + (controlled ? -20 : 20);
        this.initializeFrames();

        this.players = [];
        for (let i = 0; i < 3; i++) {
            this.players[i] = player.create(this);
        }

        if (controlled) {
            this.controlledPlayer = 0;
            controller.moveSprite(this.players[this.controlledPlayer]);
            controller.B.onEvent(
                ControllerButtonEvent.Pressed,
                () => this.controlNextPlayer()
            );
        }
        this.resetPlayerPositions();
    }

    resetPlayerPositions() {
        const startX = lineOfScrimmage + (this.isPlayerControlled() ? -20 : 20);
        this.players.forEach((p, i) => {
            p.y = (screen.height >> 1) + (i - 1) * 32;
            p.x = startX;
        });
    }

    isPlayerControlled() {
        return this.controlledPlayer !== undefined;
    }

    get activePlayer() {
        return this.players[this.controlledPlayer];
    }

    controlNextPlayer() {
        controller.moveSprite(this.activePlayer, 0, 0);
        this.controlledPlayer = (this.controlledPlayer + 1) % this.players.length;
        controller.moveSprite(this.activePlayer);
    }

    toString() {
        return `${this.abbrev}:${`  ${this.score}`.slice(-3)} `;
    }

    protected initializeFrames() {
        const animationFrames = [
            [img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . f f f f f . . . . . . . . .
                . f f f f f f f . . . . . . . .
                . . 4 f f f f f . . . . . . . .
                . 4 4 f f f f 1 1 1 . . . . . .
                . f f 4 4 4 4 1 1 4 4 . . . . .
                . 4 4 1 1 4 4 4 4 f . . . . . .
                . 4 4 1 1 1 1 4 4 f . . . . . .
                . . f f f f f f f 1 f . . . . .
                . f f 1 1 1 f f f f 1 f f 1 f f
                . f 1 f f f f . . f f f f 1 f f
                . f f . . . . . . f f f . . . f
                . . 1 . . . . . . . . . . . . .
                . f f . . . . . . . . . . . . .
                f f f . . . . . . . . . . . . .
            `, img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . f f f f f . . . . . . . . .
                . f f f f f f f . . . . . . . .
                . . 4 f f f f f . . . . . . . .
                . 4 4 f f f f 1 1 1 . . . . . .
                . f f 4 4 1 1 1 1 4 4 . . . . .
                . 4 4 1 1 4 1 1 f 4 4 . . . . .
                . 4 4 1 1 1 1 4 4 f . . . . . .
                . . . . f f f f f 1 f . . . . .
                . . . f f f f f 1 f . . . . . .
                . . . f f f . 1 f f f . . . . .
                . . . f f . . . . f 1 . . . . .
                . . . . 1 . . . . . f . . . . .
                . . . f f . . . . f f . . . . .
                . . f f f . . . f f f . . . . .
            `],
            [img`
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
            `, img`
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
            `]
        ];
        this.animations = [];

        animationFrames.forEach(anim => {
            anim.forEach(frame => {
                frame.replace(4, this.mainColor)
            });
        });

        this.animations[AnimationDirection.Left] = animation.createAnimation(AnimationDirection.Left, 200);
        this.animations[AnimationDirection.Right] = animation.createAnimation(AnimationDirection.Right, 200);

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