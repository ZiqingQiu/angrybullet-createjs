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
    var PlayScene = /** @class */ (function (_super) {
        __extends(PlayScene, _super);
        //Public Properties
        //Constructor
        function PlayScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        //Private Methods
        //Public Methods
        //Initialize Game Variables and objects
        PlayScene.prototype.Start = function () {
            this._space = new objects.Space();
            this._plane = new objects.Plane();
            managers.Game.plane = this._plane;
            //make a ref to the bullet manager in the game manager
            this._bulletManager = new managers.Bullet();
            managers.Game.bulletManager = this._bulletManager;
            //create an enemy
            this._enemy = new objects.Enemy();
            this._coin = new objects.Coin();
            this._island = new objects.Island();
            //inistantiate the cloud array
            this._cloudNum = 2;
            this._clouds = new Array();
            for (var count = 0; count < this._cloudNum; count++) {
                this._clouds[count] = new objects.Cloud();
            }
            this._engineSound = createjs.Sound.play("engine");
            this._engineSound.loop = -1; //play forever
            this._engineSound.volume = 0.3;
            //create the scoreboard UI 
            this._scoreBoard = new managers.ScoreBoard();
            managers.Game.scoreBoard = this._scoreBoard;
            this.Main();
        };
        //triggered every frame
        PlayScene.prototype.Update = function () {
            var _this = this;
            //console.log("num objects: " + this.numChildren);
            this._space.Update();
            this._plane.Update();
            this._enemy.Update();
            this._bulletManager.Update();
            //to be refine later
            this._coin.x = this._island.x;
            this._coin.y = this._island.y;
            this._coin.Update();
            this._island.Update();
            //check collision between plane and coin
            managers.Collision.Check(this._plane, this._coin);
            this._clouds.forEach(function (cloud) {
                cloud.Update();
                //check collision between plane and current cloud
                managers.Collision.Check(_this._plane, cloud);
            });
            this._bulletManager.Bullets.forEach(function (bullet) {
                managers.Collision.Check(bullet, _this._enemy);
            });
            //if lives fall below zero, switch to game over scene
            if (this._scoreBoard.Lives <= 0) {
                this._engineSound.stop();
                managers.Game.currentScene = config.Scene.OVER;
            }
        };
        PlayScene.prototype.Destroy = function () {
            this.removeAllChildren();
        };
        PlayScene.prototype.Main = function () {
            var _this = this;
            //pay attention the orders
            //add space to the scene
            this.addChild(this._space);
            //add island to the scene
            this.addChild(this._island);
            //add coin to the scene
            this.addChild(this._coin);
            //add plane to the scene
            this.addChild(this._plane);
            this.addChild(this._plane.planeFlash);
            //add enemy to the scene
            this.addChild(this._enemy);
            //add bullets to the scene
            this._bulletManager.Bullets.forEach(function (bullet) { _this.addChild(bullet); });
            //add clouds to the scene
            this._clouds.forEach(function (cloud) {
                _this.addChild(cloud);
            });
            //add score board to the scene
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map