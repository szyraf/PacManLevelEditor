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
        borderHighlightColor: '#ff0000',
        borderPasteColor: '#00ff00'
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
                    _this.invokeDrawImage(x, y);
                    _this.prevMouseX = x;
                    _this.prevMouseY = y;
                }
            };
            this.mouseLeave = function (e) {
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
            _this.archivedMaps = [];
            _this.archivedMapsIndex = 0;
            _this.map = [];
            _this.copiedMap = [];
            _this.pasteMode = false;
            _this.pasteTopLeftCorner = { x: -1, y: -1 };
            _this.isMouseDown = false;
            _this.startMouseDownX = -1;
            _this.startMouseDownY = -1;
            _this.keyboard = { ctrl: false, z: false, y: false, c: false, x: false, v: false, esc: false, s: false, l: false };
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
                if (e.which === 1 || e.button === 0) {
                    if (!_this.pasteMode) {
                        if (!_this.keyboard.ctrl) {
                            _this.selectionMap = _this.createEmptyMap();
                        }
                        _this.isMouseDown = true;
                        var pos = _this.getMousePos(_this.canvas, e);
                        _this.startMouseDownX = Math.floor(pos.x / (dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * 2));
                        _this.startMouseDownY = Math.floor(pos.y / (dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * 2));
                        _this.invokeDrawImage();
                    }
                }
            };
            _this.mouseUp = function (e) {
                if (e.which === 1 || e.button === 0) {
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
                }
            };
            _this.mouseLeave = function (e) {
                if (!_this.isMouseDown) {
                    _this.isMouseDown = false;
                    _this.startMouseDownX = -1;
                    _this.startMouseDownY = -1;
                    _this.invokeDrawImage();
                }
            };
            _this.mouseClick = function (e) {
                var pos = _this.getMousePos(_this.canvas, e);
                var clickX = Math.floor(pos.x / (dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * 2));
                var clickY = Math.floor(pos.y / (dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * 2));
                if (_this.pasteMode) {
                    for (var y = 0; y < _this.CANVAS_SIZE.numberOfSpritesY; y++) {
                        for (var x = 0; x < _this.CANVAS_SIZE.numberOfSpritesX; x++) {
                            var copiedMapX = x - _this.prevMouseX + _this.pasteTopLeftCorner.x;
                            var copiedMapY = y - _this.prevMouseY + _this.pasteTopLeftCorner.y;
                            var isGood = true;
                            if (copiedMapX < 0 || copiedMapY < 0 || copiedMapX >= _this.CANVAS_SIZE.numberOfSpritesX || copiedMapY >= _this.CANVAS_SIZE.numberOfSpritesY) {
                                isGood = false;
                            }
                            if (isGood) {
                                if (_this.copiedMap[copiedMapY][copiedMapX] !== 0) {
                                    _this.map[y][x] = _this.copiedMap[copiedMapY][copiedMapX];
                                }
                            }
                        }
                    }
                    _this.pasteMode = false;
                    _this.selectionMap = _this.createEmptyMap();
                }
            };
            _this.keyDown = function (e) {
                if (e.keyCode === 17 || e.metaKey || e.keyCode === 224 || e.keyCode === 91 || e.keyCode === 93) {
                    _this.keyboard.ctrl = true;
                }
                switch (e.keyCode) {
                    case 90:
                        _this.keyboard.z = true;
                        break;
                    case 89:
                        _this.keyboard.y = true;
                        break;
                    case 46:
                        _this["delete"]();
                        break;
                    case 67:
                        _this.keyboard.c = true;
                        break;
                    case 88:
                        _this.keyboard.x = true;
                        break;
                    case 86:
                        _this.keyboard.v = true;
                        break;
                    case 27:
                        _this.keyboard.esc = true;
                        break;
                    case 83:
                        _this.keyboard.s = true;
                        break;
                    case 76:
                        _this.keyboard.l = true;
                        break;
                }
                _this.shortcuts();
            };
            _this["delete"] = function () {
                var isDeleted = false;
                for (var y = 0; y < _this.CANVAS_SIZE.numberOfSpritesY; y++) {
                    for (var x = 0; x < _this.CANVAS_SIZE.numberOfSpritesX; x++) {
                        if (_this.selectionMap[y][x] === 1) {
                            _this.map[y][x] = 0;
                            isDeleted = true;
                        }
                    }
                }
                if (isDeleted) {
                    _this.updateArchivedMaps();
                }
                _this.selectionMap = _this.createEmptyMap();
                _this.invokeDrawImage();
            };
            _this.updateArchivedMaps = function () {
                if (_this.archivedMapsIndex < _this.archivedMaps.length - 1) {
                    _this.archivedMaps.splice(_this.archivedMapsIndex + 1, _this.archivedMaps.length - _this.archivedMapsIndex);
                }
                _this.archivedMaps.push(JSON.parse(JSON.stringify(_this.map)));
                _this.archivedMapsIndex = _this.archivedMaps.length - 1;
            };
            _this.shortcuts = function () {
                if (_this.keyboard.ctrl && _this.keyboard.z) {
                    _this.undo();
                }
                else if (_this.keyboard.ctrl && _this.keyboard.y) {
                    _this.redo();
                }
                else if (_this.keyboard.ctrl && _this.keyboard.c) {
                    _this.copy();
                }
                else if (_this.keyboard.ctrl && _this.keyboard.x) {
                    _this.cut();
                }
                else if (_this.keyboard.ctrl && _this.keyboard.v) {
                    _this.paste();
                }
                else if (_this.keyboard.esc) {
                    _this.selectionMap = _this.createEmptyMap();
                    _this.pasteMode = false;
                    _this.invokeDrawImage();
                }
                else if (_this.keyboard.ctrl && _this.keyboard.s) {
                    _this.save();
                }
                else if (_this.keyboard.ctrl && _this.keyboard.l) {
                    _this.load();
                }
                _this.keyboard.z = false;
                _this.keyboard.y = false;
                _this.keyboard.c = false;
                _this.keyboard.x = false;
                _this.keyboard.v = false;
                _this.keyboard.esc = false;
                _this.keyboard.s = false;
                _this.keyboard.l = false;
            };
            _this.undo = function () {
                _this.selectionMap = _this.createEmptyMap();
                if (_this.archivedMapsIndex > 0) {
                    _this.archivedMapsIndex--;
                    _this.map = JSON.parse(JSON.stringify(_this.archivedMaps[_this.archivedMapsIndex]));
                    _this.invokeDrawImage();
                }
            };
            _this.redo = function () {
                _this.selectionMap = _this.createEmptyMap();
                if (_this.archivedMapsIndex > -1) {
                    if (_this.archivedMaps.length > _this.archivedMapsIndex + 1) {
                        _this.archivedMapsIndex++;
                        _this.map = _this.archivedMaps[_this.archivedMapsIndex];
                        _this.invokeDrawImage();
                    }
                }
            };
            _this.copy = function () {
                _this.copiedMap = _this.createEmptyMap();
                for (var y = 0; y < _this.CANVAS_SIZE.numberOfSpritesY; y++) {
                    for (var x = 0; x < _this.CANVAS_SIZE.numberOfSpritesX; x++) {
                        if (_this.selectionMap[y][x] === 1) {
                            _this.copiedMap[y][x] = _this.map[y][x];
                        }
                    }
                }
                _this.findTopLeftPixel();
            };
            _this.findTopLeftPixel = function () {
                var topPixel = -1;
                var leftPixel = -1;
                var topLeftPixel = { x: -1, y: -1 };
                for (var y = 0; y < _this.CANVAS_SIZE.numberOfSpritesY; y++) {
                    for (var x = 0; x < _this.CANVAS_SIZE.numberOfSpritesX; x++) {
                        if (_this.selectionMap[y][x] === 1) {
                            if (topPixel === -1) {
                                topPixel = y;
                            }
                        }
                    }
                }
                for (var x = 0; x < _this.CANVAS_SIZE.numberOfSpritesX; x++) {
                    for (var y = 0; y < _this.CANVAS_SIZE.numberOfSpritesY; y++) {
                        if (_this.selectionMap[y][x] === 1) {
                            if (leftPixel === -1) {
                                leftPixel = x;
                            }
                        }
                    }
                }
                topLeftPixel.x = leftPixel;
                topLeftPixel.y = topPixel;
                _this.pasteTopLeftCorner = topLeftPixel;
            };
            _this.cut = function () {
                _this.copy();
                _this["delete"]();
            };
            _this.paste = function () {
                var isEmpty = true;
                for (var y = 0; y < _this.CANVAS_SIZE.numberOfSpritesY; y++) {
                    for (var x = 0; x < _this.CANVAS_SIZE.numberOfSpritesX; x++) {
                        if (_this.copiedMap[y][x] !== 0) {
                            isEmpty = false;
                        }
                    }
                }
                if (!isEmpty) {
                    _this.pasteMode = true;
                    _this.selectionMap = _this.createEmptyMap();
                    _this.invokeDrawImage();
                }
            };
            _this.save = function () {
                _this.saveData(JSON.stringify(_this.map), 'map.json', 'application/json');
            };
            _this.saveData = function (data, filename, type) {
                var blob = new Blob([data], { type: type });
                var url = URL.createObjectURL(blob);
                var link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                link.remove();
            };
            _this.load = function () {
                var THIS = _this;
                var input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = function (e) {
                    var file = e.target.files[0];
                    var reader = new FileReader();
                    reader.readAsText(file);
                    reader.onload = function () {
                        THIS.map = JSON.parse(reader.result);
                        THIS.archivedMaps = THIS.createEmptyMap();
                        THIS.archivedMapsIndex = -1;
                        THIS.selectionMap = THIS.createEmptyMap();
                        THIS.invokeDrawImage();
                    };
                };
                input.click();
            };
            _this.keyUp = function (e) {
                if (e.keyCode === 17 || e.metaKey || e.keyCode === 224 || e.keyCode === 91 || e.keyCode === 93) {
                    _this.keyboard.ctrl = false;
                }
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
                if (lastSelection.x !== -1) {
                    _this.updateArchivedMaps();
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
            _this.copiedMap = _this.createEmptyMap();
            _this.archivedMaps.push(JSON.parse(JSON.stringify(_this.map)));
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
                    if (this.pasteMode) {
                        active = false;
                    }
                    var copiedMapX = x - this.prevMouseX + this.pasteTopLeftCorner.x;
                    var copiedMapY = y - this.prevMouseY + this.pasteTopLeftCorner.y;
                    var isGood = true;
                    if (copiedMapX < 0 || copiedMapY < 0 || copiedMapX >= this.CANVAS_SIZE.numberOfSpritesX || copiedMapY >= this.CANVAS_SIZE.numberOfSpritesY) {
                        isGood = false;
                    }
                    if (isGood && this.pasteMode && this.copiedMap[copiedMapY][copiedMapX] !== 0) {
                        this.drawSprite(x, y, this.copiedMap[copiedMapY][copiedMapX].spriteX, this.copiedMap[copiedMapY][copiedMapX].spriteY, false, true);
                    }
                    else if (this.map[y][x] !== 0) {
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
        MapCanvas.prototype.drawSprite = function (x, y, spriteX, spriteY, active, pasted) {
            if (active === void 0) { active = false; }
            if (pasted === void 0) { pasted = false; }
            if (active) {
                this.ctx.globalAlpha = 0.5;
            }
            else {
                this.ctx.globalAlpha = 1;
            }
            this.ctx.drawImage(this.spritesImg, spriteX * dimensions_3.IMAGE.spriteSize + dimensions_3.IMAGE.borderSize * (spriteX + 1), spriteY * dimensions_3.IMAGE.spriteSize + dimensions_3.IMAGE.borderSize * (spriteY + 1), dimensions_3.IMAGE.spriteSize, dimensions_3.IMAGE.spriteSize, x * dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * (x * 2 + 1), y * dimensions_3.CANVAS.spriteSize + dimensions_3.CANVAS.borderSize * (y * 2 + 1), dimensions_3.CANVAS.spriteSize, dimensions_3.CANVAS.spriteSize);
            this.ctx.setLineDash([2, 2]);
            if (pasted) {
                this.ctx.strokeStyle = dimensions_3.CANVAS.borderPasteColor;
            }
            else if (active) {
                this.ctx.strokeStyle = dimensions_3.CANVAS.borderHighlightColor;
            }
            else {
                this.ctx.strokeStyle = dimensions_3.CANVAS.borderDefaultColor;
            }
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
    var automat = document.getElementById('automat');
    automat.addEventListener('change', function () {
        if (automat.checked) {
            exports.mapCanvas.setIsCheckboxChecked(true);
        }
        else {
            exports.mapCanvas.setIsCheckboxChecked(false);
        }
    });
    var dialog = document.getElementById('dialog');
    var alphaHidden = document.getElementById('alphaHidden');
    alphaHidden.addEventListener('click', function () {
        hideDialog();
    });
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
    var mouseDown = function (e) {
        if (e.which === 3 || e.button === 2) {
            showDialog();
        }
    };
    document.addEventListener('mousedown', mouseDown, false);
    function hideDialog() {
        dialog.style.visibility = 'hidden';
        alphaHidden.style.visibility = 'hidden';
    }
    function showDialog() {
        dialog.style.visibility = 'visible';
        alphaHidden.style.visibility = 'visible';
    }
    document.getElementById('dialog-undo').addEventListener('click', function () {
        exports.mapCanvas.undo();
        hideDialog();
    });
    document.getElementById('dialog-redo').addEventListener('click', function () {
        exports.mapCanvas.redo();
        hideDialog();
    });
    document.getElementById('dialog-cut').addEventListener('click', function () {
        exports.mapCanvas.cut();
        hideDialog();
    });
    document.getElementById('dialog-copy').addEventListener('click', function () {
        exports.mapCanvas.copy();
        hideDialog();
    });
    document.getElementById('dialog-paste').addEventListener('click', function () {
        exports.mapCanvas.paste();
        hideDialog();
    });
    document.getElementById('dialog-delete').addEventListener('click', function () {
        exports.mapCanvas["delete"]();
        hideDialog();
    });
    document.getElementById('dialog-save').addEventListener('click', function () {
        exports.mapCanvas.save();
        hideDialog();
    });
    document.getElementById('dialog-load').addEventListener('click', function () {
        exports.mapCanvas.load();
        hideDialog();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 's' && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
        }
    }, false);
});
