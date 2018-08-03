/*
* File name: coin.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: manages the types of coin
* Revision history:
* Aug 2 2018 created file
*/
module managers {
    export class Coin {
        //private instance variables
        private _coins: objects.Coin[];
        private static _Types: string[] = ["power_up_S", "power_up_R", "power_up_L", "power_up_F"]; 
        private _curIndex: number;
        //public properties

        //contructors
        constructor (){
            this.Start();
        }


        //private methods


        //public methods
        public Start(): void {
            this._coins = new Array<objects.Coin>();
            for (let index = 0; index < Coin._Types.length; index++) {
                this._coins[index] = new objects.Coin(Coin._Types[index]);               
            }
            this.activateCoin();
        }

        //this method random generailize the activie bullet upgrade index
        public activateCoin(): void {
            //0..length
            this._curIndex = Math.floor(Math.random() * Coin._Types.length);
            for (let index = 0; index < Coin._Types.length; index++) {
                this._coins[this._curIndex].isEnable = false;              
            }
            this._coins[this._curIndex].isEnable = true;
        }

        public Update(): void {
            this._coins[this._curIndex].Update();
        }

        public getallCoins(): objects.Coin[] {
            return this._coins;
        }

        public getCurActivateCoin(): objects.Coin{
            return this._coins[this._curIndex];
        }
    }
}