import Scene from '../../prime/scene'
import Sprite from '../../prime/sprite'
import Text from '../../prime/ui/text'
import Loader from '../../prime/loader'
import ChristmasMan from '../sprites/christmas_man'
import Rectangle from '../../prime/rectangle'
import Schedule from '../sprites/schedule'
import resources from '../resources'

export default class LoadingScene extends Scene {
    static getResources() {
        return [resources.christmas_man_sprite, resources.loading_bg, resources.schedule]
    }
    constructor(game, {
        next
    }) {
        super(game)
        game.opts.stageColor = '#383838'
        this.christmas_man = this.addGameObject(new ChristmasMan(-resources.christmas_man_sprite.sizeWidth / 2, 250, 1, {
            fixed: 'center'
        }))
        this.christmas_man.setCurrentAnim('run')
        this.loading_bg = this.addGameObject(new Sprite(-resources.loading_bg.sizeWidth / 2, 450, 1, {
            texture: resources.loading_bg,
            fixed: 'center'
        }))
        this.schedule = this.addGameObject(new Schedule(-resources.schedule.sizeWidth / 2, 456, 1, {
            fixed: 'center'
        }))
        this.loading_text = this.addGameObject(new Text(0, 550, 1, {
            text: 'loading...',
            fontColor: '#fff',
            align: Text.ALIGN.CENTER,
            fontSize: 30,
            lineHeight: 45,
            fixed: 'center'
        }))
        const loader = new Loader()
        loader.addResources(Object.values(resources))
        loader.on('progressUpdate', (progress) => {
            this.schedule.setProgress(progress)
        })
        loader.on('progressComplete', () => {
            this.trigger('switchScene', next)
        })
        loader.load()
    }
}