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
* File name: space.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: defines the game object of space
* Revision history:
* June 24 2018 created file
* Aug 8 2018 change constructor for multi levels
*/
var objects;
(function (objects) {
    var Space = /** @class */ (function (_super) {
        __extends(Space, _super);
        //Public Properties
        //Constructor
        function Space(name) {
            var _this = _super.call(this, managers.Game.assetManager.getResult(name)) || this;
            _this.Start();
            return _this;
        }
        //Private Methods
        Space.prototype._reset = function () {
            this.y = -3200;
        };
        Space.prototype._move = function () {
            this.y += this._dy;
        };
        Space.prototype._checkBounds = function () {
            if (this.y >= 0) {
                this._reset();
            }
        };
        //Public Methods
        Space.prototype.Start = function () {
            this._dy = 2;
            this._reset();
        };
        Space.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        return Space;
    }(createjs.Bitmap));
    objects.Space = Space;
})(objects || (objects = {}));
//# sourceMappingURL=space.js.map