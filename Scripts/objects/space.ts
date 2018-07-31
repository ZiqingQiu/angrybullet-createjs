/*
* File name: space.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: defines the game object of space
* Revision history:
* June 24 2018 created file
*/
module objects {
    export class Space extends createjs.Bitmap {
        //Private Instance Variables
        //moving speed
        private _dy: number;

        //Public Properties

        //Constructor
        constructor() {
            super(managers.Game.assetManager.getResult("space"));
            this.Start();
        }
        //Private Methods
        private _reset(): void {
            this.y = -3200;
        }

        private _move(): void {
            this.y += this._dy;
        }

        private _checkBounds(): void {
            if (this.y >= 0)
            {
                this._reset();
            }
        }

        //Public Methods
        public Start(): void {
            this._dy = 2;
            this._reset();
        }

        public Update(): void {
            this._move();
            this._checkBounds();
        }
    }
}