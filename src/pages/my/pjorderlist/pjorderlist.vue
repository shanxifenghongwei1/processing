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
      class="mt15 p15 bg-white "
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
        <view class="fs14" v-if="item.order_status === 1">待发货</view>
        <view
          class="fs14"
          v-if="item.order_status === 5 || item.order_status === 6"
          >待收货</view
        >
        <view class="fs14" v-if="item.order_status === 8">待评价</view>
        <view class="fs14" v-if="item.order_status === 9">已完成</view>
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
          <view class="fs14 exceed-ellipsis2">{{ item.goods_name }}</view>
          <view class="flex flex-between">
            <view class="fw600">￥{{ item.order_Unit }}</view>
            <view>×{{ item.order_num }}</view>
          </view>
        </view>
      </view>
      <!-- 第三层 -->
      <view class="text-right fs14">
        <span class="mr5">总价：{{ item.order_total }}</span>
        <!-- <span class="mr5">优惠：{{ item.order_coumm }}</span
        ><span class="mr5">应付总额：{{ item.pay_price }}</span> -->
      </view>
      <!-- 第四层 -->
      <view
        class="pt15 flex flex-between"
        v-if="item.order_status === 5 || item.order_status === 6"
      >
        <view></view>
        <view class="flex">
          <u-button class="mr10" shape="circle" size="mini" @click="lookwuliu"
            >查看物流</u-button
          >
          <u-button
            shape="circle"
            size="mini"
            type="primary"
            @click="myshouhuole(item.order_id)"
            >确认收货</u-button
          >
        </view>
      </view>
      <view
        class="pt15 flex flex-between"
        v-if="item.order_status === 8 || item.order_status === 9"
      >
        <view></view>
        <view class="flex">
          <u-button
            shape="circle"
            size="mini"
            type="primary"
            @click="gopingjia(item.order_id)"
            >评价</u-button
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
        name: "待发货",
      },
      {
        name: "待收货",
      },
      {
        name: "待评价",
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
    myshouhuole(id) {
      this.$u.api.userService
        .pjquerenshouhuo({
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
    rundetial(id) {
      uni.navigateTo({
        url: `/pages/my/pjorderdetail/pjorderdetail?order_id=${id}`,
      });
    },
    lookwuliu() {
      uni.navigateTo({
        url: "/pages/my/wuliu/wuliu",
      });
    },
    gopingjia(id) {
      uni.navigateTo({
        url: `/pages/my/pjusertalkgoods/pjusertalkgoods?order_id=${id}`,
      });
    },
    init() {
      this.commonlist = [];
      this.pages = 1;
      this.isPullUp = false;
      this.moreTip = "";
      this.total = 0;
    },
    getallcommon() {
      this.$u.api.userService
        .pjorderlist({
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
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
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
</style>
