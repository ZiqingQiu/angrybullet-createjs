/*
* File name: explosion.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: defines the game object of explosion
* Revision history:
* June 24 2018 created file
*/
module objects {
    export class Explosion extends objects.GameObject {
        //private instance variables

        //public properties

        //constructors
        constructor(spriteString:string) {
            super(spriteString);
            this.Start();
        }

        //private methods
        private _animationEnded(): void
        {
            this.alpha = 0;
            this.off("animationend", this._animationEnded.bind(this), false);
            managers.Game.currentSceneObject.removeChild(this);
        }


        //publlic methods
        public Start(): void {
            this.on("animationend", this._animationEnded.bind(this), false);
        }

        public Update(): void {

        }

    }
}