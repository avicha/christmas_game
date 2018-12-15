import Sprite from '../../prime/sprite'
import resources from '../resources'

export default class Man extends Sprite {
    constructor(...args) {
        super(...args)
        this.texture = resources.man
        //添加站着的动画
        this.addAnimation('stand', [0, 1, 2], 100)
        this.setCurrentAnim('stand')
    }
}