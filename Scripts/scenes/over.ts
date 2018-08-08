module scenes {
    export class OverScene extends objects.Scene {
        //Private Instance Variables
        private  _overLabel: objects.Label;
        private  _backButtton: objects.Button; 
        private _space: objects.Space;

        private _scoreboard: managers.ScoreBoard;

        //Public Properties
        constructor() {
            super();

            this.Start();
        }

        //Private Methods
        private _restartButtonClick(): void{
            this._scoreboard.resetScore();    
            managers.Game.currentScene = config.Scene.LEVEL1;
        }



        //Public Methods
        //Initialize Game Variables and objects
        public Start(): void {
            this._space = new objects.Space("space_lv1");
            this._overLabel = new objects.Label(managers.Game.scoreBoard.gameResult, "50px", "Starjedi", "#FFFF00", 310, 140, true);
            this._backButtton = new objects.Button("restartButton", 320, 340);

            this._scoreboard = managers.Game.scoreBoard;
            this.Main();
        }

        public Update(): void {
            this._space.Update();
        }

        public Destroy():void {
            this.removeAllChildren();
        }

        public Main(): void {
            //add the space to the scene
            this.addChild(this._space);

            //add the welcome label to the scene
            this.addChild(this._overLabel);

            //add the back btn to the scene
            this.addChild(this._backButtton);

            //add scoreboard to the scene
            this._scoreboard.HighScore = managers.Game.HighScore;
            this.addChild(this._scoreboard.HighScoreLabel);

            //event listeners
            this._backButtton.on("click", this._restartButtonClick);
        }
    }
}