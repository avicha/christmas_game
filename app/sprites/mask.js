import GameObject from '../../prime/game_object'
import Rectangle from '../../prime/rectangle'

export default class Mask extends GameObject {
    constructor(...args) {
        super(...args)
        this.shape = new Rectangle(0, 0, this.width, this.height)
    }
    draw(ctx) {
        if (this.visible) {
            ctx.fillStyle = this.backgroundColor
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
    }
}