/**
 * A customizable football game for MakeCode Arcade
 * Choose your favorite teams and play!
 */
//% weight=100 color="#003399" icon="\uf091"
namespace football {
    export class Game {
        public clock: GameClock;

        protected teamWithPossession: Team;
        protected playerWithPossession: Sprite;
        public lineOfScrimmage: number;
        protected indicator: scene.Renderable;
        protected scoreboard: scene.Renderable;
        protected lineOfScrimmageIndicator: scene.Renderable;
        protected aiOn: boolean;

        constructor(
            protected teamA: Team,
            protected teamB: Team,
            quarterLength: number = 20
        ) {
            this.lineOfScrimmage = 80;
            this.resetPlayerPositions();
            this.teamWithPossession = this.teamA;
            this.clock = new GameClock(quarterLength);

            this.indicator = ui.player.createIndicator(this);
            this.scoreboard = ui.scoreboard.create(this, teamA, teamB);
            this.lineOfScrimmageIndicator = ui.field.createLineOfScrimmage(this);

            this.aiOn = false;
            this.initializeAI();
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

        resetPlayerPositions() {
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

        playIsActive() {
            return this.aiOn
        }

        stopClock() {
            this.clock.stop();
            this.setAI(false);
            this.offense.stop();
            this.defense.stop();
        }

        touchdown() {
            text.util.showInstruction("TOUCHDOWN!", 1500);
            this.stopClock();
            this.offense.score += 7;
            this.offense.players.forEach(p => animation.setAction(p, PlayerAnimation.Celebrate));

            control.runInParallel(() => {
                effects.confetti.startScreenEffect(1000);
                pause(2500);
                currentGame.resetPlayerPositions();
                pause(500)
                ball.toss();
            });
        }

        initializeAI() {
            game.onUpdate(() => {
                this.offense.players.forEach((p, index) => {
                    // do something to make offense 'avoid' defense.
                    // Should probably also eventually run towards
                    // / follow ball ball when possible / close enough --
                    // maybe when halfway across field?
                    if (p != this.offense.activePlayer && Math.percentChance(3)) {
                        p.vy = -p.vy * Math.randomRange(50, 150) / 100;
                    }
                });
            });
        }

        setAI(on: boolean) {
            this.aiOn = on;
            this.offense.players
                .filter(p => p != this.offense.activePlayer)
                .forEach(p => {
                    // TODO: generalize based off team's target direction.
                    p.vx = 80;
                    p.vy = Math.randomRange(-50, 50);
                });
            this.defense.players
                .filter(p => p != this.defense.activePlayer)
                .forEach((player, ind) => {
                    if (player !== this.defense.activePlayer) {
                        player.follow(this.offense.players[ind], on ? 100 : 0, 2);
                    } else {
                        controller.moveSprite(player);
                    }
                });
            controller.moveSprite(this.offense.activePlayer || this.defense.activePlayer);
        }
    }

    let currentGame: Game;

    /**
     * Play a game of football against the AI!
     * @param playerTeam the team the player will play as, eg league.clevelandBrowns
     * @param aiTeam the team the player will play against, eg league.pittsburghSteelers
     * @param quarterLength the length of a quarter, eg 20
     */
    //% blockId=createGame block="play as %playerTeam against %aiTeam || quarter length %quarterLength seconds"
    //% playerTeam.defl="league.clevelandBrowns"
    //% aiTeam.defl="league.pittsburghSteelers"
    //% weight=100
    export function createGame(playerTeam: TeamData, aiTeam: TeamData, quarterLength = 20) {
        if (currentGame) {
            game.splash("Game already created!")
        } else {
            currentGame = new Game(
                teams.create(playerTeam, true),
                teams.create(aiTeam, false),
                quarterLength
            );
        }
    }

    export function activeGame() {
        return currentGame;
    }

    /**
     * Prompt the player and start the game!
     */
    //% blockId=startGame block="start game"
    //% weight=90
    export function startGame() {
        // initialize recolored a button prompt
        game.setDialogCursor(img`
            . . . 5 5 5 5 5 . . .
            . 5 5 6 6 6 6 6 5 5 .
            . 5 6 6 1 1 1 6 6 5 .
            5 6 6 1 6 6 6 1 6 6 5
            5 6 6 1 6 6 6 1 6 6 5
            5 6 6 1 1 1 1 1 6 6 5
            5 5 6 1 6 6 6 1 6 5 5
            a 5 5 1 6 6 6 1 5 5 a
            a 5 5 6 5 5 5 6 5 5 a
            . a 5 5 5 5 5 5 5 a .
            . . a a a a a a a . .
        `);
        if (currentGame) {
            ball.toss();
        } else {
            game.splash("You need to set teams first!");
        }
    }
}