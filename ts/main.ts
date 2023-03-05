import { SpritesCanvas } from './SpritesCanvas'
import { MapCanvas } from './MapCanvas'
import { SPRITES_CANVAS, MAP_CANVAS } from './dimensions'

export let spritesCanvas: SpritesCanvas = new SpritesCanvas('spritesCanvas', SPRITES_CANVAS)
let itemsDiv: HTMLElement = document.getElementById('items')
itemsDiv.style.width = SPRITES_CANVAS.width + 'px'
itemsDiv.style.height = SPRITES_CANVAS.height + 'px'
itemsDiv.style.visibility = 'visible'

export let mapCanvas: MapCanvas = new MapCanvas('mapCanvas', MAP_CANVAS)
let mapDiv: HTMLElement = document.getElementById('map')
mapDiv.style.width = MAP_CANVAS.width + 'px'
mapDiv.style.height = MAP_CANVAS.height + 'px'
mapDiv.style.visibility = 'visible'

let automat: HTMLInputElement = <HTMLInputElement>document.getElementById('automat')
automat.addEventListener('change', () => {
    if (automat.checked) {
        mapCanvas.setIsCheckboxChecked(true)
    } else {
        mapCanvas.setIsCheckboxChecked(false)
    }
})

let dialog = document.getElementById('dialog')
let alphaHidden = document.getElementById('alphaHidden')

alphaHidden.addEventListener('click', () => {
    hideDialog()
})

document.addEventListener('contextmenu', function (e) {
    e.preventDefault()
})

let mouseDown = (e: MouseEvent) => {
    if (e.which === 3 || e.button === 2) {
        showDialog()
    }
}

document.addEventListener('mousedown', mouseDown, false)

function hideDialog() {
    dialog.style.visibility = 'hidden'
    alphaHidden.style.visibility = 'hidden'
}

function showDialog() {
    dialog.style.visibility = 'visible'
    alphaHidden.style.visibility = 'visible'
}

document.getElementById('dialog-undo').addEventListener('click', () => {
    mapCanvas.undo()
    hideDialog()
})

document.getElementById('dialog-redo').addEventListener('click', () => {
    mapCanvas.redo()
    hideDialog()
})

document.getElementById('dialog-cut').addEventListener('click', () => {
    mapCanvas.cut()
    hideDialog()
})

document.getElementById('dialog-copy').addEventListener('click', () => {
    mapCanvas.copy()
    hideDialog()
})

document.getElementById('dialog-paste').addEventListener('click', () => {
    mapCanvas.paste()
    hideDialog()
})

document.getElementById('dialog-delete').addEventListener('click', () => {
    mapCanvas.delete()
    hideDialog()
})

document.getElementById('dialog-save').addEventListener('click', () => {
    mapCanvas.save()
    hideDialog()
})

document.getElementById('dialog-load').addEventListener('click', () => {
    mapCanvas.load()
    hideDialog()
})

document.addEventListener(
    'keydown',
    function (e) {
        if (e.key === 's' && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
            e.preventDefault()
        }
    },
    false
)
