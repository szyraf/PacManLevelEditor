interface ImageSettings {
    spriteSize: number
    borderSize: number
    numberOfSpritesX: number
    numberOfSpritesY: number
    width: number
    height: number
}

export const IMAGE: ImageSettings = {
    spriteSize: 47,
    borderSize: 1,
    numberOfSpritesX: 32,
    numberOfSpritesY: 20,
    width: 1536,
    height: 960
}

interface CanvasSettings {
    spriteSize: number
    borderSize: number
    borderDefaultColor: string
    borderHighlightColor: string
}

export const CANVAS: CanvasSettings = {
    spriteSize: 25,
    borderSize: 2,
    borderDefaultColor: '#ffffff',
    borderHighlightColor: '#ff0000'
}

export interface CanvasSize {
    numberOfSpritesX: number
    numberOfSpritesY: number
    width: number
    height: number
}

export const SPRITES_CANVAS: CanvasSize = {
    numberOfSpritesX: 16,
    numberOfSpritesY: 40,
    width: 0,
    height: 0
}

SPRITES_CANVAS.width = CANVAS.spriteSize * SPRITES_CANVAS.numberOfSpritesX + CANVAS.borderSize * (SPRITES_CANVAS.numberOfSpritesX * 2)
SPRITES_CANVAS.height = CANVAS.spriteSize * SPRITES_CANVAS.numberOfSpritesY + CANVAS.borderSize * (SPRITES_CANVAS.numberOfSpritesY * 2)

export const MAP_CANVAS: CanvasSize = {
    numberOfSpritesX: 44,
    numberOfSpritesY: 38,
    width: 0,
    height: 0
}

MAP_CANVAS.width = CANVAS.spriteSize * MAP_CANVAS.numberOfSpritesX + CANVAS.borderSize * (MAP_CANVAS.numberOfSpritesX * 2)
MAP_CANVAS.height = CANVAS.spriteSize * MAP_CANVAS.numberOfSpritesY + CANVAS.borderSize * (MAP_CANVAS.numberOfSpritesY * 2)
