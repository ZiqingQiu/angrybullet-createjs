/*
* File name: slaveI.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: defines the game object of slaveI
* Revision history:
* June 24 2018 created file
*/
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
    var slaveI = /** @class */ (function (_super) {
        __extends(slaveI, _super);
        //Private Instance Variables
        //Public Properties
        //Constructor
        function slaveI() {
            var _this = _super.call(this, "slaveI") || this;
            _this.Start();
            return _this;
        }
        //Private Methods
        slaveI.prototype.Reset = function () {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = -this.height;
            this.alpha = 0;
        };
        slaveI.prototype.Move = function () {
            this.y += this._dy;
        };
        slaveI.prototype.CheckBounds = function () {
            if (this.y >= 0 && this.alpha == 0) {
                this.alpha = 1;
            }
            //check lower bounds
            if (this.y >= 480 + this.height) {
                this.Reset();
            }
        };
        //Public Methods
        slaveI.prototype.Start = function () {
            this._dy = 10;
            this.Reset();
        };
        slaveI.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        slaveI.prototype.GetHit = function () {
            if (this.alpha != 0) {
                //add explosion
                managers.Game.explosionManager.TriggerExplosion("smallexplosion", managers.Game.currentSceneObject, this.x, this.y);
                //points for destroy enemy
                managers.Game.scoreBoard.addScore(100);
                //reset enemy
                this.Reset();
            }
        };
        return slaveI;
    }(objects.GameObject));
    objects.slaveI = slaveI;
})(objects || (objects = {}));
//# sourceMappingURL=slaveI.js.map