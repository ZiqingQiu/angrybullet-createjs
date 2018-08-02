

module scenes {
    export class Level1Scene extends objects.Scene {
        //Private Instance Variables
        private _space: objects.Space;
        private _player: objects.Player;
        private _tie: objects.TIE[];
        private _tieNum: number;

        private _scoreBoard: managers.ScoreBoard;
        private _bulletManager: managers.Bullet;
        private _engineSound: createjs.AbstractSoundInstance;

        private _coin: objects.Coin;
        private _slaveI: objects.slaveI;

        //Public Properties


        //Constructor
        constructor() {
            super();

            this.Start();
        }

        //Private Methods
        private CheckCollisionWOBullet(): void{
            //check collision between player and coin
            managers.Collision.Check(this._player, this._coin);

            //check collision between player and current tie
            this._tie.forEach(tie => {
                tie.Update();
                managers.Collision.Check(this._player, tie);
            });
        }

        private CheckPlayerBullet(): void{
            //check collision with player's bullets
            let bulletIdxArray : number[] = [];
            let bullets: objects.Bullet[] = [];
            bulletIdxArray = managers.Game.bulletManager.GetTotalBulletTypes("player");
            for (let idx: number = 0; idx < bulletIdxArray.length; idx++)
            {
                bullets = managers.Game.bulletManager.GetBullets("player", bulletIdxArray[idx]);
                bullets.forEach(bullet =>
                    {
                        if (bullet.alpha == 1)
                        {
                            //check collision player-bullet -- slaveI
                            managers.Collision.Check(bullet, this._slaveI);  
                        }

                        if (bullet.alpha == 1)
                        {
                            //check collision player-bullet -- TIE
                            for (let count = 0; count < this._tieNum; count++) {
                                if (this._tie[count].alpha == 1){
                                    managers.Collision.Check(bullet, this._tie[count]);
                                }               
                            }
                        }

                    })
            }
        }

        private CheckEnemyBullet(): void{
            let bulletIdxArray : number[] = [];
            let bullets: objects.Bullet[] = [];
            //check collision with tie's bullets
            bulletIdxArray = managers.Game.bulletManager.GetTotalBulletTypes("tie_bullet_lv1");
            for (let idx: number = 0; idx < bulletIdxArray.length; idx++)
            {
                bullets = managers.Game.bulletManager.GetBullets("tie_bullet_lv1", bulletIdxArray[idx]);
                bullets.forEach(bullet =>
                    {
                        if (bullet.alpha == 1)
                        {
                            //check collision enemy-bullet -- player
                            managers.Collision.Check(bullet, this._player);  
                        }                        
                    })
            }
        }


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
            this._slaveI = new objects.slaveI();

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
            this._slaveI.Update();
            this._bulletManager.Update();
            //to be refine later
            this._coin.Update();

            //check collision without bullets
            this.CheckCollisionWOBullet();
            //check player's bullet
            this.CheckPlayerBullet();
            //check enemy's bullet
            this.CheckEnemyBullet();

        }

        public Destroy():void {
            this._engineSound.stop();
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
            this.addChild(this._slaveI);

            //add bullets to the scene
            managers.Game.bulletManager.RegisterBullet(this, "player_bullet_lv1");
            managers.Game.bulletManager.RegisterBullet(this, "tie_bullet_lv1");
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