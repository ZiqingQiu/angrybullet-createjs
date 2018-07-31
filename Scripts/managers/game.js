/*
* File name: game.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: manages the singletan global variables
* Revision history:
* June 24 2018 created file
*/
var managers;
(function (managers) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.HighScore = 0;
        return Game;
    }());
    managers.Game = Game;
})(managers || (managers = {}));
//# sourceMappingURL=game.js.map