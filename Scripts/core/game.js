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
            "./Assets/sprites/textureAtlas.png"
        ],
        "frames": [
            [1, 1, 13, 18, 0, 0, 0],
            [16, 1, 44, 40, 0, 0, 0],
            [62, 1, 44, 40, 0, 0, 0],
            [108, 1, 44, 40, 0, 0, 0],
            [154, 1, 44, 40, 0, 0, 0],
            [200, 1, 44, 40, 0, 0, 0],
            [246, 1, 44, 40, 0, 0, 0],
            [292, 1, 44, 40, 0, 0, 0],
            [338, 1, 44, 40, 0, 0, 0],
            [384, 1, 44, 40, 0, 0, 0],
            [430, 1, 44, 40, 0, 0, 0],
            [1, 43, 44, 42, 0, 0, 0],
            [1, 43, 44, 42, 0, 0, 0],
            [1, 43, 44, 42, 0, 0, 0],
            [47, 43, 200, 50, 0, 0, 0],
            [249, 43, 65, 65, 0, 0, 0],
            [316, 43, 65, 65, 0, 0, 0],
            [383, 43, 65, 65, 0, 0, 0],
            [1, 110, 65, 65, 0, 0, 0],
            [68, 110, 65, 65, 0, 0, 0],
            [135, 110, 65, 65, 0, 0, 0],
            [202, 110, 65, 65, 0, 0, 0],
            [269, 110, 200, 50, 0, 0, 0],
            [1, 177, 65, 65, 0, 0, 0],
            [68, 177, 65, 65, 0, 0, 0],
            [135, 177, 65, 65, 0, 0, 0],
            [202, 177, 65, 65, 0, 0, 0],
            [269, 177, 65, 65, 0, 0, 0],
            [336, 177, 65, 65, 0, 0, 0],
            [1, 244, 200, 50, 0, 0, 0],
            [203, 244, 32, 32, 0, 0, 0],
            [237, 244, 32, 32, 0, 0, 0],
            [271, 244, 32, 32, 0, 0, 0],
            [305, 244, 32, 32, 0, 0, 0],
            [339, 244, 32, 32, 0, 0, 0],
            [373, 244, 32, 32, 0, 0, 0],
            [1, 296, 200, 50, 0, 0, 0],
            [203, 296, 98, 85, 0, 0, 0]
        ],
        "animations": {
            "bluedotbullet": { "frames": [0] },
            "coin": { "frames": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "speed": 0.33 },
            "enemy": { "frames": [11, 12, 13], "speed": 0.33 },
            "exitButton": { "frames": [14] },
            "explosion": { "frames": [15, 16, 17, 18, 19, 20, 21], "speed": 0.16 },
            "nextButton": { "frames": [22] },
            "planeflash": { "frames": [23, 24] },
            "playerlv1": { "frames": [25, 26, 27, 28], "speed": 0.33 },
            "restartButton": { "frames": [29] },
            "smallexplosion": { "frames": [30, 31, 32, 33, 34, 35], "speed": 0.33 },
            "startButton": { "frames": [36] },
            "tie": { "frames": [37] }
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
        textureAtlas = new createjs.SpriteSheet(textureAtlasData);
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