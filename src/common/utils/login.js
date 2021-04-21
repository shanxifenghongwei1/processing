import UserService from 'service/user-service'
let time = 59
export default {
  data() {
    return {
      countDownShow: false, // 是否发起倒计时
      captcha: '', // 验证码
      time: time
    }
  },
  methods: {
    setCode() {
      // 发送验证码
      if (this.countDownShow) {
        // 正在倒计时，阻止发送验证码
        return false
      }
      this.captcha = ''
      this.countDownShow = true
      this.countDownFun()
      this.$u.api.userService
        .captcha({
          smsCodeEnum: this.smsCodeEnum,
          phone: this.mobile
        })
        .then(res => {
          console.log(res)
          if (res.success) {
            this.$refs.uTips.show({
              title: '发送成功，请注意查收！',
              type: 'success'
            })
          } else {
            this.$refs.uTips.show({
              title: res.msg,
              type: 'error'
            })
          }
        })
    },
    countDownFun() {
      // 发送验证码
      setTimeout(() => {
        this.time--
        if (this.time < 0 || this.countDownShow === false) {
          this.time = time
          this.countDownShow = false
        } else {
          this.countDownFun()
        }
      }, 1000)
    },
    loginRouter(res, detail) {
      // 登陆跳转路由
      Promise.all([
        this.$u.vuex('vuex_web_auth', res.data.tokenType + ' ' + res.data.accessToken),
        this.$u.vuex('vuex_islogin', true),
        this.$u.vuex('vuex_user', detail.userInfo)
      ])
        .then(() => {
          if (
            !this.vuex_return_url ||
            this.vuex_return_url === '/pages/login/login' ||
            this.vuex_return_url === '/pages/login/register'
          ) {
            console.log(33333333333)
            uni.switchTab({
              url: '/pages/tab-bar/index'
            })
          } else if (this.$tabbar.indexOf(this.vuex_return_url) > -1) {
            console.log(4444444444444)
            uni.reLaunch({
              url: this.vuex_return_url
            })
          } else {
            console.log(5555555555)
            uni.redirectTo({
              url: this.vuex_return_url
            })
          }
          uni.hideLoading()
        })
        .catch(() => {
          uni.hideLoading()
        })
    }
  }
}
