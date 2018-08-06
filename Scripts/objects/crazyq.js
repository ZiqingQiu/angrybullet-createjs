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
* File name: level1_boss.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: game object of level1_boss1
* Revision history:
* Aug 6 2018 create file
*/
var objects;
(function (objects) {
    var CrazyQ = /** @class */ (function (_super) {
        __extends(CrazyQ, _super);
        //public properties
        //constructor
        function CrazyQ() {
            var _this = _super.call(this, "crazyq") || this;
            _this.Start();
            return _this;
        }
        //private methods
        //public methods
        CrazyQ.prototype.Reset = function () {
            this.x = config.Screen.WIDTH - this.width;
            this.y = config.Screen.HEIGHT / 2;
            //drift randomly
            this._dx = Math.floor((Math.random() * 3) - 6);
            this._dy = Math.floor((Math.random() * 4) - 2);
            //reset alpha
            this.alpha = 0;
        };
        CrazyQ.prototype.Move = function () {
            this.y += this._dy;
            this.x += this._dx;
        };
        CrazyQ.prototype.CheckBounds = function () {
            if ((this.y >= 0 && this.y <= 480) && (this.x >= 0 && this.x <= this.width + config.Screen.WIDTH)) {
                if (this.alpha == 0 && this._isEnable) {
                    this.alpha = 1;
                }
            }
            else {
                this.Reset();
            }
        };
        CrazyQ.prototype.Start = function () {
            this._hp = 100;
            this._isEnable = false;
        };
        CrazyQ.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
            this.BulletFire();
        };
        CrazyQ.prototype.BulletFire = function () {
            if (this.alpha == 1) {
                managers.Game.bulletManager.BulletFire("boss_bullet_lv1", this.x, this.y, this.halfHeight);
            }
        };
        CrazyQ.prototype.SetEnable = function (isEnable) {
            this._isEnable = isEnable;
        };
        CrazyQ.prototype.GetHit = function (hitType) {
            if (this.alpha != 0) {
                //add explosion
                createjs.Sound.play("explosion");
                var explosion = new objects.Explosion("explosion");
                explosion.x = this.x;
                explosion.y = this.y;
                managers.Game.currentSceneObject.addChild(explosion);
                //points for destroy slaveI
                managers.Game.scoreBoard.addScore(300);
                //update hp
                this._hp -= managers.Game.bulletManager.GetBulletDamange(hitType);
                ;
                if (this._hp <= 0) {
                    managers.Game.currentScene = config.Scene.OVER;
                }
            }
        };
        CrazyQ.prototype.getHP = function () {
            return this._hp;
        };
        return CrazyQ;
    }(objects.GameObject));
    objects.CrazyQ = CrazyQ;
})(objects || (objects = {}));
//# sourceMappingURL=crazyq.js.map