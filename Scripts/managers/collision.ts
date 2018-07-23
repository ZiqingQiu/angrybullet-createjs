module managers {
    export class Collision {

        public static Check(object1: objects.GameObject, object2: objects.GameObject) {
            let P1: math.Vec2 = new math.Vec2(object1.x, object1.y);
            let P2: math.Vec2 = new math.Vec2(object2.x, object2.y);

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
                            if (object1.name == "player")
                            {
                                //downcast to player object
                                (object1 as objects.Player).GetHit();

                                (object2 as objects.TIE).GetHit(object1.name);
                            }
                            else if (object1.name == "blt_playerlv1")
                            {
                                //update TIE lifes and explosions
                                (object2 as objects.TIE).GetHit(object1.name);

                                //make bullet disappear
                                (object1 as objects.Bullet).DisappearBullet();
                            }

                            break;
                        case "enemy":
                                //downcast to player enemy
                                (object2 as objects.Enemy).GetHit();
                                if (object1.name == "blt_playerlv1")
                                {
                                    //make bullet disappear
                                    (object1 as objects.Bullet).DisappearBullet();
                                }
                            break;
                    }
                }
            }
            else {
                object2.isColliding = false;
            }
        }
    }
}