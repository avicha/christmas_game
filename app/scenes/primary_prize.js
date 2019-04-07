import Scene from '../../prime/scene'
import Sprite from '../../prime/sprite'
import Text from '../../prime/ui/text'
import resources from '../resources'
import Mask from '../sprites/mask'
import Adapter from '../../prime/adapter'

export default class PrimaryPrize extends Scene {
    constructor(game, opts) {
        super(game)
        game.opts.stageColor = null
        this.game = game
        this.score = (opts.score || 0).toString()
        this.bgm = resources.bgm3
        if (!game.isMute) {
            this.bgm.play(true)
        }
        this.bg = this.addGameObject(new Sprite(0, 0, 0, {
            texture: resources.primary_bg
        }))
        this.didi_logo = this.addGameObject(new Sprite(game.renderStageZone.left + 40, game.renderStageZone.top + 40, 1, {
            texture: resources.didi_logo
        }))
        this.christmas_man = this.addGameObject(new Sprite(game.renderStageZone.right - resources.christmas_man.sizeWidth, game.renderStageZone.bottom - resources.christmas_man.sizeHeight, 2, {
            texture: resources.christmas_man
        }))
        this.msg = this.addGameObject(new Text(game.renderStageZone.pivot.x, game.renderStageZone.top + 200, 1, {
            text: '恭喜你派送了' + (this.score.length == 1 ? '        ' : '            ') + '个礼物，成为：',
            fontColor: '#fff',
            fontSize: 36,
            fontFamily: 'Arial',
            align: Text.ALIGN.CENTER,
            valign: Text.VALIGN.TOP
        }))
        this.score_msg = this.addGameObject(new Text(game.renderStageZone.pivot.x - (this.score.length == 1 ? 18 : 20), game.renderStageZone.top + 218, 1, {
            text: this.score,
            fontColor: '#fed139',
            fontSize: 97,
            fontFamily: 'Arial',
            align: Text.ALIGN.CENTER,
            valign: Text.VALIGN.MIDDLE
        }))
        this.primary_title = this.addGameObject(new Sprite(game.renderStageZone.pivot.x - resources.primary_title.sizeWidth / 2, game.renderStageZone.top + 263, 1, {
            texture: resources.primary_title
        }))
        this.help_btn = this.addGameObject(new Sprite(game.renderStageZone.pivot.x - 15 - resources.help_btn.sizeWidth, game.renderStageZone.top + 455, 1, {
            texture: resources.help_btn
        }))
        this.again_btn = this.addGameObject(new Sprite(game.renderStageZone.pivot.x + 15, game.renderStageZone.top + 455, 1, {
            texture: resources.again_btn
        }))
        this.intro = this.addGameObject(new Text(game.renderStageZone.left + 39, game.renderStageZone.top + 600, 1, {
            text: '抽奖规则：\n1. 派送3个礼物但未通关的圣诞老人，可获得滴滴圣诞礼券；\n2. 通关的圣诞老人，有机会获得滴滴圣诞周边特制或礼品券，更有机会获得iPhoneX一台；\n3. 每个圣诞老人只有一次领奖机会。最终解释权归滴滴上海所有。',
            fontColor: '#a98775',
            fontSize: 22,
            lineHeight: 30,
            align: Text.ALIGN.LEFT,
            valign: Text.VALIGN.TOP
        }))
        this.mask = this.addGameObject(new Mask(game.renderStageZone.left, game.renderStageZone.top, 3, {
            width: game.renderStageZone.width,
            height: game.renderStageZone.height,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            visible: false
        }))
        if (game.isCanvasRotate) {
            this.share = this.addGameObject(new Sprite(game.renderStageZone.left + 50, game.renderStageZone.top + 50, 4, {
                texture: resources.share_left,
                visible: false
            }))
        } else {
            this.share = this.addGameObject(new Sprite(game.renderStageZone.right - 30 - resources.share_right.sizeWidth, game.renderStageZone.top + 20, 4, {
                texture: resources.share_right,
                visible: false
            }))
        }
        this.on('tap', e => {
            switch (e.target) {
                case this.help_btn:
                    this.mask.visible = true
                    this.share.visible = true
                    break
                case this.again_btn:
                    this.trigger('switchScene', 'Main')
                    break
                case this.mask:
                    this.mask.visible = false
                    this.share.visible = false
                    break
            }
        })
        if (Adapter.platform == 'weixin_web') {
            game.jsApiList.forEach(api => {
                wx[api]({
                    title: api == 'onMenuShareTimeline' ? ('恭喜你派送了' + this.score + '份礼物，成功晋级为初级圣诞老人。看看谁能来比拼！') : '圣诞老人有点忙！',
                    desc: '恭喜你派送了' + this.score + '份礼物，成功晋级为初级圣诞老人。看看谁能来比拼！',
                    link: 'http://didi.jhcm.sh.cn/',
                    imgUrl: 'http://didi.jhcm.sh.cn/images/share_img.png',
                    success: function() {

                    },
                    cancel: function() {

                    }
                })
            })
        }
    }
    release() {
        this.bgm.stop()
        super.release()
    }
}