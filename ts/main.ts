// TODO: prettier files

let canvas: any = document.getElementById('spritesCanvas')
let ctx = canvas.getContext('2d')

import { IMAGE_SIZES, CANVAS_SIZES } from './interfaces'

setupCanvas()

function setupCanvas() {
    console.log(IMAGE_SIZES)

    canvas.width = IMAGE_SIZES.ImageWidth
    canvas.height = IMAGE_SIZES.ImageHeight
    setImage()
}

function setImage() {
    let spritesImg = new Image()
    spritesImg.src = 'sprites.png'
    spritesImg.onload = function () {
        let hRatio: number = canvas.width / spritesImg.width
        let vRatio: number = canvas.height / spritesImg.height
        let ratio: number = Math.min(hRatio, vRatio)

        // context.drawImage(spritesImg, 0, 0, spritesImg.width, spritesImg.height, 0, 0, spritesImg.width * ratio, spritesImg.height * ratio)
        // draw only first square
        let w = 47
        let h = 25

        // context.drawImage(spritesImg, 0, 0, w, w, 0, 0, w * ratio, w * ratio)
        ctx.drawImage(spritesImg, 1, 1, w, w, 1, 1, 25, 25)

        // ctx.drawImage(spritesImg, CANVAS_SIZES.CanvasBorderSize, CANVAS_SIZES.CanvasBorderSize, CANVAS_SIZES.CanvasSpriteSize, CANVAS_SIZES.CanvasSpriteSize, IMAGE_SIZES.ImageBorderSize, IMAGE_SIZES.ImageBorderSize, IMAGE_SIZES.ImageSpriteSize, IMAGE_SIZES.ImageSpriteSize)

        ctx.setLineDash([1])
        ctx.strokeStyle = '#ffff00'
        ctx.strokeRect(0, 0, 27, 27)
    }
}
