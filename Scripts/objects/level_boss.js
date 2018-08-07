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
* Jul 30 2018 created file
* Aug 6 2018 refine update HP API
*/
var objects;
(function (objects) {
    var LevelBOSS = /** @class */ (function (_super) {
        __extends(LevelBOSS, _super);
        //public properties
        //constructor
        function LevelBOSS(objname, bulname, hp) {
            var _this = _super.call(this, objname) || this;
            _this._hp = hp;
            _this._bulletname = bulname;
            _this.Start();
            return _this;
        }
        //private methods
        //public methods
        LevelBOSS.prototype.Reset = function () {
            this.x = config.Screen.WIDTH - this.width;
            this.y = config.Screen.HEIGHT / 4;
            //drift randomly
            this._dx = Math.floor((Math.random() * 3) - 6);
            this._dy = Math.floor((Math.random() * 4) - 2);
            //reset alpha
            this.alpha = 0;
        };
        LevelBOSS.prototype.Move = function () {
            this.y += this._dy;
            this.x += this._dx;
        };
        LevelBOSS.prototype.CheckBounds = function () {
            if ((this.y >= 0 && this.y <= 480) && (this.x >= 0 && this.x <= this.width + config.Screen.WIDTH)) {
                if (this.alpha == 0 && this._isEnable) {
                    this.alpha = 1;
                }
            }
            else {
                this.Reset();
            }
        };
        LevelBOSS.prototype.Start = function () {
            this._isEnable = false;
        };
        LevelBOSS.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
            this.BulletFire();
        };
        LevelBOSS.prototype.BulletFire = function () {
            if (this.alpha == 1) {
                managers.Game.bulletManager.BulletFire(this._bulletname, this.x, this.y, this.halfHeight);
            }
        };
        LevelBOSS.prototype.SetEnable = function (isEnable) {
            this._isEnable = isEnable;
        };
        LevelBOSS.prototype.GetHit = function (hitType) {
            if (this.alpha != 0) {
                //add explosion
                managers.Game.explosionManager.TriggerExplosion("explosion", managers.Game.currentSceneObject, this.x, this.y);
                //points for destroy slaveI
                managers.Game.scoreBoard.addScore(300);
                //update hp
                this._hp -= managers.Game.bulletManager.GetBulletDamange(hitType);
                ;
                if (this._hp <= 0) {
                    managers.Game.currentScene = config.Scene.LEVEL2;
                }
            }
        };
        LevelBOSS.prototype.getHP = function () {
            return this._hp;
        };
        return LevelBOSS;
    }(objects.GameObject));
    objects.LevelBOSS = LevelBOSS;
})(objects || (objects = {}));
//# sourceMappingURL=level_boss.js.map