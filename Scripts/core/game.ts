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
            "./Assets/sprites/textureAtlas.png"
        ],
        
        "frames": [
            [1, 1, 16, 16, 0, 0, 0],
            [19, 1, 226, 178, 0, 0, 0],
            [1, 181, 44, 40, 0, 0, 0],
            [47, 181, 44, 40, 0, 0, 0],
            [93, 181, 44, 40, 0, 0, 0],
            [139, 181, 44, 40, 0, 0, 0],
            [185, 181, 44, 40, 0, 0, 0],
            [1, 223, 44, 40, 0, 0, 0],
            [47, 223, 44, 40, 0, 0, 0],
            [93, 223, 44, 40, 0, 0, 0],
            [139, 223, 44, 40, 0, 0, 0],
            [185, 223, 44, 40, 0, 0, 0],
            [1, 265, 93, 74, 0, 0, 0],
            [96, 265, 93, 74, 0, 0, 0],
            [1, 341, 93, 74, 0, 0, 0],
            [1, 417, 200, 50, 0, 0, 0],
            [1, 469, 65, 65, 0, 0, 0],
            [68, 469, 65, 65, 0, 0, 0],
            [135, 469, 65, 65, 0, 0, 0],
            [1, 536, 65, 65, 0, 0, 0],
            [68, 536, 65, 65, 0, 0, 0],
            [135, 536, 65, 65, 0, 0, 0],
            [1, 603, 65, 65, 0, 0, 0],
            [68, 603, 62, 63, 0, 0, 0],
            [1, 670, 200, 50, 0, 0, 0],
            [1, 722, 65, 65, 0, 0, 0],
            [68, 722, 65, 65, 0, 0, 0],
            [135, 722, 65, 65, 0, 0, 0],
            [1, 789, 65, 65, 0, 0, 0],
            [68, 789, 65, 65, 0, 0, 0],
            [1, 856, 200, 50, 0, 0, 0],
            [203, 856, 32, 32, 0, 0, 0],
            [1, 908, 32, 32, 0, 0, 0],
            [35, 908, 32, 32, 0, 0, 0],
            [69, 908, 32, 32, 0, 0, 0],
            [103, 908, 32, 32, 0, 0, 0],
            [137, 908, 32, 32, 0, 0, 0],
            [1, 942, 200, 50, 0, 0, 0]
        ],
        
        "animations": {
            "bullet": { "frames": [0] },
            "cloud": { "frames": [1] },
            "coin": { 
                "frames": [2,3,4,5,6,7,8,9,10,11],
                "speed": 0.33 
            },
            "enemy": { 
                "frames": [12,13,14],
                "speed": 0.33 
            },
            "exitButton": { "frames": [15] },
            "explosion": { 
                "frames": [16,17,18,19,20,21,22],
                "speed": 0.16 
            },
            "island": { "frames": [23] },
            "nextButton": { "frames": [24] },
            "plane": { 
                "frames": [25,26,27],
                "speed": 0.5 
            },
            "planeflash": { 
                "frames": [28,29],
                "speed": 0.08
            },
            "restartButton": { "frames": [30] },
            "smallexplosion": { 
                "frames": [31,32,33,34,35,36],
                "speed": 0.16
            },
            "startButton": { "frames": [37] }
        }
        
    };
        

    assetManifest = [
        {id: "textureAtlas", src: "./Assets/sprites/textureAtlas.png" },
        {id: "space", src: "./Assets/images/space.jpg"},
        {id: "engine", src: "./Assets/audio/engine.ogg"},
        {id: "coin", src: "./Assets/audio/coin.wav"},
        {id: "life", src: "./Assets/audio/lives.wav"},
        {id: "explosion", src: "./Assets/audio/explosion.mp3"},
        {id: "bulletSound", src: "./Assets/audio/bullet.wav"}
    ];

    function Init(): void {
        console.log(`Init Function...`);
        //load assets
        textureAtlas = new createjs.SpriteSheet(textureAtlasData);
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
                //instantiate a new scene object
                currentScene =  new scenes.StartScene();
            break;
            case config.Scene.PLAY:
                //instantiate a new scene object
                currentScene =  new scenes.PlayScene();
            break;
            case config.Scene.OVER:
                //instantiate a new scene object
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