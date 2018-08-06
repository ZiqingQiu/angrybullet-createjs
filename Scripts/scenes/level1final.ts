/*
* File name: level1final.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: scene object of boss1
* Revision history:
* Jul 30 2018 created file
*/

module scenes {
    export class Level1FinalScene extends objects.Scene {
        //private instance variables
        private  _warnLabel: objects.Label;
        private _bossHPLabel: objects.Label;  //display BOSS HP
        private _space: objects.Space;
        private _boss1: objects.Level1BOSS;
        private _player: objects.Player = managers.Game.player;

        private _scoreBoard: managers.ScoreBoard;
    
        private _bulletManager: managers.Bullet;
        private _coinManager: managers.Coin;
        private _coins: objects.Coin[];

        //public properties

        //constructors
        constructor() {
            super();

            this.Start();
        }


        //private methods
        private afterTimeout() {
            this.removeChild(this._warnLabel); 
            this._boss1.SetEnable(true);
        }
        private async delay(){
            await new Promise(resolve => setTimeout(()=>resolve(), 4000)).then(()=>
            this.afterTimeout());
        }

        private CheckCollisionWOBullet(): void{
            //check collision between player and power_up
            managers.Collision.Check(this._player, managers.Game.coinManager.getCurActivateCoin());
            //check player crashes with boss
            managers.Collision.Check(this._player, this._boss1);
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
                            //check collision player-bullet -- boss
                            managers.Collision.Check(bullet, this._boss1);  
                        }

                    })
            }
        }

        private CheckEnemyBullet(): void{
            let bulletIdxArray : number[] = [];
            let bullets: objects.Bullet[] = [];
            //check collision with tie's bullets
            bulletIdxArray = managers.Game.bulletManager.GetTotalBulletTypes("boss_bullet_lv1");
            for (let idx: number = 0; idx < bulletIdxArray.length; idx++)
            {
                bullets = managers.Game.bulletManager.GetBullets("boss_bullet_lv1", bulletIdxArray[idx]);
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
            this._space = new objects.Space();
            this._boss1 = new objects.Level1BOSS();
            this._boss1.alpha = 0;
            this._warnLabel = new objects.Label("be aware", "50px", "Starjedi", "#FFFF00", 300, 150, true);
            this._bossHPLabel = new objects.Label("boss hp ", "20px", "Starjedi", "#FFFF00", 260, 10, false);
            this._scoreBoard = managers.Game.scoreBoard;
            //get bullet manager
            this._bulletManager = managers.Game.bulletManager;
            //get coin manager
            this._coinManager = managers.Game.coinManager;
            //get all types of coins
            this._coins = managers.Game.coinManager.getallCoins();
            
            this.Main();
        }

        public Update(): void {
            console.log("num objects: " + this.numChildren);

            this._space.Update();
            this._boss1.Update();
            this._player.Update();

            this._bulletManager.Update();
            this._coinManager.Update();

            //check collision without bullets
            this.CheckCollisionWOBullet();
            //check player's bullet
            this.CheckPlayerBullet();
            //check enemy's bullet
            this.CheckEnemyBullet();

            //update HP;
            this._bossHPLabel.text = "boss hp " + this._boss1.getHP();
        }

        public Destroy():void {
            //###
            //this._engineSound.stop();
            this.removeAllChildren();
        }

        public Main(): void {
            //add ocean to the scene
            this.addChild(this._space);
            //add label for 10s
            this.addChild(this._warnLabel);
            //add coin to the scene
            this._coins.forEach(
                coin => {
                    this.addChild(coin);
                }
            )
            //add player to the scene
            this.addChild(this._player);
            this.addChild(this._player.planeFlash);    
            //add boss1 to the scene
            this.addChild(this._boss1);
            //add bullets to the scene
            managers.Game.bulletManager.RegisterBullet(this, "boss_bullet_lv1");
            managers.Game.bulletManager.RegisterPlayerPreviousBullet(this);

            //add score board to the scene
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
            this.addChild(this._bossHPLabel);

            this.delay();
        }
    } 
}