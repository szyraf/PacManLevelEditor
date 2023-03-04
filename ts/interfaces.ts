export const IMAGE_SIZES: ImageSizes = {
    ImageSpriteSize: 47,
    ImageBorderSize: 1,
    ImageSpritesX: 32,
    ImageSpritesY: 20,
    ImageWidth: 1536,
    ImageHeight: 960,
}

interface ImageSizes {
    ImageSpriteSize: number
    ImageBorderSize: number
    ImageSpritesX: number
    ImageSpritesY: number
    ImageWidth: number
    ImageHeight: number
}

export const CANVAS_SIZES: CanvasSizes = {
    CanvasSpriteSize: 25,
    CanvasBorderSize: 1,
    CanvasSpritesX: 32,
    CanvasSpritesY: 20,
    ItemsCanvasWidth: 0,
    ItemsCanvasHeight: 0,
}

CANVAS_SIZES.ItemsCanvasWidth = CANVAS_SIZES.CanvasSpriteSize * CANVAS_SIZES.CanvasSpritesX + CANVAS_SIZES.CanvasBorderSize * (CANVAS_SIZES.CanvasSpritesX + 1)
CANVAS_SIZES.ItemsCanvasHeight = CANVAS_SIZES.CanvasSpriteSize * CANVAS_SIZES.CanvasSpritesY + CANVAS_SIZES.CanvasBorderSize * (CANVAS_SIZES.CanvasSpritesY + 1)

interface CanvasSizes {
    CanvasSpriteSize: number
    CanvasBorderSize: number
    CanvasSpritesX: number
    CanvasSpritesY: number
    ItemsCanvasWidth: number
    ItemsCanvasHeight: number
}
