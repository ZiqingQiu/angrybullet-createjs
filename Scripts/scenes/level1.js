var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Level1Scene = /** @class */ (function (_super) {
        __extends(Level1Scene, _super);
        //Public Properties
        //Constructor
        function Level1Scene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        //Private Methods
        Level1Scene.prototype.CheckCollisionWOBullet = function () {
            var _this = this;
            //check collision between player and power_up
            managers.Collision.Check(this._player, managers.Game.coinManager.getCurActivateCoin());
            //check collision between player and current tie
            this._tie.forEach(function (tie) {
                tie.Update();
                managers.Collision.Check(_this._player, tie);
            });
        };
        Level1Scene.prototype.CheckPlayerBullet = function () {
            var _this = this;
            //check collision with player's bullets
            var bulletIdxArray = [];
            var bullets = [];
            bulletIdxArray = managers.Game.bulletManager.GetTotalBulletTypes("player");
            for (var idx = 0; idx < bulletIdxArray.length; idx++) {
                bullets = managers.Game.bulletManager.GetBullets("player", bulletIdxArray[idx]);
                bullets.forEach(function (bullet) {
                    if (bullet.alpha == 1) {
                        //check collision player-bullet -- slaveI
                        managers.Collision.Check(bullet, _this._slaveI);
                    }
                    if (bullet.alpha == 1) {
                        //check collision player-bullet -- TIE
                        for (var count = 0; count < _this._tieNum; count++) {
                            if (_this._tie[count].alpha == 1) {
                                managers.Collision.Check(bullet, _this._tie[count]);
                            }
                        }
                    }
                });
            }
        };
        Level1Scene.prototype.CheckEnemyBullet = function () {
            var _this = this;
            var bulletIdxArray = [];
            var bullets = [];
            //check collision with tie's bullets
            bulletIdxArray = managers.Game.bulletManager.GetTotalBulletTypes("tie_bullet_lv1");
            for (var idx = 0; idx < bulletIdxArray.length; idx++) {
                bullets = managers.Game.bulletManager.GetBullets("tie_bullet_lv1", bulletIdxArray[idx]);
                bullets.forEach(function (bullet) {
                    if (bullet.alpha == 1) {
                        //check collision enemy-bullet -- player
                        managers.Collision.Check(bullet, _this._player);
                    }
                });
            }
        };
        //Public Methods
        //Initialize Game Variables and objects
        Level1Scene.prototype.Start = function () {
            this._space = new objects.Space();
            this._player = new objects.Player();
            managers.Game.player = this._player;
            //get bullet manager
            this._bulletManager = managers.Game.bulletManager;
            //get coin manager
            this._coinManager = managers.Game.coinManager;
            //create an enemy
            this._slaveI = new objects.slaveI();
            //get all types of coins
            this._coins = managers.Game.coinManager.getallCoins();
            //inistantiate the TIE array
            this._tieNum = 2;
            this._tie = new Array();
            for (var count = 0; count < this._tieNum; count++) {
                this._tie[count] = new objects.TIE();
            }
            this._engineSound = createjs.Sound.play("stage1");
            this._engineSound.loop = -1; //play forever
            this._engineSound.volume = 0.1;
            //create the scoreboard UI 
            this._scoreBoard = new managers.ScoreBoard();
            managers.Game.scoreBoard = this._scoreBoard;
            this.Main();
        };
        //triggered every frame
        Level1Scene.prototype.Update = function () {
            console.log("num objects: " + this.numChildren);
            this._space.Update();
            this._player.Update();
            this._slaveI.Update();
            this._bulletManager.Update();
            this._coinManager.Update();
            //check collision without bullets
            this.CheckCollisionWOBullet();
            //check player's bullet
            this.CheckPlayerBullet();
            //check enemy's bullet
            this.CheckEnemyBullet();
        };
        Level1Scene.prototype.Destroy = function () {
            this._engineSound.stop();
            this.removeAllChildren();
        };
        Level1Scene.prototype.Main = function () {
            var _this = this;
            //pay attention the orders
            //add space to the scene
            this.addChild(this._space);
            //add coin to the scene
            this._coins.forEach(function (coin) {
                _this.addChild(coin);
            });
            //add player to the scene
            this.addChild(this._player);
            this.addChild(this._player.planeFlash);
            //add enemy to the scene
            this.addChild(this._slaveI);
            //add bullets to the scene
            managers.Game.bulletManager.RegisterBullet(this, "player_bullet_lv1");
            managers.Game.bulletManager.RegisterBullet(this, "tie_bullet_lv1");
            //add ties to the scene
            this._tie.forEach(function (tie) {
                _this.addChild(tie);
            });
            //add score board to the scene
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
        };
        return Level1Scene;
    }(objects.Scene));
    scenes.Level1Scene = Level1Scene;
})(scenes || (scenes = {}));
//# sourceMappingURL=level1.js.map