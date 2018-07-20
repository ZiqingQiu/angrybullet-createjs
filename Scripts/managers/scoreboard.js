var managers;
(function (managers) {
    var ScoreBoard = /** @class */ (function () {
        //Constructor
        function ScoreBoard() {
            this._initialize();
        }
        Object.defineProperty(ScoreBoard.prototype, "Lives", {
            //Public Properties
            get: function () {
                return this._lives;
            },
            set: function (newLives) {
                this._lives = newLives;
                this.LivesLabel.text = "Lives: " + this._lives;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "Score", {
            get: function () {
                return this._score;
            },
            set: function (newScore) {
                this._score = newScore;
                this.ScoreLabel.text = "Score: " + this._score;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "HighScore", {
            get: function () {
                return this._highScore;
            },
            set: function (newHighScore) {
                this._highScore = newHighScore;
                this.HighScoreLabel.text = "High Score: " + this._highScore;
            },
            enumerable: true,
            configurable: true
        });
        //Private Methods
        ScoreBoard.prototype._initialize = function () {
            this.LivesLabel = new objects.Label("Lives: 0", "20px", "Consolas", "#FFFF00", 10, 10, false);
            this.ScoreLabel = new objects.Label("Score: 99999", "20px", "Consolas", "#FFFF00", 500, 10, false);
            this.HighScoreLabel = new objects.Label("High Score: 99999", "40px", "Consolas", "#FFFF00", 320, 240, true);
            this.Lives = 5;
            this.Score = 0;
            this.HighScore = 0;
        };
        return ScoreBoard;
    }());
    managers.ScoreBoard = ScoreBoard;
})(managers || (managers = {}));
//# sourceMappingURL=scoreboard.js.map