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
* File name: coin.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: defines the game object of coin
* Revision history:
* June 24 2018 created file
*/
var objects;
(function (objects) {
    var Coin = /** @class */ (function (_super) {
        __extends(Coin, _super);
        //Private instance variables
        //Public properties
        //Constructors
        function Coin() {
            var _this = _super.call(this, "power_up") || this;
            _this.Start();
            return _this;
        }
        //Private methods
        //Public methods
        Coin.prototype.Reset = function () {
            this.x = -this.halfWidth;
            this.y = config.Screen.HALF_HEIGHT;
            this.alpha = 1;
        };
        Coin.prototype.Move = function () {
            this._dy = Math.floor((Math.random() * 4) - 2);
            this.y += this._dy;
            this.x += this._dx;
        };
        Coin.prototype.CheckBounds = function () {
            if (this.x >= (config.Screen.WIDTH - this.halfWidth)) {
                this.Reset();
            }
        };
        Coin.prototype.Start = function () {
            this._dx = 4;
            this.Reset();
        };
        Coin.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        return Coin;
    }(objects.GameObject));
    objects.Coin = Coin;
})(objects || (objects = {}));
//# sourceMappingURL=coin.js.map