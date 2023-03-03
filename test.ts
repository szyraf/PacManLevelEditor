let canvas: any = document.getElementById('spritesCanvas')
let context = canvas.getContext('2d')

setupCanvas()

function setupCanvas() {
    canvas.width = 700
    canvas.height = 400
    setImage()
}

function setImage() {
    let spritesImg = new Image()
    spritesImg.src = 'sprites.png'
    spritesImg.onload = function () {
        let hRatio: number = canvas.width / spritesImg.width
        let vRatio: number = canvas.height / spritesImg.height
        let ratio: number = Math.min(hRatio, vRatio)

        context.drawImage(spritesImg, 0, 0, spritesImg.width, spritesImg.height, 0, 0, spritesImg.width * ratio, spritesImg.height * ratio)
    }
}

// TODO: prettier files
