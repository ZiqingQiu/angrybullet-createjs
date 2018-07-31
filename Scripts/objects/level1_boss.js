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
*/
var objects;
(function (objects) {
    var Level1BOSS = /** @class */ (function (_super) {
        __extends(Level1BOSS, _super);
        //public properties
        //constructor
        function Level1BOSS() {
            var _this = _super.call(this, "boss") || this;
            _this.Start();
            return _this;
        }
        //private methods
        //public methods
        Level1BOSS.prototype.Reset = function () {
            this.x = config.Screen.WIDTH - this.width;
            this.y = config.Screen.HEIGHT / 2;
            //drift randomly
            this._dx = Math.floor((Math.random() * 3) - 6);
            this._dy = Math.floor((Math.random() * 4) - 2);
            //reset alpha
            this.alpha = 0;
        };
        Level1BOSS.prototype.Move = function () {
            this.y += this._dy;
            this.x += this._dx;
        };
        Level1BOSS.prototype.CheckBounds = function () {
            if ((this.y >= 0 && this.y <= 480) && (this.x >= 0 && this.x <= this.width + config.Screen.WIDTH)) {
                if (this.alpha == 0 && this._isEnable) {
                    this.alpha = 1;
                }
            }
            else {
                this.Reset();
            }
        };
        Level1BOSS.prototype.Start = function () {
            this._hp = 100;
            this._isEnable = false;
        };
        Level1BOSS.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
            this.BulletFire();
        };
        Level1BOSS.prototype.BulletFire = function () {
            if (this.alpha == 1) {
                managers.Game.bulletManager.BulletFire("level1_boss", this.x, this.y, this.halfHeight);
            }
        };
        Level1BOSS.prototype.SetEnable = function (isEnable) {
            this._isEnable = isEnable;
        };
        Level1BOSS.prototype.GetHit = function (hitType) {
            if (this.alpha != 0) {
                //add explosion
                createjs.Sound.play("explosion");
                var explosion = new objects.Explosion("explosion");
                explosion.x = this.x;
                explosion.y = this.y;
                managers.Game.currentSceneObject.addChild(explosion);
                //points for destroy enemy
                managers.Game.scoreBoard.addScore(300);
                var hitHP = 1;
                switch (hitType) {
                    case "player":
                        hitHP = 3;
                        break;
                    case "torpedo":
                        hitHP = 3;
                        break;
                    case "blt_player_lv2":
                        hitHP = 3;
                        break;
                    case "blt_player_lv1":
                        hitHP = 1;
                        break;
                        defualt: break;
                }
                this._hp -= hitHP;
                if (this._hp <= 0) {
                    managers.Game.currentScene = config.Scene.OVER;
                }
            }
        };
        Level1BOSS.prototype.getHP = function () {
            return this._hp;
        };
        return Level1BOSS;
    }(objects.GameObject));
    objects.Level1BOSS = Level1BOSS;
})(objects || (objects = {}));
//# sourceMappingURL=level1_boss.js.map