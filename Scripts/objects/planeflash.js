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
    var PlaneFlash = /** @class */ (function (_super) {
        __extends(PlaneFlash, _super);
        //private instance variables
        //public properties
        //constructors
        function PlaneFlash() {
            return _super.call(this, "planeflash") || this;
        }
        //private methods
        //public methods
        PlaneFlash.prototype.Start = function () {
        };
        PlaneFlash.prototype.Update = function () {
        };
        return PlaneFlash;
    }(objects.GameObject));
    objects.PlaneFlash = PlaneFlash;
})(objects || (objects = {}));
//# sourceMappingURL=planeflash.js.map