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
    var Plane = /** @class */ (function (_super) {
        __extends(Plane, _super);
        //Constructor
        function Plane() {
            var _this = _super.call(this, "plane") || this;
            _this.Start();
            return _this;
        }
        //Private Methods
        Plane.prototype._animatonEnded = function () {
            if (this.alpha == 0) {
                this.alpha = 1;
                this.planeFlash.alpha = 0;
            }
        };
        Plane.prototype.Reset = function () {
        };
        Plane.prototype.Move = function () {
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
        Plane.prototype.CheckBounds = function () {
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
        Plane.prototype.Start = function () {
            this.planeFlash = new objects.PlaneFlash();
            this.planeFlash.alpha = 0;
            this.planeFlash.on("animationend", this._animatonEnded.bind(this), false);
            this.x = config.Screen.HALF_WIDTH;
            this.y = 430;
            this._bulletSpawn = new math.Vec2();
        };
        Plane.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
            this.BulletFire();
        };
        Plane.prototype.BulletFire = function () {
            if (this.alpha == 1) {
                var ticker = createjs.Ticker.getTicks();
                if (managers.Game.keyboardManager.fire && (ticker % 20 == 0)) {
                    this._bulletSpawn = new math.Vec2(this.x, this.y - this.halfHeight);
                    var currentBullet = managers.Game.bulletManager.CurrentBullet;
                    var bullet = managers.Game.bulletManager.Bullets[currentBullet];
                    bullet.x = this._bulletSpawn.x;
                    bullet.y = this._bulletSpawn.y;
                    managers.Game.bulletManager.CurrentBullet = (managers.Game.bulletManager.CurrentBullet + 1) % 50;
                    createjs.Sound.play("bulletSound");
                }
            }
        };
        return Plane;
    }(objects.GameObject));
    objects.Plane = Plane;
})(objects || (objects = {}));
//# sourceMappingURL=plane.js.map