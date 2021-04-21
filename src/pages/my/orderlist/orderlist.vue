<template>
  <view>
    <u-tabs-swiper
      ref="tabs"
      :list="list"
      :current="current"
      :is-scroll="false"
      @change="change"
    ></u-tabs-swiper>

    <view class="mt15 p15 bg-white">
      <!-- 第一层 -->
      <view class="flex flex-between aligin-items-center">
        <view class="fs14 fw600 flex-1 nowrap"
          >店铺名称沙哈哈哈 <span class="iconfont icon-xiangyou"></span
        ></view>
        <view class="fs14">配送中</view>
      </view>
      <!-- 第二层 -->
      <view class="flex flex-between pt15 pb15">
        <image
          class="br10 block"
          style="width:160rpx;height:160rpx;"
          src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4283265346,1280694101&fm=11&gp=0.jpg"
          mode=""
        />
        <view class="pl15 flex flex-col flex-between flex-1">
          <view class="fs14 exceed-ellipsis2">商品名称两行而已</view>
          <view class="flex flex-between">
            <view class="fw600">￥600</view>
            <view>×1</view>
          </view>
        </view>
      </view>
      <!-- 第三层 -->
      <view class="text-right fs14">
        <span class="mr5">总价：138</span><span class="mr5">优惠：138</span
        ><span class="mr5">应付总额：138</span>
      </view>
      <!-- 第四层 -->
      <view class="pt15 flex flex-between">
        <view></view>
        <view class="flex">
          <u-button class="mr10" shape="circle" size="mini"
            >查看骑手距离</u-button
          >
          <u-button shape="circle" size="mini" type="primary"
            >取消订单</u-button
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
    list: [
      {
        name: "全部",
      },
      {
        name: "进行中",
      },
      {
        name: "已完成",
      },
      {
        name: "已取消",
      },
    ],
    current: 0,
  }),
  computed: {},
  methods: {
    change(e) {
      console.log("选中的下标", e);
      this.current = e;
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
