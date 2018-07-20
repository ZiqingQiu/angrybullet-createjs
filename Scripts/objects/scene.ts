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