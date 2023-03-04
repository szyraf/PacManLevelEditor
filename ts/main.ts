// TODO: make classes

let canvas: any = document.getElementById('spritesCanvas')
let ctx = canvas.getContext('2d')

import { IMAGE, CANVAS } from './dimensions'

setupCanvas()

function setupCanvas() {
    console.log(IMAGE)

    canvas.width = IMAGE.width
    canvas.height = IMAGE.height
    setImage()
}

function setImage() {
    let spritesImg = new Image()
    spritesImg.src = 'sprites.png'
    spritesImg.onload = function () {
        ctx.drawImage(spritesImg, IMAGE.borderSize, IMAGE.borderSize, IMAGE.spriteSize, IMAGE.spriteSize, CANVAS.borderSize, CANVAS.borderSize, CANVAS.spriteSize, CANVAS.spriteSize)
        ctx.setLineDash([2, 2])
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = CANVAS.borderSize
        ctx.strokeRect(0, 0, CANVAS.spriteSize + CANVAS.borderSize * 2, CANVAS.spriteSize + CANVAS.borderSize * 2)
    }
}
