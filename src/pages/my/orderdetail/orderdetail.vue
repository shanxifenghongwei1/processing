<template>
  <view>
    <view v-if="detials.order_status === 5" class="pl15 pr15 pt15 pb15 onecolor"
      >骑手已接单，正在接近配送地点</view
    >
    <view v-if="detials.order_status === 6" class="pl15 pr15 pt15 pb15 onecolor"
      >完成订单，请评价商家和骑手</view
    >
    <view v-if="detials.order_status === 2" class="pl15 pr15 pt15 pb15 onecolor"
      >商家接单中</view
    >
    <view v-if="detials.order_status === 1" class="pl15 pr15 pt15 pb15 onecolor"
      >商家已接单 正在派单给骑手</view
    >

    <view class="pl15 pr15 pt15">
      <view class="bg-white pl15 pr15 pt15 pb15 br5">
        <!-- <view class="fs13 flex flex-between">
          <view>预计送达时间： <span class="timecolor">15:45</span> </view>
          <view class="timecolor flex align-items-center">
            <image
              class="block pr5"
              style="width:25rpx;height:25rpx;"
              src="/static/my/order/shizhong.png"
              mode=""
            />
            <view>倒计时 10:00</view>
          </view>
        </view> -->
        <view class="pt15">
          <view class="fs13 color-middle flex">
            <view>{{ detials.name }}</view>
            <view class="ml15">{{ detials.tel }}</view>
          </view>
          <view class="fs14 pt10">{{
            detials.address + detials.address_detail
          }}</view>
        </view>
      </view>
      <!-- 店铺信息 -->
      <view class="bg-white pl15 pr15 pt15 pb15 br5 mt10 fs13">
        <view class="flex align-items-center">
          <view>{{ detials.shop_name }}</view>
          <u-icon name="arrow-right" size="25"></u-icon>
        </view>
        <!-- 商品 -->
        <view class="flex pt15 pb15">
          <image
            class="block mr5 br5"
            style="width:120rpx;height:120rpx;"
            :src="detials.goods_img"
            mode=""
          />
          <view class="flex-1 flex flex-col flex-between">
            <view class="exceed-ellipsis2">{{ detials.goods_name }}</view>
            <view class="flex flex-between align-items-center">
              <view class="moneycolor">￥{{ detials.order_Unit }}</view>
              <view>×{{ detials.order_num }}</view>
            </view>
          </view>
        </view>
        <view class="text-right fs14">
          <span class="mr5">总价：{{ detials.total }}</span
          ><span class="mr5">优惠：{{ detials.order_coumm }}</span
          ><span class="mr5"
            >应付总额：<span class="moneycolorr"
              >￥{{ detials.pay_price }}</span
            >
          </span>
        </view>
      </view>
      <!-- 备注 -->
      <view class="bg-white pl15 pr15 pt15 pb15 br5 mt10 fs13">
        备注：<span>{{ detials.remarks }}</span>
      </view>
      <!-- 订单信息 -->
      <view class="bg-white pl15 pr15 pt15 pb15 br5 mt10 fs13">
        <view>订单信息 </view>
        <view class="mt10 flex flex-between">
          <view>订单编号：</view>
          <view>{{ detials.order_no }}</view>
        </view>
        <view class="mt10 flex flex-between">
          <view>下单时间：</view>
          <view>{{ detials.created_at }}</view>
        </view>
        <view class="mt10 flex flex-between">
          <view>接单时间：</view>
          <view>{{ detials.receive_time }}</view>
        </view>
      </view>

      <view style="height:100rpx"></view>
    </view>
    <u-toast ref="uToast" />
    <!-- 111 -->
    <view
      v-if="detials.order_status === 5"
      class="fixed bottom left pt10 pb10 bg-white width-full pl15 pr15 flex flex-row-reverse fs13"
    >
      <u-button shape="circle" size="medium" type="primary">签收</u-button>
      <u-button class="mr10" shape="circle" size="medium" @click="lookju"
        >查看骑手距离</u-button
      >
    </view>
    <!-- ... -->
    <view
      v-if="detials.order_status === 6"
      class="fixed bottom left pt10 pb10 bg-white width-full pl15 pr15 flex flex-row-reverse fs13"
    >
      <u-button shape="circle" size="medium" type="primary" @click="runusercomm"
        >评价</u-button
      >
      <u-button class="mr10" shape="circle" size="medium" @click="alignpay"
        >再次购买</u-button
      >
    </view>
    <!-- ... -->
    <view
      v-if="detials.order_status === 2"
      class="fixed bottom left pt10 pb10 bg-white width-full pl15 pr15 flex flex-row-reverse fs13"
    >
      <u-button
        class="mr10"
        shape="circle"
        size="medium"
        @click="meiqiquxiaodingdan"
        >取消订单</u-button
      >
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    order_id: 0,
    detials: {},
  }),
  computed: {},
  methods: {
    lookju() {
      uni.getLocation({
        type: "gcj02", //返回可以用于uni.openLocation的经纬度
        success: function(res) {
          const latitude = res.latitude;
          const longitude = res.longitude;
          uni.openLocation({
            latitude: latitude,
            longitude: longitude,
            success: function() {
              console.log("success");
            },
          });
        },
      });
    },
    alignpay() {
      uni.navigateTo({
        url: `/pages/shop/goods/goods?goods_id=${this.detials.goods_id}`,
      });
    },
    getdetials() {
      this.$u.api.userService
        .meiqiorderdetial({
          order_id: this.order_id,
        })
        .then((res) => {
          if (res.code === "200") {
            this.detials = res.data;
          }
        });
    },
    quxiaodingdan() {
      this.$u.api.userService
        .meiqiquxiaodingdan({
          order_id: this.order_id,
        })
        .then((res) => {
          if (res.code === "200") {
            this.$refs.uToast.show({
              title: "操作成功",
              callback: () => {
                uni.navigateBack();
              },
            });
          }
        });
    },
    runusercomm() {
      uni.navigateTo({
        url: `/pages/my/usertalkgoods/usertalkgoods?order_id=${this.order_id}`,
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.order_id = options.order_id;
    this.getdetials();
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

.onecolor {
  background: #6482f6;
  color: #ffffff;
}
.timecolor {
  color: #ff8d1a;
}
.moneycolor {
  color: #ff4a31;
}
</style>
