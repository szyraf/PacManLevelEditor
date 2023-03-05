import { IMAGE, CANVAS, SPRITES_CANVAS, CanvasSize } from './dimensions'
import { Canvas } from './Canvas'
import { mapCanvas } from './main'

export class SpritesCanvas extends Canvas {
    constructor(canvasId: string, CANVAS_SIZE: CanvasSize) {
        super(canvasId, CANVAS_SIZE)
        this.canvas.addEventListener('mousemove', this.mouseMove, false)
        this.canvas.addEventListener('mouseleave', this.mouseLeave, false)
        this.canvas.addEventListener('click', this.mouseClick, false)
    }

    protected mouseClick = (e: MouseEvent) => {
        let pos = this.getMousePos(this.canvas, e)
        let x: number = Math.floor(pos.x / (CANVAS.spriteSize + CANVAS.borderSize * 2))
        let y: number = Math.floor(pos.y / (CANVAS.spriteSize + CANVAS.borderSize * 2))

        if (y >= IMAGE.numberOfSpritesY) {
            y = y - IMAGE.numberOfSpritesY
            x = x + this.CANVAS_SIZE.numberOfSpritesX
        }

        mapCanvas.setSprite(x, y)
    }

    protected drawImage(activeX: number = -1, activeY: number = -1) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let y: number = 0; y < this.CANVAS_SIZE.numberOfSpritesY; y++) {
            for (let x: number = 0; x < this.CANVAS_SIZE.numberOfSpritesX; x++) {
                let active: boolean = false
                if (x === activeX && y === activeY) {
                    active = true
                }

                if (y >= IMAGE.numberOfSpritesY) {
                    this.drawSprite(x, y, x + this.CANVAS_SIZE.numberOfSpritesX, y - IMAGE.numberOfSpritesY, active)
                } else {
                    this.drawSprite(x, y, x, y, active)
                }
            }
        }
    }
}
