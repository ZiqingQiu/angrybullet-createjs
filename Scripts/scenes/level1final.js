/*
* File name: level1final.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: scene object of boss1
* Revision history:
* Jul 30 2018 created file
*/
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var scenes;
(function (scenes) {
    var Level1FinalScene = /** @class */ (function (_super) {
        __extends(Level1FinalScene, _super);
        //public properties
        //constructors
        function Level1FinalScene() {
            var _this = _super.call(this) || this;
            _this._player = managers.Game.player;
            _this._bulletManager = managers.Game.bulletManager;
            _this.Start();
            return _this;
        }
        //private methods
        Level1FinalScene.prototype.afterTimeout = function () {
            this.removeChild(this._warnLabel);
            this._boss1.SetEnable(true);
        };
        Level1FinalScene.prototype.delay = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(function () { return resolve(); }, 4000); }).then(function () {
                                return _this.afterTimeout();
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        //public methods
        Level1FinalScene.prototype.Start = function () {
            this._space = new objects.Space();
            this._boss1 = new objects.Level1BOSS();
            this._boss1.alpha = 0;
            this._warnLabel = new objects.Label("be aware", "50px", "Starjedi", "#FFFF00", 300, 150, true);
            this._bossHPLabel = new objects.Label("boss hp ", "20px", "Starjedi", "#FFFF00", 260, 10, false);
            this._scoreBoard = managers.Game.scoreBoard;
            this.Main();
        };
        Level1FinalScene.prototype.Update = function () {
            var _this = this;
            console.log("num objects: " + this.numChildren);
            this._space.Update();
            this._boss1.Update();
            this._player.Update();
            this._bulletManager.Update();
            var bulletIdxArray = [];
            var bullets = [];
            //check player
            bulletIdxArray = managers.Game.bulletManager.GetTotalBulletTypes("player");
            for (var idx = 0; idx < bulletIdxArray.length; idx++) {
                bullets = managers.Game.bulletManager.GetBullets("player", bulletIdxArray[idx]);
                bullets.forEach(function (bullet) {
                    if (bullet.alpha == 1) {
                        //check collision player-bullet -- enemy
                        managers.Collision.Check(bullet, _this._boss1);
                    }
                });
            }
            //check boss
            bulletIdxArray = managers.Game.bulletManager.GetTotalBulletTypes("boss_bullet_lv1");
            for (var idx = 0; idx < bulletIdxArray.length; idx++) {
                bullets = managers.Game.bulletManager.GetBullets("boss_bullet_lv1", bulletIdxArray[idx]);
                bullets.forEach(function (bullet) {
                    if (bullet.alpha == 1) {
                        //check collision player-bullet -- enemy
                        managers.Collision.Check(bullet, _this._player);
                    }
                });
            }
            //update HP;
            this._bossHPLabel.text = "boss hp " + this._boss1.getHP();
        };
        Level1FinalScene.prototype.Destroy = function () {
            //###
            //this._engineSound.stop();
            this.removeAllChildren();
        };
        Level1FinalScene.prototype.Main = function () {
            //add ocean to the scene
            this.addChild(this._space);
            //add label for 10s
            this.addChild(this._warnLabel);
            //add player to the scene
            this.addChild(this._player);
            this.addChild(this._player.planeFlash);
            //add boss1 to the scene
            this.addChild(this._boss1);
            //add bullets to the scene
            managers.Game.bulletManager.RegisterBullet(this, "boss_bullet_lv1");
            managers.Game.bulletManager.RegisterPlayerPreviousBullet(this);
            //add score board to the scene
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
            this.addChild(this._bossHPLabel);
            this.delay();
        };
        return Level1FinalScene;
    }(objects.Scene));
    scenes.Level1FinalScene = Level1FinalScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=level1final.js.map