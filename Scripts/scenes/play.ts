module scenes {
    export class PlayScene extends objects.Scene {
        //Private Instance Variables
        private _space: objects.Space;
        private _plane: objects.Plane;
        private _clouds: objects.Cloud[];
        private _cloudNum: number;

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
            this._plane = new objects.Plane();
            managers.Game.plane = this._plane;

            //make a ref to the bullet manager in the game manager
            this._bulletManager = new managers.Bullet();
            managers.Game.bulletManager =  this._bulletManager;

            //create an enemy
            this._enemy = new objects.Enemy();

            this._coin = new objects.Coin();

            //inistantiate the cloud array
            this._cloudNum = 2;
            this._clouds = new Array<objects.Cloud>();
            for (let count = 0; count < this._cloudNum; count++) {
                this._clouds[count] = new objects.Cloud();
                
            }

            this._engineSound = createjs.Sound.play("engine");
            this._engineSound.loop = -1;  //play forever
            this._engineSound.volume = 0.3;

            //create the scoreboard UI 
            this._scoreBoard = new managers.ScoreBoard();
            managers.Game.scoreBoard = this._scoreBoard;

            this.Main();
        }

        //triggered every frame
        public Update(): void {
            //console.log("num objects: " + this.numChildren);
            this._space.Update();
            this._plane.Update();
            this._enemy.Update();
            this._bulletManager.Update();
            //to be refine later
            this._coin.Update();

            //check collision between plane and coin
            managers.Collision.Check(this._plane, this._coin);

            this._clouds.forEach(cloud => {
                cloud.Update();
                //check collision between plane and current cloud
                managers.Collision.Check(this._plane, cloud);
            });

            this._bulletManager.Bullets.forEach(bullet =>
            {
                managers.Collision.Check(bullet, this._enemy);
            })

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
            //add plane to the scene
            this.addChild(this._plane);
            this.addChild(this._plane.planeFlash);    
            //add enemy to the scene
            this.addChild(this._enemy);
            //add bullets to the scene
            this._bulletManager.Bullets.forEach(bullet =>
                {this.addChild(bullet);} 
            )        
            //add clouds to the scene
            this._clouds.forEach(cloud => {
                this.addChild(cloud);
            });

            //add score board to the scene
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
        }
    }
}