/*
* File name: TIE.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: defines the game object of TIE
* Revision history:
* June 24 2018 created file
* Aug 6 2018 refine HP API
*/
module objects {
    export class TIE extends objects.GameObject {
        //Private Instance Variables
        private _hp: number;
        private _bulletname: string;

        //Public Properties

        //Constructor
        constructor(objname: string, bulname: string, hp: number) {
            super(objname);
            this._hp = hp;
            this._bulletname = bulname;
            this.Start();
        }
        //Private Methods
        public Reset(): void {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = - this.height;
            //drift randomly
            this._dx = Math.floor((Math.random() * 2) - 1);
            this._dy = Math.floor((Math.random() * 2) + 3);
            //reset enemy
            this._hp = 3;
            //reset alpha
            this.alpha = 0;
        }

        public Move(): void {
            this.y += this._dy;
            this.x += this._dx;
        }

        public CheckBounds(): void {
            if (this.y >= 0 && this.alpha == 0)
            {
                this.alpha = 1;
            }

            //check lower bounds
            if (this.y >= 480 + this.height)
            {
                this.Reset();
            }

        }

        //Public Methods
        public Start(): void {
            this._dy = 5;
            this._hp = 3; 
            this.Reset();
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
            this.BulletFire();
        }

        public GetHit(hitType: string): void {
            if (this.alpha != 0) {
                //add explosion
                managers.Game.explosionManager.TriggerExplosion("explosion", managers.Game.currentSceneObject, this.x, this.y);
                //points for destroy enemy
                managers.Game.scoreBoard.addScore(200);

                this._hp -= managers.Game.bulletManager.GetBulletDamange(hitType);
                if (this._hp <= 0)
                {
                    //reset enemy
                    this.Reset();
                }                
            }
        }

        public BulletFire(): void {
            if (this.alpha == 1)
            {
                managers.Game.bulletManager.BulletFire(this._bulletname, this.x, this.y, this.halfHeight);
            }
        }
    }
}