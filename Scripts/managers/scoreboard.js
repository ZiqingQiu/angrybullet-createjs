/*
* File name: scoreboard.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: manages the score and lives
* Revision history:
* June 24 2018 created file
*/
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
            this.LivesLabel = new objects.Label("Lives: 0", "20px", "Starjedi", "#FFFF00", 30, 10, false);
            this.ScoreLabel = new objects.Label("Score: 99999", "20px", "Starjedi", "#FFFF00", 460, 10, false);
            this.HighScoreLabel = new objects.Label("High Score : 99999", "40px", "Starjedi", "#FFFF00", 330, 200, true);
            this.Lives = 5;
            this.Score = 0;
            this.HighScore = 0;
        };
        //Public Methods
        ScoreBoard.prototype.addScore = function (score) {
            this.Score += score;
            var roundScore = Math.floor(this.Score / ScoreBoard._lifeupscore);
            //live +1
            if (roundScore != ScoreBoard._quotient) {
                console.log(roundScore + " " + ScoreBoard._quotient);
                ScoreBoard._quotient = roundScore;
                this.updateLifes(1);
                createjs.Sound.play("life");
            }
            if (managers.Game.HighScore < this.Score) {
                this.HighScore = this.Score;
                managers.Game.HighScore = this.HighScore;
            }
            //not boss scene
            if (this.Score >= 2000 && managers.Game.currentScene % 2 == 0) {
                //### switch scene
                managers.Game.currentScene = managers.Game.currentScene + 1;
            }
        };
        ScoreBoard.prototype.updateLifes = function (life) {
            this.Lives += life;
            if (this.Lives <= 0) {
                managers.Game.currentScene = config.Scene.OVER;
            }
        };
        ScoreBoard._quotient = 0;
        ScoreBoard._lifeupscore = 10000;
        return ScoreBoard;
    }());
    managers.ScoreBoard = ScoreBoard;
})(managers || (managers = {}));
//# sourceMappingURL=scoreboard.js.map