import { IMAGE, CANVAS, SPRITES_CANVAS, CanvasSize } from './dimensions'
import { Canvas } from './Canvas'

export class MapCanvas extends Canvas {
    private selectionMap: number[][] = []
    private archivedMaps: any[] = []
    private archivedMapsIndex: number = 0
    private map: any[][] = []
    private copiedMap: any[][] = []
    private pasteMode: boolean = false
    private pasteTopLeftCorner: { x: number; y: number } = { x: -1, y: -1 }
    private isMouseDown: boolean = false
    private startMouseDownX: number = -1
    private startMouseDownY: number = -1
    private keyboard = { ctrl: false, z: false, y: false, c: false, x: false, v: false, esc: false, s: false, l: false }
    private isCheckboxChecked: boolean = false

    public setIsCheckboxChecked(isCheckboxChecked: boolean) {
        this.isCheckboxChecked = isCheckboxChecked
    }

    constructor(canvasId: string, CANVAS_SIZE: CanvasSize) {
        super(canvasId, CANVAS_SIZE)
        this.selectionMap = this.createEmptyMap()
        this.map = this.createEmptyMap()
        this.copiedMap = this.createEmptyMap()
        this.archivedMaps.push(JSON.parse(JSON.stringify(this.map)))
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
        if (e.which === 1 || e.button === 0) {
            if (!this.pasteMode) {
                if (!this.keyboard.ctrl) {
                    this.selectionMap = this.createEmptyMap()
                }

                this.isMouseDown = true
                let pos = this.getMousePos(this.canvas, e)
                this.startMouseDownX = Math.floor(pos.x / (CANVAS.spriteSize + CANVAS.borderSize * 2))
                this.startMouseDownY = Math.floor(pos.y / (CANVAS.spriteSize + CANVAS.borderSize * 2))
                this.invokeDrawImage()
            }
        }
    }

