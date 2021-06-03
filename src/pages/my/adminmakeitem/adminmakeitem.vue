<template>
  <view>
    <view class="pl15 pt15 pr15 flex flex-between">
      <view style="width:60%">
        <u-tabs
          :list="list"
          :is-scroll="false"
          :current="current"
          @change="change"
        ></u-tabs>
      </view>

      <view></view>
    </view>
    <view
      class="ml15 pl15 pr15 pt15 mt15 mr15 b-b-1 pb15 line-color-shallow"
      v-for="(item, index) in commonlist"
      :key="index"
    >
      <view>
        <view class="flex align-items-center">
          <image
            class="block"
            style="width:80rpx;height:80rpx;border-radius:40rpx;"
            :src="item.img"
            mode=""
          />
          <view class="pl15">{{ item.name }}</view>
        </view>
        <view class="flex mt10 flex-between align-items-center p15 bgitems">
          <view>
            <view>普通订单</view>
            <view>{{ item.created_at }}</view>
          </view>
          <view class="fs20 fw600">+{{ item.royalty }}</view>
        </view>
      </view>
    </view>

    <u-divider v-if="total !== 0" bg-color="">{{ moreTip }}</u-divider>
    <view class="pt15" v-if="total === 0">
      <u-empty text="暂无数据" mode="list"></u-empty>
    </view>
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
        name: "今天",
      },
      {
        name: "月",
      },
      {
        name: "年",
      },
    ],
    commonlist: [],
    current: 0,
    pages: 1,
    isPullUp: false,
    moreTip: "",
    total: 0,
  }),
  computed: {},
  methods: {
    change(e) {
      this.current = e;
      this.init();
      this.getallcommon();
    },
    init() {
      this.commonlist = [];
      this.pages = 1;
      this.isPullUp = false;
      this.moreTip = "";
      this.total = 0;
    },
    getallcommon(id) {
      this.$u.api.newsService
        .qishouticheng({
          condition: this.current,
          page: this.pages,
          user_id: this.vuex_qishou.user_id,
        })
        .then((res) => {
          if (res.code === 200) {
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
  onLoad(options) {
    this.current = options.run_id;
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
.bgitems {
  background: #f5f7f8;
}
</style>
