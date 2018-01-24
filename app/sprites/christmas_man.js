import Sprite from '../../prime/sprite'
export default class ChristmasMan extends Sprite {
    constructor(...args) {
        super(...args)
        //添加跑的动画
        this.addAnimation('run', [1, 2, 3, 4, 5, 6, 7, 8], 100)
        //添加跳的动画
        this.addAnimation('jump', [9, 10, 11, 12], 100)
        //添加倒下的动画
        this.addAnimation('down', [13], 100)
    }
}