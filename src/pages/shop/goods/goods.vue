<template>
  <view>
    <view @click="navito" class="fixed topleft fs20">
      <u-icon name="arrow-left" color="#FFF"></u-icon>
    </view>
    <image style="width:100%;" :src="detial.goods_img" mode="widthFix" />
    <view class="p15 ">
      <view class="p15 bg-white br5">
        <view class="fs18 fw600">{{ detial.goods_name }}</view>
        <view class="mt15 flex flex-between">
          <view class="fw600" style="color:#FF442A;">
            <span>￥</span>{{ detial.goods_retail }}</view
          >
          <view style="color:#FF7404" class="flex fw600">
            <u-icon name="star-fill" color="#FF7404"></u-icon>
            <view>{{ detial.goods_score }}</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 商品详情 -->
    <view class="p15">
      <view class="p15 bg-white br5">
        <view class="fw600 pb10">商品详情</view>
        <view class=" pr15">
          <image
            style="width-full"
            :src="detial.goods_describe"
            mode="widthFix"
          />
        </view>
      </view>
    </view>
    <!-- 下面的tabbar -->
    <view style="height:200rpx"></view>
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
  data: () => ({
    goods_id: 0,
    detial: {},
  }),
  computed: {},
  methods: {
    runpage() {
      uni.redirectTo({
        url: `/pages/index/homepage/homepage?shop_id=${this.detial.shop_id}`,
      });
    },
    navito() {
      uni.navigateBack();
    },
    runorder() {
      uni.navigateTo({
        url: `/pages/shop/order/order?goods_id=${this.detial.goods_id}`,
      });
    },
    getgoodsdetial(goods_id) {
      this.$u.api.goodsService
        .goodsdetails({ goods_id: goods_id })
        .then((res) => {
          if (res.code === "200") {
            console.log("商品搜索成功：：", res.data);
            this.detial = res.data;
          }
        });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    // goods_id
    this.goods_id = options.goods_id;
    this.getgoodsdetial(options.goods_id);
  },
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
