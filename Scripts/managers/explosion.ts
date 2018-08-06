/*
* File name: explosion.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: manage the bullet types
* Revision history:
* Aug 6 2018 created file
*/

type ExplosionInfo = {totalcnt: number; curcnt: number; ref: objects.Explosion[]};

module managers {
    export class Explosion {
        //private instance variables
        private _objExplosionMap : Map<string, ExplosionInfo>;
        //public properties


        //constructors
        constructor (){
            this.Start();  //to be refined
        }

        //private methods
        private _buildExplosionPool(explostion_name: string, totalCnt: number): objects.Explosion[] {
            let explosions: objects.Explosion[] = [];
            for (let count = 0; count < totalCnt; count++) {
                explosions[count] = new objects.Explosion(explostion_name);
            }
            return explosions;   
        }

        private Start(): void {
            this._objExplosionMap = new Map<string, ExplosionInfo>();

            //explosion
            let explosion: ExplosionInfo = {totalcnt: 10, curcnt: 0, ref: this._buildExplosionPool("explosion", 10)};
            this._objExplosionMap.set("explosion", explosion);

            //small explosion
            let small_explosion: ExplosionInfo = {totalcnt: 10, curcnt: 0, ref: this._buildExplosionPool("smallexplosion", 10)};
            this._objExplosionMap.set("smallexplosion", small_explosion);
        }

        //public methods
        public TriggerExplosion(expoType: string, tarScene: objects.Scene, x: number, y: number): void{
            let explosion: ExplosionInfo = this._objExplosionMap.get(expoType);
            let currentExpo: number = explosion.curcnt;
            let explostion: objects.Explosion = explosion.ref[currentExpo];
            explostion.Explode(tarScene, x, y);
        }
        
    }
}