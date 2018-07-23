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
            this._objBulletMap = new Map();
            //playerlv1
            //add blt_playerlv1
            var blt_playerlv1Array = [];
            blt_playerlv1Array.push({ name: "blt_playerlv1", isenabled: false, totalcnt: 20, curcnt: 0, tickerPeriod: 20, ref: this._buildBulletPool("blt_playerlv1", 20) });
            this._objBulletMap.set("playerlv1", blt_playerlv1Array);
            //playerlv2
            //add blt_playerlv2
            var blt_playerlv2Array = [];
            blt_playerlv2Array.push({ name: "blt_playerlv2", isenabled: false, totalcnt: 20, curcnt: 0, tickerPeriod: 10, ref: this._buildBulletPool("blt_playerlv2", 20) });
            this._objBulletMap.set("playerlv2", blt_playerlv2Array);
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
                case "player":
                    //### hard code 2 here
                    var bulletInfo = void 0;
                    bulletInfo = this._objBulletMap.get(this._lastPlayerRegisterLevel);
                    for (var idx = 0; idx < bulletInfo.length; idx++) {
                        tickerPeriod = bulletInfo[idx].tickerPeriod;
                        if (ticker % tickerPeriod == 0) {
                            var bulletSpawn = new math.Vec2(x, y - halfHeight);
                            var currentBullet = bulletInfo[idx].curcnt;
                            var bullet = bulletInfo[idx].ref[currentBullet];
                            var bulletTotalCnt = bulletInfo[idx].totalcnt;
                            bullet.alpha = 1;
                            bullet.x = bulletSpawn.x;
                            bullet.y = bulletSpawn.y;
                            currentBullet = (currentBullet + 1) % bulletTotalCnt;
                            bulletInfo[idx].curcnt = currentBullet;
                            createjs.Sound.play("bulletSound");
                        }
                    }
                    break;
            }
        };
        Bullet.prototype.RegisterBullet = function (tarScene, objectname) {
            var bulletInfo = this._objBulletMap.get(objectname);
            for (var idx = 0; idx < bulletInfo.length; idx++) {
                bulletInfo[idx].isenabled = true;
                var bullets = bulletInfo[idx].ref;
                bullets.forEach(function (bullet) { tarScene.addChild(bullet); });
            }
            //if player has multi level bullet, need disable other bullet types
            if (objectname.search("player") != -1) {
                var playerLevelString = objectname.substring(8, 9);
                var playerLevel = parseInt(playerLevelString);
                this._lastPlayerRegisterLevel = objectname; //store the latest playerlvl
                //go through all the player bullet types
                //### 2 is hard code, should be 3
                for (var lvlidx = 1; lvlidx <= 2; lvlidx++) {
                    if (lvlidx != playerLevel) {
                        bulletInfo = this._objBulletMap.get("playerlv" + lvlidx);
                        for (var idx = 0; idx < bulletInfo.length; idx++) {
                            bulletInfo[idx].isenabled = false;
                            var bullets = bulletInfo[idx].ref;
                            bullets.forEach(function (bullet) { tarScene.removeChild(bullet); });
                        }
                    }
                }
            }
        };
        Bullet.prototype.GetTotalBulletTypes = function (objectname) {
            if (objectname.search("player") != -1) //player
             {
                objectname = this._lastPlayerRegisterLevel;
            }
            var totBulletTypes = [];
            var bulletInfo = this._objBulletMap.get(objectname);
            for (var idx = 0; idx < bulletInfo.length; idx++) {
                if (bulletInfo[idx].isenabled) //only return currently enabled bullet
                 {
                    totBulletTypes.push(idx);
                }
            }
            return totBulletTypes;
        };
        Bullet.prototype.GetBullets = function (objectname, bulletIdx) {
            if (objectname.search("player") != -1) //player
             {
                objectname = this._lastPlayerRegisterLevel;
            }
            var bulletInfo = this._objBulletMap.get(objectname);
            return bulletInfo[bulletIdx].ref;
        };
        return Bullet;
    }());
    managers.Bullet = Bullet;
})(managers || (managers = {}));
//# sourceMappingURL=bullet.js.map