var canvas = document.getElementById('spritesCanvas');
var context = canvas.getContext('2d');
setupCanvas();
function setupCanvas() {
    canvas.width = 700;
    canvas.height = 400;
    setImage();
}
function setImage() {
    var spritesImg = new Image();
    spritesImg.src = 'sprites.png';
    spritesImg.onload = function () {
        var hRatio = canvas.width / spritesImg.width;
        var vRatio = canvas.height / spritesImg.height;
        var ratio = Math.min(hRatio, vRatio);
        context.drawImage(spritesImg, 0, 0, spritesImg.width, spritesImg.height, 0, 0, spritesImg.width * ratio, spritesImg.height * ratio);
    };
}
