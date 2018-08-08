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
            [228, 1, 40, 44, 0, 0, 0],
            [270, 1, 40, 44, 0, 0, 0],
            [312, 1, 40, 44, 0, 0, 0],
            [354, 1, 17, 47, 0, 0, 0],
            [373, 1, 72, 47, 0, 0, 0],
            [447, 1, 66, 45, 0, 0, 0],
            [515, 1, 55, 50, 0, 0, 0],
            [572, 1, 47, 68, 0, 0, 0],
            [621, 1, 11, 28, 0, 0, 0],
            [634, 1, 28, 28, 0, 0, 0],
            [664, 1, 28, 28, 0, 0, 0],
            [694, 1, 28, 28, 0, 0, 0],
            [724, 1, 28, 28, 0, 0, 0],
            [754, 1, 14, 60, 0, 0, 0],
            [770, 1, 14, 60, 0, 0, 0],
            [786, 1, 14, 60, 0, 0, 0],
            [802, 1, 14, 60, 0, 0, 0],
            [818, 1, 14, 60, 0, 0, 0],
            [834, 1, 130, 200, 0, 0, 0],
            [1, 203, 130, 200, 0, 0, 0],
            [133, 203, 130, 200, 0, 0, 0],
            [265, 203, 130, 210, 0, 0, 0],
            [397, 203, 130, 210, 0, 0, 0],
            [529, 203, 130, 210, 0, 0, 0],
            [661, 203, 150, 200, 0, 0, 0],
            [813, 203, 150, 200, 0, 0, 0],
            [1, 415, 150, 200, 0, 0, 0],
            [153, 415, 100, 43, 0, 0, 0],
            [255, 415, 100, 43, 0, 0, 0],
            [357, 415, 100, 43, 0, 0, 0],
            [459, 415, 187, 80, 0, 0, 0],
            [459, 415, 187, 80, 0, 0, 0],
            [648, 415, 100, 43, 0, 0, 0],
            [750, 415, 64, 74, 0, 0, 0],
            [816, 415, 91, 79, 0, 0, 0],
            [909, 415, 93, 94, 0, 0, 0],
            [1, 617, 100, 117, 0, 0, 0],
            [103, 617, 73, 119, 0, 0, 0],
            [178, 617, 103, 121, 0, 0, 0],
            [283, 617, 123, 117, 0, 0, 0],
            [408, 617, 87, 79, 0, 0, 0],
            [497, 617, 57, 72, 0, 0, 0],
            [556, 617, 56, 72, 0, 0, 0],
            [614, 617, 63, 79, 0, 0, 0],
            [679, 617, 69, 103, 0, 0, 0],
            [750, 617, 66, 116, 0, 0, 0],
            [818, 617, 85, 102, 0, 0, 0],
            [905, 617, 101, 75, 0, 0, 0],
            [1, 740, 65, 65, 0, 0, 0],
            [68, 740, 65, 65, 0, 0, 0],
            [135, 740, 65, 65, 0, 0, 0],
            [202, 740, 65, 65, 0, 0, 0],
            [269, 740, 65, 65, 0, 0, 0],
            [336, 740, 65, 65, 0, 0, 0],
            [403, 740, 65, 65, 0, 0, 0],
            [470, 740, 40, 40, 0, 0, 0],
            [512, 740, 90, 40, 0, 0, 0],
            [604, 740, 40, 40, 0, 0, 0],
            [646, 740, 40, 40, 0, 0, 0],
            [688, 740, 40, 40, 0, 0, 0],
            [730, 740, 40, 40, 0, 0, 0],
            [772, 740, 40, 40, 0, 0, 0],
            [814, 740, 40, 40, 0, 0, 0],
            [856, 740, 40, 40, 0, 0, 0],
            [898, 740, 65, 65, 0, 0, 0],
            [1, 807, 65, 65, 0, 0, 0],
            [68, 807, 65, 65, 0, 0, 0],
            [135, 807, 65, 65, 0, 0, 0],
            [202, 807, 65, 65, 0, 0, 0],
            [269, 807, 65, 65, 0, 0, 0],
            [336, 807, 55, 24, 0, 0, 0],
            [393, 807, 55, 23, 0, 0, 0],
            [450, 807, 55, 24, 0, 0, 0],
            [507, 807, 44, 42, 0, 0, 0],
            [553, 807, 32, 32, 0, 0, 0],
            [587, 807, 32, 32, 0, 0, 0],
            [621, 807, 32, 32, 0, 0, 0],
            [655, 807, 32, 32, 0, 0, 0],
            [689, 807, 32, 32, 0, 0, 0],
            [723, 807, 32, 32, 0, 0, 0],
            [757, 807, 98, 82, 0, 0, 0],
            [857, 807, 67, 100, 0, 0, 0],
            [1, 909, 98, 97, 0, 0, 0]
        ],
        
        "animations": {
            "blt_boss_bomb_lv1": { "frames": [0, 1, 2, 3],"speed": 0.1 },
            "blt_boss_laser_lv1": { "frames": [4, 5, 6],"speed": 0.1 },
            "blt_enemy_laser_lv1": { "frames": [7] },
            "blt_enemy_laser_lv2": { "frames": [8, 9, 10, 11],"speed": 0.1 },
            "blt_player_laser_lv1": { "frames": [12] },
            "blt_player_laser_lv2": { "frames": [13, 14, 15, 16],"speed": 0.2 },
            "blt_player_rocket_lv1": { "frames": [17, 18, 19, 20, 21],"speed": 0.1 },
            "boss_lv1": { "frames": [22, 23, 24],"speed": 0.1 },
            "boss_lv2": { "frames": [25, 26, 27],"speed": 0.1 },
            "boss_lv3": { "frames": [28, 29, 30],"speed": 0.1 },
            "btn_back": { "frames": [31] },
            "btn_exit": { "frames": [32] },
            "btn_instruct": { "frames": [33] },
            "btn_restart": { "frames": [34] },
            "restartButton": { "frames": [35] },
            "btn_start": { "frames": [36] },
            "crazyq": { "frames": [37, 38, 39, 40, 41, 42, 43, 44],"speed": 0.1 },
            "empire": { "frames": [45, 46, 47, 48, 49, 50, 51],"speed": 0.1 },
            "explosion": { "frames": [52, 53, 54, 55, 56, 57, 58] },
            "kb_a": { "frames": [59] },
            "kb_blankspace": { "frames": [60] },
            "kb_d": { "frames": [61] },
            "kb_down": { "frames": [62] },
            "kb_left": { "frames": [63] },
            "kb_right": { "frames": [64] },
            "kb_s": { "frames": [65] },
            "kb_up": { "frames": [66] },
            "kb_w": { "frames": [67] },
            "planeflash": { "frames": [68, 69] },
            "player_lv1": { "frames": [70, 71, 72, 73],"speed": 0.16 },
            "power_up_F": { "frames": [74] },
            "power_up_L": { "frames": [75] },
            "power_up_S": { "frames": [76] },
            "slaveI": { "frames": [77] },
            "smallexplosion": { "frames": [78, 79, 80, 81, 82, 83] },
            "tie": { "frames": [84] },
            "tie_lv2": { "frames": [85] },
            "tie_lv3": { "frames": [86] }
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
        {id: "gamewin", src: "./Assets/audio/win.wav"},        
        {id: "explosion", src: "./Assets/audio/explosion.mp3"},
        {id: "blt_sound_laser_lv1", src: "./Assets/audio/bullet_laser_lv1.wav"},
        {id: "blt_sound_laser_lv2", src: "./Assets/audio/bullet_laser_lv2.wav"},
        {id: "blt_sound_rocket_lv1", src: "./Assets/audio/bullet_rocket_lv1.mp3"},
        {id: "level1_background", src: "./Assets/audio/level1_background.mp3"},
        {id: "level1_final_background", src: "./Assets/audio/level1_final_background.mp3"},
        {id: "level2_background", src: "./Assets/audio/level2_background.mp3"},
        {id: "level2_final_background", src: "./Assets/audio/level2_final_background.mp3"},
        {id: "level3_background", src: "./Assets/audio/level3_background.mp3"}
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
            case config.Scene.LEVEL2_FINAL:
                currentScene =  new scenes.Level2FinalScene();
                break;  
            case config.Scene.LEVEL3:
                currentScene =  new scenes.Level3Scene();
                break;
            case config.Scene.LEVEL3_FINAL:
                currentScene =  new scenes.Level3FinalScene();
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