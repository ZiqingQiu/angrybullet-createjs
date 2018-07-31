/*
* File name: coin.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: defines the game object of coin
* Revision history:
* June 24 2018 created file
*/
module objects {
    export class Coin extends objects.GameObject {
        //Private instance variables

        //Public properties

        //Constructors
        constructor() {
            super("coin");
            this.Start();
        }


        //Private methods

        //Public methods
        public Reset(): void {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = - this.height;
            this.alpha = 1;
        }

        public Move(): void {
            this.y += this._dy;
        }

        public CheckBounds(): void {
            if (this.y >= (480 + this.height))
            {
                this.Reset();
            }
        }

        public Start(): void {
            this._dy = 5;
            this.Reset();
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
        }
    }
}