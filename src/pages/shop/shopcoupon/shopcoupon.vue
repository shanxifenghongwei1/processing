<template>
  <view>
    <view class="pl15 pr15 pt15">
      <!-- 一个店铺 -->
      <view class="bg-white p15">
        <!-- 一个优惠券 -->
        <view
          v-for="(item, index) in couponslist"
          :key="index"
          class="flex flex-between align-items-center mt10 pl10 pr10 pt15 pb15 colors-no br5"
        >
          <view
            ><span class="fs13">￥</span
            ><span class="fw600 fs18">{{ item.couprice }}</span></view
          >
          <view class="flex-1 pl10 pr10">
            <view class="fw600 fs15">满{{ item.satisfyprice }}使用</view>
            <view class="fs12 pt5">有效期至{{ item.expire }}</view>
          </view>
          <view>
            <view
              class="fs12 b-a-1 border-corder-no gostyle"
              @click="useconpon(item)"
              >去使用</view
            >
          </view>
        </view>
      </view>
    </view>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    couponslist: [],
    shop_id: 0,
  }),
  computed: {},
  methods: {
    // 用户优惠券
    usercoupons(shop_id) {
      this.$u.api.userService
        .userhave({
          shop_id: shop_id,
        })
        .then((res) => {
          if (res.code === "200") {
            this.couponslist = res.data;
          }
        });
    },
    useconpon(item) {
      uni.setStorageSync("usecouponid", item);
      this.$refs.uToast.show({
        title: "使用成功",
        back: true,
        // 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
        // type: 'success',
        // 如果不需要图标，请设置为false
        // icon: false
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.shop_id = options.shop_id;
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.usercoupons(this.shop_id);
  },
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
.colors-no {
  color: #ff151c;
  background: #fdf7f1;
}
.border-corder-no {
  border-color: #ff151c;
}
page {
  background: #f8f8f8;
}
.gostyle {
  padding: 5rpx 10rpx;
  border-radius: 50rpx;
}
</style>
