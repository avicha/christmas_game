import Engine from 'prime/engine'
import Loading from 'app/scenes/loading'
import Main from 'app/scenes/main'
import PrimaryPrize from 'app/scenes/primary_prize'
import MediumPrize from 'app/scenes/medium_prize'
import SuperPrize from 'app/scenes/super_prize'
import Adapter from 'app/adapter'

const beginGame = () => {
    let game = new Engine({ debug: true, stageScaleMode: 'cover', fps: 60 })
    game.setStageSize(1780, 750)
    game.launch(Loading, { next: 'Main' })
    game.on('switchScene', (sceneName, ...args) => {
        switch (sceneName) {
            case 'Loading':
                return game.launch(Loading, ...args)
            case 'Main':
                return game.launch(Main, ...args)
            case 'PrimaryPrize':
                return game.launch(PrimaryPrize, ...args)
            case 'MediumPrize':
                return game.launch(MediumPrize, ...args)
            case 'SuperPrize':
                return game.launch(SuperPrize, ...args)
        }
    })
    game.on('error', ({ message, stack }) => {
        console.error(message)
    })
    return game
}

if (Adapter.platform == 'weixin_web') {
    let game = beginGame()
    game.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(this.responseText)
            if (!data.errcode) {
                wx.config(data.result)
                wx.ready(() => {
                    game.jsApiList.forEach(api => {
                        wx[api]({
                            title: api == 'onMenuShareTimeline' ? '圣诞老人有点忙！快来帮圣诞老人派送礼物，抽取iPhoneX大奖！' : '圣诞老人有点忙！',
                            desc: '圣诞老人有点忙！快来帮圣诞老人派送礼物，抽取iPhoneX大奖！',
                            link: 'http://didi.jhcm.sh.cn/',
                            imgUrl: 'http://didi.jhcm.sh.cn/images/share_img.png',
                            success(res) {
                                // alert('分享成功' + res.errMsg);
                            },
                            fail(res) {
                                // alert('分享失败' + res.errMsg);
                            },
                            complete(res) {
                                // alert('分享完成' + res.errMsg);
                            }
                        })
                    })
                })
                wx.error = (res) => {
                    game.trigger('error', { message: res.errMsg, stack: null })
                }
            }
        }
    }
    xhr.onerror = (e) => {
        game.trigger('error', e)
    }
    xhr.open('GET', 'http://119.23.127.94/api/didi/get_js_config')
    xhr.send()
} else {
    beginGame()
}