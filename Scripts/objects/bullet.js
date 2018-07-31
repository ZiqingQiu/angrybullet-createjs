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
/*
* File name: bullet.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: defines the game object of bullets
* Revision history:
* June 24 2018 created file
*/
var objects;
(function (objects) {
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        //private instance variables
        //public properties
        //constructors
        function Bullet(bulletType, dx, dy) {
            var _this = _super.call(this, bulletType) || this;
            _this._dx = dx;
            _this._dy = dy;
            _this.Start();
            return _this;
        }
        //private methods
        //public methods
        Bullet.prototype.Start = function () {
            this._dx = 0;
            this._dy = -10;
            this.Reset();
        };
        Bullet.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        Bullet.prototype.Reset = function () {
            this.x = -5000;
            this.y = -5000;
            this.alpha = 0;
        };
        Bullet.prototype.CheckBounds = function () {
            if (this.y >= 0 && this.alpha == 0) {
                this.alpha = 1;
            }
            if (this.y <= -this.height) {
                this.Reset();
            }
        };
        Bullet.prototype.Move = function () {
            this.y += this._dy;
        };
        Bullet.prototype.DisappearBullet = function () {
            this.Reset();
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map