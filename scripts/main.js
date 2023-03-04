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
        spritesInX: 32,
        spritesInY: 20,
        width: 0,
        height: 0
    };
    exports.CANVAS.width = exports.CANVAS.spriteSize * exports.CANVAS.spritesInX + exports.CANVAS.borderSize * (exports.CANVAS.spritesInX + 1);
    exports.CANVAS.height = exports.CANVAS.spriteSize * exports.CANVAS.spritesInY + exports.CANVAS.borderSize * (exports.CANVAS.spritesInY + 1);
});
// TODO: make classes
define("main", ["require", "exports", "dimensions"], function (require, exports, dimensions_1) {
    "use strict";
    exports.__esModule = true;
    var canvas = document.getElementById('spritesCanvas');
    var ctx = canvas.getContext('2d');
    setupCanvas();
    function setupCanvas() {
        console.log(dimensions_1.IMAGE);
        canvas.width = dimensions_1.IMAGE.width;
        canvas.height = dimensions_1.IMAGE.height;
        setImage();
    }
    function setImage() {
        var spritesImg = new Image();
        spritesImg.src = 'sprites.png';
        spritesImg.onload = function () {
            ctx.drawImage(spritesImg, dimensions_1.IMAGE.borderSize, dimensions_1.IMAGE.borderSize, dimensions_1.IMAGE.spriteSize, dimensions_1.IMAGE.spriteSize, dimensions_1.CANVAS.borderSize, dimensions_1.CANVAS.borderSize, dimensions_1.CANVAS.spriteSize, dimensions_1.CANVAS.spriteSize);
            ctx.setLineDash([2, 2]);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = dimensions_1.CANVAS.borderSize;
            ctx.strokeRect(0, 0, dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2, dimensions_1.CANVAS.spriteSize + dimensions_1.CANVAS.borderSize * 2);
        };
    }
});
