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
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        //Private Instance Variables
        //Public Properties
        //Constructor
        function Enemy() {
            var _this = _super.call(this, "enemy") || this;
            _this.Start();
            return _this;
        }
        //Private Methods
        Enemy.prototype.Reset = function () {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = -this.height;
            this.alpha = 0;
        };
        Enemy.prototype.Move = function () {
            this.y += this._dy;
        };
        Enemy.prototype.CheckBounds = function () {
            if (this.y >= 0 && this.alpha == 0) {
                this.alpha = 1;
            }
            //check lower bounds
            if (this.y >= 480 + this.height) {
                this.Reset();
            }
        };
        //Public Methods
        Enemy.prototype.Start = function () {
            this._dy = 10;
            this.Reset();
        };
        Enemy.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map