class Game {
    public clock: GameClock;

    protected teamWithPossession: Team;
    protected playerWithPossession: Sprite;
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
        this.teamWithPossession = this.teamA;
        this.clock = new GameClock(quarterLength);

        this.indicator = ui.player.createIndicator();
        this.scoreboard = ui.scoreboard.create(teamA, teamB);

        field.initialize();
        player.initializeEvents();
        ball.initializeEvents();
    }

    get playerWhoHasBall() {
        return this.playerWithPossession;
    }

    set playerWhoHasBall(s: Sprite) {
        this.playerWithPossession = s;
    }

    resetPlayers() {
        this.teamA.resetPlayerPositions(this.lineOfScrimmage);
        this.teamB.resetPlayerPositions(this.lineOfScrimmage);
    }

    get offense() {
        return this.teamWithPossession;
    }

    get defense() {
        return this.teamA === this.teamWithPossession ? this.teamB : this.teamA;
    }

    turnOver() {
        this.teamWithPossession = this.defense;
    }
}