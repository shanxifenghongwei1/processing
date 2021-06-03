<template>
  <view>
    <!-- <view class="fs14" v-if="item.order_status === 1">待发货</view>
        <view
          class="fs14"
          v-if="item.order_status === 5 || item.order_status === 6"
          >待收货</view
        >
        <view class="fs14" v-if="item.order_status === 8">待评价</view>
        <view class="fs14" v-if="item.order_status === 9">已完成</view> -->
    <view class="pl15 pr15 pt15 pb15 onecolor" v-if="detials.order_status === 1"
      >请耐心等待发货</view
    >
    <view
      class="pl15 pr15 pt15 pb15 onecolor"
      v-if="detials.order_status === 5 || detials.order_status === 6"
      >快递已发出请耐心等待快递</view
    >
    <view class="pl15 pr15 pt15 pb15 onecolor" v-if="detials.order_status === 8"
      >请对商品进行评价</view
    >
    <view class="pt15">
      <view class="bg-white pl15 pr15 pt15 pb15 br5 flex">
        <view class="mr15 flex align-items-center">
          <image
            class="block pr5"
            style="width:25rpx;height:35rpx;"
            src="/static/other/dizh.png"
            mode=""
          />
        </view>
        <view class="fs13 flex-1">
          <view
            >{{ detials.name }} <span class="pl15">{{ detials.tel }}</span>
          </view>
          <view class="fs14 pt10">{{
            detials.address + detials.address_detail
          }}</view>
        </view>
      </view>
      <!-- 店铺信息 -->
      <view class="bg-white pl15 pt15 pr15 br5 mt10 fs13">
        <!-- 商品 -->
        <view class="flex pb15">
          <image
            class="block mr5 br5"
            style="width:160rpx;height:160rpx;"
            :src="detials.goods_img"
            mode=""
          />
          <view class="flex-1 flex flex-col flex-between">
            <view class="exceed-ellipsis2">{{ detials.goods_name }}</view>
            <view class="flex flex-between align-items-center">
              <view class="color-shallow">规格</view>
            </view>
            <view class="flex flex-between align-items-center">
              <view class="">￥{{ detials.order_Unit }}</view>
              <view>×{{ detials.order_num }}</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 付钱 -->
      <view class="bg-white pl15 pr15 pt15 pb15 br5 mt10 fs13">
        <!-- <view class="flex flex-between">
          <view>应付总额</view>
          <view class="moneycolor fw600">￥100</view>
        </view> -->
        <view class="flex flex-between">
          <view>商品总价</view>
          <view class="">￥{{ item.order_total }}</view>
        </view>
        <!-- <view class="flex flex-between">
          <view>优惠</view>
          <view class="">- ￥100</view>
        </view> -->
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
    <!-- ..... -->
    <view
      v-if="detials.order_status === 5 || detials.order_status === 6"
      class="fixed bottom left pt10 pb10 bg-white width-full pl15 pr15 flex flex-row-reverse fs13"
    >
      <u-button shape="circle" size="medium" type="primary" @click="myshouhuole"
        >确认收货</u-button
      >
      <u-button class="mr10" shape="circle" size="medium" @click="lookju"
        >查看物流</u-button
      >
    </view>
    <view
      v-if="item.order_status === 8 || item.order_status === 9"
      class="fixed bottom left pt10 pb10 bg-white width-full pl15 pr15 flex flex-row-reverse fs13"
    >
      <u-button shape="circle" size="medium" type="primary" @click="gopingjia"
        >评价</u-button
      >
    </view>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    detials: {},
    order_id: 0,
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
    gopingjia() {
      uni.navigateTo({
        url: `/pages/my/pjusertalkgoods/pjusertalkgoods?order_id=${this.order_id}`,
      });
    },
    getdetials() {
      this.$u.api.userService
        .pjorderdetial({
          order_id: this.order_id,
        })
        .then((res) => {
          if (res.code === "200") {
            this.detials = res.data;
          }
        });
    },
    myshouhuole() {
      this.$u.api.userService
        .pjquerenshouhuo({
          order_id: detials.order_id,
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
