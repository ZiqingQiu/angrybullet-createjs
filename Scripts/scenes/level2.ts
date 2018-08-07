module scenes {
    export class Level2Scene extends objects.Scene {
        //private instance variables
        private _space: objects.Space;
        private _player: objects.Player;

        //enemy
        private _crazyq: objects.CrazyQ;
        private _tie: objects.TIE[];
        private _tieNum: number;

        //managers
        private _scoreBoard: managers.ScoreBoard;
        private _bulletManager: managers.Bullet;
        private _coinManager: managers.Coin;
        private _coins: objects.Coin[];
        private _engineSound: createjs.AbstractSoundInstance;

        //public properties

        //constructor
        constructor() {
            super();

            this.Start();
        }

        //private methods
        private CheckCollisionWOBullet(): void{
            //check collision between player and power_up
            managers.Collision.Check(this._player, managers.Game.coinManager.getCurActivateCoin());

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
                            managers.Collision.Check(bullet, this._crazyq);  
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

        //public methods
        public Start(): void {
            this._space = new objects.Space("space_lv2");
            // for test only ###
            // this._player = managers.Game.player;

            this._player = new objects.Player();
            managers.Game.player = this._player;

            //get bullet manager
            this._bulletManager = managers.Game.bulletManager;
            //get coin manager
            this._coinManager = managers.Game.coinManager;
            //get score board manager
            this._scoreBoard = managers.Game.scoreBoard;

            //create enemy
            this._crazyq = new objects.CrazyQ();
            this._tieNum = 2;
            this._tie = new Array<objects.TIE>();
            for (let count = 0; count < this._tieNum; count++) {
                this._tie[count] = new objects.TIE("tie_lv2", 5);                
            }
            //get all types of coins
            this._coins = managers.Game.coinManager.getallCoins();

            //play background music
            this._engineSound = createjs.Sound.play("level2_background");
            this._engineSound.loop = -1;  //play forever
            this._engineSound.volume = 0.5;

            this.Main();
        }

        public Update(): void {
            console.log("num objects: " + this.numChildren);
            this._space.Update();
            this._player.Update();
            this._bulletManager.Update();
            this._coinManager.Update();
            //enemy update
            this._crazyq.Update();

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
            this._coins.forEach(
                coin => {
                    this.addChild(coin);
                }
            )
            //add player to the scene
            this.addChild(this._player);
            this.addChild(this._player.planeFlash);    
            //add enemies to the scene
            this.addChild(this._crazyq);
            this._tie.forEach(tie => {
                this.addChild(tie);
            });

            //add bullets
            //#### for test only
            //managers.Game.bulletManager.RegisterPlayerPreviousBullet(this);
            managers.Game.bulletManager.RegisterBullet(this, "player_bullet_lv1");
            managers.Game.bulletManager.RegisterBullet(this, "tie_bullet_lv1");
            managers.Game.bulletManager.RegisterBullet(this, "crazyq_bullet_lv1");

            //add score board to the scene
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
        }
    }
}