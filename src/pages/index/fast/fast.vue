<template>
  <view>
    <view class="center-contiun fixed axis-center bg-white">
      <view class="mt55 pl30 pb15">
        <view class="fs20 fw600">请填写抢修单</view>
        <view class="color-shallow fs14">提交成功后，商家会尽快处理</view>
      </view>
      <view class="pt15 pl30 pr30">
        <view class="fs14">联系人</view>
        <view class="mt10"
          ><u-input
            placeholder="请输入联系人姓名"
            :custom-style="custal"
            v-model="name"
            type="text"
        /></view>
      </view>
      <view class="pt15 pl30 pr30">
        <view class="fs14">电话</view>
        <view class="mt10"
          ><u-input
            placeholder="请输入联系电话"
            :custom-style="custal"
            v-model="name"
            type="text"
        /></view>
      </view>
      <view class="pt15 pl30 pr30">
        <view class="fs14">地址</view>
        <view class="mt10"
          ><u-input
            placeholder="输入地址"
            :custom-style="custal"
            v-model="name"
            type="text"
        /></view>
      </view>
      <view class="pt30 pl30 pr30">
        <u-button type="primary" @click="go">提交</u-button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    name: "",
    custal: {
      backgroundColor: "#f8f8f8",
      "padding-left": "30rpx",
    },
  }),
  computed: {},
  methods: {
    go() {},
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
.center-contiun {
  width: 90%;
  height: 90vh;
  border-radius: 20rpx;
}
page {
  background: #f8f8f8;
}
</style>
