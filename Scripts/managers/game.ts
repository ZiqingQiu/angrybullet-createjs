
/*
* File name: game.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: manages the singletan global variables
* Revision history:
* June 24 2018 created file
*/
module managers {
    export class Game{
        public static stage: createjs.Stage;
        public static assetManager: createjs.LoadQueue;
        public static currentScene: number;
        public static currentSceneObject: objects.Scene;
        public static scoreBoard: managers.ScoreBoard;
        public static keyboardManager: managers.Keyboard;
        public static HighScore: number = 0;
        public static textureAtlas: createjs.SpriteSheet;
        public static player: objects.Player;
        public static bulletManager: managers.Bullet;
    }
}