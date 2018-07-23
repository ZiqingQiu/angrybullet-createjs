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
            [1, 1, 11, 28, 0, 0, 0],
            [14, 1, 28, 28, 0, 0, 0],
            [44, 1, 28, 28, 0, 0, 0],
            [74, 1, 28, 28, 0, 0, 0],
            [104, 1, 28, 28, 0, 0, 0],
            [134, 1, 44, 40, 0, 0, 0],
            [180, 1, 44, 40, 0, 0, 0],
            [226, 1, 44, 40, 0, 0, 0],
            [272, 1, 44, 40, 0, 0, 0],
            [318, 1, 44, 40, 0, 0, 0],
            [364, 1, 44, 40, 0, 0, 0],
            [410, 1, 44, 40, 0, 0, 0],
            [456, 1, 44, 40, 0, 0, 0],
            [1, 43, 44, 40, 0, 0, 0],
            [47, 43, 44, 40, 0, 0, 0],
            [93, 43, 44, 42, 0, 0, 0],
            [93, 43, 44, 42, 0, 0, 0],
            [93, 43, 44, 42, 0, 0, 0],
            [139, 43, 200, 50, 0, 0, 0],
            [341, 43, 65, 65, 0, 0, 0],
            [408, 43, 65, 65, 0, 0, 0],
            [1, 110, 65, 65, 0, 0, 0],
            [68, 110, 65, 65, 0, 0, 0],
            [135, 110, 65, 65, 0, 0, 0],
            [202, 110, 65, 65, 0, 0, 0],
            [269, 110, 65, 65, 0, 0, 0],
            [1, 177, 200, 50, 0, 0, 0],
            [203, 177, 65, 65, 0, 0, 0],
            [270, 177, 65, 65, 0, 0, 0],
            [337, 177, 65, 65, 0, 0, 0],
            [404, 177, 65, 65, 0, 0, 0],
            [1, 244, 65, 65, 0, 0, 0],
            [68, 244, 65, 65, 0, 0, 0],
            [135, 244, 200, 50, 0, 0, 0],
            [337, 244, 32, 32, 0, 0, 0],
            [371, 244, 32, 32, 0, 0, 0],
            [405, 244, 32, 32, 0, 0, 0],
            [439, 244, 32, 32, 0, 0, 0],
            [473, 244, 32, 32, 0, 0, 0],
            [1, 311, 32, 32, 0, 0, 0],
            [35, 311, 200, 50, 0, 0, 0],
            [237, 311, 98, 85, 0, 0, 0]
        ],
        "animations": {
            "blt_playerlv1": { "frames": [0] },
            "blt_playerlv2": { "frames": [1, 2, 3, 4], "speed": 0.2 },
            "coin": { "frames": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14], "speed": 0.33 },
            "enemy": { "frames": [15, 16, 17], "speed": 0.33 },
            "exitButton": { "frames": [18] },
            "explosion": { "frames": [19, 20, 21, 22, 23, 24, 25], "speed": 0.16 },
            "nextButton": { "frames": [26] },
            "planeflash": { "frames": [27, 28] },
            "player": { "frames": [29, 30, 31, 32], "speed": 0.33 },
            "restartButton": { "frames": [33] },
            "smallexplosion": { "frames": [34, 35, 36, 37, 38, 39], "speed": 0.33 },
            "startButton": { "frames": [40] },
            "tie": { "frames": [41] }
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