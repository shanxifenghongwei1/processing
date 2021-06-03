<template>
  <view>
    <view class="pl15 pr15 pt15">
      <view class="pl15 pr15 pt15 pb15 bg-white br10">
        <view class="flex align-items-center">
          <image
            class="br5 block"
            style="width:120rpx;height:120rpx;"
            src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4283265346,1280694101&fm=11&gp=0.jpg"
            mode=""
          />
          <view class="pl15">
            <view>已完成</view>
            <view class="pt10 color-shallow ">圆通快递 161651613132121321</view>
          </view>
        </view>
      </view>
      <view class="pl15 pr15 pt15 bg-white mt10 br10">
        <u-steps :list="numList" :current="1" direction="column"> </u-steps>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    numList: [
      {
        name: "下单 2010-10-10",
      },
      {
        name: "出库",
      },
      {
        name: "运输",
      },
      {
        name: "签收",
      },
    ],
  }),
  computed: {},
  methods: {},
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
