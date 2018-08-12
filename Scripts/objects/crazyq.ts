/*
* File name: level1_boss.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: game object of level1_boss1
* Revision history:
* Aug 6 2018 create file
*/
module objects {
    export class CrazyQ extends objects.GameObject {
        //private instance variables
        private _hp: number;
        private _bulletname: string;
        private _timer: number;

        //public properties
        //constructor
        constructor(objname: string, bulname: string, hp: number) {
            super(objname);
            this._hp = hp;
            this._bulletname = bulname;
            this.Start();   
        } 

        //private methods
        //public methods
        public Reset(): void {
            this.x = config.Screen.WIDTH - this.width;
            this.y = config.Screen.HEIGHT / 2;
            //drift randomly
            this._dx = Math.floor((Math.random() * 2) - 4);
            this._dy = Math.floor((Math.random() * 2) - 1);     
            //reset alpha
            this.alpha = 0;
        }

        public Move(): void {
            this.y += this._dy;
            this.x += this._dx;
            this._timer++;
        }

        public CheckBounds(): void {
            if ((this.y >= 0 && this.y <= 480) && (this.x >= 0 && this.x <= this.width + config.Screen.WIDTH) )
            {
                if (this.alpha == 0 && this._timer > 300)
                {
                    this.alpha = 1;               
                }
            }
            else
            {
                this.Reset();
            }
        }

        public Start(): void {
            this._timer = 0;
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
            this.BulletFire();
        }

        public BulletFire(): void {
            if (this.alpha == 1)
            {
                managers.Game.bulletManager.BulletFire(this._bulletname, this.x, this.y, this.halfHeight);
            }
        }

        public GetHit(hitType: string): void {
            if (this.alpha != 0) {
                //add explosion
                managers.Game.explosionManager.TriggerExplosion("explosion", managers.Game.currentSceneObject, this.x, this.y);
                //points for destroy crazyq
                managers.Game.scoreBoard.addScore(30);
                //update hp
                this._hp -= managers.Game.bulletManager.GetBulletDamange(hitType);;
                if (this._hp <= 0)
                {
                    managers.Game.scoreBoard.addScore(300);
                    this.Reset();
                    this._timer = 0;
                }                
            }
        }

        public getHP(): number {
            return this._hp;
        }
    }
}