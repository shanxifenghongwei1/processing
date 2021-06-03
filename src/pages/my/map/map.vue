<template>
  <view>
    <view>
      <map
        id="mymap"
        style="width: 100%; height: 300px;"
        :latitude="latitude"
        :longitude="longitude"
        :markers="markers"
      ></map>
    </view>
    <view>
      <view class="bg-white pl15 pr15 pt15 ml15 mr15 pb15 br5">
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
      <view class="bg-white pl15 pr15 pt15 pb15 br5 mt10 ml15 mr15 fs13">
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
      <view class="bg-white pl15 pr15 pt15 pb15 br5 mt10 fs13 ml15 mr15">
        备注：<span>{{ detials.remarks }}</span>
      </view>
      <!-- 订单信息 -->
      <view class="bg-white pl15 pr15 pt15 pb15 br5 mt10 fs13 ml15 mr15">
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
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    order_id: 0,
    detials: {},
    userinfetial: {},
    id: 0, // 使用 marker点击事件 需要填写id
    title: "map",
    latitude: 37.73605,
    longitude: 112.56566,
    markers: [],
  }),
  computed: {},
  methods: {
    includePoints() {
      var that = this;
      that.mapCtx.includePoints({
        padding: [100, 20, 300, 20],
        points: [
          {
            latitude: 37.786092,
            longitude: 112.546314,
          },
          {
            latitude: 37.73605,
            longitude: 112.56566,
          },
        ],
      });
    },
    getdetials() {
      //
      this.$u.api.userService
        .meiqiorderdetial({
          order_id: this.order_id,
        })
        .then((res) => {
          if (res.code === "200") {
            this.detials = res.data;
            this.getqishoudetial();
          }
        });
    },
    getqishoudetial() {
      this.$u.api.newsService
        .qishoudetial({
          user_id: this.detials.horseman_id,
        })
        .then((res) => {
          if (res.code === 200) {
            this.userinfetial = res.data;
            this.markers = [
              {
                latitude: 37.786092,
                longitude: 112.546314,
                title: "1111",
                iconPath: this.userinfetial.img,
              },
              {
                latitude: 37.73605,
                longitude: 112.56566,
                title: "1111",
                iconPath: this.vuex_user.img,
              },
            ];
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
  onReady() {
    this.mapCtx = uni.createMapContext("mymap");
    this.includePoints();
  },
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
