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
                        case "coin":
                            if (object2.alpha != 0) {
                                createjs.Sound.play("coin");
                                object2.alpha = 0;
                                managers.Game.scoreBoard.addScore(100);
                            }
                            break;
                        case "tie":
                            if (object1.name == "playerlv1") {
                                //downcast to player object
                                object1.GetHit();
                            }
                            else if (object1.name == "bullet") {
                                //update TIE lifes and explosions
                                object2.GetHit();
                                //make bullet disappear
                                object1.DisappearBullet();
                            }
                            break;
                        case "enemy":
                            //downcast to player enemy
                            object2.GetHit();
                            if (object1.name == "bullet") {
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