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
var objects;
(function (objects) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        //Constructor
        function Player() {
            var _this = _super.call(this, "player") || this;
            _this.Start();
            return _this;
        }
        //Private Methods
        Player.prototype._animatonEnded = function () {
            if (this.alpha == 0) {
                this.alpha = 1;
                this.planeFlash.alpha = 0;
            }
        };
        Player.prototype.Reset = function () {
        };
        Player.prototype.Move = function () {
            //mouse controls
            //this.x = objects.Game.stage.mouseX;
            //keyboard controls
            if (managers.Game.keyboardManager.moveLeft) {
                this.x -= 5;
            }
            if (managers.Game.keyboardManager.moveRight) {
                this.x += 5;
            }
            this.planeFlash.x = this.x;
            this.planeFlash.y = this.y;
        };
        Player.prototype.CheckBounds = function () {
            //right boundary
            if (this.x >= config.Screen.WIDTH - this.halfWidth) {
                this.x = config.Screen.WIDTH - this.halfWidth;
            }
            //left boundary
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
        };
        //Public Methods
        Player.prototype.Start = function () {
            this.planeFlash = new objects.PlaneFlash();
            this.planeFlash.alpha = 0;
            this.planeFlash.on("animationend", this._animatonEnded.bind(this), false);
            this.x = config.Screen.HALF_WIDTH;
            this.y = 430;
        };
        Player.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
            this.BulletFire();
        };
        Player.prototype.BulletFire = function () {
            if (this.alpha == 1 && managers.Game.keyboardManager.fire) {
                managers.Game.bulletManager.BulletFire("player", this.x, this.y, this.halfHeight);
            }
        };
        //this method provides get hit update for the player object
        Player.prototype.GetHit = function () {
            if (this.alpha != 0) {
                createjs.Sound.play("explosion");
                managers.Game.scoreBoard.Lives -= 1;
                managers.Game.bulletManager.RegisterBullet(managers.Game.currentSceneObject, "playerlv1");
                var explosion = new objects.Explosion("explosion");
                explosion.x = this.x;
                explosion.y = this.y;
                managers.Game.currentSceneObject.addChild(explosion);
                this.alpha = 0;
                managers.Game.player.planeFlash.alpha = 1;
                managers.Game.player.planeFlash.gotoAndPlay("planeflash");
            }
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map