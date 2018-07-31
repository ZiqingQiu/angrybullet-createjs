/*
* File name: bullet.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: defines the game object of bullets
* Revision history:
* June 24 2018 created file
*/
module objects {
    export class Bullet extends objects.GameObject {
        //private instance variables
        //public properties


        //constructors
        constructor(bulletType: string, dx: number, dy: number) {
            super(bulletType);
            this._dx = dx;
            this._dy = dy;
            this.Start();
        }

        //private methods


        //public methods
        public Start(): void {
            this._dx = 0;
            this._dy = -10;
            this.Reset();            
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
        }

        public Reset(): void {
            this.x = -5000;
            this.y = -5000;

            this.alpha = 0;
        }

        public CheckBounds(): void {
            if (this.y >= 0 && this.alpha == 0)
            {
                this.alpha = 1;
            }

            if (this.y <= -this.height)
            {
                this.Reset();
            }
        }

        public Move(): void {
            this.y += this._dy;
        }

        public DisappearBullet(): void {
            this.Reset();
        }

    }
}