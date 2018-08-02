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
            [284, 1, 64, 74, 0, 0, 0],
            [350, 1, 91, 79, 0, 0, 0],
            [1, 82, 93, 94, 0, 0, 0],
            [96, 82, 100, 117, 0, 0, 0],
            [198, 82, 73, 119, 0, 0, 0],
            [273, 82, 103, 121, 0, 0, 0],
            [378, 82, 123, 117, 0, 0, 0],
            [1, 205, 87, 79, 0, 0, 0],
            [90, 205, 100, 43, 0, 0, 0],
            [192, 205, 100, 43, 0, 0, 0],
            [294, 205, 100, 43, 0, 0, 0],
            [1, 286, 187, 80, 0, 0, 0],
            [1, 286, 187, 80, 0, 0, 0],
            [190, 286, 100, 43, 0, 0, 0],
            [292, 286, 65, 65, 0, 0, 0],
            [359, 286, 65, 65, 0, 0, 0],
            [426, 286, 65, 65, 0, 0, 0],
            [1, 368, 65, 65, 0, 0, 0],
            [68, 368, 65, 65, 0, 0, 0],
            [135, 368, 65, 65, 0, 0, 0],
            [202, 368, 65, 65, 0, 0, 0],
            [269, 368, 40, 40, 0, 0, 0],
            [311, 368, 90, 40, 0, 0, 0],
            [403, 368, 40, 40, 0, 0, 0],
            [445, 368, 40, 40, 0, 0, 0],
            [1, 435, 40, 40, 0, 0, 0],
            [43, 435, 40, 40, 0, 0, 0],
            [85, 435, 40, 40, 0, 0, 0],
            [127, 435, 40, 40, 0, 0, 0],
            [169, 435, 40, 40, 0, 0, 0],
            [211, 435, 65, 65, 0, 0, 0],
            [278, 435, 65, 65, 0, 0, 0],
            [345, 435, 65, 65, 0, 0, 0],
            [412, 435, 65, 65, 0, 0, 0],
            [1, 502, 65, 65, 0, 0, 0],
            [68, 502, 65, 65, 0, 0, 0],
            [135, 502, 55, 24, 0, 0, 0],
            [192, 502, 44, 42, 0, 0, 0],
            [238, 502, 32, 32, 0, 0, 0],
            [272, 502, 32, 32, 0, 0, 0],
            [306, 502, 32, 32, 0, 0, 0],
            [340, 502, 32, 32, 0, 0, 0],
            [374, 502, 32, 32, 0, 0, 0],
            [408, 502, 32, 32, 0, 0, 0],
            [1, 569, 98, 82, 0, 0, 0]
        ],
        
        "animations": {
            "blt_bomb": { "frames": [0, 1, 2],"speed": 0.1 },
            "blt_enemy_laser_lv1": { "frames": [3] },
            "blt_laser_lv1": { "frames": [4] },
            "blt_laser_lv2": { "frames": [5, 6, 7, 8],"speed": 0.2 },
            "blt_rocket_lv1": { "frames": [9, 10, 11, 12, 13] },
            "boss_lv1": { "frames": [14, 15, 16, 17, 18, 19, 20, 21],"speed": 0.1 },
            "btn_back": { "frames": [22] },
            "btn_exit": { "frames": [23] },
            "btn_instruct": { "frames": [24] },
            "btn_restart": { "frames": [25] },
            "restartButton": { "frames": [26] },
            "btn_start": { "frames": [27] },
            "explosion": { "frames": [28, 29, 30, 31, 32, 33, 34] },
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
            "player_lv1": { "frames": [46, 47, 48, 49],"speed": 0.16 },
            "power_up": { "frames": [50] },
            "slaveI": { "frames": [51] },
            "smallexplosion": { "frames": [52, 53, 54, 55, 56, 57],"speed": 0.33 },
            "tie": { "frames": [58] }
        }   
        
        
    };
        

    assetManifest = [
        {id: "textureAtlas", src: "./Assets/sprites/textureAtlas.png" },
        {id: "space", src: "./Assets/images/space.jpg"},
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