/*
* File name: TIE.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: defines the game object of TIE
* Revision history:
* June 24 2018 created file
*/
module objects {
    export class TIE extends objects.GameObject {
        //Private Instance Variables
        private _hp: number;

        //Public Properties

        //Constructor
        constructor() {
            super("tie");
            this.Start();
        }
        //Private Methods
        public Reset(): void {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = - this.height;
            //drift randomly
            this._dx = Math.floor((Math.random() * 2) - 1);
            this._dy = Math.floor((Math.random() * 2) + 2);
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
                createjs.Sound.play("explosion");
                let explosion = new objects.Explosion("explosion");
                explosion.x = this.x;
                explosion.y = this.y;
                managers.Game.currentSceneObject.addChild(explosion);
                //points for destroy enemy
                managers.Game.scoreBoard.addScore(200);

                let hitHP: number = 1;
                switch(hitType)
                {
                    case "player":
                    hitHP = 3;
                    break;
                    case "blt_laser_lvq":
                    hitHP = 1;
                    break;
                    case "blt_laser_lv2":
                    hitHP = 2;
                    break;
                    defualt:
                    break;
                }
                this._hp -= hitHP;
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
                managers.Game.bulletManager.BulletFire("tie_bullet_lv1", this.x, this.y, this.halfHeight);
            }
        }
    }
}