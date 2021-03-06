import Scene from '../../prime/scene'
import Sprite from '../../prime/sprite'
import Text from '../../prime/ui/text'
import resources from '../resources'
import Mask from '../sprites/mask'
import Adapter from '../../prime/adapter'

export default class MediumPrize extends Scene {
    constructor(game, opts) {
        super(game)
        game.opts.stageColor = null
        this.game = game
        this.score = (opts.score || 0).toString()
        this.bgm = resources.bgm3
        if (!game.isMute) {
            this.bgm.play(true)
        }
        this.bingo_sound = resources.bingo_sound
        this.bg = this.addGameObject(new Sprite(0, 0, 0, {
            texture: resources.primary_bg
        }))
        this.didi_logo = this.addGameObject(new Sprite(40, 40, 1, {
            texture: resources.didi_logo,
            fixed: 'top-left'
        }))
        this.christmas_man = this.addGameObject(new Sprite(-resources.christmas_man.sizeWidth, -resources.christmas_man.sizeHeight, 2, {
            texture: resources.christmas_man,
            fixed: 'bottom-right'
        }))
        this.msg = this.addGameObject(new Text(0, 200, 1, {
            text: '恭喜你派送了' + (this.score.length == 1 ? '        ' : '            ') + '个礼物，成为：',
            fontColor: '#fff',
            fontSize: 36,
            fontFamily: 'Arial',
            align: Text.ALIGN.CENTER,
            valign: Text.VALIGN.TOP,
            fixed: 'top-center'
        }))
        this.score_msg = this.addGameObject(new Text(-(this.score.length == 1 ? 18 : 20), 218, 1, {
            text: this.score,
            fontColor: '#fed139',
            fontSize: 97,
            fontFamily: 'Arial',
            align: Text.ALIGN.CENTER,
            valign: Text.VALIGN.MIDDLE,
            fixed: 'top-center'
        }))
        this.super_title = this.addGameObject(new Sprite(-resources.super_title.sizeWidth / 2, 277, 1, {
            texture: resources.super_title,
            fixed: 'top-center'
        }))
        this.gift_btn = this.addGameObject(new Sprite(-resources.gift_btn.sizeWidth / 2, 455, 1, {
            texture: resources.gift_btn,
            fixed: 'top-center'
        }))
        this.intro = this.addGameObject(new Text(39, 600, 1, {
            text: '抽奖规则：\n1. 派送3个礼物但未通关的圣诞老人，可获得滴滴圣诞礼券；\n2. 通关的圣诞老人，有机会获得滴滴圣诞周边特制或礼品券，更有机会获得iPhoneX一台；\n3. 每个圣诞老人只有一次领奖机会。最终解释权归滴滴上海所有。',
            fontColor: '#a98775',
            fontSize: 22,
            lineHeight: 30,
            align: Text.ALIGN.LEFT,
            valign: Text.VALIGN.TOP,
            fixed: 'top-left'
        }))
        this.mask = this.addGameObject(new Mask(0, 0, 3, {
            width: game.renderStageZone.width,
            height: game.renderStageZone.height,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            visible: false,
            fixed: 'top-left'
        }))
        this.on('tap', e => {
            switch (e.target) {
                case this.gift_btn:
                    Adapter.alert({
                        title: '优享滴滴',
                        content: '活动已结束，感谢您的支持！'
                    })
                    break
                case this.invite_btn:
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
                    title: api == 'onMenuShareTimeline' ? '您已通关，成为超级圣诞老人！快邀请朋友一起派送，抽取iPhoneX大奖！' : '圣诞老人有点忙！',
                    desc: '您已通关，成为超级圣诞老人！快邀请朋友一起派送，抽取iPhoneX大奖！',
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