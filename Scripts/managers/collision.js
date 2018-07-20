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
                                managers.Game.scoreBoard.Score += 100;
                                object2.alpha = 0;
                                //live +1
                                if (managers.Game.scoreBoard.Score % 1000 == 0) {
                                    managers.Game.scoreBoard.Lives += 1;
                                    createjs.Sound.play("life");
                                }
                                if (managers.Game.HighScore < managers.Game.scoreBoard.Score) {
                                    managers.Game.scoreBoard.HighScore = managers.Game.scoreBoard.Score;
                                    managers.Game.HighScore = managers.Game.scoreBoard.HighScore;
                                }
                            }
                            break;
                        case "cloud":
                            if (object1.alpha != 0) {
                                createjs.Sound.play("explosion");
                                managers.Game.scoreBoard.Lives -= 1;
                                var explosion = new objects.Explosion("explosion");
                                explosion.x = object1.x;
                                explosion.y = object1.y;
                                managers.Game.currentSceneObject.addChild(explosion);
                                object1.alpha = 0;
                                managers.Game.plane.planeFlash.alpha = 1;
                                managers.Game.plane.planeFlash.gotoAndPlay("planeflash");
                            }
                            break;
                        case "enemy":
                            if (object2.alpha != 0) {
                                //add explosion
                                createjs.Sound.play("explosion");
                                var explosion = new objects.Explosion("smallexplosion");
                                explosion.x = object2.x;
                                explosion.y = object2.y;
                                managers.Game.currentSceneObject.addChild(explosion);
                                //points for destroy enemy
                                managers.Game.scoreBoard.Score += 200;
                                //reset enemy
                                object2.Reset();
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