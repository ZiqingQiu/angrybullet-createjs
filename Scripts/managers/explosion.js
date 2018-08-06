/*
* File name: explosion.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: manage the bullet types
* Revision history:
* Aug 6 2018 created file
*/
var managers;
(function (managers) {
    var Explosion = /** @class */ (function () {
        //public properties
        //constructors
        function Explosion() {
            this.Start(); //to be refined
        }
        //private methods
        Explosion.prototype._buildExplosionPool = function (explostion_name, totalCnt) {
            var explosions = [];
            for (var count = 0; count < totalCnt; count++) {
                explosions[count] = new objects.Explosion(explostion_name);
            }
            return explosions;
        };
        Explosion.prototype.Start = function () {
            this._objExplosionMap = new Map();
            //explosion
            var explosion = { totalcnt: 10, curcnt: 0, ref: this._buildExplosionPool("explosion", 10) };
            this._objExplosionMap.set("explosion", explosion);
            //small explosion
            var small_explosion = { totalcnt: 10, curcnt: 0, ref: this._buildExplosionPool("smallexplosion", 10) };
            this._objExplosionMap.set("smallexplosion", small_explosion);
        };
        //public methods
        Explosion.prototype.TriggerExplosion = function (expoType, tarScene, x, y) {
            var explosion = this._objExplosionMap.get(expoType);
            var currentExpo = explosion.curcnt;
            var explostion = explosion.ref[currentExpo];
            explostion.Explode(tarScene, x, y);
        };
        return Explosion;
    }());
    managers.Explosion = Explosion;
})(managers || (managers = {}));
//# sourceMappingURL=explosion.js.map