interface Dimensions {
    spriteSize: number
    borderSize: number
    borderColor?: string
    borderActiveColor?: string
    spritesInX: number
    spritesInY: number
    width: number
    height: number
}

export const IMAGE: Dimensions = {
    spriteSize: 47,
    borderSize: 1,
    spritesInX: 32,
    spritesInY: 20,
    width: 1536,
    height: 960
}

export const CANVAS: Dimensions = {
    spriteSize: 25,
    borderSize: 2,
    borderColor: '#ffffff',
    borderActiveColor: '#ff0000',
    spritesInX: 16,
    spritesInY: 40,
    width: 0,
    height: 0
}

CANVAS.width = CANVAS.spriteSize * CANVAS.spritesInX + CANVAS.borderSize * (CANVAS.spritesInX * 2 + 1)
CANVAS.height = CANVAS.spriteSize * CANVAS.spritesInY + CANVAS.borderSize * (CANVAS.spritesInY * 2 + 1)
