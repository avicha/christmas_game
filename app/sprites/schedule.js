import Sprite from '../../prime/sprite'
import resources from '../resources'

export default class Schedule extends Sprite {
    constructor(...args) {
        super(...args)
        this.texture = resources.schedule
        this.progress = 0
    }
    setProgress(progress) {
        this.progress = progress
    }
    draw(ctx) {
        if (this.progress) {
            var w = this.texture.tileWidth * this.progress
            var h = this.texture.tileHeight
            ctx.drawImage(this.texture.canvas, 0, 0, w, h, this.position.x, this.position.y, w, h)
        }
    }
}