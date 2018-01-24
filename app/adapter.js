import Adapter from '../prime/adapter'
Adapter.alert = ({ title, content, callback }) => {
    switch (Adapter.platform) {
        case 'weixin_minigame':
            wx.showModal({
                title,
                content,
                showCancel: false,
                cancelText: '取消',
                confirmText: '确定',
                success(res) {
                    if (res.confirm && callback) {
                        callback()
                    }
                }
            })
            break
        default:
            window.alert(content)
            break
    }
}
export default Adapter