
/*
* File name: bullet.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: manage the bullet types
* Revision history:
* June 24 2018 created file
* July 30 2018 merging the A2 solution
*/
type BulletInfo = { name: string; isenabled: boolean; totalcnt: number; curcnt: number; tickerPeriod: number; dx: number; dy: number; offset_x: number; offset_y: number; ref: objects.Bullet[] };

module managers {
    export class Bullet {
        //private instance variables
        private _objBulletMap : Map<string, BulletInfo[]>;

        private _lastPlayerRegisterLevel : string;
    
        //constructors
        constructor (){
            this.Start();  //to be refined

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
        //public methods
        public Start(): void {
            this._objBulletMap = new Map<string, BulletInfo[]>();

            //playerlv1
            //add blt_playerlv1
            let blt_playerlv1Array: BulletInfo[] = [];
            blt_playerlv1Array.push({
                name: "blt_laser_lv1", isenabled: false, totalcnt: 20, curcnt: 0, tickerPeriod: 40, dx: 0, dy: -10,
                offset_x: 0, offset_y: 0, ref: this._buildBulletPool("blt_laser_lv1", 20, 0, -10)
            });
            this._objBulletMap.set("playerlv1", blt_playerlv1Array);


            //playerlv2
            //add blt_playerlv2
            let blt_playerlv2Array: BulletInfo[] = [];
            blt_playerlv2Array.push({
                name: "blt_playerlv2", isenabled: false, totalcnt: 20, curcnt: 0, tickerPeriod: 30, dx: 0, dy: -10,
                offset_x: 0, offset_y: 0, ref: this._buildBulletPool("blt_playerlv2", 20, 0, -10)
            });
            this._objBulletMap.set("playerlv2", blt_playerlv2Array);

            //warship
            //add bomb
            let blt_playerlv3Array: BulletInfo[] = [];
            blt_playerlv3Array.push({
                name: "bomb", isenabled: false, totalcnt: 20, curcnt: 0, tickerPeriod: 30, dx: 0, dy: 2,
                offset_x: 0, offset_y: 30, ref: this._buildBulletPool("bomb", 20, 0, 2)
            });
            this._objBulletMap.set("warship", blt_playerlv3Array);

            //boss1
            //add bomb
            let blt_boss1Array: BulletInfo[] = [];
            blt_boss1Array.push({
                name: "bomb", isenabled: false, totalcnt: 20, curcnt: 0, tickerPeriod: 30, dx: 0, dy: 2,
                offset_x: 0, offset_y: 30, ref: this._buildBulletPool("bomb", 20, 0, 2)
            });
            this._objBulletMap.set("boss1", blt_boss1Array);

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
                case "warship":
                    bulletInfo = this._objBulletMap.get("warship");
                    break;
                case "boss1":
                    bulletInfo = this._objBulletMap.get("boss1");
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
                    currentBullet = (currentBullet + 1) % bulletTotalCnt;
                    bulletInfo[idx].curcnt = currentBullet;
                    //createjs.Sound.play("bulletSound");   //### hard code to turn this off
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
                let playerLevelString: string = objectname.substring(8, 9);
                let playerLevel: number = parseInt(playerLevelString);

                this._lastPlayerRegisterLevel = objectname;   //store the latest playerlvl
                //go through all the player bullet types
                //### 2 is player level hard code, should be 3
                for (let lvlidx: number = 1; lvlidx <= 2; lvlidx++) {
                    if (lvlidx != playerLevel) {
                        bulletInfo = this._objBulletMap.get("playerlv" + lvlidx);
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
            let bulletInfo: BulletInfo[] = this._objBulletMap.get(this._lastPlayerRegisterLevel);
            for (let idx: number = 0; idx < bulletInfo.length; idx++) {
                bulletInfo[idx].isenabled = true;
                let bullets: objects.Bullet[] = bulletInfo[idx].ref;
                bullets.forEach(bullet => { tarScene.addChild(bullet); })
            }
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
    }
}