<template>
  <view class="fs13">
    <u-toast ref="uToast" />
    <view v-if="detials.order_status === 2" class="pl15 pr15 pt15 pb15 onecolor"
      >待结单
    </view>
    <view v-else class="pl15 pr15 pt15 pb15 onecolor">派送中 </view>
    <view class="pl15 pr15 pt15">
      <view class="pb10">客户信息</view>
      <view class="bg-white pl15 pr15 pt15 pb15 br5">
        <view class="">
          <view class="fs13 color-middle flex">
            <view>{{ detials.name }}</view>
            <view class="ml15">{{ detials.tel }}</view>
          </view>
          <view class="fs14 pt10">{{ detials.address_detail }}</view>
        </view>
        <view class="fs13 pt10">
          备注：<span>{{ detials.remarks }}</span>
        </view>
      </view>
      <!-- 店铺信息 -->
      <view class="bg-white pl15 pr15 pt15 mt10 fs13 b-b-1 line-color-shallow">
        <view class="flex align-items-center">
          <view>{{ detials.shop.shop_name }}</view>
          <!-- <u-icon name="arrow-right" size="25"></u-icon> -->
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
            <view class="exceed-ellipsis2">{{ detials.goods.goods_name }}</view>
            <view class="flex flex-between align-items-center">
              <view class="moneycolor">￥{{ detials.order_total }}</view>
              <view>×{{ detials.order_num }}</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 订单信息 -->
      <view class="bg-white pl15 pr15 pb15 pt10 fs13">
        <view class="fw600">订单信息 </view>
        <view class="mt10 flex flex-between">
          <view>订单编号：</view>
          <view>{{ detials.order_no }}</view>
        </view>
        <view class="mt10 flex flex-between">
          <view>下单时间：</view>
          <view>{{ detials.created_at }}</view>
        </view>
      </view>

      <view style="height:100rpx"></view>
    </view>
    <view
      class="fixed bottom left pt10 pb10 bg-white width-full pl15 pr15 flex flex-row-reverse fs13"
    >
      <u-button
        v-if="detials.order_status === 2"
        shape="circle"
        size="medium"
        type="primary"
        @click="qishoujiedan"
        >接单</u-button
      >
      <u-button
        v-if="detials.order_status === 5"
        shape="circle"
        size="medium"
        type="primary"
        @click="qishoudaoda(8)"
        >到达</u-button
      >
      <u-button
        v-if="detials.order_status === 8"
        shape="circle"
        size="medium"
        type="primary"
        @click="qishoudaoda(10)"
        >发起安检</u-button
      >
      <u-button
        v-if="detials.order_status === 10"
        @click="qishoudaoda(9)"
        shape="circle"
        size="medium"
        type="primary"
        >完成</u-button
      >
      <u-button class="mr10" shape="circle" size="medium" @click="lookju"
        >拨打电话</u-button
      >
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    detials: {},
    order_no: 0,
  }),
  computed: {},
  methods: {
    lookju() {
      uni.makePhoneCall({
        phoneNumber: this.detials.tel,
      });
      // uni.getLocation({
      //   type: "gcj02", //返回可以用于uni.openLocation的经纬度
      //   success: function(res) {
      //     const latitude = res.latitude;
      //     const longitude = res.longitude;
      //     uni.openLocation({
      //       latitude: latitude,
      //       longitude: longitude,
      //       success: function() {
      //         console.log("success");
      //       },
      //     });
      //   },
      // });
    },
    // 到达
    qishoudaoda(status) {
      this.$u.api.newsService
        .qishouzhuangtai({
          order_status: status,
          order_no: this.order_no,
        })
        .then((res) => {
          if (res.code === 200) {
            this.$refs.uToast.show({
              title: "操作成功",
              callback: () => {
                this.getdetials();
              },
            });
          }
        });
    },
    qishoujiedan() {
      this.$u.api.newsService
        .qishoujiedan({
          user_id: this.vuex_qishou.user_id,
          order_no: this.order_no,
        })
        .then((res) => {
          if (res.code === 200) {
            this.$refs.uToast.show({
              title: "操作成功",
              callback: () => {
                this.getdetials();
              },
            });
          }
        });
    },
    getdetials() {
      this.$u.api.newsService
        .qishoudorder({
          order_no: this.order_no,
        })
        .then((res) => {
          if (res.code === 200) {
            this.detials = res.data;
          }
        });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.order_no = options.order_no;
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
