/*
* File name: game.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: holds all the main logic of the game
* Revision history:
* June 24 2018 created file
*/
/// <reference path="_references.ts"/>
//IIFE -- Immediately Invoked Function Expression
//self executing anonymous function
(function () {
    //Game Variables
    var canvas = document.getElementById("canvas");
    var stage;
    var assetManager;
    var assetManifest;
    var currentScene;
    var currentState;
    var keyboardManager;
    var textureAtlasData; //json file
    var textureAtlas; //container for data
    // let stats: Stats;
    textureAtlasData = {
        "images": [
            ""
            //"./Assets/sprites/textureAtlas.png"
        ],
        "frames": [
            [1, 1, 11, 28, 0, 0, 0],
            [14, 1, 14, 60, 0, 0, 0],
            [30, 1, 14, 60, 0, 0, 0],
            [46, 1, 14, 60, 0, 0, 0],
            [62, 1, 14, 60, 0, 0, 0],
            [78, 1, 14, 60, 0, 0, 0],
            [94, 1, 100, 43, 0, 0, 0],
            [196, 1, 100, 43, 0, 0, 0],
            [298, 1, 100, 43, 0, 0, 0],
            [1, 63, 187, 80, 0, 0, 0],
            [1, 63, 187, 80, 0, 0, 0],
            [190, 63, 100, 43, 0, 0, 0],
            [292, 63, 35, 51, 0, 0, 0],
            [329, 63, 35, 51, 0, 0, 0],
            [366, 63, 44, 42, 0, 0, 0],
            [366, 63, 44, 42, 0, 0, 0],
            [366, 63, 44, 42, 0, 0, 0],
            [412, 63, 65, 65, 0, 0, 0],
            [1, 145, 65, 65, 0, 0, 0],
            [68, 145, 65, 65, 0, 0, 0],
            [135, 145, 65, 65, 0, 0, 0],
            [202, 145, 65, 65, 0, 0, 0],
            [269, 145, 65, 65, 0, 0, 0],
            [336, 145, 65, 65, 0, 0, 0],
            [403, 145, 65, 65, 0, 0, 0],
            [1, 212, 65, 65, 0, 0, 0],
            [68, 212, 65, 65, 0, 0, 0],
            [135, 212, 65, 65, 0, 0, 0],
            [202, 212, 65, 65, 0, 0, 0],
            [269, 212, 65, 65, 0, 0, 0],
            [336, 212, 32, 32, 0, 0, 0],
            [370, 212, 32, 32, 0, 0, 0],
            [404, 212, 32, 32, 0, 0, 0],
            [438, 212, 32, 32, 0, 0, 0],
            [472, 212, 32, 32, 0, 0, 0],
            [1, 279, 32, 32, 0, 0, 0],
            [35, 279, 98, 82, 0, 0, 0]
        ],
        "animations": {
            "blt_laser_lv1": { "frames": [0] },
            "blt_rocket_lv1": { "frames": [1, 2, 3, 4, 5], "speed": 0.1 },
            "btn_back": { "frames": [6] },
            "btn_exit": { "frames": [7] },
            "btn_instruct": { "frames": [8] },
            "btn_restart": { "frames": [9] },
            "restartButton": { "frames": [10] },
            "btn_start": { "frames": [11] },
            "coin": { "frames": [12, 13] },
            "enemy": { "frames": [14, 15, 16], "speed": 0.33 },
            "explosion": { "frames": [17, 18, 19, 20, 21, 22, 23], "speed": 0.16 },
            "planeflash": { "frames": [24, 25] },
            "player_lv1": { "frames": [26, 27, 28, 29], "speed": 0.16 },
            "smallexplosion": { "frames": [30, 31, 32, 33, 34, 35], "speed": 0.33 },
            "tie": { "frames": [36] }
        }
    };
    assetManifest = [
        { id: "textureAtlas", src: "./Assets/sprites/textureAtlas.png" },
        { id: "space", src: "./Assets/images/space.jpg" },
        { id: "coin", src: "./Assets/audio/coin.wav" },
        { id: "life", src: "./Assets/audio/lives.wav" },
        { id: "explosion", src: "./Assets/audio/explosion.mp3" },
        { id: "bulletSound", src: "./Assets/audio/bullet.wav" },
        { id: "stage1", src: "./Assets/audio/stage1.ogg" }
    ];
    function Init() {
        console.log("Init Function...");
        //load assets
        assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start);
    }
    function InitStats() {
        // stats = new Stats();
        // stats.showPanel(0);  // 0 fps 1 ms 2 mb  3+ custom
        // document.body.appendChild(stats.dom);
    }
    function Start() {
        console.log("%c Start Function...", "font-weight:bold; font-size:20px; color:red");
        textureAtlasData.images = [assetManager.getResult("textureAtlas")];
        textureAtlas = new createjs.SpriteSheet(textureAtlasData);
        InitStats();
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; //60 frames per second
        createjs.Ticker.addEventListener("tick", Update);
        managers.Game.stage = stage;
        managers.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;
        keyboardManager = new managers.Keyboard();
        managers.Game.keyboardManager = keyboardManager;
        managers.Game.assetManager = assetManager;
        managers.Game.textureAtlas = textureAtlas;
        Main();
    }
    function Update() {
        // stats.begin();
        //if the scene that is playing returns another current scene
        //then call main again and switch scene
        if (currentState != managers.Game.currentScene) {
            Main();
        }
        currentScene.Update();
        stage.update();
        // stats.end();
    }
    function Main() {
        //remove all current objects from the stage
        if (currentScene) {
            currentScene.Destroy();
            stage.removeChild(currentScene);
        }
        switch (managers.Game.currentScene) {
            case config.Scene.START:
                //instantiate a new scene object
                currentScene = new scenes.StartScene();
                break;
            case config.Scene.PLAY:
                //instantiate a new scene object
                currentScene = new scenes.PlayScene();
                break;
            case config.Scene.OVER:
                //instantiate a new scene object
                currentScene = new scenes.OverScene();
                break;
        }
        currentState = managers.Game.currentScene;
        managers.Game.currentSceneObject = currentScene;
        //add new scene object to stage
        stage.addChild(currentScene);
    }
    window.addEventListener("load", Init);
})();
//# sourceMappingURL=game.js.map