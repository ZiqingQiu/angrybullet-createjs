/*
* File name: scene.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: defines the game object of scene
* Revision history:
* June 24 2018 created file
*/
module objects {
    export abstract class Scene extends createjs.Container {
        //Instance Variables

        //Public properties
        public assetManager;

        //Constructors
        constructor() {
            super();
            this.assetManager = managers.Game.assetManager;
        }
        //Private Methods

        //Public Methods
        public Start(): void {

        }

        public Update(): void {
        }

        public Destroy():void {

        }

        public Main(): void {
            
        }
    }
}