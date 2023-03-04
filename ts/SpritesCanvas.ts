import { IMAGE, CANVAS } from './dimensions'

interface Canvas {
    getCanvas(): HTMLCanvasElement
    getCtx(): CanvasRenderingContext2D
    getSpritesImg(): HTMLImageElement
    getPrevMouseX(): number
    getPrevMouseY(): number
}

export class SpritesCanvas implements Canvas {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private spritesImg: HTMLImageElement
    private prevMouseX: number = 0
    private prevMouseY: number = 0

    public getCanvas(): HTMLCanvasElement {
        return this.canvas
    }

    public setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas
    }

    public getCtx(): CanvasRenderingContext2D {
        return this.ctx
    }

    public setCtx(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }

    public getSpritesImg(): HTMLImageElement {
        return this.spritesImg
    }

    public setSpritesImg(spritesImg: HTMLImageElement) {
        this.spritesImg = spritesImg
    }

    public getPrevMouseX(): number {
        return this.prevMouseX
    }

    public setPrevMouseX(prevMouseX: number) {
        this.prevMouseX = prevMouseX
    }

    public getPrevMouseY(): number {
        return this.prevMouseY
    }

    public setPrevMouseY(prevMouseY: number) {
        this.prevMouseY = prevMouseY
    }

    constructor() {
        console.log(this)

        this.canvas = document.getElementById('spritesCanvas') as HTMLCanvasElement
        this.canvas.width = CANVAS.width
        this.canvas.height = CANVAS.height
        this.canvas.addEventListener('mousemove', this.mouseMove, false)
        this.canvas.addEventListener('mouseleave', this.mouseLeave, false)
        this.canvas.addEventListener('click', this.mouseClick, false)
        this.ctx = this.canvas.getContext('2d')
        this.spritesImg = new Image()
        this.spritesImg.src = 'sprites.png'
        this.spritesImg.onload = () => this.drawImage()
    }

    private mouseMove = (e: MouseEvent) => {
        let pos = this.getMousePos(this.canvas, e)
        let x: number = Math.floor(pos.x / (CANVAS.spriteSize + CANVAS.borderSize * 2))
        let y: number = Math.floor(pos.y / (CANVAS.spriteSize + CANVAS.borderSize * 2))

        if (x !== this.prevMouseX || y !== this.prevMouseY) {
            this.drawImage(x, y)
            this.prevMouseX = x
            this.prevMouseY = y
        }
    }

    private mouseLeave = (e: MouseEvent) => {
        this.drawImage()
    }

    private mouseClick = (e: MouseEvent) => {
        let pos = this.getMousePos(this.canvas, e)
        let x: number = Math.floor(pos.x / (CANVAS.spriteSize + CANVAS.borderSize * 2))
        let y: number = Math.floor(pos.y / (CANVAS.spriteSize + CANVAS.borderSize * 2))

        console.log('Click! x: ' + x + ', y: ' + y)
    }

    private getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
        let rect = canvas.getBoundingClientRect()
        let scaleX = canvas.width / rect.width
        let scaleY = canvas.height / rect.height

        return {
            x: (evt.clientX - rect.left) * scaleX,
            y: (evt.clientY - rect.top) * scaleY
        }
    }

    private drawImage(activeX: number = -1, activeY: number = -1) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let y: number = 0; y < CANVAS.spritesInY; y++) {
            for (let x: number = 0; x < CANVAS.spritesInX; x++) {
                let active: boolean = false
                if (x === activeX && y === activeY) {
                    active = true
                }

                if (y >= IMAGE.spritesInY) {
                    this.drawSprite(x, y, x + CANVAS.spritesInX, y - IMAGE.spritesInY, active)
                } else {
                    this.drawSprite(x, y, x, y, active)
                }
            }
        }
    }

    private drawSprite(x: number, y: number, spriteX: number, spriteY: number, active: boolean = false) {
        if (active) {
            this.ctx.globalAlpha = 1
        } else {
            this.ctx.globalAlpha = 0.5
        }

        this.ctx.drawImage(
            this.spritesImg,
            spriteX * IMAGE.spriteSize + IMAGE.borderSize * (spriteX + 1),
            spriteY * IMAGE.spriteSize + IMAGE.borderSize * (spriteY + 1),
            IMAGE.spriteSize,
            IMAGE.spriteSize,
            x * CANVAS.spriteSize + CANVAS.borderSize * (x * 2 + 1),
            y * CANVAS.spriteSize + CANVAS.borderSize * (y * 2 + 1),
            CANVAS.spriteSize,
            CANVAS.spriteSize
        )
        this.ctx.setLineDash([2, 2])
        this.ctx.strokeStyle = active ? CANVAS.borderActiveColor : CANVAS.borderColor
        this.ctx.lineWidth = CANVAS.borderSize
        this.ctx.strokeRect(
            x * CANVAS.spriteSize + CANVAS.borderSize * (x * 2),
            y * CANVAS.spriteSize + CANVAS.borderSize * (y * 2),
            CANVAS.spriteSize + CANVAS.borderSize * 2,
            CANVAS.spriteSize + CANVAS.borderSize * 2
        )
    }
}
