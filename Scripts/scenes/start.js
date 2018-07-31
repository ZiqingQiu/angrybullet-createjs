var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var StartScene = /** @class */ (function (_super) {
        __extends(StartScene, _super);
        //Public Properties
        //Constructor
        function StartScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        //Private Methods
        StartScene.prototype._startButtonClick = function () {
            managers.Game.currentScene = config.Scene.PLAY;
        };
        StartScene.prototype._instructionButtonClick = function () {
            managers.Game.currentScene = config.Scene.INSTRUCTION;
        };
        StartScene.prototype._exitButtonClick = function () {
            managers.Game.currentScene = config.Scene.OVER;
        };
        //Public Methods
        //Initialize Game Variables and objects
        StartScene.prototype.Start = function () {
            this._space = new objects.Space();
            this._welcomeLabel = new objects.Label("Angry Bullet", "50px", "Starjedi", "#FFFF00", 250, 180, true);
            this._startButtton = new objects.Button("btn_start", 320, 300);
            this._instructionButtton = new objects.Button("btn_instruct", 320, 350);
            this._exitButtton = new objects.Button("btn_exit", 320, 400);
            //make a ref to the bullet manager in the game manager
            this._bulletManager = new managers.Bullet();
            managers.Game.bulletManager = this._bulletManager;
            this.Main();
        };
        StartScene.prototype.Update = function () {
            this._space.Update();
        };
        StartScene.prototype.Destroy = function () {
            this.removeAllChildren();
        };
        StartScene.prototype.Main = function () {
            //add the space to the scene
            this.addChild(this._space);
            //add the welcome label to the scene
            this.addChild(this._welcomeLabel);
            //add the start btn to the scene
            this.addChild(this._startButtton);
            this.addChild(this._instructionButtton);
            this.addChild(this._exitButtton);
            this._startButtton.on("click", this._startButtonClick);
            this._instructionButtton.on("click", this._instructionButtonClick);
            this._exitButtton.on("click", this._exitButtonClick);
        };
        return StartScene;
    }(objects.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map