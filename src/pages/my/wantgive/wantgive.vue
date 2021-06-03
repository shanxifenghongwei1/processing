<template>
  <view class="wantgive">
    <view class="pl15 pt15 pr15">
      <view class="p15 bg-white br5">
        <!-- songqiruzhu.png -->
        <view class="flex flex-center align-items-center" @click="runpage(1)">
          <image
            class="block mr15"
            style="width:160rpx;height:160rpx;"
            src="/static/my/songqiruzhu.png"
            mode=""
          />
          <view class="pl15">
            <view class="fw600">送气站入驻</view>
            <view class="color-middle mt10 fs13">Gas station entering</view>
          </view>
        </view>
      </view>
      <!-- ........ -->
      <view class="p15 bg-white mt10 br5">
        <view class="flex flex-center align-items-center" @click="runpage(2)">
          <image
            class="block mr15"
            style="width:160rpx;height:160rpx;"
            src="/static/my/pjruzhu.png"
            mode=""
          />
          <view class="pl15">
            <view class="fw600">配件商入驻</view>
            <view class="color-middle mt10 fs13">Settlement of access </view>
            <view class="color-middle mt5 fs13">ories suppliers</view>
          </view>
        </view>
      </view>
      <!-- ...... -->
      <view class="p15 bg-white mt10 br5">
        <view class="flex flex-center align-items-center" @click="runpage(3)">
          <image
            class="block mr15"
            style="width:160rpx;height:160rpx;"
            src="/static/my/gdruzhu.png"
            mode=""
          />
          <view class="pl15">
            <view class="fw600">管道工程入驻</view>
            <view class="color-middle mt10 fs13">Pipeline engineerin</view>
            <view class="color-middle mt5 fs13">g settled</view>
          </view>
        </view>
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
    runpage(e) {
      if (e === 1) {
        uni.navigateTo({
          url: "/pages/my/songqiruzhu/songqiruzhu",
        });
      } else if (e === 2) {
        uni.navigateTo({
          url: "/pages/my/peijianruzhu/peijianruzhu",
        });
      } else if (e === 3) {
        uni.navigateTo({
          url: "/pages/my/guandaoruzhu/guandaoruzhu",
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
