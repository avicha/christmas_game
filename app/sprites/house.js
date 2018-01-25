import Sprite from '../../prime/sprite'
import resources from '../resources'
import Rectangle from '../../prime/rectangle'

export default class House extends Sprite {
    constructor(...args) {
        super(...args)
        this.texture = resources['house' + this.type]
        switch (this.type) {
            case 1:
                this.shape = new Rectangle(10, 0, this.texture.sizeWidth - 20, this.texture.sizeHeight)
                break
            case 2:
                this.shape = new Rectangle(20, 0, this.texture.sizeWidth - 40, this.texture.sizeHeight)
                break
            case 3:
                this.shape = new Rectangle(55, 0, this.texture.sizeWidth - 110, this.texture.sizeHeight)
                break
            case 4:
                this.shape = new Rectangle(60, 0, this.texture.sizeWidth - 130, this.texture.sizeHeight)
                break
            case 5:
                this.shape = new Rectangle(90, 0, this.texture.sizeWidth - 190, this.texture.sizeHeight)
                break
            case 6:
                this.shape = new Rectangle(80, 0, this.texture.sizeWidth - 180, this.texture.sizeHeight)
                break
            case 7:
                this.shape = new Rectangle(100, 0, this.texture.sizeWidth - 200, this.texture.sizeHeight)
                break
            case 8:
                this.shape = new Rectangle(40, 0, this.texture.sizeWidth - 80, this.texture.sizeHeight)
                break
            default:
                this.shape = new Rectangle(0, 0, this.texture.sizeWidth, this.texture.sizeHeight)
                break
        }
    }
}