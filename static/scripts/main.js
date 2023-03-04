define("dimensions", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.CANVAS = exports.IMAGE = void 0;
    exports.IMAGE = {
        spriteSize: 47,
        borderSize: 1,
        spritesInX: 32,
        spritesInY: 20,
        width: 1536,
        height: 960
    };
    exports.CANVAS = {
        spriteSize: 25,
        borderSize: 2,
        borderColor: '#ffffff',
        borderActiveColor: '#ff0000',
        spritesInX: 16,
        spritesInY: 40,
        width: 0,
        height: 0
    };
    exports.CANVAS.width = exports.CANVAS.spriteSize * exports.CANVAS.spritesInX + exports.CANVAS.borderSize * (exports.CANVAS.spritesInX * 2 + 1);
    exports.CANVAS.height = exports.CANVAS.spriteSize * exports.CANVAS.spritesInY + exports.CANVAS.borderSize * (exports.CANVAS.spritesInY * 2 + 1);
});
define("SpritesCanvas", ["require", "exports", "dimensions"], function (require, exports, dimensions_1) {
    "use strict";
    exports.__esModule = true;
    exports.SpritesCanvas = void 0;
    var SpritesCanvas = /** @class */ (function () {
        function SpritesCanvas() {
            var _this = this;
            this.prevMouseX = 0;
            this.prevMouseY = 0;
            this.mouseMove = function (e) {
                var pos = _this.getMousePos(_this.canvas, e);
                var x = Math.floor(pos.x / (dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2));
                var y = Math.floor(pos.y / (dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2));
                if (x !== _this.prevMouseX || y !== _this.prevMouseY) {
                    _this.drawImage(x, y);
                    _this.prevMouseX = x;
                    _this.prevMouseY = y;
                }
            };
            this.mouseLeave = function (e) {
                _this.drawImage();
            };
            this.mouseClick = function (e) {
                var pos = _this.getMousePos(_this.canvas, e);
                var x = Math.floor(pos.x / (dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2));
                var y = Math.floor(pos.y / (dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2));
                console.log('Click! x: ' + x + ', y: ' + y);
            };
            console.log(this);
            this.canvas = document.getElementById('spritesCanvas');
            this.canvas.width = dimensions_1.CANVAS.width;
            this.canvas.height = dimensions_1.CANVAS.height;
            this.canvas.addEventListener('mousemove', this.mouseMove, false);
            this.canvas.addEventListener('mouseleave', this.mouseLeave, false);
            this.canvas.addEventListener('click', this.mouseClick, false);
            this.ctx = this.canvas.getContext('2d');
            this.spritesImg = new Image();
            this.spritesImg.src = 'sprites.png';
            this.spritesImg.onload = function () { return _this.drawImage(); };
        }
        SpritesCanvas.prototype.getCanvas = function () {
            return this.canvas;
        };
        SpritesCanvas.prototype.setCanvas = function (canvas) {
            this.canvas = canvas;
        };
        SpritesCanvas.prototype.getCtx = function () {
            return this.ctx;
        };
        SpritesCanvas.prototype.setCtx = function (ctx) {
            this.ctx = ctx;
        };
        SpritesCanvas.prototype.getSpritesImg = function () {
            return this.spritesImg;
        };
        SpritesCanvas.prototype.setSpritesImg = function (spritesImg) {
            this.spritesImg = spritesImg;
        };
        SpritesCanvas.prototype.getPrevMouseX = function () {
            return this.prevMouseX;
        };
        SpritesCanvas.prototype.setPrevMouseX = function (prevMouseX) {
            this.prevMouseX = prevMouseX;
        };
        SpritesCanvas.prototype.getPrevMouseY = function () {
            return this.prevMouseY;
        };
        SpritesCanvas.prototype.setPrevMouseY = function (prevMouseY) {
            this.prevMouseY = prevMouseY;
        };
        SpritesCanvas.prototype.getMousePos = function (canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            var scaleX = canvas.width / rect.width;
            var scaleY = canvas.height / rect.height;
            return {
                x: (evt.clientX - rect.left) * scaleX,
                y: (evt.clientY - rect.top) * scaleY
            };
        };
        SpritesCanvas.prototype.drawImage = function (activeX, activeY) {
            if (activeX === void 0) { activeX = -1; }
            if (activeY === void 0) { activeY = -1; }
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (var y = 0; y < dimensions_1.CANVAS.spritesInY; y++) {
                for (var x = 0; x < dimensions_1.CANVAS.spritesInX; x++) {
                    var active = false;
                    if (x === activeX && y === activeY) {
                        active = true;
                    }
                    if (y >= dimensions_1.IMAGE.spritesInY) {
                        this.drawSprite(x, y, x + dimensions_1.CANVAS.spritesInX, y - dimensions_1.IMAGE.spritesInY, active);
                    }
                    else {
                        this.drawSprite(x, y, x, y, active);
                    }
                }
            }
        };
        SpritesCanvas.prototype.drawSprite = function (x, y, spriteX, spriteY, active) {
            if (active === void 0) { active = false; }
            if (active) {
                this.ctx.globalAlpha = 1;
            }
            else {
                this.ctx.globalAlpha = 0.5;
            }
            this.ctx.drawImage(this.spritesImg, spriteX * dimensions_1.IMAGE.spriteSize + dimensions_1.IMAGE.borderSize * (spriteX + 1), spriteY * dimensions_1.IMAGE.spriteSize + dimensions_1.IMAGE.borderSize * (spriteY + 1), dimensions_1.IMAGE.spriteSize, dimensions_1.IMAGE.spriteSize, x * dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * (x * 2 + 1), y * dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * (y * 2 + 1), dimensions_1.CANVAS.spriteSize, dimensions_1.CANVAS.spriteSize);
            this.ctx.setLineDash([2, 2]);
            this.ctx.strokeStyle = active ? dimensions_1.CANVAS.borderActiveColor : dimensions_1.CANVAS.borderColor;
            this.ctx.lineWidth = dimensions_1.CANVAS.borderSize;
            this.ctx.strokeRect(x * dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * (x * 2), y * dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * (y * 2), dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2, dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2);
        };
        return SpritesCanvas;
    }());
    exports.SpritesCanvas = SpritesCanvas;
});
define("main", ["require", "exports", "SpritesCanvas", "dimensions"], function (require, exports, SpritesCanvas_1, dimensions_2) {
    "use strict";
    exports.__esModule = true;
    var spritesCanvas = new SpritesCanvas_1.SpritesCanvas();
    var itemsDiv = document.getElementById('items');
    itemsDiv.style.width = dimensions_2.CANVAS.width + 'px';
    itemsDiv.style.height = dimensions_2.CANVAS.height + 'px';
    itemsDiv.style.visibility = 'visible';
});
