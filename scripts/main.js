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
            this.mouseX = -1;
            this.mouseY = -1;
            this.mouseMove = function (e) {
                var pos = _this.getMousePos(_this.canvas, e);
                var x = Math.floor(pos.x / (dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2));
                var y = Math.floor(pos.y / (dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2));
                if (x !== _this.prevMouseX || y !== _this.prevMouseY) {
                    console.log('mouseMove', x, y);
                    _this.invokeDrawImage(x, y);
                    _this.prevMouseX = x;
                    _this.prevMouseY = y;
                }
            };
            this.mouseLeave = function (e) {
                console.log('aaaaaaaa');
                _this.prevMouseX = -1;
                _this.prevMouseY = -1;
                _this.invokeDrawImage();
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
            this.ctx = this.canvas.getContext('2d');
            this.spritesImg = new SpritesImage_1.SpritesImage().getSpritesImg();
            this.spritesImg.onload = function () { return _this.invokeDrawImage(); };
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
        Canvas.prototype.invokeDrawImage = function (activeX, activeY) {
            var _this = this;
            if (activeX === void 0) { activeX = -1; }
            if (activeY === void 0) { activeY = -1; }
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function () { return _this.drawImage(activeX, activeY); }, 0);
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
        return Canvas;
    }());
    exports.Canvas = Canvas;
});
define("SpritesCanvas", ["require", "exports", "dimensions", "Canvas", "main"], function (require, exports, dimensions_2, Canvas_1, main_1) {
    "use strict";
    exports.__esModule = true;
    exports.SpritesCanvas = void 0;
    var SpritesCanvas = /** @class */ (function (_super) {
        __extends(SpritesCanvas, _super);
        function SpritesCanvas(canvasId, CANVAS_SIZE) {
            var _this = _super.call(this, canvasId, CANVAS_SIZE) || this;
            _this.mouseClick = function (e) {
                var pos = _this.getMousePos(_this.canvas, e);
                var x = Math.floor(pos.x / (dimensions_2.CANVAS.spriteSize + dimensions_2.CANVAS.borderSize * 2));
                var y = Math.floor(pos.y / (dimensions_2.CANVAS.spriteSize + dimensions_2.CANVAS.borderSize * 2));
                if (y >= dimensions_2.IMAGE.numberOfSpritesY) {
                    y = y - dimensions_2.IMAGE.numberOfSpritesY;
                    x = x + _this.CANVAS_SIZE.numberOfSpritesX;
                }
                main_1.mapCanvas.setSprite(x, y);
            };
            _this.canvas.addEventListener('mousemove', _this.mouseMove, false);
            _this.canvas.addEventListener('mouseleave', _this.mouseLeave, false);
            _this.canvas.addEventListener('click', _this.mouseClick, false);
            return _this;
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
define("MapCanvas", ["require", "exports", "dimensions", "Canvas"], function (require, exports, dimensions_3, Canvas_2) {
    "use strict";
    exports.__esModule = true;
    exports.MapCanvas = void 0;
    var MapCanvas = /** @class */ (function (_super) {
        __extends(MapCanvas, _super);
        function MapCanvas(canvasId, CANVAS_SIZE) {
            var _this = _super.call(this, canvasId, CANVAS_SIZE) || this;
            _this.selectionMap = [];
            _this.map = [];
            _this.isMouseDown = false;
            _this.startMouseDownX = -1;
            _this.startMouseDownY = -1;
            _this.keyboard = { ctrl: false };
            _this.isCheckboxChecked = false;
            _this.mouseMove = function (e) {
                var pos = _this.getMousePos(_this.canvas, e);
                var x = Math.floor(pos.x / (dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * 2));
                var y = Math.floor(pos.y / (dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * 2));
                if (x !== _this.prevMouseX || y !== _this.prevMouseY) {
                    _this.invokeDrawImage(x, y);
                    _this.prevMouseX = x;
                    _this.prevMouseY = y;
                }
            };
            _this.mouseDown = function (e) {
                console.log('mouseDown');
                if (!_this.keyboard.ctrl) {
                    _this.selectionMap = _this.createEmptyMap();
                }
                _this.isMouseDown = true;
                var pos = _this.getMousePos(_this.canvas, e);
                _this.startMouseDownX = Math.floor(pos.x / (dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * 2));
                _this.startMouseDownY = Math.floor(pos.y / (dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * 2));
                _this.invokeDrawImage();
            };
            _this.mouseUp = function (e) {
                if (_this.isMouseDown) {
                    var x1 = Math.min(_this.startMouseDownX, _this.prevMouseX);
                    var y1 = Math.min(_this.startMouseDownY, _this.prevMouseY);
                    var x2 = Math.max(_this.startMouseDownX, _this.prevMouseX);
                    var y2 = Math.max(_this.startMouseDownY, _this.prevMouseY);
                    for (var y = y1; y <= y2; y++) {
                        for (var x = x1; x <= x2; x++) {
                            _this.selectionMap[y][x] = _this.selectionMap[y][x] === 0 ? 1 : 0;
                        }
                    }
                }
                _this.isMouseDown = false;
                _this.startMouseDownX = -1;
                _this.startMouseDownY = -1;
                _this.invokeDrawImage();
            };
            _this.mouseLeave = function (e) {
                if (!_this.isMouseDown) {
                    _this.isMouseDown = false;
                    _this.startMouseDownX = -1;
                    _this.startMouseDownY = -1;
                    _this.invokeDrawImage();
                }
            };
            _this.keyDown = function (e) {
                if (e.keyCode === 17 || e.metaKey) {
                    _this.keyboard.ctrl = true;
                }
                console.log(_this.keyboard);
            };
            _this.keyUp = function (e) {
                if (e.keyCode === 17 || e.metaKey) {
                    _this.keyboard.ctrl = false;
                }
                console.log(_this.keyboard);
            };
            _this.setSprite = function (spriteX, spriteY) {
                var lastSelection = { x: -1, y: -1 };
                for (var y = 0; y < _this.CANVAS_SIZE.numberOfSpritesY; y++) {
                    for (var x = 0; x < _this.CANVAS_SIZE.numberOfSpritesX; x++) {
                        if (_this.selectionMap[y][x] === 1) {
                            lastSelection = { x: x, y: y };
                            _this.selectionMap[y][x] = 0;
                            _this.map[y][x] = { spriteX: spriteX, spriteY: spriteY };
                        }
                    }
                }
                if (_this.isCheckboxChecked) {
                    if (lastSelection.x !== -1 && lastSelection.y !== -1) {
                        if (lastSelection.x + 1 < _this.CANVAS_SIZE.numberOfSpritesX) {
                            _this.selectionMap[lastSelection.y][lastSelection.x + 1] = 1;
                        }
                        else if (lastSelection.y + 1 < _this.CANVAS_SIZE.numberOfSpritesY) {
                            _this.selectionMap[lastSelection.y + 1][0] = 1;
                        }
                    }
                }
                _this.invokeDrawImage();
            };
            _this.selectionMap = _this.createEmptyMap();
            _this.map = _this.createEmptyMap();
            _this.canvas.addEventListener('mousemove', _this.mouseMove, false);
            _this.canvas.addEventListener('mousedown', _this.mouseDown, false);
            document.addEventListener('mouseup', _this.mouseUp, false);
            _this.canvas.addEventListener('mouseleave', _this.mouseLeave, false);
            _this.canvas.addEventListener('click', _this.mouseClick, false);
            document.addEventListener('keydown', _this.keyDown, false);
            document.addEventListener('keyup', _this.keyUp, false);
            return _this;
        }
        MapCanvas.prototype.setIsCheckboxChecked = function (isCheckboxChecked) {
            this.isCheckboxChecked = isCheckboxChecked;
        };
        MapCanvas.prototype.createEmptyMap = function () {
            var map = [];
            for (var y = 0; y < this.CANVAS_SIZE.numberOfSpritesY; y++) {
                map[y] = [];
                for (var x = 0; x < this.CANVAS_SIZE.numberOfSpritesX; x++) {
                    map[y][x] = 0;
                }
            }
            return map;
        };
        MapCanvas.prototype.drawImage = function (activeX, activeY) {
            if (activeX === void 0) { activeX = -1; }
            if (activeY === void 0) { activeY = -1; }
            var area = { x: 0, y: 0, width: 0, height: 0 };
            if (this.isMouseDown) {
                area.x = this.startMouseDownX;
                area.y = this.startMouseDownY;
                area.width = this.prevMouseX - this.startMouseDownX + 1;
                area.height = this.prevMouseY - this.startMouseDownY + 1;
                if (area.width <= 0) {
                    area.x = this.prevMouseX;
                    area.width = this.startMouseDownX - this.prevMouseX + 1;
                }
                if (area.height <= 0) {
                    area.y = this.prevMouseY;
                    area.height = this.startMouseDownY - this.prevMouseY + 1;
                }
            }
            if (area.x === -1 || area.y === -1) {
                this.isMouseDown = false;
            }
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (var y = 0; y < this.CANVAS_SIZE.numberOfSpritesY; y++) {
                for (var x = 0; x < this.CANVAS_SIZE.numberOfSpritesX; x++) {
                    var active = false;
                    if (x === activeX && y === activeY && !this.isMouseDown) {
                        active = true;
                    }
                    if (this.isMouseDown && x >= area.x && x < area.x + area.width && y >= area.y && y < area.y + area.height) {
                        active = true;
                    }
                    if (this.selectionMap[y][x] === 1) {
                        active = true;
                    }
                    if (this.map[y][x] !== 0) {
                        this.drawSprite(x, y, this.map[y][x].spriteX, this.map[y][x].spriteY, active);
                    }
                    else {
                        this.drawEmptySprite(x, y, active);
                    }
                }
            }
            if (this.isMouseDown) {
                this.ctx.fillStyle = '#ffff00';
                this.ctx.fillRect(area.x * (dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * 2), area.y * (dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * 2), area.width * (dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * 2), area.height * (dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * 2));
            }
        };
        MapCanvas.prototype.drawSprite = function (x, y, spriteX, spriteY, active) {
            if (active === void 0) { active = false; }
            if (active) {
                this.ctx.globalAlpha = 0.5;
            }
            else {
                this.ctx.globalAlpha = 1;
            }
            this.ctx.drawImage(this.spritesImg, spriteX * dimensions_3.IMAGE.spriteSize + dimensions_3.IMAGE.borderSize * (spriteX + 1), spriteY * dimensions_3.IMAGE.spriteSize + dimensions_3.IMAGE.borderSize * (spriteY + 1), dimensions_3.IMAGE.spriteSize, dimensions_3.IMAGE.spriteSize, x * dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * (x * 2 + 1), y * dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * (y * 2 + 1), dimensions_3.CANVAS.spriteSize, dimensions_3.CANVAS.spriteSize);
            this.ctx.setLineDash([2, 2]);
            this.ctx.strokeStyle = active ? dimensions_3.CANVAS.borderHighlightColor : dimensions_3.CANVAS.borderDefaultColor;
            this.ctx.lineWidth = dimensions_3.CANVAS.borderSize;
            this.ctx.strokeRect(x * dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * (x * 2), y * dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * (y * 2), dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * 2, dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * 2);
        };
        return MapCanvas;
    }(Canvas_2.Canvas));
    exports.MapCanvas = MapCanvas;
});
define("main", ["require", "exports", "SpritesCanvas", "MapCanvas", "dimensions"], function (require, exports, SpritesCanvas_1, MapCanvas_1, dimensions_4) {
    "use strict";
    exports.__esModule = true;
    exports.mapCanvas = exports.spritesCanvas = void 0;
    exports.spritesCanvas = new SpritesCanvas_1.SpritesCanvas('spritesCanvas', dimensions_4.SPRITES_CANVAS);
    var itemsDiv = document.getElementById('items');
    itemsDiv.style.width = dimensions_4.SPRITES_CANVAS.width + 'px';
    itemsDiv.style.height = dimensions_4.SPRITES_CANVAS.height + 'px';
    itemsDiv.style.visibility = 'visible';
    exports.mapCanvas = new MapCanvas_1.MapCanvas('mapCanvas', dimensions_4.MAP_CANVAS);
    var mapDiv = document.getElementById('map');
    mapDiv.style.width = dimensions_4.MAP_CANVAS.width + 'px';
    mapDiv.style.height = dimensions_4.MAP_CANVAS.height + 'px';
    mapDiv.style.visibility = 'visible';
    // checkbox id="automat"
    var automat = document.getElementById('automat');
    automat.addEventListener('change', function () {
        if (automat.checked) {
            exports.mapCanvas.setIsCheckboxChecked(true);
        }
        else {
            exports.mapCanvas.setIsCheckboxChecked(false);
        }
    });
});
