<template>
  <view>
    <view>
      <u-tabs-swiper
        ref="tabs"
        :list="list"
        :is-scroll="false"
        :current="current"
        @change="whereuse"
      ></u-tabs-swiper>
    </view>
    <view class="pl15 pr15 pt15">
      <!-- 未使用 -->
      <view v-if="current === 0">
        <!-- 一个店铺 -->
        <view
          class="bg-white p15 mt15"
          v-for="(item, index) in commonlist"
          :key="index"
        >
          <view class="fw600">{{ item.shop.address }}</view>
          <!-- 一个优惠券 -->
          <view
            class="flex flex-between align-items-center mt10 pl10 pr10 pt15 pb15 colors-no br5"
          >
            <view
              ><span class="fs13">￥</span
              ><span class="fw600 fs18">{{ item.couprice }}</span></view
            >
            <view class="flex-1 pl10 pr10">
              <view class="fw600 fs15">满{{ item.couprice }}使用</view>
              <view class="fs12 pt5">有效期至{{ item.expire }}</view>
            </view>
            <view>
              <view
                class="fs12 b-a-1 border-corder-no gostyle"
                @click="usercoupon(item.shop.shop_id)"
                >去使用</view
              >
            </view>
          </view>
        </view>
        <u-divider v-if="total !== 0" bg-color="">{{ moreTip }}</u-divider>
        <view class="pt15" v-if="total === 0">
          <u-empty text="暂无数据" mode="list"></u-empty>
        </view>
      </view>
      <!-- 已使用 + 已过期-->
      <view v-if="current === 1 || current === 2">
        <!-- 一个店铺 -->
        <view
          class="bg-white mt15 p15"
          v-for="(item, index) in commonlist"
          :key="index"
        >
          <view class="fw600">{{ item.shop.address }}</view>
          <!-- 一个优惠券 -->
          <view
            class="flex flex-between align-items-center mt10 pl10 pr10 pt15 pb15 color-use br5"
          >
            <view
              ><span class="fs13">￥</span
              ><span class="fw600 fs18">{{ item.couprice }}</span></view
            >
            <view class="flex-1 pl10 pr10">
              <view class="fw600 fs15">满{{ item.couprice }}使用</view>
              <view class="fs12 pt5">有效期至{{ item.expire }}</view>
            </view>
            <view>
              <view class="fs12 b-a-1 border-corder-use text-use gostyle">{{
                current === 1 ? "去使用" : "已过期"
              }}</view>
            </view>
          </view>
        </view>
        <u-divider v-if="total !== 0" bg-color="">{{ moreTip }}</u-divider>
        <view class="pt15" v-if="total === 0">
          <u-empty text="暂无数据" mode="list"></u-empty>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    list: [
      {
        name: "未使用",
      },
      {
        name: "已使用",
      },
      {
        name: "已过期",
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
    usercoupon(id) {
      uni.navigateTo({
        url: `/pages/shop/pjhomepage/pjhomepage?shop_id=${id}`,
      });
    },
    whereuse(e) {
      this.current = e;
      this.init();
      this.getmycouponlist();
    },
    init() {
      this.commonlist = [];
      this.pages = 1;
      this.isPullUp = false;
      this.moreTip = "";
      this.total = 0;
    },
    getmycouponlist() {
      // myconponlist
      this.$u.api.userService
        .myconponlist({
          page: this.pages,
          user_id: this.vuex_user.user_id,
          coup_status: this.current + 1,
        })
        .then((res) => {
          if (res.code === "200") {
            this.commonlist = this.commonlist.concat(res.data.data);
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
    this.getmycouponlist();
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
      this.getmycouponlist();
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
.gostyle {
  padding: 5rpx 10rpx;
  border-radius: 50rpx;
}

.color-use {
  background: #f7f7f7;
  color: #383838;
}
.border-corder-use {
  border-color: #dddddd;
}
.text-use {
  color: #d0d0d0;
}

.colors-no {
  color: #ff151c;
  background: #fdf7f1;
}
.border-corder-no {
  border-color: #ff151c;
}
</style>
