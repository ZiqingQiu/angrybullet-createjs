module managers {
    export class ScoreBoard {
        //Private Instance Variables
        private _lives: number;
        private _score: number;
        private _highScore: number;

        private static _quotient: number = 0;
        private static _lifeupscore: number = 10000;

        //Public Instance Variables
        public LivesLabel: objects.Label;
        public ScoreLabel: objects.Label;
        public HighScoreLabel: objects.Label;

        //Public Properties
        get Lives(): number {
            return this._lives;
        }

        set Lives(newLives: number) {
            this._lives = newLives;
            this.LivesLabel.text = "Lives: " + this._lives;
        }

        get Score(): number {
            return this._score;
        }

        set Score(newScore: number) {
            this._score = newScore;
            this.ScoreLabel.text = "Score: " + this._score;
        }

        get HighScore(): number {
            return this._highScore;
        }

        set HighScore(newHighScore: number) {
            this._highScore = newHighScore;
            this.HighScoreLabel.text = "High Score: " + this._highScore;
        }
        //Constructor
        constructor() {
            this._initialize();
        }
        //Private Methods
        private _initialize(): void {
            this.LivesLabel = new objects.Label("Lives: 0", "20px", "Starjedi", "#FFFF00", 30, 10, false);
            this.ScoreLabel = new objects.Label("Score: 99999", "20px", "Starjedi", "#FFFF00", 480, 10, false);
            this.HighScoreLabel = new objects.Label("High Score : 99999", "40px", "Starjedi", "#FFFF00", 330, 240, true);

            this.Lives = 5;
            this.Score = 0;
            this.HighScore = 0;
        }


        //Public Methods
        public addScore(score: number): void {

            this.Score += score;
            let roundScore = Math.floor(this.Score / ScoreBoard._lifeupscore)
            //live +1
            if (roundScore != ScoreBoard._quotient) {
                console.log(roundScore + " " + ScoreBoard._quotient)
                ScoreBoard._quotient = roundScore;
                this.Lives += 1;
                createjs.Sound.play("life");
            }
            if (managers.Game.HighScore < this.Score) {
                this.HighScore = this.Score;
                managers.Game.HighScore = this.HighScore;
            }
        }


    }
}