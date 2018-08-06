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
        private _tarScene: objects.Scene;
        //public properties

        //constructors
        constructor(spriteString:string) {
            super(spriteString);
        }

        //private methods
        private _animationEnded(): void
        {
            this.alpha = 0;
            this.off("animationend", this._animationEnded.bind(this), false);
            this._tarScene.removeChild(this);
        }


        //publlic methods
        public Explode(tarScene: objects.Scene, x: number, y: number): void {
            this.alpha = 1;
            this.x = x;
            this.y = y;
            this._tarScene = tarScene;
            tarScene.addChild(this);
            this.on("animationend", this._animationEnded.bind(this), false);
        }

        public Update(): void {

        }

    }
}