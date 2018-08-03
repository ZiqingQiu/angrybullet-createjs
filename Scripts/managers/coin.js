/*
* File name: coin.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: manages the types of coin
* Revision history:
* Aug 2 2018 created file
*/
var managers;
(function (managers) {
    var Coin = /** @class */ (function () {
        //public properties
        //contructors
        function Coin() {
            this.Start();
        }
        //private methods
        //public methods
        Coin.prototype.Start = function () {
            this._coins = new Array();
            for (var index = 0; index < Coin._Types.length; index++) {
                this._coins[index] = new objects.Coin(Coin._Types[index]);
            }
            this.activateCoin();
        };
        //this method random generailize the activie bullet upgrade index
        Coin.prototype.activateCoin = function () {
            //0..length
            this._curIndex = Math.floor(Math.random() * Coin._Types.length);
            for (var index = 0; index < Coin._Types.length; index++) {
                this._coins[this._curIndex].isEnable = false;
            }
            this._coins[this._curIndex].isEnable = true;
        };
        Coin.prototype.Update = function () {
            this._coins[this._curIndex].Update();
        };
        Coin.prototype.getallCoins = function () {
            return this._coins;
        };
        Coin.prototype.getCurActivateCoin = function () {
            return this._coins[this._curIndex];
        };
        Coin._Types = ["power_up_S", "power_up_R", "power_up_L", "power_up_F"];
        return Coin;
    }());
    managers.Coin = Coin;
})(managers || (managers = {}));
//# sourceMappingURL=coin.js.map