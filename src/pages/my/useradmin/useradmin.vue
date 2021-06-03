<template>
  <view>
    <view class="pl15 pr15 pt15 ml15 mt15">
      <image
        style="width:240rpx;"
        src="/static/my/admin/admin.png"
        mode="widthFix"
      />
      <view class="fontcolors pt15 fw600 pb5 fs20">骑手端登录</view>
      <view class="color-shallow fs14">SIGN IN</view>
      <view class="mt15 pt15 mb15 pb15"></view>
      <view>
        <u-form :model="form" label-position="top" ref="uForm">
          <u-form-item label="账号" prop="name">
            <u-input
              v-model="form.account"
              type="number"
              placeholder="请输入账号"
            />
          </u-form-item>
          <u-form-item label="密码" prop="name">
            <u-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
            />
          </u-form-item>
        </u-form>

        <view class="mt15 pt15 mb15 pb15"></view>
        <view class="btnsstyle">
          <u-button
            class="width-full"
            shape="circle"
            type="primary"
            @click="submit"
            >登录</u-button
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    form: {
      account: "",
      password: "",
    },
    qishouinfo: {},
  }),
  computed: {},
  methods: {
    submit() {
      this.$u.api.newsService
        .qishoulogin({
          account: this.form.account,
          password: this.form.password,
        })
        .then((res) => {
          if (res.code === 200) {
            this.qishouinfo = res.data;
            this.$u.vuex("vuex_qishou", this.qishouinfo);
            if (this.qishouinfo.status === 1 || this.qishouinfo.status === 4) {
              uni.navigateTo({
                url: "/pages/my/userinfo/userinfo",
              });
            } else {
              uni.navigateTo({
                url: "/pages/my/userlook/userlook",
              });
            }
          }
        });
    },
    // qishoulogin
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
};
</script>

<style>
.fontcolors {
  color: #4782f6;
}
.btnsstyle {
  margin: 0 auto;
  width: 60%;
}
</style>
