module scenes {
    export class StartScene extends objects.Scene {
        //Private Instance Variables
        private  _welcomeLabel: objects.Label;
        private  _startButtton: objects.Button; 
        private _ocean: objects.Ocean;

        //Public Properties

        //Constructor
        constructor() {
            super();

            this.Start();
        }

        //Private Methods
        private _startButtonClick(): void{
            managers.Game.currentScene = config.Scene.PLAY;
        }



        //Public Methods
        //Initialize Game Variables and objects
        public Start(): void {
            this._ocean = new objects.Ocean();
            this._welcomeLabel = new objects.Label("Mail Pilot", "60px", "Consolas", "#FFFF00", 320, 240, true);
            this._startButtton = new objects.Button("startButton", 320, 340);
            this.Main();
        }

        public Update(): void {
            this._ocean.Update();
        }

        public Destroy():void {
            this.removeAllChildren();
        }

        public Main(): void {
            //add the ocean to the scene
            this.addChild(this._ocean);

            //add the welcome label to the scene
            this.addChild(this._welcomeLabel);
            //add the start btn to the scene
            this.addChild(this._startButtton);

            this._startButtton.on("click", this._startButtonClick);
        }
    }
}