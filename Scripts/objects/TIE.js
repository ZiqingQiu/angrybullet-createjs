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
    var TIE = /** @class */ (function (_super) {
        __extends(TIE, _super);
        //Public Properties
        //Constructor
        function TIE() {
            var _this = _super.call(this, "tie") || this;
            _this.Start();
            return _this;
        }
        //Private Methods
        TIE.prototype.Reset = function () {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = -this.height;
            //drift randomly
            this._dx = Math.floor((Math.random() * 4) - 2);
            this._dy = Math.floor((Math.random() * 5) + 5);
        };
        TIE.prototype.Move = function () {
            this.y += this._dy;
            this.x += this._dx;
        };
        TIE.prototype.CheckBounds = function () {
            //check lower bounds
            if (this.y >= 480 + this.height) {
                this.Reset();
            }
        };
        //Public Methods
        TIE.prototype.Start = function () {
            this._dy = 5;
            this.Reset();
        };
        TIE.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        return TIE;
    }(objects.GameObject));
    objects.TIE = TIE;
})(objects || (objects = {}));
//# sourceMappingURL=TIE.js.map