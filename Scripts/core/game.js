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
            [1, 1, 15, 15, 0, 0, 0],
            [18, 1, 226, 178, 0, 0, 0],
            [246, 1, 44, 40, 0, 0, 0],
            [292, 1, 44, 40, 0, 0, 0],
            [338, 1, 44, 40, 0, 0, 0],
            [384, 1, 44, 40, 0, 0, 0],
            [430, 1, 44, 40, 0, 0, 0],
            [1, 181, 44, 40, 0, 0, 0],
            [47, 181, 44, 40, 0, 0, 0],
            [93, 181, 44, 40, 0, 0, 0],
            [139, 181, 44, 40, 0, 0, 0],
            [185, 181, 44, 40, 0, 0, 0],
            [231, 181, 44, 42, 0, 0, 0],
            [231, 181, 44, 42, 0, 0, 0],
            [231, 181, 44, 42, 0, 0, 0],
            [277, 181, 200, 50, 0, 0, 0],
            [1, 233, 65, 65, 0, 0, 0],
            [68, 233, 65, 65, 0, 0, 0],
            [135, 233, 65, 65, 0, 0, 0],
            [202, 233, 65, 65, 0, 0, 0],
            [269, 233, 65, 65, 0, 0, 0],
            [336, 233, 65, 65, 0, 0, 0],
            [403, 233, 65, 65, 0, 0, 0],
            [1, 300, 62, 63, 0, 0, 0],
            [65, 300, 200, 50, 0, 0, 0],
            [267, 300, 65, 65, 0, 0, 0],
            [334, 300, 65, 65, 0, 0, 0],
            [401, 300, 65, 65, 0, 0, 0],
            [1, 367, 65, 65, 0, 0, 0],
            [68, 367, 65, 65, 0, 0, 0],
            [135, 367, 65, 65, 0, 0, 0],
            [202, 367, 200, 50, 0, 0, 0],
            [404, 367, 32, 32, 0, 0, 0],
            [438, 367, 32, 32, 0, 0, 0],
            [472, 367, 32, 32, 0, 0, 0],
            [1, 434, 32, 32, 0, 0, 0],
            [35, 434, 32, 32, 0, 0, 0],
            [69, 434, 32, 32, 0, 0, 0],
            [103, 434, 200, 50, 0, 0, 0]
        ],
        "animations": {
            "bullet": { "frames": [0] },
            "cloud": { "frames": [1] },
            "coin": { "frames": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11], "speed": 0.33 },
            "enemy": { "frames": [12, 13, 14], "speed": 0.33 },
            "exitButton": { "frames": [15] },
            "explosion": { "frames": [16, 17, 18, 19, 20, 21, 22], "speed": 0.16 },
            "island": { "frames": [23] },
            "nextButton": { "frames": [24] },
            "planeflash": { "frames": [25, 26] },
            "playerlv1": { "frames": [27, 28, 29, 30], "speed": 0.2 },
            "restartButton": { "frames": [31] },
            "smallexplosion": { "frames": [32, 33, 34, 35, 36, 37], "speed": 0.16 },
            "startButton": { "frames": [38] }
        }
    };
    assetManifest = [
        { id: "textureAtlas", src: "./Assets/sprites/textureAtlas.png" },
        { id: "space", src: "./Assets/images/space.jpg" },
        { id: "engine", src: "./Assets/audio/engine.ogg" },
        { id: "coin", src: "./Assets/audio/coin.wav" },
        { id: "life", src: "./Assets/audio/lives.wav" },
        { id: "explosion", src: "./Assets/audio/explosion.mp3" },
        { id: "bulletSound", src: "./Assets/audio/bullet.wav" }
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