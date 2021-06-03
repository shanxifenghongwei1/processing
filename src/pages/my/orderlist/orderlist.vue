<template>
  <view>
    <u-tabs-swiper
      ref="tabs"
      :list="list"
      :current="current"
      :is-scroll="false"
      @change="change"
    ></u-tabs-swiper>
    <!-- 全部 -->
    <!-- <view v-if="current === 0"> -->
    <view
      class="mt15 p15 bg-white"
      v-for="(item, index) in commonlist"
      :key="index"
    >
      <!-- 第一层 -->
      <view
        class="flex flex-between aligin-items-center"
        @click="rundetial(item.order_id)"
      >
        <view class="fs14 fw600 flex-1 nowrap"
          >{{ item.shop_name }} <span class="iconfont icon-xiangyou"></span
        ></view>
        <view v-if="item.order_status === 4" class="fs14 rightcolor"
          >配送中</view
        >
        <view v-if="item.order_status === 5" class="fs14 rightcolor"
          >配送中</view
        >
        <view v-if="item.order_status === 7" class="fs14 rightcolor"
          >已取消</view
        >
        <view v-if="item.order_status === 6" class="fs14 rightcolor"
          >已完成</view
        >
        <view v-if="item.order_status === 1" class="fs14 rightcolor"
          >待接单</view
        >
        <view v-if="item.order_status === 2" class="fs14 rightcolor"
          >待送货</view
        >
      </view>
      <!-- 第二层 -->
      <view class="flex flex-between pt15 pb15">
        <image
          class="br10 block"
          style="width:160rpx;height:160rpx;"
          :src="item.goods_img"
          mode=""
        />
        <view class="pl15 flex flex-col flex-between flex-1">
          <view class="fs14 exceed-ellipsis2">{{ item.shop_name }}</view>
          <view class="flex flex-between">
            <view class="fw600">￥{{ item.order_Unit }}</view>
            <view>×{{ item.order_num }}</view>
          </view>
        </view>
      </view>
      <!-- 第三层 -->
      <view class="text-right fs14">
        <span class="mr5">总价：{{ item.total }}</span
        ><span class="mr5">优惠：{{ item.order_coumm }}</span
        ><span class="mr5"
          >应付总额：<span class="money-color">￥{{ item.pay_price }}</span>
        </span>
      </view>
      <!-- 第四层 -->
      <view class="pt15 flex flex-between">
        <view></view>
        <!-- 配送中 -->
        <view v-if="item.order_status === 4" class="flex">
          <u-button
            class="mr10"
            shape="circle"
            size="mini"
            @click="runmap(item.order_id)"
            >查看骑手距离</u-button
          >
          <u-button
            shape="circle"
            size="mini"
            type="primary"
            @click="quxiaodingdan(item.order_id)"
            >取消订单</u-button
          >
        </view>
        <!-- 配送中 -->
        <view v-if="item.order_status === 5" class="flex">
          <u-button class="mr10" shape="circle" size="mini" @click="runmap"
            >查看骑手距离</u-button
          >
          <u-button
            shape="circle"
            size="mini"
            type="primary"
            @click="quxiaodingdan(item.order_id)"
            >取消订单</u-button
          >
        </view>
        <!-- 已取消 -->
        <view v-if="item.order_status === 7" class="flex">
          <u-button
            shape="circle"
            size="mini"
            type="primary"
            @click="alignpay(item.goods_id)"
            >再次下单</u-button
          >
        </view>
        <!-- 已完成 -->
        <view v-if="item.order_status === 6" class="flex">
          <u-button
            shape="circle"
            size="mini"
            class="pr10"
            type="primary"
            @click="runusercomm(item.order_id)"
            >评价</u-button
          >
          <u-button
            shape="circle"
            size="mini"
            type="primary"
            @click="alignpay(item.goods_id)"
            >再次下单</u-button
          >
        </view>
        <!-- 待发货 -->
        <view v-if="item.order_status === 2" class="flex">
          <u-button
            shape="circle"
            size="mini"
            type="primary"
            @click="alignpay(item.goods_id)"
            >再次下单</u-button
          >
        </view>
      </view>
    </view>
    <u-toast ref="uToast" />
    <u-divider v-if="total !== 0" bg-color="">{{ moreTip }}</u-divider>
    <view class="pt15" v-if="total === 0">
      <u-empty text="暂无数据" mode="list"></u-empty>
    </view>
    <!-- </view> -->
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
    commonlist: [],
    pages: 1,
    isPullUp: false,
    moreTip: "",
    total: 0,
  }),
  computed: {},
  methods: {
    change(e) {
      console.log("选中的下标", e);

      this.current = e;
      this.init();
      this.getallcommon();
    },
    rundetial(id) {
      uni.navigateTo({
        url: `/pages/my/orderdetail/orderdetail?order_id=${id}`,
      });
    },
    // pages/shop/goods/goods
    runmap(id) {
      uni.navigateTo({
        url: `/pages/my/map/map?order_id=${id}`,
      });
    },
    runusercomm(id) {
      uni.navigateTo({
        url: `/pages/my/usertalkgoods/usertalkgoods?order_id=${id}`,
      });
    },
    alignpay(id) {
      uni.navigateTo({
        url: `/pages/shop/goods/goods?goods_id=${id}`,
      });
    },
    init() {
      this.commonlist = [];
      this.pages = 1;
      this.isPullUp = false;
      this.moreTip = "";
      this.total = 0;
    },
    // meiqiquxiaodingdan
    getallcommon() {
      this.$u.api.userService
        .meiqiorderlist({
          page: this.pages,
          user_id: this.vuex_user.user_id,
          condition: this.list[this.current].name,
        })
        .then((res) => {
          if (res.code === "200") {
            this.commonlist = this.commonlist.concat(res.data.orderInfo);
            this.total = res.data.count;
            if (res.data.count > this.commonlist.length) {
              this.isPullUp = true;
            } else {
              this.isPullUp = false;
              this.moreTip = "我也是有底线的";
            }
          }
        });
    },
    quxiaodingdan(id) {
      this.$u.api.userService
        .meiqiquxiaodingdan({
          order_id: id,
        })
        .then((res) => {
          if (res.code === "200") {
            this.$refs.uToast.show({
              title: "操作成功",
              callback: () => {
                this.init();
                this.getallcommon();
              },
            });
          }
        });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.current = options.current;
    this.getallcommon();
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
  onReachBottom() {
    if (this.isPullUp) {
      this.pages++;
      this.getallcommon();
    } else {
      this.isPullUp = false;
      this.moreTip = "我也是有底线的";
    }
  },
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
.money-color {
  color: #ff4a31;
}
.rightcolor {
  color: #2cc199;
}
</style>
