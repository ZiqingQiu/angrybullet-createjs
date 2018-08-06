/*
* File name: level1_boss.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: game object of level1_boss1
* Revision history:
* Jul 30 2018 created file
* Aug 6 2018 refine update HP API
*/
module objects {
    export class Level1BOSS extends objects.GameObject {
        //private instance variables
        private _hp: number;
        private _isEnable: boolean;

        //public properties
        //constructor
        constructor() {
            super("boss_lv1");
            this.Start();   
        } 

        //private methods
        //public methods
        public Reset(): void {
            this.x = config.Screen.WIDTH - this.width;
            this.y = config.Screen.HEIGHT / 4;
            //drift randomly
            this._dx = Math.floor((Math.random() * 3) - 6);
            this._dy = Math.floor((Math.random() * 4) - 2);
            //reset alpha
            this.alpha = 0;
        }

        public Move(): void {
            this.y += this._dy;
            this.x += this._dx;
        }

        public CheckBounds(): void {
            if ((this.y >= 0 && this.y <= 480) && (this.x >= 0 && this.x <= this.width + config.Screen.WIDTH) )
            {
                if (this.alpha == 0 && this._isEnable)
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
            this._hp = 50; 
            this._isEnable = false;
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
            this.BulletFire();
        }

        public BulletFire(): void {
            if (this.alpha == 1)
            {
                managers.Game.bulletManager.BulletFire("boss_bullet_lv1", this.x, this.y, this.halfHeight);
            }
        }

        public SetEnable(isEnable: boolean): void {
            this._isEnable = isEnable;
        }

        public GetHit(hitType: string): void {
            if (this.alpha != 0) {
                //add explosion
                createjs.Sound.play("explosion");
                let explosion = new objects.Explosion("explosion");
                explosion.x = this.x;
                explosion.y = this.y;
                managers.Game.currentSceneObject.addChild(explosion);
                //points for destroy slaveI
                managers.Game.scoreBoard.addScore(300);
                //update hp
                this._hp -= managers.Game.bulletManager.GetBulletDamange(hitType);;
                if (this._hp <= 0)
                {
                    managers.Game.currentScene = config.Scene.OVER; 
                }                
            }
        }

        public getHP(): number {
            return this._hp;
        }
    }
}