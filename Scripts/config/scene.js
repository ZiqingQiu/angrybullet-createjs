/*
* File name: scene.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: contains all the scene types
* Revision history:
* June 24 2018 created file
*/
var config;
(function (config) {
    var Scene;
    (function (Scene) {
        Scene[Scene["START"] = 0] = "START";
        Scene[Scene["INSTRUCTION"] = 1] = "INSTRUCTION";
        Scene[Scene["PLAY"] = 2] = "PLAY";
        Scene[Scene["OVER"] = 3] = "OVER";
    })(Scene = config.Scene || (config.Scene = {}));
})(config || (config = {}));
//# sourceMappingURL=scene.js.map