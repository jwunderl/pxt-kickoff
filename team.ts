class Team {
    public score: number;
    public players: Sprite[];
    protected controlledPlayer: number;

    constructor(
        public name: string,
        public abbrev: string,
        public mainColor: number,
        public secondaryColor: number,
        controlled?: boolean
    ) {
        this.score = 0;

        this.players = [
            player.create(),
            player.create(),
            player.create()
        ];
        this.players[1].y -= 32
        this.players[2].y += 32

        if (controlled) {
            this.controlledPlayer = -1;
            controller.moveSprite(this.players[this.controlledPlayer])
        }
    }


    get activePlayer() {
        return this.players[this.controlledPlayer];
    }

    controlNextPlayer() {
        controller.moveSprite(this.activePlayer, 0, 0);
        this.controlledPlayer = (this.controlledPlayer + 1) % players.length;
        controller.moveSprite(this.activePlayer)
    }
}

namespace team {
    export function create(
        name: string,
        abbrev: string,
        mainColor: number,
        secondaryColor: number,
        controlled: boolean
    ) {
        const output = new Team(
            name,
            abbrev,
            mainColor,
            secondaryColor,
            controlled
        );
        return output;
    }
}