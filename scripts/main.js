define("interfaces", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.CANVAS_SIZES = exports.IMAGE_SIZES = void 0;
    exports.IMAGE_SIZES = {
        ImageSpriteSize: 47,
        ImageBorderSize: 1,
        ImageSpritesX: 32,
        ImageSpritesY: 20,
        ImageWidth: 1536,
        ImageHeight: 960
    };
    exports.CANVAS_SIZES = {
        CanvasSpriteSize: 25,
        CanvasBorderSize: 1,
        CanvasSpritesX: 32,
        CanvasSpritesY: 20,
        ItemsCanvasWidth: 0,
        ItemsCanvasHeight: 0
    };
    exports.CANVAS_SIZES.ItemsCanvasWidth = exports.CANVAS_SIZES.CanvasSpriteSize * exports.CANVAS_SIZES.CanvasSpritesX + exports.CANVAS_SIZES.CanvasBorderSize * (exports.CANVAS_SIZES.CanvasSpritesX + 1);
    exports.CANVAS_SIZES.ItemsCanvasHeight = exports.CANVAS_SIZES.CanvasSpriteSize * exports.CANVAS_SIZES.CanvasSpritesY + exports.CANVAS_SIZES.CanvasBorderSize * (exports.CANVAS_SIZES.CanvasSpritesY + 1);
});
// TODO: prettier files
define("main", ["require", "exports", "interfaces"], function (require, exports, interfaces_1) {
    "use strict";
    exports.__esModule = true;
    var canvas = document.getElementById('spritesCanvas');
    var ctx = canvas.getContext('2d');
    setupCanvas();
    function setupCanvas() {
        console.log(interfaces_1.IMAGE_SIZES);
        canvas.width = interfaces_1.IMAGE_SIZES.ImageWidth;
        canvas.height = interfaces_1.IMAGE_SIZES.ImageHeight;
        setImage();
    }
    function setImage() {
        var spritesImg = new Image();
        spritesImg.src = 'sprites.png';
        spritesImg.onload = function () {
            var hRatio = canvas.width / spritesImg.width;
            var vRatio = canvas.height / spritesImg.height;
            var ratio = Math.min(hRatio, vRatio);
            // context.drawImage(spritesImg, 0, 0, spritesImg.width, spritesImg.height, 0, 0, spritesImg.width * ratio, spritesImg.height * ratio)
            // draw only first square
            var w = 47;
            var h = 25;
            // context.drawImage(spritesImg, 0, 0, w, w, 0, 0, w * ratio, w * ratio)
            ctx.drawImage(spritesImg, 1, 1, w, w, 1, 1, 25, 25);
            // ctx.drawImage(spritesImg, CANVAS_SIZES.CanvasBorderSize, CANVAS_SIZES.CanvasBorderSize, CANVAS_SIZES.CanvasSpriteSize, CANVAS_SIZES.CanvasSpriteSize, IMAGE_SIZES.ImageBorderSize, IMAGE_SIZES.ImageBorderSize, IMAGE_SIZES.ImageSpriteSize, IMAGE_SIZES.ImageSpriteSize)
            ctx.setLineDash([1]);
            ctx.strokeStyle = '#ffff00';
            ctx.strokeRect(0, 0, 27, 27);
        };
    }
});
