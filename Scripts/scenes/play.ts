module scenes {
    export class PlayScene extends objects.Scene {
        //Private Instance Variables
        private _space: objects.Space;
        private _player: objects.Player;
        private _tie: objects.TIE[];
        private _tieNum: number;

        private _scoreBoard: managers.ScoreBoard;
        private _bulletManager: managers.Bullet;
        private _engineSound: createjs.AbstractSoundInstance;

        private _coin: objects.Coin;
        private _enemy: objects.Enemy;

        //Public Properties


        //Constructor
        constructor() {
            super();

            this.Start();
        }

        //Private Methods



        //Public Methods
        //Initialize Game Variables and objects
        public Start(): void {
            this._space = new objects.Space();
            this._player = new objects.Player();
            managers.Game.player = this._player;

            //make a ref to the bullet manager in the game manager
            this._bulletManager = new managers.Bullet();
            managers.Game.bulletManager =  this._bulletManager;

            //create an enemy
            this._enemy = new objects.Enemy();

            this._coin = new objects.Coin();

            //inistantiate the TIE array
            this._tieNum = 2;
            this._tie = new Array<objects.TIE>();
            for (let count = 0; count < this._tieNum; count++) {
                this._tie[count] = new objects.TIE();
                
            }

            this._engineSound = createjs.Sound.play("stage1");
            this._engineSound.loop = -1;  //play forever
            this._engineSound.volume = 0.1;

            //create the scoreboard UI 
            this._scoreBoard = new managers.ScoreBoard();
            managers.Game.scoreBoard = this._scoreBoard;

            this.Main();
        }

        //triggered every frame
        public Update(): void {
            console.log("num objects: " + this.numChildren);
            this._space.Update();
            this._player.Update();
            this._enemy.Update();
            this._bulletManager.Update();
            //to be refine later
            this._coin.Update();

            //check collision between player and coin
            managers.Collision.Check(this._player, this._coin);

            this._tie.forEach(tie => {
                tie.Update();
                //check collision between player and current tie
                managers.Collision.Check(this._player, tie);
            });

            this._bulletManager.Bullets.forEach(bullet =>
            {
                managers.Collision.Check(bullet, this._enemy);
            })

            //check bullet and TIH
            for (let count = 0; count < this._tieNum; count++) {
                if (this._tie[count].alpha == 1){
                    for (let bulletCount = 0; bulletCount < this._bulletManager.BulletCnts; bulletCount++)
                    {
                        if (this._bulletManager.Bullets[bulletCount].alpha == 1)
                        {
                            managers.Collision.Check(this._bulletManager.Bullets[bulletCount], this._tie[count]);
                        }
                    }
                }               
            }

            //if lives fall below zero, switch to game over scene
            if (this._scoreBoard.Lives <= 0)
            {
                this._engineSound.stop();
                managers.Game.currentScene = config.Scene.OVER; 
            }
        }

        public Destroy():void {
            this.removeAllChildren();
        }

        public Main(): void {
            //pay attention the orders
            //add space to the scene
            this.addChild(this._space);
            //add coin to the scene
            this.addChild(this._coin);
            //add player to the scene
            this.addChild(this._player);
            this.addChild(this._player.planeFlash);    
            //add enemy to the scene
            this.addChild(this._enemy);
            //add bullets to the scene
            this._bulletManager.Bullets.forEach(bullet =>
                {this.addChild(bullet);} 
            )        
            //add ties to the scene
            this._tie.forEach(tie => {
                this.addChild(tie);
            });

            //add score board to the scene
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
        }
    }
}