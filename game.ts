class Game {
    public clock: GameClock;

    protected possessesBall: Team;
    public lineOfScrimmage: number;
    protected indicator: scene.Renderable;
    protected scoreboard: scene.Renderable;

    constructor(
        protected teamA: Team,
        protected teamB: Team,
        quarterLength: number = 20
    ) {
        this.lineOfScrimmage = 60;
        this.resetPlayers();
        this.possessesBall = this.teamA;
        this.clock = new GameClock(quarterLength);

        this.indicator = ui.player.createIndicator();
        this.scoreboard = ui.scoreboard.create(teamA, teamB);

        field.initialize();
        player.initializeEvents();
        ball.initializeEvents();
    }

    resetPlayers() {
        this.teamA.resetPlayerPositions(this.lineOfScrimmage);
        this.teamB.resetPlayerPositions(this.lineOfScrimmage);
    }

    get offense() {
        return this.possessesBall;
    }

    get defense() {
        return this.teamA === this.possessesBall ? this.teamB : this.teamA;
    }

    turnOver() {
        this.possessesBall = this.defense;
    }
}