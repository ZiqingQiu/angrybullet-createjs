/*
* File name: collision.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: manages the collisions
* Revision history:
* June 24 2018 created file
*/
var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.Check = function (object1, object2) {
            var P1 = new math.Vec2(object1.x, object1.y);
            var P2 = new math.Vec2(object2.x, object2.y);
            if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
                if (!object2.isColliding) {
                    object2.isColliding = true;
                    switch (object2.name) {
                        //### to be separate late
                        case "power_up_S":
                        case "power_up_R":
                        case "power_up_L":
                        case "power_up_F":
                            if (object2.alpha != 0) {
                                createjs.Sound.play("coin");
                                object2.alpha = 0;
                                managers.Game.scoreBoard.addScore(100);
                                managers.Game.bulletManager.RegisterBullet(managers.Game.currentSceneObject, "player_bullet_lv2");
                                //reset coin
                                managers.Game.coinManager.activateCoin();
                            }
                            break;
                        case "tie":
                            if (object1.name == "player_lv1") {
                                //downcast to player object
                                object1.GetHit();
                                object2.GetHit(object1.name);
                            }
                            else if (object1.name.search("laser") != -1) {
                                //update TIE lifes and explosions
                                object2.GetHit(object1.name);
                                //make bullet disappear
                                object1.DisappearBullet();
                            }
                            break;
                        case "boss_lv1":
                            if (object1.name == "player_lv1") {
                                //downcast to player object
                                object1.GetHit();
                                object2.GetHit(object1.name);
                            }
                            else if (object1.name.search("laser") != -1) {
                                //update TIE lifes and explosions
                                object2.GetHit(object1.name);
                                //make bullet disappear
                                object1.DisappearBullet();
                            }
                            break;
                        case "slaveI":
                            //downcast to player slaveI
                            object2.GetHit();
                            if (object1.name.search("laser") != -1) {
                                //make bullet disappear
                                object1.DisappearBullet();
                            }
                            break;
                        case "player_lv1": //player gets hit by slaveI bullet
                            object2.GetHit();
                            if (object1.name.search("slaveI") != -1) {
                                //make bullet disappear
                                object1.DisappearBullet();
                            }
                            break;
                    }
                }
            }
            else {
                object2.isColliding = false;
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map