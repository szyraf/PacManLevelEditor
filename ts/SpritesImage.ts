interface Image {
    getSpritesImg(): HTMLImageElement
}

export class SpritesImage implements Image {
    private spritesImg: HTMLImageElement

    public getSpritesImg(): HTMLImageElement {
        return this.spritesImg
    }

    public setSpritesImg(spritesImg: HTMLImageElement) {
        this.spritesImg = spritesImg
    }

    constructor() {
        this.spritesImg = new Image()
        this.spritesImg.src = 'sprites.png'
    }
}