    protected mouseUp = (e: MouseEvent) => {
        if (e.which === 1 || e.button === 0) {
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

                if (this.pasteMode) {
                    active = false
                }

                let copiedMapX: number = x - this.prevMouseX + this.pasteTopLeftCorner.x
                let copiedMapY: number = y - this.prevMouseY + this.pasteTopLeftCorner.y
                let isGood: boolean = true

                if (copiedMapX < 0 || copiedMapY < 0 || copiedMapX >= this.CANVAS_SIZE.numberOfSpritesX || copiedMapY >= this.CANVAS_SIZE.numberOfSpritesY) {
                    isGood = false
                }

                if (isGood && this.pasteMode && this.copiedMap[copiedMapY][copiedMapX] !== 0) {
                    this.drawSprite(x, y, this.copiedMap[copiedMapY][copiedMapX].spriteX, this.copiedMap[copiedMapY][copiedMapX].spriteY, false, true)
                } else if (this.map[y][x] !== 0) {
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

    protected drawSprite(x: number, y: number, spriteX: number, spriteY: number, active: boolean = false, pasted: boolean = false) {
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
        if (pasted) {
            this.ctx.strokeStyle = CANVAS.borderPasteColor
        } else if (active) {
            this.ctx.strokeStyle = CANVAS.borderHighlightColor
        } else {
            this.ctx.strokeStyle = CANVAS.borderDefaultColor
        }

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

    protected mouseClick = (e: MouseEvent) => {
        let pos = this.getMousePos(this.canvas, e)
        let clickX: number = Math.floor(pos.x / (CANVAS.spriteSize + CANVAS.borderSize * 2))
        let clickY: number = Math.floor(pos.y / (CANVAS.spriteSize + CANVAS.borderSize * 2))

        if (this.pasteMode) {
            for (let y: number = 0; y < this.CANVAS_SIZE.numberOfSpritesY; y++) {
                for (let x: number = 0; x < this.CANVAS_SIZE.numberOfSpritesX; x++) {
                    let copiedMapX: number = x - this.prevMouseX + this.pasteTopLeftCorner.x
                    let copiedMapY: number = y - this.prevMouseY + this.pasteTopLeftCorner.y
                    let isGood: boolean = true

                    if (copiedMapX < 0 || copiedMapY < 0 || copiedMapX >= this.CANVAS_SIZE.numberOfSpritesX || copiedMapY >= this.CANVAS_SIZE.numberOfSpritesY) {
                        isGood = false
                    }

                    if (isGood) {
                        if (this.copiedMap[copiedMapY][copiedMapX] !== 0) {
                            this.map[y][x] = this.copiedMap[copiedMapY][copiedMapX]
                        }
                    }
                }
            }
            this.pasteMode = false
            this.selectionMap = this.createEmptyMap()
        }
    }

    protected keyDown = (e: KeyboardEvent) => {
        if (e.keyCode === 17 || e.metaKey) {
            this.keyboard.ctrl = true
        } else {
            switch (e.keyCode) {
                case 90:
                    this.keyboard.z = true
                    break
                case 89:
                    this.keyboard.y = true
                    break
                case 46:
                    this.delete()
                    break
                case 67:
                    this.keyboard.c = true
                    break
                case 88:
                    this.keyboard.x = true
                    break
                case 86:
                    this.keyboard.v = true
                    break
                case 27:
                    this.keyboard.esc = true
                    break
                case 83:
                    this.keyboard.s = true
                    break
                case 76:
                    this.keyboard.l = true
                    break
            }
        }
        this.shortcuts()
    }

    public delete = () => {
        let isDeleted: boolean = false
        for (let y: number = 0; y < this.CANVAS_SIZE.numberOfSpritesY; y++) {
            for (let x: number = 0; x < this.CANVAS_SIZE.numberOfSpritesX; x++) {
                if (this.selectionMap[y][x] === 1) {
                    this.map[y][x] = 0
                    isDeleted = true
                }
            }
        }
        if (isDeleted) {
            this.updateArchivedMaps()
        }
        this.selectionMap = this.createEmptyMap()
        this.invokeDrawImage()
    }

    private updateArchivedMaps = () => {
        if (this.archivedMapsIndex < this.archivedMaps.length - 1) {
            this.archivedMaps.splice(this.archivedMapsIndex + 1, this.archivedMaps.length - this.archivedMapsIndex)
        }
        this.archivedMaps.push(JSON.parse(JSON.stringify(this.map)))
        this.archivedMapsIndex = this.archivedMaps.length - 1
    }

    private shortcuts = () => {
        if (this.keyboard.ctrl && this.keyboard.z) {
            this.undo()
        } else if (this.keyboard.ctrl && this.keyboard.y) {
            this.redo()
        } else if (this.keyboard.ctrl && this.keyboard.c) {
            this.copy()
        } else if (this.keyboard.ctrl && this.keyboard.x) {
            this.cut()
        } else if (this.keyboard.ctrl && this.keyboard.v) {
            this.paste()
        } else if (this.keyboard.esc) {
            this.selectionMap = this.createEmptyMap()
            this.pasteMode = false
            this.invokeDrawImage()
        } else if (this.keyboard.ctrl && this.keyboard.s) {
            this.save()
        } else if (this.keyboard.ctrl && this.keyboard.l) {
            this.load()
        }

        this.keyboard.z = false
        this.keyboard.y = false
        this.keyboard.c = false
        this.keyboard.x = false
        this.keyboard.v = false
        this.keyboard.esc = false
        this.keyboard.s = false
        this.keyboard.l = false
    }

    public undo = () => {
        this.selectionMap = this.createEmptyMap()

        if (this.archivedMapsIndex > 0) {
            this.archivedMapsIndex--
            this.map = JSON.parse(JSON.stringify(this.archivedMaps[this.archivedMapsIndex]))
            this.invokeDrawImage()
        }
    }

    public redo = () => {
        this.selectionMap = this.createEmptyMap()
        if (this.archivedMapsIndex > -1) {
            if (this.archivedMaps.length > this.archivedMapsIndex + 1) {
                this.archivedMapsIndex++
                this.map = this.archivedMaps[this.archivedMapsIndex]
                this.invokeDrawImage()
            }
        }
    }

    public copy = () => {
        this.copiedMap = this.createEmptyMap()
        for (let y: number = 0; y < this.CANVAS_SIZE.numberOfSpritesY; y++) {
            for (let x: number = 0; x < this.CANVAS_SIZE.numberOfSpritesX; x++) {
                if (this.selectionMap[y][x] === 1) {
                    this.copiedMap[y][x] = this.map[y][x]
                }
            }
        }

        this.findTopLeftPixel()
    }

    private findTopLeftPixel = () => {
        let topPixel: number = -1
        let leftPixel: number = -1
        let topLeftPixel = { x: -1, y: -1 }
        for (let y: number = 0; y < this.CANVAS_SIZE.numberOfSpritesY; y++) {
            for (let x: number = 0; x < this.CANVAS_SIZE.numberOfSpritesX; x++) {
                if (this.selectionMap[y][x] === 1) {
                    if (topPixel === -1) {
                        topPixel = y
                    }
                }
            }
        }
        for (let x: number = 0; x < this.CANVAS_SIZE.numberOfSpritesX; x++) {
            for (let y: number = 0; y < this.CANVAS_SIZE.numberOfSpritesY; y++) {
                if (this.selectionMap[y][x] === 1) {
                    if (leftPixel === -1) {
                        leftPixel = x
                    }
                }
            }
        }
        topLeftPixel.x = leftPixel
        topLeftPixel.y = topPixel

        this.pasteTopLeftCorner = topLeftPixel
    }

    public cut = () => {
        this.copy()
        this.delete()
    }

    public paste = () => {
        let isEmpty: boolean = true
        for (let y: number = 0; y < this.CANVAS_SIZE.numberOfSpritesY; y++) {
            for (let x: number = 0; x < this.CANVAS_SIZE.numberOfSpritesX; x++) {
                if (this.copiedMap[y][x] !== 0) {
                    isEmpty = false
                }
            }
        }

        if (!isEmpty) {
            this.pasteMode = true
            this.selectionMap = this.createEmptyMap()
            this.invokeDrawImage()
        }
    }

    public save = () => {
        this.saveData(JSON.stringify(this.map), 'map.json', 'application/json')
    }

    private saveData = (data: string, filename: string, type: string) => {
        const blob = new Blob([data], { type: type })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        link.remove()
    }

    public load = () => {
        let THIS = this
        let input = document.createElement('input')
        input.type = 'file'
        input.accept = '.json'

        input.onchange = (e: any) => {
            let file = e.target.files[0]
            const reader = new FileReader()
            reader.readAsText(file)

            reader.onload = function () {
                THIS.map = JSON.parse(reader.result as string)
                THIS.archivedMaps = THIS.createEmptyMap()
                THIS.archivedMapsIndex = -1
                THIS.selectionMap = THIS.createEmptyMap()
                THIS.invokeDrawImage()
            }
        }

        input.click()
    }

    protected keyUp = (e: KeyboardEvent) => {
        if (e.keyCode === 17 || e.metaKey) {
            this.keyboard.ctrl = false
        }
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

        if (lastSelection.x !== -1) {
            this.updateArchivedMaps()
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
