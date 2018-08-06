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
* File name: TIE.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: defines the game object of TIE
* Revision history:
* June 24 2018 created file
* Aug 6 2018 refine HP API
*/
var objects;
(function (objects) {
    var TIE = /** @class */ (function (_super) {
        __extends(TIE, _super);
        //Public Properties
        //Constructor
        function TIE() {
            var _this = _super.call(this, "tie") || this;
            _this.Start();
            return _this;
        }
        //Private Methods
        TIE.prototype.Reset = function () {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = -this.height;
            //drift randomly
            this._dx = Math.floor((Math.random() * 2) - 1);
            this._dy = Math.floor((Math.random() * 2) + 3);
            //reset enemy
            this._hp = 3;
            //reset alpha
            this.alpha = 0;
        };
        TIE.prototype.Move = function () {
            this.y += this._dy;
            this.x += this._dx;
        };
        TIE.prototype.CheckBounds = function () {
            if (this.y >= 0 && this.alpha == 0) {
                this.alpha = 1;
            }
            //check lower bounds
            if (this.y >= 480 + this.height) {
                this.Reset();
            }
        };
        //Public Methods
        TIE.prototype.Start = function () {
            this._dy = 5;
            this._hp = 3;
            this.Reset();
        };
        TIE.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
            this.BulletFire();
        };
        TIE.prototype.GetHit = function (hitType) {
            if (this.alpha != 0) {
                //add explosion
                managers.Game.explosionManager.TriggerExplosion("explosion", managers.Game.currentSceneObject, this.x, this.y);
                //points for destroy enemy
                managers.Game.scoreBoard.addScore(200);
                this._hp -= managers.Game.bulletManager.GetBulletDamange(hitType);
                if (this._hp <= 0) {
                    //reset enemy
                    this.Reset();
                }
            }
        };
        TIE.prototype.BulletFire = function () {
            if (this.alpha == 1) {
                managers.Game.bulletManager.BulletFire("tie_bullet_lv1", this.x, this.y, this.halfHeight);
            }
        };
        return TIE;
    }(objects.GameObject));
    objects.TIE = TIE;
})(objects || (objects = {}));
//# sourceMappingURL=TIE.js.map