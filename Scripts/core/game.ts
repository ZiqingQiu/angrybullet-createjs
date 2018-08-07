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
            [1, 1, 51, 55, 0, 0, 0],
            [54, 1, 57, 59, 0, 0, 0],
            [113, 1, 58, 64, 0, 0, 0],
            [173, 1, 53, 65, 0, 0, 0],
            [228, 1, 17, 47, 0, 0, 0],
            [247, 1, 11, 28, 0, 0, 0],
            [260, 1, 28, 28, 0, 0, 0],
            [290, 1, 28, 28, 0, 0, 0],
            [320, 1, 28, 28, 0, 0, 0],
            [350, 1, 28, 28, 0, 0, 0],
            [380, 1, 14, 60, 0, 0, 0],
            [396, 1, 14, 60, 0, 0, 0],
            [412, 1, 14, 60, 0, 0, 0],
            [428, 1, 14, 60, 0, 0, 0],
            [444, 1, 14, 60, 0, 0, 0],
            [1, 68, 130, 200, 0, 0, 0],
            [133, 68, 130, 200, 0, 0, 0],
            [265, 68, 130, 200, 0, 0, 0],
            [397, 68, 100, 43, 0, 0, 0],
            [1, 270, 100, 43, 0, 0, 0],
            [103, 270, 100, 43, 0, 0, 0],
            [205, 270, 187, 80, 0, 0, 0],
            [205, 270, 187, 80, 0, 0, 0],
            [394, 270, 100, 43, 0, 0, 0],
            [1, 352, 64, 74, 0, 0, 0],
            [67, 352, 91, 79, 0, 0, 0],
            [160, 352, 93, 94, 0, 0, 0],
            [255, 352, 100, 117, 0, 0, 0],
            [357, 352, 73, 119, 0, 0, 0],
            [1, 473, 103, 121, 0, 0, 0],
            [106, 473, 123, 117, 0, 0, 0],
            [231, 473, 87, 79, 0, 0, 0],
            [320, 473, 65, 65, 0, 0, 0],
            [387, 473, 65, 65, 0, 0, 0],
            [1, 596, 65, 65, 0, 0, 0],
            [68, 596, 65, 65, 0, 0, 0],
            [135, 596, 65, 65, 0, 0, 0],
            [202, 596, 65, 65, 0, 0, 0],
            [269, 596, 65, 65, 0, 0, 0],
            [336, 596, 40, 40, 0, 0, 0],
            [378, 596, 90, 40, 0, 0, 0],
            [470, 596, 40, 40, 0, 0, 0],
            [1, 663, 40, 40, 0, 0, 0],
            [43, 663, 40, 40, 0, 0, 0],
            [85, 663, 40, 40, 0, 0, 0],
            [127, 663, 40, 40, 0, 0, 0],
            [169, 663, 40, 40, 0, 0, 0],
            [211, 663, 40, 40, 0, 0, 0],
            [253, 663, 65, 65, 0, 0, 0],
            [320, 663, 65, 65, 0, 0, 0],
            [387, 663, 65, 65, 0, 0, 0],
            [1, 730, 65, 65, 0, 0, 0],
            [68, 730, 65, 65, 0, 0, 0],
            [135, 730, 65, 65, 0, 0, 0],
            [202, 730, 55, 24, 0, 0, 0],
            [259, 730, 55, 23, 0, 0, 0],
            [316, 730, 55, 24, 0, 0, 0],
            [373, 730, 44, 42, 0, 0, 0],
            [419, 730, 32, 32, 0, 0, 0],
            [453, 730, 32, 32, 0, 0, 0],
            [1, 797, 32, 32, 0, 0, 0],
            [35, 797, 32, 32, 0, 0, 0],
            [69, 797, 32, 32, 0, 0, 0],
            [103, 797, 32, 32, 0, 0, 0],
            [137, 797, 98, 82, 0, 0, 0],
            [237, 797, 67, 100, 0, 0, 0]
        ],
        
        "animations": {
            "blt_boss_bomb_lv1": { "frames": [0, 1, 2, 3],"speed": 0.1 },
            "blt_enemy_laser_lv1": { "frames": [4] },
            "blt_player_laser_lv1": { "frames": [5] },
            "blt_player_laser_lv2": { "frames": [6, 7, 8, 9],"speed": 0.2 },
            "blt_player_rocket_lv1": { "frames": [10, 11, 12, 13, 14],"speed": 0.1 },
            "boss_lv1": { "frames": [15, 16, 17],"speed": 0.1 },
            "btn_back": { "frames": [18] },
            "btn_exit": { "frames": [19] },
            "btn_instruct": { "frames": [20] },
            "btn_restart": { "frames": [21] },
            "restartButton": { "frames": [22] },
            "btn_start": { "frames": [23] },
            "crazyq": { "frames": [24, 25, 26, 27, 28, 29, 30, 31],"speed": 0.1 },
            "explosion": { "frames": [32, 33, 34, 35, 36, 37, 38] },
            "kb_a": { "frames": [39] },
            "kb_blankspace": { "frames": [40] },
            "kb_d": { "frames": [41] },
            "kb_down": { "frames": [42] },
            "kb_left": { "frames": [43] },
            "kb_right": { "frames": [44] },
            "kb_s": { "frames": [45] },
            "kb_up": { "frames": [46] },
            "kb_w": { "frames": [47] },
            "planeflash": { "frames": [48, 49] },
            "player_lv1": { "frames": [50, 51, 52, 53],"speed": 0.16 },
            "power_up_F": { "frames": [54] },
            "power_up_L": { "frames": [55] },
            "power_up_S": { "frames": [56] },
            "slaveI": { "frames": [57] },
            "smallexplosion": { "frames": [58, 59, 60, 61, 62, 63] },
            "tie": { "frames": [64] },
            "tie_lv2": { "frames": [65] }
        }   
        
        
    };
        

    assetManifest = [
        {id: "textureAtlas", src: "./Assets/sprites/textureAtlas.png" },
        {id: "space_lv1", src: "./Assets/images/space_lv1.jpg"},
        {id: "space_lv2", src: "./Assets/images/space_lv2.jpg"},
        {id: "space_lv3", src: "./Assets/images/space_lv3.jpg"},
        {id: "instruction", src: "./Assets/images/instruction.jpg"},
        {id: "coin", src: "./Assets/audio/coin.wav"},
        {id: "life", src: "./Assets/audio/lives.wav"},
        {id: "explosion", src: "./Assets/audio/explosion.mp3"},
        {id: "blt_sound_laser_lv1", src: "./Assets/audio/bullet_laser_lv1.wav"},
        {id: "blt_sound_laser_lv2", src: "./Assets/audio/bullet_laser_lv2.wav"},
        {id: "blt_sound_rocket_lv1", src: "./Assets/audio/bullet_rocket_lv1.mp3"},
        {id: "level1_background", src: "./Assets/audio/level1_background.ogg"},
        {id: "level1_final_background", src: "./Assets/audio/level1_final_background.mp3"},
        {id: "level2_background", src: "./Assets/audio/level2_background.ogg"}
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
            case config.Scene.LEVEL2:
                currentScene =  new scenes.Level2Scene();
                break;
            // case config.Scene.LEVEL2_FINAL:
            //     currentScene =  new scenes.Level2FinalScene();
            //     break;  
            // case config.Scene.LEVEL3:
            //     currentScene =  new scenes.Level3Scene();
            //     break;
            // case config.Scene.LEVEL3_FINAL:
            //     currentScene =  new scenes.Level3FinalScene();
            //     break;                                    
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