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
var objects;
(function (objects) {
    var Explosion = /** @class */ (function (_super) {
        __extends(Explosion, _super);
        //private instance variables
        //public properties
        //constructors
        function Explosion(spriteString) {
            var _this = _super.call(this, spriteString) || this;
            _this.Start();
            return _this;
        }
        //private methods
        Explosion.prototype._animationEnded = function () {
            this.alpha = 0;
            this.off("animationend", this._animationEnded.bind(this), false);
            managers.Game.currentSceneObject.removeChild(this);
        };
        //publlic methods
        Explosion.prototype.Start = function () {
            this.on("animationend", this._animationEnded.bind(this), false);
        };
        Explosion.prototype.Update = function () {
        };
        return Explosion;
    }(objects.GameObject));
    objects.Explosion = Explosion;
})(objects || (objects = {}));
//# sourceMappingURL=explosion.js.map