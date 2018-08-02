/*
* File name: scene.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: contains all the scene types
* Revision history:
* June 24 2018 created file
* Aug 2 2018 add all the three levels to scene
*/
var config;
(function (config) {
    var Scene;
    (function (Scene) {
        Scene[Scene["START"] = 0] = "START";
        Scene[Scene["INSTRUCTION"] = 1] = "INSTRUCTION";
        Scene[Scene["LEVEL1"] = 2] = "LEVEL1";
        Scene[Scene["LEVEL1_FINAL"] = 3] = "LEVEL1_FINAL";
        Scene[Scene["LEVEL2"] = 4] = "LEVEL2";
        Scene[Scene["LEVEL2_FINAL"] = 5] = "LEVEL2_FINAL";
        Scene[Scene["LEVEL3"] = 6] = "LEVEL3";
        Scene[Scene["LEVEL3_FINAL"] = 7] = "LEVEL3_FINAL";
        Scene[Scene["OVER"] = 8] = "OVER";
    })(Scene = config.Scene || (config.Scene = {}));
})(config || (config = {}));
//# sourceMappingURL=scene.js.map