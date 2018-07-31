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
            var _this = _super.call(this, "coin") || this;
            _this.Start();
            return _this;
        }
        //Private methods
        //Public methods
        Coin.prototype.Reset = function () {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = -this.height;
            this.alpha = 1;
        };
        Coin.prototype.Move = function () {
            this.y += this._dy;
        };
        Coin.prototype.CheckBounds = function () {
            if (this.y >= (480 + this.height)) {
                this.Reset();
            }
        };
        Coin.prototype.Start = function () {
            this._dy = 5;
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