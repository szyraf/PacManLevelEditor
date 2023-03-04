interface Dimensions {
    spriteSize: number
    borderSize: number
    borderColor?: string
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
    spritesInX: 32,
    spritesInY: 20,
    width: 0,
    height: 0
}

CANVAS.width = CANVAS.spriteSize * CANVAS.spritesInX + CANVAS.borderSize * (CANVAS.spritesInX + 1)
CANVAS.height = CANVAS.spriteSize * CANVAS.spritesInY + CANVAS.borderSize * (CANVAS.spritesInY + 1)
