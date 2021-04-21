<template>
  <view>
    <view @click="navito" class="fixed topleft fs20">
      <u-icon name="arrow-left" color="#FFF"></u-icon>
    </view>
    <image
      style="width:100%;"
      src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4283265346,1280694101&fm=11&gp=0.jpg"
      mode="widthFix"
    />
    <view class="p15 ">
      <view class="p15 bg-white br5">
        <view class="fs18 fw600">商品名字很长的</view>
        <view class="mt15 flex flex-between">
          <view class="fw600" style="color:#FF442A;"> <span>￥</span>1600</view>
          <view style="color:#FF7404" class="flex fw600">
            <u-icon name="star-fill" color="#FF7404"></u-icon> <view>4.5</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 商品详情 -->
    <view class="p15">
      <view class="p15 bg-white br5">
        <view class="fw600 pb10">商品详情</view>
        <view>下面的文字和图片</view>
      </view>
    </view>
    <!-- 下面的tabbar -->
    <view
      class="fixed left bottom flex flex-around pt10 pb10 pl15 pr15 width-full bg-white"
    >
      <view class="mr15">
        <image
          class="block"
          style="width:40rpx;height:40rpx;margin:0 auto;"
          src="/static/shop/jdgg.png"
          mode=""
        />
        <view class="fs14 color-shallow" @click="runpage">进店逛逛</view>
      </view>
      <view class="mr15">
        <image
          class="block"
          style="width:40rpx;height:40rpx;margin:0 auto;"
          src="/static/shop/lxkf.png"
          mode=""
        />
        <view class="fs14 color-shallow">联系客服</view></view
      >
      <view class="flex-1">
        <u-button shape="circle" type="primary" @click="runorder"
          >下单</u-button
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({}),
  computed: {},
  methods: {
    runpage() {
      uni.redirectTo({
        url: "/pages/index/homepage/homepage",
      });
    },
    navito() {
      uni.navigateBack();
    },
    runorder() {
      uni.navigateTo({
        url: "/pages/shop/order/order",
      });
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
.topleft {
  top: 70rpx;
  left: 30rpx;
}
</style>
