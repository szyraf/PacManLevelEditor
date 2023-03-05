import { IMAGE, CANVAS, CanvasSize } from './dimensions'
import { SpritesImage } from './SpritesImage'

interface CanvasElement {
    getCanvasSize(): CanvasSize
    getCanvas(): HTMLCanvasElement
    getCtx(): CanvasRenderingContext2D
    getSpritesImg(): HTMLImageElement
    getPrevMouseX(): number
    getPrevMouseY(): number
    getTimeout(): number
}

export class Canvas implements CanvasElement {
    protected readonly CANVAS_SIZE: CanvasSize
    protected canvas: HTMLCanvasElement
    protected ctx: CanvasRenderingContext2D
    protected spritesImg: HTMLImageElement
    protected prevMouseX: number = -1
    protected prevMouseY: number = -1
    protected mouseX: number = -1
    protected mouseY: number = -1
    protected timeout: number

    public getCanvasSize(): CanvasSize {
        return this.CANVAS_SIZE
    }

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

    public getTimeout(): number {
        return this.timeout
    }

    public setTimeout(timeout: number) {
        this.timeout = timeout
    }

    constructor(canvasId: string, CANVAS_SIZE: CanvasSize) {
        this.CANVAS_SIZE = CANVAS_SIZE
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement
        this.canvas.width = this.CANVAS_SIZE.width
        this.canvas.height = this.CANVAS_SIZE.height
        this.ctx = this.canvas.getContext('2d')
        this.spritesImg = new SpritesImage().getSpritesImg()
        this.spritesImg.onload = () => this.invokeDrawImage()
    }

    protected mouseMove = (e: MouseEvent) => {
        let pos = this.getMousePos(this.canvas, e)
        let x: number = Math.floor(pos.x / (CANVAS.spriteSize + CANVAS.borderSize * 2))
        let y: number = Math.floor(pos.y / (CANVAS.spriteSize + CANVAS.borderSize * 2))

        if (x !== this.prevMouseX || y !== this.prevMouseY) {
            this.invokeDrawImage(x, y)
            this.prevMouseX = x
            this.prevMouseY = y
        }
    }

    protected getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
        let rect = canvas.getBoundingClientRect()
        let scaleX = canvas.width / rect.width
        let scaleY = canvas.height / rect.height

        return {
            x: (evt.clientX - rect.left) * scaleX,
            y: (evt.clientY - rect.top) * scaleY
        }
    }

    protected invokeDrawImage(activeX: number = -1, activeY: number = -1) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.drawImage(activeX, activeY), 0)
    }

    protected drawImage(activeX: number = -1, activeY: number = -1) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let y: number = 0; y < this.CANVAS_SIZE.numberOfSpritesY; y++) {
            for (let x: number = 0; x < this.CANVAS_SIZE.numberOfSpritesX; x++) {
                let active: boolean = false
                if (x === activeX && y === activeY) {
                    active = true
                }

                this.drawEmptySprite(x, y, active)
            }
        }
    }

    protected drawEmptySprite(x: number, y: number, active: boolean = false) {
        if (active) {
            this.ctx.globalAlpha = 1
        } else {
            this.ctx.globalAlpha = 0.5
        }

        this.ctx.setLineDash([2, 2])
        this.ctx.strokeStyle = active ? CANVAS.borderHighlightColor : CANVAS.borderDefaultColor
        this.ctx.lineWidth = CANVAS.borderSize
        this.ctx.strokeRect(
            x * CANVAS.spriteSize + CANVAS.borderSize * (x * 2),
            y * CANVAS.spriteSize + CANVAS.borderSize * (y * 2),
            CANVAS.spriteSize + CANVAS.borderSize * 2,
            CANVAS.spriteSize + CANVAS.borderSize * 2
        )
    }

    public save = () => {
        alert('save')
    }

    public load = () => {
        alert('load')
    }

    protected mouseLeave = (e: MouseEvent) => {
        this.prevMouseX = -1
        this.prevMouseY = -1
        this.invokeDrawImage()
    }

    protected mouseClick = (e: MouseEvent) => {
        let pos = this.getMousePos(this.canvas, e)
        let x: number = Math.floor(pos.x / (CANVAS.spriteSize + CANVAS.borderSize * 2))
        let y: number = Math.floor(pos.y / (CANVAS.spriteSize + CANVAS.borderSize * 2))
    }

    protected drawSprite(x: number, y: number, spriteX: number, spriteY: number, active: boolean = false) {
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
        this.ctx.strokeStyle = active ? CANVAS.borderHighlightColor : CANVAS.borderDefaultColor
        this.ctx.lineWidth = CANVAS.borderSize
        this.ctx.strokeRect(
            x * CANVAS.spriteSize + CANVAS.borderSize * (x * 2),
            y * CANVAS.spriteSize + CANVAS.borderSize * (y * 2),
            CANVAS.spriteSize + CANVAS.borderSize * 2,
            CANVAS.spriteSize + CANVAS.borderSize * 2
        )
    }
}
