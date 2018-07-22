var managers;
(function (managers) {
    var Bullet = /** @class */ (function () {
        //constructors
        function Bullet() {
            this.Start();
        }
        Object.defineProperty(Bullet.prototype, "BulletCnts", {
            //Public Properties
            get: function () {
                return this._bulletCount;
            },
            enumerable: true,
            configurable: true
        });
        //private methods
        Bullet.prototype._buildBulletPool = function () {
            for (var count = 0; count < this._bulletCount; count++) {
                this.Bullets[count] = new objects.Bullet();
            }
        };
        //public methods
        Bullet.prototype.Start = function () {
            //set the default bullet count
            this._bulletCount = 50;
            //create the bullet container
            this.Bullets = new Array();
            //build bullet array
            this._buildBulletPool();
            //set the current bullet to 0
            this.CurrentBullet = 0;
        };
        Bullet.prototype.Update = function () {
            this.Bullets.forEach(function (bullet) { bullet.Update(); });
        };
        Bullet.prototype.BulletFire = function (bulletCarrier, x, y, halfHeight) {
            var ticker = createjs.Ticker.getTicks();
            var tickerPeriod;
            switch (bulletCarrier) {
                case "playerlv1":
                    tickerPeriod = 10;
                    break;
            }
            if (ticker % tickerPeriod == 0) {
                var bulletSpawn = new math.Vec2(x, y - halfHeight);
                var currentBullet = managers.Game.bulletManager.CurrentBullet;
                var bullet = managers.Game.bulletManager.Bullets[currentBullet];
                bullet.x = bulletSpawn.x;
                bullet.y = bulletSpawn.y;
                managers.Game.bulletManager.CurrentBullet = (managers.Game.bulletManager.CurrentBullet + 1) % 50;
                createjs.Sound.play("bulletSound");
            }
        };
        return Bullet;
    }());
    managers.Bullet = Bullet;
})(managers || (managers = {}));
//# sourceMappingURL=bullet.js.map