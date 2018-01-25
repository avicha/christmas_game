import Sprite from '../../prime/sprite'
import Rectangle from '../../prime/rectangle'
import resources from '../resources'

export default class ChristmasMan extends Sprite {
    constructor(...args) {
        super(...args)
        this.texture = resources.christmas_man_sprite
        this.shape = new Rectangle(60, 10, 100, 180)
        //添加跑的动画
        this.addAnimation('run', [1, 2, 3, 4, 5, 6, 7, 8], 100)
        //添加跳的动画
        this.addAnimation('jump', [9, 10, 11, 12], 100)
        //添加倒下的动画
        this.addAnimation('down', [13], 100)
    }
}