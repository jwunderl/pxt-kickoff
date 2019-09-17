class GameClock {
    public quarter: number;
    public secondsRemaining: number;

    constructor(secondsPerQuarter: number) {
        this.quarter = 1;
        this.secondsRemaining = secondsPerQuarter;

        // register timer update
        game.onUpdateInterval(1000, () => {
            this.secondsRemaining--;
            if (this.secondsRemaining <= 0) {
                this.quarter++;
                if (!this.finished()) {
                    game.splash("Next Quarter!");
                    this.secondsRemaining = secondsPerQuarter;
                    ball.toss()
                } else {
                    game.over();
                }
            }
        });
    }

    toString() {
        if (this.finished()) {
            return "FINAL";
        } else {
            return `${this.quarterToString()} ${this.timeRemainingToString()}`;
        }
    }

    finished() {
        return this.quarter > 4;
    }

    protected quarterToString() {
        switch (this.quarter) {
            case 1:
                return "1st";
            case 2:
                return "2nd";
            case 3:
                return "3rd";
            case 4:
                return "4th";
            default:
                return undefined;
        }
    }

    protected timeRemainingToString() {
        const minutes = (this.secondsRemaining / 60) | 0;
        const seconds = this.secondsRemaining % 60;
        const secondsDisplay = `0${seconds}`.slice(-2);
        return `${minutes}:${secondsDisplay}`;
    }
}

namespace clocks {
    export function create(secondsPerQuarter: number) {
        return new GameClock(secondsPerQuarter);
    }
}