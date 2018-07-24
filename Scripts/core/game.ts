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
            [1, 1, 11, 28, 0, 0, 0],
            [14, 1, 28, 28, 0, 0, 0],
            [44, 1, 28, 28, 0, 0, 0],
            [74, 1, 28, 28, 0, 0, 0],
            [104, 1, 28, 28, 0, 0, 0],
            [134, 1, 35, 51, 0, 0, 0],
            [171, 1, 35, 51, 0, 0, 0],
            [208, 1, 44, 42, 0, 0, 0],
            [208, 1, 44, 42, 0, 0, 0],
            [208, 1, 44, 42, 0, 0, 0],
            [254, 1, 200, 50, 0, 0, 0],
            [1, 54, 65, 65, 0, 0, 0],
            [68, 54, 65, 65, 0, 0, 0],
            [135, 54, 65, 65, 0, 0, 0],
            [202, 54, 65, 65, 0, 0, 0],
            [269, 54, 65, 65, 0, 0, 0],
            [336, 54, 65, 65, 0, 0, 0],
            [403, 54, 65, 65, 0, 0, 0],
            [1, 121, 200, 50, 0, 0, 0],
            [203, 121, 65, 65, 0, 0, 0],
            [270, 121, 65, 65, 0, 0, 0],
            [337, 121, 65, 65, 0, 0, 0],
            [404, 121, 65, 65, 0, 0, 0],
            [1, 188, 65, 65, 0, 0, 0],
            [68, 188, 65, 65, 0, 0, 0],
            [135, 188, 187, 80, 0, 0, 0],
            [324, 188, 32, 32, 0, 0, 0],
            [358, 188, 32, 32, 0, 0, 0],
            [392, 188, 32, 32, 0, 0, 0],
            [426, 188, 32, 32, 0, 0, 0],
            [460, 188, 32, 32, 0, 0, 0],
            [1, 270, 32, 32, 0, 0, 0],
            [35, 270, 187, 80, 0, 0, 0],
            [224, 270, 98, 82, 0, 0, 0]
        ],
        
        "animations": {
            "blt_playerlv1": { "frames": [0] },
            "blt_playerlv2": { "frames": [1, 2, 3, 4], "speed": 0.1 },
            "coin": { "frames": [5, 6] , "speed": 0.2},
            "enemy": { "frames": [7, 8, 9], "speed": 0.33},
            "exitButton": { "frames": [10] },
            "explosion": { "frames": [11, 12, 13, 14, 15, 16, 17], "speed": 0.16 },
            "nextButton": { "frames": [18] },
            "planeflash": { "frames": [19, 20] },
            "player": { "frames": [21, 22, 23, 24] , "speed": 0.16},
            "restartButton": { "frames": [25] },
            "smallexplosion": { "frames": [26, 27, 28, 29, 30, 31], "speed": 0.33 },
            "startButton": { "frames": [32] },
            "tie": { "frames": [33] }
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