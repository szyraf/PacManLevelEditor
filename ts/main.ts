import { SpritesCanvas } from './SpritesCanvas'
import { MapCanvas } from './MapCanvas'
import { SPRITES_CANVAS, MAP_CANVAS } from './dimensions'

let spritesCanvas: SpritesCanvas = new SpritesCanvas('spritesCanvas', SPRITES_CANVAS)
let itemsDiv: HTMLElement = document.getElementById('items')
itemsDiv.style.width = SPRITES_CANVAS.width + 'px'
itemsDiv.style.height = SPRITES_CANVAS.height + 'px'
itemsDiv.style.visibility = 'visible'

let mapCanvas: MapCanvas = new MapCanvas('mapCanvas', MAP_CANVAS)
let mapDiv: HTMLElement = document.getElementById('map')
mapDiv.style.width = MAP_CANVAS.width + 'px'
mapDiv.style.height = MAP_CANVAS.height + 'px'
mapDiv.style.visibility = 'visible'
