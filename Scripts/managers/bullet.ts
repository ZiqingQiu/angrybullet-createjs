module managers {
    export class Bullet {
        //private instance variables
        private _bulletCount: number;

        //public properties
        public Bullets: objects.Bullet[];
        public CurrentBullet: number;

        //Public Properties
        get BulletCnts(): number {
            return this._bulletCount;
        }

        //constructors
        constructor (){
            this.Start();
        }

        //private methods
        private _buildBulletPool(): void {
            for (let count = 0; count < this._bulletCount; count++) {
                this.Bullets[count] = new objects.Bullet();             
            }
        }

        //public methods
        public Start(): void {
            //set the default bullet count
            this._bulletCount = 50;

            //create the bullet container
            this.Bullets = new Array<objects.Bullet>();

            //build bullet array
            this._buildBulletPool();

            //set the current bullet to 0
            this.CurrentBullet = 0;
        }

        public Update(): void {
            this.Bullets.forEach(
                bullet => {bullet.Update();}
            );
        }

        public BulletFire(bulletCarrier: string, x: number, y: number, halfHeight: number): void {
            let ticker: number = createjs.Ticker.getTicks();
            let tickerPeriod: number;

            switch (bulletCarrier)
            {
                case "playerlv1":
                tickerPeriod = 10;
                break;
            }


            if (ticker % tickerPeriod == 0)
            {
                let bulletSpawn: math.Vec2 = new math.Vec2(x, y - halfHeight);
                let currentBullet = managers.Game.bulletManager.CurrentBullet;
                let bullet = managers.Game.bulletManager.Bullets[currentBullet];
                bullet.x = bulletSpawn.x;
                bullet.y = bulletSpawn.y;
                managers.Game.bulletManager.CurrentBullet = (managers.Game.bulletManager.CurrentBullet + 1) % 50;
                createjs.Sound.play("bulletSound");
            }
        }
    }
}