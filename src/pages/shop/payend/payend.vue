<template>
  <view>
    <view class="text-center pt15 pb15 pl15 pr15 bg-white">
      <view
        style="color:#545850;"
        class="pt15 pb15 flex flex-center align-items-center"
      >
        <image
          class="br5"
          style="width:50rpx;height:50rpx;"
          src="/static/other/zfcg.png"
          mode=""
        />
        <view class="ml5 fs20 fw600">支付成功</view>
      </view>
      <view class="pt15 pb15">实付￥124.6</view>
      <view class="flex pt15 pb15 pl15 pr15 flex-around"
        ><view
          @click="runpage(1)"
          class="pl10 pr10 pt5 pb5 fs14 b-a-1 line-color-shallow br30"
          >返回首页</view
        >
        <view
          @click="runpage(2)"
          class="pl10 pr10 pt5 pb5 fs14 b-a-1 line-color-shallow br30"
          >查看详情</view
        ></view
      >
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({}),
  computed: {},
  methods: {
    runpage(e) {
      if (e === 1) {
        uni.reLaunch({
          url: "/pages/tab-bar/index",
        });
      }
    },
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
page {
  background: #f8f8f8;
}
</style>
