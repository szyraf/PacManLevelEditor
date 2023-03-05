import { IMAGE, CANVAS, SPRITES_CANVAS, CanvasSize } from './dimensions'
import { Canvas } from './Canvas'

export class MapCanvas extends Canvas {
    private selectionMap: number[][] = []
    private map: any[][] = []
    private isMouseDown: boolean = false
    private startMouseDownX: number = -1
    private startMouseDownY: number = -1
    private keyboard = { ctrl: false }
    private isCheckboxChecked: boolean = false

    public setIsCheckboxChecked(isCheckboxChecked: boolean) {
        this.isCheckboxChecked = isCheckboxChecked
    }

    constructor(canvasId: string, CANVAS_SIZE: CanvasSize) {
        super(canvasId, CANVAS_SIZE)
        this.selectionMap = this.createEmptyMap()
        this.map = this.createEmptyMap()
        this.canvas.addEventListener('mousemove', this.mouseMove, false)
        this.canvas.addEventListener('mousedown', this.mouseDown, false)
        document.addEventListener('mouseup', this.mouseUp, false)
        this.canvas.addEventListener('mouseleave', this.mouseLeave, false)
        this.canvas.addEventListener('click', this.mouseClick, false)
        document.addEventListener('keydown', this.keyDown, false)
        document.addEventListener('keyup', this.keyUp, false)
    }

    private createEmptyMap() {
        let map: number[][] = []
        for (let y: number = 0; y < this.CANVAS_SIZE.numberOfSpritesY; y++) {
            map[y] = []
            for (let x: number = 0; x < this.CANVAS_SIZE.numberOfSpritesX; x++) {
                map[y][x] = 0
            }
        }

        return map
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

    protected mouseDown = (e: MouseEvent) => {
        console.log('mouseDown')

        if (!this.keyboard.ctrl) {
            this.selectionMap = this.createEmptyMap()
        }

        this.isMouseDown = true
        let pos = this.getMousePos(this.canvas, e)
        this.startMouseDownX = Math.floor(pos.x / (CANVAS.spriteSize + CANVAS.borderSize * 2))
        this.startMouseDownY = Math.floor(pos.y / (CANVAS.spriteSize + CANVAS.borderSize * 2))
        this.invokeDrawImage()
    }

    protected mouseUp = (e: MouseEvent) => {
        if (this.isMouseDown) {
            let x1: number = Math.min(this.startMouseDownX, this.prevMouseX)
            let y1: number = Math.min(this.startMouseDownY, this.prevMouseY)
            let x2: number = Math.max(this.startMouseDownX, this.prevMouseX)
            let y2: number = Math.max(this.startMouseDownY, this.prevMouseY)

            for (let y: number = y1; y <= y2; y++) {
                for (let x: number = x1; x <= x2; x++) {
                    this.selectionMap[y][x] = this.selectionMap[y][x] === 0 ? 1 : 0
                }
            }
        }

        this.isMouseDown = false
        this.startMouseDownX = -1
        this.startMouseDownY = -1
        this.invokeDrawImage()
    }

    protected drawImage(activeX: number = -1, activeY: number = -1) {
        let area = { x: 0, y: 0, width: 0, height: 0 }

        if (this.isMouseDown) {
            area.x = this.startMouseDownX
            area.y = this.startMouseDownY
            area.width = this.prevMouseX - this.startMouseDownX + 1
            area.height = this.prevMouseY - this.startMouseDownY + 1

            if (area.width <= 0) {
                area.x = this.prevMouseX
                area.width = this.startMouseDownX - this.prevMouseX + 1
            }

            if (area.height <= 0) {
                area.y = this.prevMouseY
                area.height = this.startMouseDownY - this.prevMouseY + 1
            }
        }

        if (area.x === -1 || area.y === -1) {
            this.isMouseDown = false
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let y: number = 0; y < this.CANVAS_SIZE.numberOfSpritesY; y++) {
            for (let x: number = 0; x < this.CANVAS_SIZE.numberOfSpritesX; x++) {
                let active: boolean = false
                if (x === activeX && y === activeY && !this.isMouseDown) {
                    active = true
                }

                if (this.isMouseDown && x >= area.x && x < area.x + area.width && y >= area.y && y < area.y + area.height) {
                    active = true
                }

                if (this.selectionMap[y][x] === 1) {
                    active = true
                }

                if (this.map[y][x] !== 0) {
                    this.drawSprite(x, y, this.map[y][x].spriteX, this.map[y][x].spriteY, active)
                } else {
                    this.drawEmptySprite(x, y, active)
                }
            }
        }

        if (this.isMouseDown) {
            this.ctx.fillStyle = '#ffff00'
            this.ctx.fillRect(
                area.x * (CANVAS.spriteSize + CANVAS.borderSize * 2),
                area.y * (CANVAS.spriteSize + CANVAS.borderSize * 2),
                area.width * (CANVAS.spriteSize + CANVAS.borderSize * 2),
                area.height * (CANVAS.spriteSize + CANVAS.borderSize * 2)
            )
        }
    }

    protected drawSprite(x: number, y: number, spriteX: number, spriteY: number, active: boolean = false) {
        if (active) {
            this.ctx.globalAlpha = 0.5
        } else {
            this.ctx.globalAlpha = 1
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

    protected mouseLeave = (e: MouseEvent) => {
        if (!this.isMouseDown) {
            this.isMouseDown = false
            this.startMouseDownX = -1
            this.startMouseDownY = -1
            this.invokeDrawImage()
        }
    }

    protected keyDown = (e: KeyboardEvent) => {
        if (e.keyCode === 17 || e.metaKey) {
            this.keyboard.ctrl = true
        }
        console.log(this.keyboard)
    }

    protected keyUp = (e: KeyboardEvent) => {
        if (e.keyCode === 17 || e.metaKey) {
            this.keyboard.ctrl = false
        }
        console.log(this.keyboard)
    }

    public setSprite = (spriteX: number, spriteY: number) => {
        let lastSelection: { x: number; y: number } = { x: -1, y: -1 }
        for (let y: number = 0; y < this.CANVAS_SIZE.numberOfSpritesY; y++) {
            for (let x: number = 0; x < this.CANVAS_SIZE.numberOfSpritesX; x++) {
                if (this.selectionMap[y][x] === 1) {
                    lastSelection = { x, y }
                    this.selectionMap[y][x] = 0
                    this.map[y][x] = { spriteX, spriteY }
                }
            }
        }
        if (this.isCheckboxChecked) {
            if (lastSelection.x !== -1 && lastSelection.y !== -1) {
                if (lastSelection.x + 1 < this.CANVAS_SIZE.numberOfSpritesX) {
                    this.selectionMap[lastSelection.y][lastSelection.x + 1] = 1
                } else if (lastSelection.y + 1 < this.CANVAS_SIZE.numberOfSpritesY) {
                    this.selectionMap[lastSelection.y + 1][0] = 1
                }
            }
        }
        this.invokeDrawImage()
    }
}
