import { SpritesCanvas } from './SpritesCanvas'
import { IMAGE, CANVAS } from './dimensions'

let spritesCanvas: SpritesCanvas = new SpritesCanvas()

let itemsDiv: HTMLElement = document.getElementById('items')
itemsDiv.style.width = CANVAS.width + 'px'
itemsDiv.style.height = CANVAS.height + 'px'
itemsDiv.style.visibility = 'visible'
