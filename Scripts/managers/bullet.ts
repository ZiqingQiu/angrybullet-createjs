
/*
* File name: bullet.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: manage the bullet types
* Revision history:
* June 24 2018 created file
*/
type BulletInfo = { name: string; isenabled: boolean; totalcnt: number; curcnt: number; tickerPeriod: number; ref: objects.Bullet[] };

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
        private _buildBulletPool(bulletname: string, totalCnt: number): objects.Bullet[] {
            let bullets: objects.Bullet[] = [];
            for (let count = 0; count < totalCnt; count++) {
                bullets[count] = new objects.Bullet(bulletname);             
            }
            return bullets;
        }

        //public methods
        public Start(): void {
            this._objBulletMap = new Map<string, BulletInfo[]>();

            //playerlv1
            //add blt_playerlv1
            let blt_playerlv1Array: BulletInfo[] = [];
            blt_playerlv1Array.push({name : "blt_playerlv1" , isenabled : false, totalcnt : 20 , curcnt : 0, tickerPeriod : 20, ref: this._buildBulletPool("blt_playerlv1", 20)});
            this._objBulletMap.set("playerlv1", blt_playerlv1Array);

            
            //playerlv2
            //add blt_playerlv2
            let blt_playerlv2Array: BulletInfo[] = [];
            blt_playerlv2Array.push({name : "blt_playerlv2" , isenabled : false, totalcnt : 20 , curcnt : 0, tickerPeriod : 10, ref: this._buildBulletPool("blt_playerlv2", 20)});
            this._objBulletMap.set("playerlv2", blt_playerlv2Array);

        }


        public Update(): void {
        //only update the bullet that has been enabled
            for (let idx: number = 0; idx < this._objBulletMap.keys.length; idx ++)
            {
                for (let bulletidx: number = 0; bulletidx < this._objBulletMap[idx].BulletInfo.length; bulletidx ++)
                {
                    if (this._objBulletMap[idx].BulletInfo[bulletidx].isenabled)
                    {
                        this._objBulletMap[idx].BulletInfo[bulletidx].ref.forEach(
                            bullet => {bullet.Update();}
                        );
                    }
                }
            }
        }

        public BulletFire(bulletCarrier: string, x: number, y: number, halfHeight: number): void {
            let ticker: number = createjs.Ticker.getTicks();
            let tickerPeriod: number;

            switch (bulletCarrier)
            {
                case "player":
                //### hard code 2 here
                let bulletInfo : BulletInfo[];
                bulletInfo = this._objBulletMap.get(this._lastPlayerRegisterLevel);
                for (let idx: number = 0; idx < bulletInfo.length; idx++)
                {
                    tickerPeriod = bulletInfo[idx].tickerPeriod;
                    
                    if (ticker % tickerPeriod == 0)
                    {
                        let bulletSpawn: math.Vec2 = new math.Vec2(x, y - halfHeight);
                        let currentBullet = bulletInfo[idx].curcnt;  
                        let bullet = bulletInfo[idx].ref[currentBullet];
                        let bulletTotalCnt = bulletInfo[idx].totalcnt;
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


        }


        public RegisterBullet(tarScene : objects.Scene, objectname : string): void
        {
            let bulletInfo : BulletInfo[] = this._objBulletMap.get(objectname);
            for (let idx: number = 0; idx < bulletInfo.length; idx++)
            {
                bulletInfo[idx].isenabled = true;
                let bullets: objects.Bullet[] = bulletInfo[idx].ref;                
                bullets.forEach(bullet =>
                    {tarScene.addChild(bullet);})
            }

            //if player has multi level bullet, need disable other bullet types
            if (objectname.search("player") != -1)
            {
                let playerLevelString: string = objectname.substring(8,9);
                let playerLevel : number = parseInt(playerLevelString);

                this._lastPlayerRegisterLevel = objectname;   //store the latest playerlvl

                //go through all the player bullet types
                //### 2 is hard code, should be 3
                for (let lvlidx: number = 1; lvlidx <= 2; lvlidx++)
                {
                    if (lvlidx != playerLevel)
                    {
                        bulletInfo = this._objBulletMap.get("playerlv" + lvlidx);
                        for (let idx: number = 0; idx < bulletInfo.length; idx++)
                        {
                            bulletInfo[idx].isenabled = false;
                            let bullets: objects.Bullet[] = bulletInfo[idx].ref;                
                            bullets.forEach(bullet =>
                                {tarScene.removeChild(bullet);})
                        }
                    }
                }
            }   

        }

        public GetTotalBulletTypes(objectname : string): number[] {
            if (objectname.search("player") != -1)  //player
            {
                objectname = this._lastPlayerRegisterLevel;
            }
            let totBulletTypes : number[] = [];
            let bulletInfo : BulletInfo[] = this._objBulletMap.get(objectname);

            for (let idx:number = 0; idx < bulletInfo.length; idx++)
            {
                if (bulletInfo[idx].isenabled)  //only return currently enabled bullet
                {
                    totBulletTypes.push(idx);
                }
            }
            return totBulletTypes;
        }

        public GetBullets(objectname : string, bulletIdx : number): objects.Bullet[] {
            if (objectname.search("player") != -1)  //player
            {
                objectname = this._lastPlayerRegisterLevel;
            }
            let bulletInfo : BulletInfo[] = this._objBulletMap.get(objectname);
            return bulletInfo[bulletIdx].ref;
        }
    }
}