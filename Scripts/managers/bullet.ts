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
    }
}