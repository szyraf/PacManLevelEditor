var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("dimensions", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.MAP_CANVAS = exports.SPRITES_CANVAS = exports.CANVAS = exports.IMAGE = void 0;
    exports.IMAGE = {
        spriteSize: 47,
        borderSize: 1,
        numberOfSpritesX: 32,
        numberOfSpritesY: 20,
        width: 1536,
        height: 960
    };
    exports.CANVAS = {
        spriteSize: 25,
        borderSize: 2,
        borderDefaultColor: '#ffffff',
        borderHighlightColor: '#ff0000'
    };
    exports.SPRITES_CANVAS = {
        numberOfSpritesX: 16,
        numberOfSpritesY: 40,
        width: 0,
        height: 0
    };
    exports.SPRITES_CANVAS.width = exports.CANVAS.spriteSize * exports.SPRITES_CANVAS.numberOfSpritesX + exports.CANVAS.borderSize * (exports.SPRITES_CANVAS.numberOfSpritesX * 2);
    exports.SPRITES_CANVAS.height = exports.CANVAS.spriteSize * exports.SPRITES_CANVAS.numberOfSpritesY + exports.CANVAS.borderSize * (exports.SPRITES_CANVAS.numberOfSpritesY * 2);
    exports.MAP_CANVAS = {
        numberOfSpritesX: 44,
        numberOfSpritesY: 38,
        width: 0,
        height: 0
    };
    exports.MAP_CANVAS.width = exports.CANVAS.spriteSize * exports.MAP_CANVAS.numberOfSpritesX + exports.CANVAS.borderSize * (exports.MAP_CANVAS.numberOfSpritesX * 2);
    exports.MAP_CANVAS.height = exports.CANVAS.spriteSize * exports.MAP_CANVAS.numberOfSpritesY + exports.CANVAS.borderSize * (exports.MAP_CANVAS.numberOfSpritesY * 2);
});
define("SpritesImage", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.SpritesImage = void 0;
    var SpritesImage = /** @class */ (function () {
        function SpritesImage() {
            this.spritesImg = new Image();
            this.spritesImg.src = 'sprites.png';
        }
        SpritesImage.prototype.getSpritesImg = function () {
            return this.spritesImg;
        };
        SpritesImage.prototype.setSpritesImg = function (spritesImg) {
            this.spritesImg = spritesImg;
        };
        return SpritesImage;
    }());
    exports.SpritesImage = SpritesImage;
});
define("Canvas", ["require", "exports", "dimensions", "SpritesImage"], function (require, exports, dimensions_1, SpritesImage_1) {
    "use strict";
    exports.__esModule = true;
    exports.Canvas = void 0;
    var Canvas = /** @class */ (function () {
        function Canvas(canvasId, CANVAS_SIZE) {
            var _this = this;
            this.prevMouseX = -1;
            this.prevMouseY = -1;
            this.mouseMove = function (e) {
                var pos = _this.getMousePos(_this.canvas, e);
                var x = Math.floor(pos.x / (dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2));
                var y = Math.floor(pos.y / (dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2));
                if (x !== _this.prevMouseX || y !== _this.prevMouseY) {
                    clearTimeout(_this.timeout);
                    _this.timeout = setTimeout(function () { return _this.drawImage(x, y); }, 0);
                    _this.prevMouseX = x;
                    _this.prevMouseY = y;
                }
            };
            this.mouseLeave = function (e) {
                _this.prevMouseX = -1;
                _this.prevMouseY = -1;
                _this.drawImage();
            };
            this.mouseClick = function (e) {
                var pos = _this.getMousePos(_this.canvas, e);
                var x = Math.floor(pos.x / (dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2));
                var y = Math.floor(pos.y / (dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2));
            };
            this.CANVAS_SIZE = CANVAS_SIZE;
            this.canvas = document.getElementById(canvasId);
            this.canvas.width = this.CANVAS_SIZE.width;
            this.canvas.height = this.CANVAS_SIZE.height;
            this.canvas.addEventListener('mousemove', this.mouseMove, false);
            this.canvas.addEventListener('mouseleave', this.mouseLeave, false);
            this.canvas.addEventListener('click', this.mouseClick, false);
            this.ctx = this.canvas.getContext('2d');
            this.spritesImg = new SpritesImage_1.SpritesImage().getSpritesImg();
            this.spritesImg.onload = function () { return _this.drawImage(); };
        }
        Canvas.prototype.getCanvasSize = function () {
            return this.CANVAS_SIZE;
        };
        Canvas.prototype.setCanvasSize = function (CANVAS_SIZE) {
            this.CANVAS_SIZE = CANVAS_SIZE;
        };
        Canvas.prototype.getCanvas = function () {
            return this.canvas;
        };
        Canvas.prototype.setCanvas = function (canvas) {
            this.canvas = canvas;
        };
        Canvas.prototype.getCtx = function () {
            return this.ctx;
        };
        Canvas.prototype.setCtx = function (ctx) {
            this.ctx = ctx;
        };
        Canvas.prototype.getSpritesImg = function () {
            return this.spritesImg;
        };
        Canvas.prototype.setSpritesImg = function (spritesImg) {
            this.spritesImg = spritesImg;
        };
        Canvas.prototype.getPrevMouseX = function () {
            return this.prevMouseX;
        };
        Canvas.prototype.setPrevMouseX = function (prevMouseX) {
            this.prevMouseX = prevMouseX;
        };
        Canvas.prototype.getPrevMouseY = function () {
            return this.prevMouseY;
        };
        Canvas.prototype.setPrevMouseY = function (prevMouseY) {
            this.prevMouseY = prevMouseY;
        };
        Canvas.prototype.getTimeout = function () {
            return this.timeout;
        };
        Canvas.prototype.setTimeout = function (timeout) {
            this.timeout = timeout;
        };
        Canvas.prototype.getMousePos = function (canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            var scaleX = canvas.width / rect.width;
            var scaleY = canvas.height / rect.height;
            return {
                x: (evt.clientX - rect.left) * scaleX,
                y: (evt.clientY - rect.top) * scaleY
            };
        };
        Canvas.prototype.drawImage = function (activeX, activeY) {
            if (activeX === void 0) { activeX = -1; }
            if (activeY === void 0) { activeY = -1; }
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (var y = 0; y < this.CANVAS_SIZE.numberOfSpritesY; y++) {
                for (var x = 0; x < this.CANVAS_SIZE.numberOfSpritesX; x++) {
                    var active = false;
                    if (x === activeX && y === activeY) {
                        active = true;
                    }
                    this.drawEmptySprite(x, y, active);
                }
            }
        };
        Canvas.prototype.drawSprite = function (x, y, spriteX, spriteY, active) {
            if (active === void 0) { active = false; }
            if (active) {
                this.ctx.globalAlpha = 1;
            }
            else {
                this.ctx.globalAlpha = 0.5;
            }
            this.ctx.drawImage(this.spritesImg, spriteX * dimensions_1.IMAGE.spriteSize + dimensions_1.IMAGE.borderSize * (spriteX + 1), spriteY * dimensions_1.IMAGE.spriteSize + dimensions_1.IMAGE.borderSize * (spriteY + 1), dimensions_1.IMAGE.spriteSize, dimensions_1.IMAGE.spriteSize, x * dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * (x * 2 + 1), y * dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * (y * 2 + 1), dimensions_1.CANVAS.spriteSize, dimensions_1.CANVAS.spriteSize);
            this.ctx.setLineDash([2, 2]);
            this.ctx.strokeStyle = active ? dimensions_1.CANVAS.borderHighlightColor : dimensions_1.CANVAS.borderDefaultColor;
            this.ctx.lineWidth = dimensions_1.CANVAS.borderSize;
            this.ctx.strokeRect(x * dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * (x * 2), y * dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * (y * 2), dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2, dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2);
        };
        Canvas.prototype.drawEmptySprite = function (x, y, active) {
            if (active === void 0) { active = false; }
            if (active) {
                this.ctx.globalAlpha = 1;
            }
            else {
                this.ctx.globalAlpha = 0.5;
            }
            this.ctx.setLineDash([2, 2]);
            this.ctx.strokeStyle = active ? dimensions_1.CANVAS.borderHighlightColor : dimensions_1.CANVAS.borderDefaultColor;
            this.ctx.lineWidth = dimensions_1.CANVAS.borderSize;
            this.ctx.strokeRect(x * dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * (x * 2), y * dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * (y * 2), dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2, dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2);
        };
        return Canvas;
    }());
    exports.Canvas = Canvas;
});
define("SpritesCanvas", ["require", "exports", "dimensions", "Canvas"], function (require, exports, dimensions_2, Canvas_1) {
    "use strict";
    exports.__esModule = true;
    exports.SpritesCanvas = void 0;
    var SpritesCanvas = /** @class */ (function (_super) {
        __extends(SpritesCanvas, _super);
        function SpritesCanvas(canvasId, CANVAS_SIZE) {
            return _super.call(this, canvasId, CANVAS_SIZE) || this;
        }
        SpritesCanvas.prototype.drawImage = function (activeX, activeY) {
            if (activeX === void 0) { activeX = -1; }
            if (activeY === void 0) { activeY = -1; }
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (var y = 0; y < this.CANVAS_SIZE.numberOfSpritesY; y++) {
                for (var x = 0; x < this.CANVAS_SIZE.numberOfSpritesX; x++) {
                    var active = false;
                    if (x === activeX && y === activeY) {
                        active = true;
                    }
                    if (y >= dimensions_2.IMAGE.numberOfSpritesY) {
                        this.drawSprite(x, y, x + this.CANVAS_SIZE.numberOfSpritesX, y - dimensions_2.IMAGE.numberOfSpritesY, active);
                    }
                    else {
                        this.drawSprite(x, y, x, y, active);
                    }
                }
            }
        };
        return SpritesCanvas;
    }(Canvas_1.Canvas));
    exports.SpritesCanvas = SpritesCanvas;
});
define("MapCanvas", ["require", "exports", "Canvas"], function (require, exports, Canvas_2) {
    "use strict";
    exports.__esModule = true;
    exports.MapCanvas = void 0;
    var MapCanvas = /** @class */ (function (_super) {
        __extends(MapCanvas, _super);
        function MapCanvas(canvasId, CANVAS_SIZE) {
            return _super.call(this, canvasId, CANVAS_SIZE) || this;
        }
        return MapCanvas;
    }(Canvas_2.Canvas));
    exports.MapCanvas = MapCanvas;
});
define("main", ["require", "exports", "SpritesCanvas", "MapCanvas", "dimensions"], function (require, exports, SpritesCanvas_1, MapCanvas_1, dimensions_3) {
    "use strict";
    exports.__esModule = true;
    var spritesCanvas = new SpritesCanvas_1.SpritesCanvas('spritesCanvas', dimensions_3.SPRITES_CANVAS);
    var itemsDiv = document.getElementById('items');
    itemsDiv.style.width = dimensions_3.SPRITES_CANVAS.width + 'px';
    itemsDiv.style.height = dimensions_3.SPRITES_CANVAS.height + 'px';
    itemsDiv.style.visibility = 'visible';
    var mapCanvas = new MapCanvas_1.MapCanvas('mapCanvas', dimensions_3.MAP_CANVAS);
    var mapDiv = document.getElementById('map');
    mapDiv.style.width = dimensions_3.MAP_CANVAS.width + 'px';
    mapDiv.style.height = dimensions_3.MAP_CANVAS.height + 'px';
    mapDiv.style.visibility = 'visible';
});
