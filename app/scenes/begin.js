import Scene from '../../prime/scene'
import Sprite from '../../prime/sprite'
import Vector2 from '../../prime/vector2'
import Text from '../../prime/ui/text'
import TWEEN from '../../prime/tween'
import resources from '../resources'
import Man from '../sprites/man'

export default class BeginScene extends Scene {
    constructor(game) {
        super()
        game.opts.stageColor = null
        this.game = game
        this.snow_count = 20
        this.bg_speed = new Vector2(0, -100)
        this.bgm = resources.bgm1
        this.bg1 = this.addGameObject(new Sprite(0, 0, 0, {
            texture: resources.bg1,
            speed: this.bg_speed
        }))
        this.bg2 = this.addGameObject(new Sprite(game.renderStageZone.pivot.x + 443, resources.bg1.sizeHeight - resources.bg2.sizeHeight, 2, {
            texture: resources.bg2,
            speed: this.bg_speed
        }))
        this.moon = this.addGameObject(new Sprite(game.renderStageZone.right - 344, game.renderStageZone.top + 36, 1, {
            texture: resources.moon
        }))
        this.tree = this.addGameObject(new Sprite(game.renderStageZone.right - resources.tree3.sizeWidth, resources.bg1.sizeHeight - resources.tree3.sizeHeight, 3, {
            texture: resources.tree3,
            speed: this.bg_speed
        }))
        this.chimney = this.addGameObject(new Sprite(game.renderStageZone.left, resources.bg1.sizeHeight - resources.chimney.sizeHeight, 3, {
            texture: resources.chimney,
            speed: this.bg_speed
        }))
        this.man = this.addGameObject(new Man(game.renderStageZone.left, resources.bg1.sizeHeight - resources.man.sizeHeight - 87, 6, {
            speed: this.bg_speed
        }))
        this.snows = [];
        for (let i = 0; i < this.snow_count; i++) {
            this.addSnow()
        }
        if (!this.game.isMute) {
            this.bgm.play(true)
        }
        this.p1 = this.addGameObject(new Text(game.renderStageZone.pivot.x, 280, 10, {
            text: '叮叮当，叮叮当，据可靠消息人士透露，',
            fontFamily: 'Arial',
            fontSize: 40,
            lineHeight: 40,
            fontColor: '#fff',
            align: Text.ALIGN.CENTER,
            valign: Text.VALIGN.TOP,
            alpha: 0
        }))
        new TWEEN.Tween(this.p1).to({
            alpha: [1, 1, 1, 0.5, 0]
        }, 5000).easing(TWEEN.Easing.Linear.None).delay(1000).start()
        new TWEEN.Tween(this.p1.position).to({
            y: 240
        }, 2000).easing(TWEEN.Easing.Linear.None).delay(4000).start()
        this.p2 = this.addGameObject(new Text(game.renderStageZone.pivot.x, 348, 10, {
            text: '圣诞老人将于明日午夜时分来送货。',
            fontFamily: 'Arial',
            fontSize: 40,
            lineHeight: 40,
            fontColor: '#fff',
            align: Text.ALIGN.CENTER,
            valign: Text.VALIGN.TOP,
            alpha: 0
        }))
        new TWEEN.Tween(this.p2).to({
            alpha: [1, 1, 0.5, 0]
        }, 4000).easing(TWEEN.Easing.Linear.None).delay(2000).start()
        new TWEEN.Tween(this.p2.position).to({
            y: 308
        }, 2000).easing(TWEEN.Easing.Linear.None).delay(4000).start()
        this.p3 = this.addGameObject(new Text(game.renderStageZone.pivot.x, 410, 10, {
            text: '过关时，经海关人士检测，巨型包裹内含iPhoneX一部！',
            fontFamily: 'Arial',
            fontSize: 40,
            lineHeight: 40,
            fontColor: '#fff',
            align: Text.ALIGN.CENTER,
            valign: Text.VALIGN.TOP,
            alpha: 0
        }))
        new TWEEN.Tween(this.p3).to({
            alpha: [1, 0.5, 0]
        }, 3000).easing(TWEEN.Easing.Linear.None).delay(3000).start()
        new TWEEN.Tween(this.p3.position).to({
            y: 370
        }, 2000).easing(TWEEN.Easing.Linear.None).delay(4000).start()
        this.p4 = this.addGameObject(new Text(game.renderStageZone.pivot.x, 300, 10, {
            text: '礼品太多，忙不过来的圣诞老人发出紧急求助',
            fontFamily: 'Arial',
            fontSize: 40,
            lineHeight: 40,
            fontColor: '#fff',
            align: Text.ALIGN.CENTER,
            valign: Text.VALIGN.TOP,
            alpha: 0
        }))
        new TWEEN.Tween(this.p4).to({
            alpha: [1, 1, 0.5, 0]
        }, 4000).easing(TWEEN.Easing.Linear.None).delay(7000).start()
        new TWEEN.Tween(this.p4.position).to({
            y: 260
        }, 2000).easing(TWEEN.Easing.Linear.None).delay(9000).start()
        this.p5 = this.addGameObject(new Text(game.renderStageZone.pivot.x, 352, 10, {
            text: '“快来帮我派送礼物，派者有份！”',
            fontFamily: 'Arial',
            fontSize: 40,
            lineHeight: 40,
            fontColor: '#fff',
            align: Text.ALIGN.CENTER,
            valign: Text.VALIGN.TOP,
            alpha: 0
        }))
        new TWEEN.Tween(this.p5).to({
            alpha: [1, 0.5, 0]
        }, 3000).easing(TWEEN.Easing.Linear.None).delay(8000).start()
        new TWEEN.Tween(this.p5.position).to({
            y: 312
        }, 2000).easing(TWEEN.Easing.Linear.None).delay(9000).start()
        this.title = this.addGameObject(new Sprite(game.renderStageZone.pivot.x - resources.title.sizeWidth / 2, 108, 10, {
            texture: resources.title,
            alpha: 0,
            visible: false
        }))
        this.titleTween1 = new TWEEN.Tween(this.title).to({
            alpha: 1
        }, 300).easing(TWEEN.Easing.Quadratic.InOut)
        this.titleTween2 = new TWEEN.Tween(this.title.scale).to({
            x: [1.2, 0.7, 1.1, 1],
            y: [1.2, 0.7, 1.1, 1]
        }, 1500).easing(TWEEN.Easing.Quadratic.InOut)
        this.begin = this.addGameObject(new Sprite(game.renderStageZone.pivot.x - resources.begin.sizeWidth / 2, 472, 10, {
            texture: resources.begin,
            alpha: 0,
            visible: false
        }))
        this.beginTween = new TWEEN.Tween(this.begin).to({
            angle: -30 / 180 * Math.PI
        }, 375).easing(TWEEN.Easing.Quadratic.InOut)
        this.beginTween2 = new TWEEN.Tween(this.begin).to({
            angle: 20 / 180 * Math.PI
        }, 300).easing(TWEEN.Easing.Quadratic.InOut).chain(new TWEEN.Tween(this.begin).to({
            angle: -15 / 180 * Math.PI
        }, 225).easing(TWEEN.Easing.Quadratic.InOut).chain(new TWEEN.Tween(this.begin).to({
            angle: 10 / 180 * Math.PI
        }, 150).easing(TWEEN.Easing.Quadratic.InOut).chain(new TWEEN.Tween(this.begin).to({
            angle: 0
        }, 75).easing(TWEEN.Easing.Quadratic.InOut).chain(new TWEEN.Tween(this.begin).to({
            angle: 0
        }, 1875).easing(TWEEN.Easing.Linear.None).chain(this.beginTween)))))
        this.beginTween.chain(this.beginTween2)
        this.on('tap', e => {
            switch (e.target) {
                case this.begin:
                    this.bgm.stop()
                    this.trigger('switchScene', 'Main')
            }
        })
    }
    addSnow() {
        let pos_left = 200 + Math.random() * this.game.renderStageZone.width
        let pos_top = -50 + Math.random() * -50
        let scale = 0.5 + Math.random() * 0.5
        let speed = (this.game.renderStageZone.bottom - pos_top) / parseInt(10 + 4 * pos_top / 100)
        let snow = this.addGameObject(new Sprite(this.game.renderStageZone.left + pos_left, this.game.renderStageZone.top + pos_top, 5, {
            texture: resources.snow,
            speed: new Vector2(0, 0),
            scale: new Vector2(scale, scale)
        }))
        this.snows.push(snow)
        setTimeout(function() {
            snow.speed.set(-30, speed)
        }, 10000 * Math.random())
    }
    fixBgBottom(sprite) {
        if (sprite.speed.y && sprite.position.y + sprite.texture.sizeHeight < this.game.renderStageZone.bottom) {
            this.bg_speed.set(0, 0)
        }
    }
    update(dt) {
        TWEEN.update()
        this.fixBgBottom(this.bg1)
        if (!this.bg_speed.y && !this.title.visible && !this.begin.visible) {
            this.title.visible = true
            this.titleTween1.delay(500).start()
            this.titleTween2.delay(500).start()
            this.begin.visible = true
            this.beginTween.delay(1500).start().onStart(() => {
                this.begin.alpha = 1
            })
        }
        this.snows = this.snows.filter(snow => {
            if (snow.position.y > this.game.renderStageZone.bottom) {
                snow.kill()
                return false
            }
            return true
        })
        for (let i = this.snows.length; i < this.snow_count; i++) {
            this.addSnow()
        }
        super.update(dt)
    }
}