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
    let canvas = document.getElementById("canvas");
    let stage: createjs.Stage;

    let assetManager: createjs.LoadQueue;
    let assetManifest;

    let currentScene: objects.Scene;
    let currentState: number;

    let keyboardManager: managers.Keyboard;

    let textureAtlasData: any;  //json file
    let textureAtlas: createjs.SpriteSheet;  //container for data

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
            [52, 1, 17, 47, 0, 0, 0],
            [71, 1, 11, 28, 0, 0, 0],
            [84, 1, 28, 28, 0, 0, 0],
            [114, 1, 28, 28, 0, 0, 0],
            [144, 1, 28, 28, 0, 0, 0],
            [174, 1, 28, 28, 0, 0, 0],
            [204, 1, 14, 60, 0, 0, 0],
            [220, 1, 14, 60, 0, 0, 0],
            [236, 1, 14, 60, 0, 0, 0],
            [252, 1, 14, 60, 0, 0, 0],
            [268, 1, 14, 60, 0, 0, 0],
            [284, 1, 130, 200, 0, 0, 0],
            [1, 203, 130, 200, 0, 0, 0],
            [133, 203, 130, 200, 0, 0, 0],
            [265, 203, 100, 43, 0, 0, 0],
            [367, 203, 100, 43, 0, 0, 0],
            [1, 405, 100, 43, 0, 0, 0],
            [103, 405, 187, 80, 0, 0, 0],
            [103, 405, 187, 80, 0, 0, 0],
            [292, 405, 100, 43, 0, 0, 0],
            [394, 405, 64, 74, 0, 0, 0],
            [1, 487, 91, 79, 0, 0, 0],
            [94, 487, 93, 94, 0, 0, 0],
            [189, 487, 100, 117, 0, 0, 0],
            [291, 487, 73, 119, 0, 0, 0],
            [366, 487, 103, 121, 0, 0, 0],
            [1, 610, 123, 117, 0, 0, 0],
            [126, 610, 87, 79, 0, 0, 0],
            [215, 610, 65, 65, 0, 0, 0],
            [282, 610, 65, 65, 0, 0, 0],
            [349, 610, 65, 65, 0, 0, 0],
            [416, 610, 65, 65, 0, 0, 0],
            [1, 729, 65, 65, 0, 0, 0],
            [68, 729, 65, 65, 0, 0, 0],
            [135, 729, 65, 65, 0, 0, 0],
            [202, 729, 40, 40, 0, 0, 0],
            [244, 729, 90, 40, 0, 0, 0],
            [336, 729, 40, 40, 0, 0, 0],
            [378, 729, 40, 40, 0, 0, 0],
            [420, 729, 40, 40, 0, 0, 0],
            [462, 729, 40, 40, 0, 0, 0],
            [1, 796, 40, 40, 0, 0, 0],
            [43, 796, 40, 40, 0, 0, 0],
            [85, 796, 40, 40, 0, 0, 0],
            [127, 796, 65, 65, 0, 0, 0],
            [194, 796, 65, 65, 0, 0, 0],
            [261, 796, 65, 65, 0, 0, 0],
            [328, 796, 65, 65, 0, 0, 0],
            [395, 796, 65, 65, 0, 0, 0],
            [1, 863, 65, 65, 0, 0, 0],
            [68, 863, 55, 24, 0, 0, 0],
            [125, 863, 55, 23, 0, 0, 0],
            [182, 863, 55, 23, 0, 0, 0],
            [239, 863, 55, 24, 0, 0, 0],
            [296, 863, 44, 42, 0, 0, 0],
            [342, 863, 32, 32, 0, 0, 0],
            [376, 863, 32, 32, 0, 0, 0],
            [410, 863, 32, 32, 0, 0, 0],
            [444, 863, 32, 32, 0, 0, 0],
            [478, 863, 32, 32, 0, 0, 0],
            [1, 930, 32, 32, 0, 0, 0],
            [35, 930, 98, 82, 0, 0, 0]
        ],
        
        "animations": {
            "blt_bomb": { "frames": [0, 1, 2],"speed": 0.1 },
            "blt_enemy_laser_lv1": { "frames": [3] },
            "blt_laser_lv1": { "frames": [4] },
            "blt_laser_lv2": { "frames": [5, 6, 7, 8],"speed": 0.2 },
            "blt_rocket_lv1": { "frames": [9, 10, 11, 12, 13],"speed": 0.1 },
            "boss_lv1": { "frames": [14, 15, 16],"speed": 0.1 },
            "btn_back": { "frames": [17] },
            "btn_exit": { "frames": [18] },
            "btn_instruct": { "frames": [19] },
            "btn_restart": { "frames": [20] },
            "restartButton": { "frames": [21] },
            "btn_start": { "frames": [22] },
            "crazyq": { "frames": [23, 24, 25, 26, 27, 28, 29, 30],"speed": 0.1 },
            "explosion": { "frames": [31, 32, 33, 34, 35, 36, 37] },
            "kb_a": { "frames": [38] },
            "kb_blankspace": { "frames": [39] },
            "kb_d": { "frames": [40] },
            "kb_down": { "frames": [41] },
            "kb_left": { "frames": [42] },
            "kb_right": { "frames": [43] },
            "kb_s": { "frames": [44] },
            "kb_up": { "frames": [45] },
            "kb_w": { "frames": [46] },
            "planeflash": { "frames": [47, 48] },
            "player_lv1": { "frames": [49, 50, 51, 52],"speed": 0.16 },
            "power_up_F": { "frames": [53] },
            "power_up_L": { "frames": [54] },
            "power_up_R": { "frames": [55] },
            "power_up_S": { "frames": [56] },
            "slaveI": { "frames": [57] },
            "smallexplosion": { "frames": [58, 59, 60, 61, 62, 63] },
            "tie": { "frames": [64] }
        }   
        
        
    };
        

    assetManifest = [
        {id: "textureAtlas", src: "./Assets/sprites/textureAtlas.png" },
        {id: "space", src: "./Assets/images/space.jpg"},
        {id: "instruction", src: "./Assets/images/instruction.jpg"},
        {id: "coin", src: "./Assets/audio/coin.wav"},
        {id: "life", src: "./Assets/audio/lives.wav"},
        {id: "explosion", src: "./Assets/audio/explosion.mp3"},
        {id: "bulletSound", src: "./Assets/audio/bullet.wav"},
        {id: "stage1", src: "./Assets/audio/stage1.ogg"}
    ];

    function Init(): void {
        console.log(`Init Function...`);
        //load assets
        assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start);
    }

    function InitStats(): void {
        // stats = new Stats();
        // stats.showPanel(0);  // 0 fps 1 ms 2 mb  3+ custom
        // document.body.appendChild(stats.dom);

    }


    function Start(): void {
        console.log(`%c Start Function...`, "font-weight:bold; font-size:20px; color:red");
        textureAtlasData.images = [ assetManager.getResult("textureAtlas") ];
        textureAtlas = new createjs.SpriteSheet(textureAtlasData);
        InitStats();
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;  //60 frames per second
        createjs.Ticker.addEventListener("tick", Update);

        managers.Game.stage = stage;
        managers.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;

        keyboardManager = new managers.Keyboard();
        managers.Game.keyboardManager =  keyboardManager;

        managers.Game.assetManager = assetManager;

        managers.Game.textureAtlas = textureAtlas;
        Main();
    }

    function Update(): void {
        // stats.begin();
        //if the scene that is playing returns another current scene
        //then call main again and switch scene
        if (currentState != managers.Game.currentScene)
        {
            Main();
        }

        currentScene.Update();
        stage.update();
        // stats.end();
    }

    function Main(): void {
        //remove all current objects from the stage
        if(currentScene) {
            currentScene.Destroy();
            stage.removeChild(currentScene);
        }
        switch(managers.Game.currentScene)
        {
            case config.Scene.START:
                currentScene =  new scenes.StartScene();
                break;
            case config.Scene.INSTRUCTION:
                currentScene =  new scenes.InstructionScene();
                break;
            case config.Scene.LEVEL1:
                currentScene =  new scenes.Level1Scene();
                break;
            case config.Scene.LEVEL1_FINAL:
                currentScene =  new scenes.Level1FinalScene();
                break;
            case config.Scene.OVER:
                currentScene =  new scenes.OverScene();
                break;
        }

        currentState = managers.Game.currentScene;
        managers.Game.currentSceneObject = currentScene;
        //add new scene object to stage
        stage.addChild(currentScene);
    }

    window.addEventListener("load", Init);

})();