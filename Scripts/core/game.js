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
            [1, 1, 51, 55, 0, 0, 0],
            [54, 1, 57, 59, 0, 0, 0],
            [113, 1, 58, 64, 0, 0, 0],
            [173, 1, 53, 65, 0, 0, 0],
            [228, 1, 40, 44, 0, 0, 0],
            [270, 1, 40, 44, 0, 0, 0],
            [312, 1, 40, 44, 0, 0, 0],
            [354, 1, 17, 47, 0, 0, 0],
            [373, 1, 11, 28, 0, 0, 0],
            [386, 1, 28, 28, 0, 0, 0],
            [416, 1, 28, 28, 0, 0, 0],
            [446, 1, 28, 28, 0, 0, 0],
            [476, 1, 28, 28, 0, 0, 0],
            [506, 1, 14, 60, 0, 0, 0],
            [522, 1, 14, 60, 0, 0, 0],
            [538, 1, 14, 60, 0, 0, 0],
            [554, 1, 14, 60, 0, 0, 0],
            [570, 1, 14, 60, 0, 0, 0],
            [586, 1, 130, 200, 0, 0, 0],
            [718, 1, 130, 200, 0, 0, 0],
            [850, 1, 130, 200, 0, 0, 0],
            [1, 203, 130, 210, 0, 0, 0],
            [133, 203, 130, 210, 0, 0, 0],
            [265, 203, 130, 210, 0, 0, 0],
            [397, 203, 100, 43, 0, 0, 0],
            [499, 203, 100, 43, 0, 0, 0],
            [601, 203, 100, 43, 0, 0, 0],
            [703, 203, 187, 80, 0, 0, 0],
            [703, 203, 187, 80, 0, 0, 0],
            [892, 203, 100, 43, 0, 0, 0],
            [1, 415, 64, 74, 0, 0, 0],
            [67, 415, 91, 79, 0, 0, 0],
            [160, 415, 93, 94, 0, 0, 0],
            [255, 415, 100, 117, 0, 0, 0],
            [357, 415, 73, 119, 0, 0, 0],
            [432, 415, 103, 121, 0, 0, 0],
            [537, 415, 123, 117, 0, 0, 0],
            [662, 415, 87, 79, 0, 0, 0],
            [751, 415, 65, 65, 0, 0, 0],
            [818, 415, 65, 65, 0, 0, 0],
            [885, 415, 65, 65, 0, 0, 0],
            [952, 415, 65, 65, 0, 0, 0],
            [1, 538, 65, 65, 0, 0, 0],
            [68, 538, 65, 65, 0, 0, 0],
            [135, 538, 65, 65, 0, 0, 0],
            [202, 538, 40, 40, 0, 0, 0],
            [244, 538, 90, 40, 0, 0, 0],
            [336, 538, 40, 40, 0, 0, 0],
            [378, 538, 40, 40, 0, 0, 0],
            [420, 538, 40, 40, 0, 0, 0],
            [462, 538, 40, 40, 0, 0, 0],
            [504, 538, 40, 40, 0, 0, 0],
            [546, 538, 40, 40, 0, 0, 0],
            [588, 538, 40, 40, 0, 0, 0],
            [630, 538, 65, 65, 0, 0, 0],
            [697, 538, 65, 65, 0, 0, 0],
            [764, 538, 65, 65, 0, 0, 0],
            [831, 538, 65, 65, 0, 0, 0],
            [898, 538, 65, 65, 0, 0, 0],
            [1, 605, 65, 65, 0, 0, 0],
            [68, 605, 55, 24, 0, 0, 0],
            [125, 605, 55, 23, 0, 0, 0],
            [182, 605, 55, 24, 0, 0, 0],
            [239, 605, 44, 42, 0, 0, 0],
            [285, 605, 32, 32, 0, 0, 0],
            [319, 605, 32, 32, 0, 0, 0],
            [353, 605, 32, 32, 0, 0, 0],
            [387, 605, 32, 32, 0, 0, 0],
            [421, 605, 32, 32, 0, 0, 0],
            [455, 605, 32, 32, 0, 0, 0],
            [489, 605, 98, 82, 0, 0, 0],
            [589, 605, 67, 100, 0, 0, 0]
        ],
        "animations": {
            "blt_boss_bomb_lv1": { "frames": [0, 1, 2, 3], "speed": 0.1 },
            "blt_boss_laser_lv1": { "frames": [4, 5, 6], "speed": 0.1 },
            "blt_enemy_laser_lv1": { "frames": [7] },
            "blt_player_laser_lv1": { "frames": [8] },
            "blt_player_laser_lv2": { "frames": [9, 10, 11, 12], "speed": 0.2 },
            "blt_player_rocket_lv1": { "frames": [13, 14, 15, 16, 17], "speed": 0.1 },
            "boss_lv1": { "frames": [18, 19, 20], "speed": 0.1 },
            "boss_lv2": { "frames": [21, 22, 23], "speed": 0.1 },
            "btn_back": { "frames": [24] },
            "btn_exit": { "frames": [25] },
            "btn_instruct": { "frames": [26] },
            "btn_restart": { "frames": [27] },
            "restartButton": { "frames": [28] },
            "btn_start": { "frames": [29] },
            "crazyq": { "frames": [30, 31, 32, 33, 34, 35, 36, 37], "speed": 0.1 },
            "explosion": { "frames": [38, 39, 40, 41, 42, 43, 44] },
            "kb_a": { "frames": [45] },
            "kb_blankspace": { "frames": [46] },
            "kb_d": { "frames": [47] },
            "kb_down": { "frames": [48] },
            "kb_left": { "frames": [49] },
            "kb_right": { "frames": [50] },
            "kb_s": { "frames": [51] },
            "kb_up": { "frames": [52] },
            "kb_w": { "frames": [53] },
            "planeflash": { "frames": [54, 55] },
            "player_lv1": { "frames": [56, 57, 58, 59], "speed": 0.16 },
            "power_up_F": { "frames": [60] },
            "power_up_L": { "frames": [61] },
            "power_up_S": { "frames": [62] },
            "slaveI": { "frames": [63] },
            "smallexplosion": { "frames": [64, 65, 66, 67, 68, 69] },
            "tie": { "frames": [70] },
            "tie_lv2": { "frames": [71] }
        }
    };
    assetManifest = [
        { id: "textureAtlas", src: "./Assets/sprites/textureAtlas.png" },
        { id: "space_lv1", src: "./Assets/images/space_lv1.jpg" },
        { id: "space_lv2", src: "./Assets/images/space_lv2.jpg" },
        { id: "space_lv3", src: "./Assets/images/space_lv3.jpg" },
        { id: "instruction", src: "./Assets/images/instruction.jpg" },
        { id: "coin", src: "./Assets/audio/coin.wav" },
        { id: "life", src: "./Assets/audio/lives.wav" },
        { id: "explosion", src: "./Assets/audio/explosion.mp3" },
        { id: "blt_sound_laser_lv1", src: "./Assets/audio/bullet_laser_lv1.wav" },
        { id: "blt_sound_laser_lv2", src: "./Assets/audio/bullet_laser_lv2.wav" },
        { id: "blt_sound_rocket_lv1", src: "./Assets/audio/bullet_rocket_lv1.mp3" },
        { id: "level1_background", src: "./Assets/audio/level1_background.ogg" },
        { id: "level1_final_background", src: "./Assets/audio/level1_final_background.mp3" },
        { id: "level2_background", src: "./Assets/audio/level2_background.ogg" },
        { id: "level2_final_background", src: "./Assets/audio/level2_final_background.mp3" }
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
            case config.Scene.LEVEL1:
                currentScene = new scenes.Level1Scene();
                break;
            case config.Scene.LEVEL1_FINAL:
                currentScene = new scenes.Level1FinalScene();
                break;
            case config.Scene.LEVEL2:
                currentScene = new scenes.Level2Scene();
                break;
            case config.Scene.LEVEL2_FINAL:
                currentScene = new scenes.Level2FinalScene();
                break;
            // case config.Scene.LEVEL3:
            //     currentScene =  new scenes.Level3Scene();
            //     break;
            // case config.Scene.LEVEL3_FINAL:
            //     currentScene =  new scenes.Level3FinalScene();
            //     break;                                    
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