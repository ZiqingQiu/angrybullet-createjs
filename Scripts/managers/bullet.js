var managers;
(function (managers) {
    var Bullet = /** @class */ (function () {
        //constructors
        function Bullet() {
            this.Start(); //to be refined
        }
        //private methods
        Bullet.prototype._buildBulletPool = function (bulletname, totalCnt) {
            var bullets = [];
            for (var count = 0; count < totalCnt; count++) {
                bullets[count] = new objects.Bullet(bulletname);
            }
            return bullets;
        };
        //public methods
        Bullet.prototype.Start = function () {
            //####to be merged
            var myarray = [];
            this._objBulletMap = new Map();
            myarray.push({ name: "bluedotbullet", isenabled: true, totalcnt: 20, curcnt: 0, ref: this._buildBulletPool("bluedotbullet", 20) });
            this._objBulletMap.set("playerlv1", myarray);
        };
        Bullet.prototype.Update = function () {
            //only update the bullet that has been enabled
            for (var idx = 0; idx < this._objBulletMap.length; idx++) {
                for (var bulletidx = 0; bulletidx < this._objBulletMap[idx].BulletInfo.length; bulletidx++) {
                    if (this._objBulletMap[idx].BulletInfo[bulletidx].isenabled) {
                        this._objBulletMap[idx].BulletInfo[bulletidx].ref.forEach(function (bullet) { bullet.Update(); });
                    }
                }
            }
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
                var currentBullet = this._objBulletMap.get("playerlv1")[0].curcnt; //####hard code 0 for now
                var bullet = this._objBulletMap.get("playerlv1")[0].ref[currentBullet];
                var bulletTotalCnt = this._objBulletMap.get("playerlv1")[0].totalcnt;
                bullet.alpha = 1;
                bullet.x = bulletSpawn.x;
                bullet.y = bulletSpawn.y;
                currentBullet = (currentBullet + 1) % bulletTotalCnt;
                this._objBulletMap.get("playerlv1")[0].curcnt = currentBullet;
                createjs.Sound.play("bulletSound");
            }
        };
        Bullet.prototype.RegisterBullet = function (tarScene, objectname) {
            var bulletInfo = this._objBulletMap.get(objectname);
            for (var idx = 0; idx < bulletInfo.length; idx++) {
                var bullets = bulletInfo[idx].ref;
                bullets.forEach(function (bullet) { tarScene.addChild(bullet); });
            }
        };
        Bullet.prototype.GetTotalBulletTypes = function (objectname) {
            var totBulletTypes = [];
            var bulletInfo = this._objBulletMap.get(objectname);
            for (var idx = 0; idx < bulletInfo.length; idx++) {
                if (bulletInfo[idx].isenabled) {
                    totBulletTypes.push(idx);
                }
            }
            return totBulletTypes;
        };
        Bullet.prototype.GetBullets = function (objectname, bulletIdx) {
            var bulletInfo = this._objBulletMap.get(objectname);
            return bulletInfo[bulletIdx].ref;
        };
        return Bullet;
    }());
    managers.Bullet = Bullet;
})(managers || (managers = {}));
//# sourceMappingURL=bullet.js.map