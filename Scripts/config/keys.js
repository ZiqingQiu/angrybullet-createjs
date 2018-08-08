/*
* File name: keys.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: contains all the keys and its ASCII code
* Revision history:
* June 24 2018 created file
* Aug 8 2018 added cheated code
*/
var config;
(function (config) {
    var Keys = /** @class */ (function () {
        function Keys() {
        }
        //arrow keys
        Keys.LEFT_ARROW = 37;
        Keys.RIGHT_ARROW = 39;
        Keys.UP_ARROW = 38;
        Keys.DOWN_ARROW = 40;
        //WASD keys
        Keys.W = 87;
        Keys.A = 65;
        Keys.S = 83;
        Keys.D = 68;
        //space bar
        Keys.SPACE = 32;
        //cheated B
        Keys.B = 66;
        return Keys;
    }());
    config.Keys = Keys;
})(config || (config = {}));
//# sourceMappingURL=keys.js.map