/*
* File name: slaveI.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: defines the game object of slaveI
* Revision history:
* June 24 2018 created file
*/

module objects {
    export class slaveI extends objects.GameObject {
        //Private Instance Variables


        //Public Properties

        //Constructor
        constructor() {
            super("slaveI");
            this.Start();
        }
        //Private Methods
        public Reset(): void {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = - this.height;
            this.alpha = 0;
        }

        public Move(): void {
            this.y += this._dy;
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
            this._dy = 10;
            this.Reset();
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
        }

        public GetHit(): void {
            if (this.alpha != 0) {
                //add explosion
                managers.Game.explosionManager.TriggerExplosion("smallexplosion", managers.Game.currentSceneObject, this.x, this.y);
                //points for destroy enemy
                managers.Game.scoreBoard.addScore(100);
                //reset enemy
                this.Reset();
            }
        }
    }
}