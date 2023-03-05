import { IMAGE, CANVAS, SPRITES_CANVAS, CanvasSize } from './dimensions'
import { Canvas } from './Canvas'

export class MapCanvas extends Canvas {
    constructor(canvasId: string, CANVAS_SIZE: CanvasSize) {
        super(canvasId, CANVAS_SIZE)
    }
}
