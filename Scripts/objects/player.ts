/*
* File name: player.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: defines the game object of player
* Revision history:
* June 24 2018 created file
*/
module objects {
    export class Player extends objects.GameObject {
        //Private Instance Variables

        //Public Properties
        public planeFlash: objects.PlaneFlash;

        //Constructor
        constructor() {
            super("player_lv1");
            this.Start();
        }
        //Private Methods
        private _animatonEnded(): void
        {
            if (this.alpha == 0)
            {
                this.alpha = 1;
                this.planeFlash.alpha = 0;
            }

        }


        public Reset(): void {

        }

        public Move(): void {
            //keyboard controls
            if (managers.Game.keyboardManager.moveLeft)
            {
                this.x -= 5;
            }

            if (managers.Game.keyboardManager.moveRight)
            {
                this.x += 5;
            }

            if (managers.Game.keyboardManager.moveForward)
            {
                this.y -= 7;
            }

            if (managers.Game.keyboardManager.moveBackward)
            {
                this.y += 5;
            }


            this.planeFlash.x = this.x;
            this.planeFlash.y = this.y;
        }

        public CheckBounds(): void {
            //right boundary
            if (this.x >= config.Screen.WIDTH - this.halfWidth)
            {
                this.x = config.Screen.WIDTH  - this.halfWidth;
            }
            //left boundary
            if (this.x <= this.halfWidth)
            {
                this.x = this.halfWidth;
            }
            //bottom boundary
            if (this.y >= config.Screen.HEIGHT - this.halfHeight)
            {
                this.y = config.Screen.HEIGHT  - this.halfHeight;
            }
            //upper boundary
            if (this.y <= this.halfHeight)
            {
                this.y = this.halfHeight;
            }
        }

        //Public Methods
        public Start(): void {
            this.planeFlash = new objects.PlaneFlash();
            this.planeFlash.alpha = 0;
            this.planeFlash.on("animationend", this._animatonEnded.bind(this), false);

            this.x = config.Screen.HALF_WIDTH;
            this.y = 430;
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
            this.BulletFire();
        }

        public BulletFire(): void {
            if (this.alpha == 1 && managers.Game.keyboardManager.fire)
            {
                managers.Game.bulletManager.BulletFire("player", this.x, this.y, this.halfHeight);
            }
        }

        //this method provides get hit update for the player object
        public GetHit(): void {
            if (this.alpha != 0) {
                managers.Game.scoreBoard.updateLifes(-1);
                managers.Game.bulletManager.RegisterBullet(managers.Game.currentSceneObject, "player_bullet_lv1");                
                managers.Game.explosionManager.TriggerExplosion("explosion", managers.Game.currentSceneObject, this.x, this.y);
                this.alpha = 0;
                managers.Game.player.planeFlash.alpha = 1;
                managers.Game.player.planeFlash.gotoAndPlay("planeflash");
            }
        }
    }
}