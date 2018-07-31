/*
* File name: game.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: holds all the main logic of the game
* Revision history:
* June 24 2018 created file
* Jul 30 added instruction scene and level1final scene
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
            [1, 1, 15, 15, 0, 0, 0],
            [18, 1, 15, 15, 0, 0, 0],
            [35, 1, 15, 15, 0, 0, 0],
            [52, 1, 11, 28, 0, 0, 0],
            [65, 1, 14, 60, 0, 0, 0],
            [81, 1, 14, 60, 0, 0, 0],
            [97, 1, 14, 60, 0, 0, 0],
            [113, 1, 14, 60, 0, 0, 0],
            [129, 1, 14, 60, 0, 0, 0],
            [145, 1, 64, 74, 0, 0, 0],
            [211, 1, 91, 79, 0, 0, 0],
            [304, 1, 93, 94, 0, 0, 0],
            [399, 1, 100, 117, 0, 0, 0],
            [1, 120, 73, 119, 0, 0, 0],
            [76, 120, 103, 121, 0, 0, 0],
            [181, 120, 123, 117, 0, 0, 0],
            [306, 120, 87, 79, 0, 0, 0],
            [395, 120, 100, 43, 0, 0, 0],
            [1, 243, 100, 43, 0, 0, 0],
            [103, 243, 100, 43, 0, 0, 0],
            [205, 243, 187, 80, 0, 0, 0],
            [205, 243, 187, 80, 0, 0, 0],
            [394, 243, 100, 43, 0, 0, 0],
            [1, 325, 35, 51, 0, 0, 0],
            [38, 325, 35, 51, 0, 0, 0],
            [75, 325, 44, 42, 0, 0, 0],
            [75, 325, 44, 42, 0, 0, 0],
            [75, 325, 44, 42, 0, 0, 0],
            [121, 325, 65, 65, 0, 0, 0],
            [188, 325, 65, 65, 0, 0, 0],
            [255, 325, 65, 65, 0, 0, 0],
            [322, 325, 65, 65, 0, 0, 0],
            [389, 325, 65, 65, 0, 0, 0],
            [1, 392, 65, 65, 0, 0, 0],
            [68, 392, 65, 65, 0, 0, 0],
            [135, 392, 40, 40, 0, 0, 0],
            [177, 392, 90, 40, 0, 0, 0],
            [269, 392, 40, 40, 0, 0, 0],
            [311, 392, 40, 40, 0, 0, 0],
            [353, 392, 40, 40, 0, 0, 0],
            [395, 392, 40, 40, 0, 0, 0],
            [437, 392, 40, 40, 0, 0, 0],
            [1, 459, 40, 40, 0, 0, 0],
            [43, 459, 40, 40, 0, 0, 0],
            [85, 459, 65, 65, 0, 0, 0],
            [152, 459, 65, 65, 0, 0, 0],
            [219, 459, 65, 65, 0, 0, 0],
            [286, 459, 65, 65, 0, 0, 0],
            [353, 459, 65, 65, 0, 0, 0],
            [420, 459, 65, 65, 0, 0, 0],
            [1, 526, 32, 32, 0, 0, 0],
            [35, 526, 32, 32, 0, 0, 0],
            [69, 526, 32, 32, 0, 0, 0],
            [103, 526, 32, 32, 0, 0, 0],
            [137, 526, 32, 32, 0, 0, 0],
            [171, 526, 32, 32, 0, 0, 0],
            [205, 526, 98, 82, 0, 0, 0]
        ],
        "animations": {
            "blt_bomb": { "frames": [0, 1, 2], "speed": 0.1 },
            "blt_laser_lv1": { "frames": [3] },
            "blt_rocket_lv1": { "frames": [4, 5, 6, 7, 8], "speed": 0.1 },
            "boss_lv1": { "frames": [9, 10, 11, 12, 13, 14, 15, 16], "speed": 0.1 },
            "btn_back": { "frames": [17] },
            "btn_exit": { "frames": [18] },
            "btn_instruct": { "frames": [19] },
            "btn_restart": { "frames": [20] },
            "restartButton": { "frames": [21] },
            "btn_start": { "frames": [22] },
            "coin": { "frames": [23, 24], "speed": 0.2 },
            "enemy": { "frames": [25, 26, 27], "speed": 0.33 },
            "explosion": { "frames": [28, 29, 30, 31, 32, 33, 34], "speed": 0.16 },
            "kb_a": { "frames": [35] },
            "kb_blankspace": { "frames": [36] },
            "kb_d": { "frames": [37] },
            "kb_down": { "frames": [38] },
            "kb_left": { "frames": [39] },
            "kb_right": { "frames": [40] },
            "kb_s": { "frames": [41] },
            "kb_up": { "frames": [42] },
            "kb_w": { "frames": [43] },
            "planeflash": { "frames": [44, 45] },
            "player_lv1": { "frames": [46, 47, 48, 49], "speed": 0.16 },
            "smallexplosion": { "frames": [50, 51, 52, 53, 54, 55], "speed": 0.33 },
            "tie": { "frames": [56] }
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
                currentScene = new scenes.StartScene();
                break;
            case config.Scene.INSTRUCTION:
                currentScene = new scenes.InstructionScene();
                break;
            case config.Scene.PLAY:
                currentScene = new scenes.PlayScene();
                break;
            case config.Scene.LEVE1_FINAL:
                currentScene = new scenes.Level1FinalScene();
                break;
            case config.Scene.OVER:
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