var managers;
(function (managers) {
    var Bullet = /** @class */ (function () {
        //constructors
        function Bullet() {
            this.Start();
        }
        //private methods
        Bullet.prototype._buildBulletPool = function (bulletname, totalCnt, dx, dy) {
            var bullets = [];
            for (var count = 0; count < totalCnt; count++) {
                bullets[count] = new objects.Bullet(bulletname, dx, dy);
            }
            return bullets;
        };
        //public methods
        Bullet.prototype.Start = function () {
            this._objBulletMap = new Map();
            //playerlv1
            //add blt_playerlv1
            var blt_playerlv1Array = [];
            blt_playerlv1Array.push({
                name: "blt_player_laser_lv1", isenabled: false, totalcnt: 15, curcnt: 0, tickerPeriod: 20, dx: 0, dy: -10,
                offset_x: 0, offset_y: 0, ref: this._buildBulletPool("blt_player_laser_lv1", 15, 0, -10)
            });
            this._objBulletMap.set("player_bullet_lv1", blt_playerlv1Array);
            //playerlv2
            //add blt_playerlv2  ---F---
            var blt_playerlv2Array = [];
            blt_playerlv2Array.push({
                name: "blt_player_laser_lv1", isenabled: false, totalcnt: 15, curcnt: 0, tickerPeriod: 30, dx: 0, dy: -10,
                offset_x: -25, offset_y: 0, ref: this._buildBulletPool("blt_player_laser_lv1", 15, 0, -10)
            });
            blt_playerlv2Array.push({
                name: "blt_player_laser_lv1", isenabled: false, totalcnt: 15, curcnt: 0, tickerPeriod: 30, dx: 0, dy: -10,
                offset_x: 25, offset_y: 0, ref: this._buildBulletPool("blt_player_laser_lv1", 15, 0, -10)
            });
            this._objBulletMap.set("player_bullet_lv2", blt_playerlv2Array);
            //playerlv3   ---S---
            //add blt_playerlv3
            var blt_playerlv3Array = [];
            blt_playerlv3Array.push({
                name: "blt_player_laser_lv2", isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 40, dx: 0, dy: -10,
                offset_x: 0, offset_y: 0, ref: this._buildBulletPool("blt_player_laser_lv2", 10, 0, -10)
            });
            //left bullet
            blt_playerlv3Array.push({
                name: "blt_player_laser_lv2", isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 40, dx: -5, dy: -10,
                offset_x: -25, offset_y: 0, ref: this._buildBulletPool("blt_player_laser_lv2", 10, -5, -10)
            });
            //right bullet
            blt_playerlv3Array.push({
                name: "blt_player_laser_lv2", isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 40, dx: 5, dy: -10,
                offset_x: 25, offset_y: 0, ref: this._buildBulletPool("blt_player_laser_lv2", 10, 5, -10)
            });
            this._objBulletMap.set("player_bullet_lv3", blt_playerlv3Array);
            //playerlv4   ---L---
            //add blt_playerlv4
            var blt_playerlv4Array = [];
            //middle bullet
            blt_playerlv4Array.push({
                name: "blt_player_rocket_lv1", isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 40, dx: 0, dy: -10,
                offset_x: 0, offset_y: 0, ref: this._buildBulletPool("blt_player_rocket_lv1", 10, 0, -10)
            });
            this._objBulletMap.set("player_bullet_lv4", blt_playerlv4Array);
            //TIE
            var blt_tieArray = [];
            blt_tieArray.push({
                name: "blt_enemy_laser_lv1", isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 60, dx: 0, dy: 20,
                offset_x: 0, offset_y: 60, ref: this._buildBulletPool("blt_enemy_laser_lv1", 10, 0, 20)
            });
            this._objBulletMap.set("tie_bullet_lv1", blt_tieArray);
            //boss1
            var blt_boss1Array = [];
            blt_boss1Array.push({
                name: "blt_boss_bomb_lv1", isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 60, dx: 0, dy: 6,
                offset_x: 0, offset_y: 30, ref: this._buildBulletPool("blt_boss_bomb_lv1", 10, 0, 6)
            });
            blt_boss1Array.push({
                name: "blt_boss_bomb_lv1", isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 60, dx: -5, dy: 5,
                offset_x: -40, offset_y: 30, ref: this._buildBulletPool("blt_boss_bomb_lv1", 10, -5, 5)
            });
            blt_boss1Array.push({
                name: "blt_boss_bomb_lv1", isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 60, dx: 5, dy: 5,
                offset_x: 40, offset_y: 30, ref: this._buildBulletPool("blt_boss_bomb_lv1", 10, 5, 5)
            });
            blt_boss1Array.push({
                name: "blt_boss_bomb_lv1", isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 60, dx: -8, dy: 8,
                offset_x: -80, offset_y: 30, ref: this._buildBulletPool("blt_boss_bomb_lv1", 10, -8, 8)
            });
            blt_boss1Array.push({
                name: "blt_boss_bomb_lv1", isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 60, dx: 8, dy: 8,
                offset_x: 80, offset_y: 30, ref: this._buildBulletPool("blt_boss_bomb_lv1", 10, 8, 8)
            });
            this._objBulletMap.set("boss_bullet_lv1", blt_boss1Array);
        };
        Bullet.prototype.Update = function () {
            //only update the bullet that has been enabled
            this._objBulletMap.forEach(function (bulletInfo) {
                for (var bulletidx = 0; bulletidx < bulletInfo.length; bulletidx++) {
                    if (bulletInfo[bulletidx].isenabled) {
                        bulletInfo[bulletidx].ref.forEach(function (bullet) { bullet.Update(); });
                    }
                }
            });
        };
        Bullet.prototype.BulletFire = function (bulletCarrier, x, y, halfHeight) {
            var ticker = createjs.Ticker.getTicks();
            var tickerPeriod;
            var bulletInfo;
            switch (bulletCarrier) {
                case "player":
                    bulletInfo = this._objBulletMap.get(this._lastPlayerRegisterLevel);
                    break;
                case "tie_bullet_lv1":
                    bulletInfo = this._objBulletMap.get("tie_bullet_lv1");
                    break;
                case "boss_bullet_lv1":
                    bulletInfo = this._objBulletMap.get("boss_bullet_lv1");
                    break;
            }
            for (var idx = 0; idx < bulletInfo.length; idx++) {
                tickerPeriod = bulletInfo[idx].tickerPeriod;
                if (ticker % tickerPeriod == 0) {
                    var bulletSpawn = new math.Vec2(x, y - halfHeight);
                    var currentBullet = bulletInfo[idx].curcnt;
                    var bullet = bulletInfo[idx].ref[currentBullet];
                    var bulletTotalCnt = bulletInfo[idx].totalcnt;
                    //bullet firing position offset to the player reg x y
                    var offset_x = bulletInfo[idx].offset_x;
                    var offset_y = bulletInfo[idx].offset_y;
                    bullet.alpha = 1;
                    bullet.x = bulletSpawn.x + offset_x;
                    bullet.y = bulletSpawn.y + offset_y;
                    currentBullet = (currentBullet + 1) % bulletTotalCnt;
                    bulletInfo[idx].curcnt = currentBullet;
                    //createjs.Sound.play("bulletSound");   //### hard code to turn this off
                }
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
                var playerLevelString = objectname.substring(16, 17);
                var playerLevel = parseInt(playerLevelString);
                this._lastPlayerRegisterLevel = objectname; //store the latest playerlvl
                //go through all the player bullet types
                for (var lvlidx = 1; lvlidx <= 4; lvlidx++) {
                    if (lvlidx != playerLevel) {
                        bulletInfo = this._objBulletMap.get("player_bullet_lv" + lvlidx);
                        for (var idx = 0; idx < bulletInfo.length; idx++) {
                            bulletInfo[idx].isenabled = false;
                            var bullets = bulletInfo[idx].ref;
                            bullets.forEach(function (bullet) { tarScene.removeChild(bullet); });
                        }
                    }
                }
            }
        };
        Bullet.prototype.RegisterPlayerPreviousBullet = function (tarScene) {
            this.RegisterBullet(tarScene, this._lastPlayerRegisterLevel);
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
        Bullet.prototype.RegisterBulletThroughCoin = function (coinType) {
            var bulletType;
            switch (coinType) {
                case "power_up_F":
                    bulletType = "player_bullet_lv2";
                    break;
                case "power_up_S":
                    bulletType = "player_bullet_lv3";
                    break;
                case "power_up_L":
                    bulletType = "player_bullet_lv4";
                    break;
            }
            //register bullet
            this.RegisterBullet(managers.Game.currentSceneObject, bulletType);
        };
        Bullet.prototype.GetBulletDamange = function (bullet) {
            var hitHP = 1;
            switch (bullet) {
                case "player": //player craft itself can cause damanage
                    hitHP = 3;
                    break;
                case "blt_player_laser_lv1":
                    hitHP = 1;
                    break;
                case "blt_player_laser_lv2":
                    hitHP = 2;
                    break;
                case "blt_player_rocket_lv1":
                    hitHP = 5;
                    break;
                    defualt: hitHP = 1;
                    break;
            }
            return hitHP;
        };
        return Bullet;
    }());
    managers.Bullet = Bullet;
})(managers || (managers = {}));
//# sourceMappingURL=bullet.js.map