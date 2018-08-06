
/*
* File name: bullet.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: manage the bullet types
* Revision history:
* June 24 2018 created file
* July 30 2018 merging the A2 solution
* Aug 6 2018 add all four player bullet types
* Aug 6 2018 provide API to get player bullet type
* Aug 6 2018 provide API to get HP hit based on player bullet type
*/
type BulletInfo = { name: string; soundname: string; isenabled: boolean; totalcnt: number; curcnt: number; tickerPeriod: number; dx: number; dy: number; offset_x: number; offset_y: number; ref: objects.Bullet[] };

module managers {
    export class Bullet {
        //private instance variables
        private _objBulletMap : Map<string, BulletInfo[]>;

        private _lastPlayerRegisterLevel : string;
    
        //constructors
        constructor (){
            this.Start(); 
        }

        //private methods
        private _buildBulletPool(bulletname: string, totalCnt: number, dx: number, dy: number): objects.Bullet[] {
            let bullets: objects.Bullet[] = [];
            for (let count = 0; count < totalCnt; count++) {
                bullets[count] = new objects.Bullet(bulletname, dx, dy);
            }
            return bullets;
        }

        //public methods
        public Start(): void {
            this._objBulletMap = new Map<string, BulletInfo[]>();

            //playerlv1
            //add blt_playerlv1
            let blt_playerlv1Array: BulletInfo[] = [];
            blt_playerlv1Array.push({
                name: "blt_player_laser_lv1", soundname: "blt_sound_laser_lv1", isenabled: false, totalcnt: 15, curcnt: 0, tickerPeriod: 20, dx: 0, dy: -10,
                offset_x: 0, offset_y: 0, ref: this._buildBulletPool("blt_player_laser_lv1", 15, 0, -10)
            });
            this._objBulletMap.set("player_bullet_lv1", blt_playerlv1Array);


            //playerlv2
            //add blt_playerlv2  ---F---
            let blt_playerlv2Array: BulletInfo[] = [];
            blt_playerlv2Array.push({
                name: "blt_player_laser_lv1", soundname: "blt_sound_laser_lv1", isenabled: false, totalcnt: 15, curcnt: 0, tickerPeriod: 30, dx: 0, dy: -10,
                offset_x: -25, offset_y: 0, ref: this._buildBulletPool("blt_player_laser_lv1", 15, 0, -10)
            });
            blt_playerlv2Array.push({
                name: "blt_player_laser_lv1", soundname: "blt_sound_laser_lv1", isenabled: false, totalcnt: 15, curcnt: 0, tickerPeriod: 30, dx: 0, dy: -10,
                offset_x: 25, offset_y: 0, ref: this._buildBulletPool("blt_player_laser_lv1", 15, 0, -10)
            });
            this._objBulletMap.set("player_bullet_lv2", blt_playerlv2Array);

            //playerlv3   ---S---
            //add blt_playerlv3
            let blt_playerlv3Array: BulletInfo[] = [];
            blt_playerlv3Array.push({
                name: "blt_player_laser_lv2", soundname: "blt_sound_laser_lv2", isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 40, dx: 0, dy: -10,
                offset_x: 0, offset_y: 0, ref: this._buildBulletPool("blt_player_laser_lv2", 10, 0, -10)
            });
            //left bullet
            blt_playerlv3Array.push({
                name: "blt_player_laser_lv2", soundname: "blt_sound_laser_lv2", isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 40, dx: -5, dy: -10,
                offset_x: -25, offset_y: 0, ref: this._buildBulletPool("blt_player_laser_lv2", 10, -5, -10)
            });       
            //right bullet
            blt_playerlv3Array.push({
                name: "blt_player_laser_lv2", soundname: "blt_sound_laser_lv2", isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 40, dx: 5, dy: -10,
                offset_x: 25, offset_y: 0, ref: this._buildBulletPool("blt_player_laser_lv2", 10, 5, -10)
            });         
            this._objBulletMap.set("player_bullet_lv3", blt_playerlv3Array);

            //playerlv4   ---L---
            //add blt_playerlv4
            let blt_playerlv4Array: BulletInfo[] = [];
            //middle bullet
            blt_playerlv4Array.push({
                name: "blt_player_rocket_lv1", soundname: "blt_sound_rocket_lv1", isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 40, dx: 0, dy: -10,
                offset_x: 0, offset_y: 0, ref: this._buildBulletPool("blt_player_rocket_lv1", 10, 0, -10)
            });      
            this._objBulletMap.set("player_bullet_lv4", blt_playerlv4Array);


            //TIE
            let blt_tieArray: BulletInfo[] = [];
            blt_tieArray.push({
                name: "blt_enemy_laser_lv1", soundname: null, isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 60, dx: 0, dy: 20,
                offset_x: 0, offset_y: 60, ref: this._buildBulletPool("blt_enemy_laser_lv1", 10, 0, 20)
            });
            this._objBulletMap.set("tie_bullet_lv1", blt_tieArray);

            //boss1
            let blt_boss1Array: BulletInfo[] = [];
            blt_boss1Array.push({
                name: "blt_boss_bomb_lv1", soundname: null, isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 60, dx: 0, dy: 6,
                offset_x: 0, offset_y: 30, ref: this._buildBulletPool("blt_boss_bomb_lv1", 10, 0, 6)
            });
            blt_boss1Array.push({
                name: "blt_boss_bomb_lv1", soundname: null, isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 60, dx: -5, dy: 5,
                offset_x: -40, offset_y: 30, ref: this._buildBulletPool("blt_boss_bomb_lv1", 10, -5, 5)
            });
            blt_boss1Array.push({
                name: "blt_boss_bomb_lv1", soundname: null, isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 60, dx: 5, dy: 5,
                offset_x: 40, offset_y: 30, ref: this._buildBulletPool("blt_boss_bomb_lv1", 10, 5, 5)
            });
            blt_boss1Array.push({
                name: "blt_boss_bomb_lv1", soundname: null, isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 60, dx: -8, dy: 8,
                offset_x: -80, offset_y: 30, ref: this._buildBulletPool("blt_boss_bomb_lv1", 10, -8, 8)
            });
            blt_boss1Array.push({
                name: "blt_boss_bomb_lv1", soundname: null, isenabled: false, totalcnt: 10, curcnt: 0, tickerPeriod: 60, dx: 8, dy: 8,
                offset_x: 80, offset_y: 30, ref: this._buildBulletPool("blt_boss_bomb_lv1", 10, 8, 8)
            });
            this._objBulletMap.set("boss_bullet_lv1", blt_boss1Array);
        }

