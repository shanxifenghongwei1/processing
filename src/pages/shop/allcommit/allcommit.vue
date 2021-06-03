<template>
  <view class="pl15 pr15">
    <talkitem
      v-for="(item, index) in commonlist"
      :key="index"
      :item="item"
    ></talkitem>

    <u-divider v-if="total !== 0" bg-color="">{{ moreTip }}</u-divider>
  </view>
</template>

<script>
import talkitem from "components/talk/talkoneitem";
export default {
  components: {
    talkitem,
  },
  data: () => ({
    goods_id: 0,
    commonlist: [],
    pages: 1,
    isPullUp: false,
    moreTip: "",
    total: 0,
  }),
  computed: {},
  methods: {
    getallcommon(id) {
      this.$u.api.goodsService
        .allcommit({
          page: this.pages,
          goods_id: this.goods_id,
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
  onLoad(options) {
    this.goods_id = options.goods_id;
    this.getallcommon(options.goods_id);
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

<style></style>
