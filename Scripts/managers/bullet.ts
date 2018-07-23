
type BulletInfo = { name: string; isenabled: boolean; totalcnt: number; curcnt: number; ref: objects.Bullet[] };

module managers {
    export class Bullet {
        //private instance variables
        private _objBulletMap : Map<string, BulletInfo[]>;
    
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
            let myarray: BulletInfo[] = [];
            this._objBulletMap = new Map<string, BulletInfo[]>();

            //playerlv1
            //add blt_playerlv1
            myarray.push({name : "blt_playerlv1" , isenabled : true, totalcnt : 20 , curcnt : 0, ref: this._buildBulletPool("blt_playerlv1", 20)});
            this._objBulletMap.set("playerlv1", myarray);

        }


        public Update(): void {
        //only update the bullet that has been enabled
            for (let idx: number = 0; idx < this._objBulletMap.length; idx ++)
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
                tickerPeriod = 10;
                break;
            }


            if (ticker % tickerPeriod == 0)
            {
                let bulletSpawn: math.Vec2 = new math.Vec2(x, y - halfHeight);
                let currentBullet = this._objBulletMap.get("player")[0].curcnt;  //####hard code 0 for now
                let bullet = this._objBulletMap.get("player")[0].ref[currentBullet];
                let bulletTotalCnt = this._objBulletMap.get("player")[0].totalcnt;
                bullet.alpha = 1;
                bullet.x = bulletSpawn.x;
                bullet.y = bulletSpawn.y;
                currentBullet = (currentBullet + 1) % bulletTotalCnt;
                this._objBulletMap.get("player")[0].curcnt = currentBullet;
                createjs.Sound.play("bulletSound");
            }
        }


        public RegisterBullet(tarScene : objects.Scene, objectname : string): void
        {
            let bulletInfo : BulletInfo[] = this._objBulletMap.get(objectname);
            for (let idx: number = 0; idx < bulletInfo.length; idx++)
            {
                let bullets: objects.Bullet[] = bulletInfo[idx].ref;
                bullets.forEach(bullet =>
                    {tarScene.addChild(bullet);})
            }

        }

        public GetTotalBulletTypes(objectname : string): number[] {
            let totBulletTypes : number[] = [];
            let bulletInfo : BulletInfo[] = this._objBulletMap.get(objectname);
            for (let idx:number = 0; idx < bulletInfo.length; idx++)
            {
                if (bulletInfo[idx].isenabled)
                {
                    totBulletTypes.push(idx);
                }
            }
            return totBulletTypes;
        }

        public GetBullets(objectname : string, bulletIdx : number): objects.Bullet[] {
            let bulletInfo : BulletInfo[] = this._objBulletMap.get(objectname);
            return bulletInfo[bulletIdx].ref;
        }
    }
}