        public Update(): void {
            //only update the bullet that has been enabled
            this._objBulletMap.forEach(
                bulletInfo => {
                    for (let bulletidx: number = 0; bulletidx < bulletInfo.length; bulletidx++) {
                        if (bulletInfo[bulletidx].isenabled) {
                            bulletInfo[bulletidx].ref.forEach(
                                bullet => { bullet.Update(); }
                            );
                        }
                    }                   
                }
            );
        }

        public BulletFire(bulletCarrier: string, x: number, y: number, halfHeight: number): void {
            let ticker: number = createjs.Ticker.getTicks();
            let tickerPeriod: number;
            let bulletInfo: BulletInfo[];
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

            for (let idx: number = 0; idx < bulletInfo.length; idx++) {
                tickerPeriod = bulletInfo[idx].tickerPeriod;
                if (ticker % tickerPeriod == 0) {
                    let bulletSpawn: math.Vec2 = new math.Vec2(x, y - halfHeight);
                    let currentBullet = bulletInfo[idx].curcnt;
                    let bullet = bulletInfo[idx].ref[currentBullet];
                    let bulletTotalCnt = bulletInfo[idx].totalcnt;
                    //bullet firing position offset to the player reg x y
                    let offset_x = bulletInfo[idx].offset_x;
                    let offset_y = bulletInfo[idx].offset_y;
                    bullet.alpha = 1;
                    bullet.x = bulletSpawn.x + offset_x;
                    bullet.y = bulletSpawn.y + offset_y;

                    if (bulletInfo[idx].soundname != null)
                    {
                        createjs.Sound.play(bulletInfo[idx].soundname); 
                    }
                    //update cur bullet index
                    currentBullet = (currentBullet + 1) % bulletTotalCnt;
                    bulletInfo[idx].curcnt = currentBullet;
                }
            }


        }


        public RegisterBullet(tarScene: objects.Scene, objectname: string): void {
            let bulletInfo: BulletInfo[] = this._objBulletMap.get(objectname);
            for (let idx: number = 0; idx < bulletInfo.length; idx++) {
                bulletInfo[idx].isenabled = true;
                let bullets: objects.Bullet[] = bulletInfo[idx].ref;
                bullets.forEach(bullet => { tarScene.addChild(bullet); })
            }

            //if player has multi level bullet, need disable other bullet types
            if (objectname.search("player") != -1) {
                let playerLevelString: string = objectname.substring(16, 17);
                let playerLevel: number = parseInt(playerLevelString);

                this._lastPlayerRegisterLevel = objectname;   //store the latest playerlvl
                //go through all the player bullet types
                for (let lvlidx: number = 1; lvlidx <= 4; lvlidx++) {
                    if (lvlidx != playerLevel) {
                        bulletInfo = this._objBulletMap.get("player_bullet_lv" + lvlidx);
                        for (let idx: number = 0; idx < bulletInfo.length; idx++) {
                            bulletInfo[idx].isenabled = false;
                            let bullets: objects.Bullet[] = bulletInfo[idx].ref;
                            bullets.forEach(bullet => { tarScene.removeChild(bullet); })
                        }
                    }
                }
            }

        }

        public RegisterPlayerPreviousBullet(tarScene: objects.Scene): void {
            this.RegisterBullet(tarScene, this._lastPlayerRegisterLevel);
        }

        public GetTotalBulletTypes(objectname: string): number[] {
            if (objectname.search("player") != -1)  //player
            {
                objectname = this._lastPlayerRegisterLevel;
            }
            let totBulletTypes: number[] = [];
            let bulletInfo: BulletInfo[] = this._objBulletMap.get(objectname);

            for (let idx: number = 0; idx < bulletInfo.length; idx++) {
                if (bulletInfo[idx].isenabled)  //only return currently enabled bullet
                {
                    totBulletTypes.push(idx);
                }
            }
            return totBulletTypes;
        }

        public GetBullets(objectname: string, bulletIdx: number): objects.Bullet[] {
            if (objectname.search("player") != -1)  //player
            {
                objectname = this._lastPlayerRegisterLevel;
            }
            let bulletInfo: BulletInfo[] = this._objBulletMap.get(objectname);
            return bulletInfo[bulletIdx].ref;
        }

        public RegisterBulletThroughCoin(coinType: string): void {
            let bulletType: string;
            switch (coinType)
            {
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
        }

        public GetBulletDamange(bullet: string): number {
            let hitHP: number = 1;
            switch (bullet)
            {
                case "player":   //player craft itself can cause damanage
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
                defualt:
                    hitHP = 1;
                break;
            }
            return hitHP;
        }
    }
}