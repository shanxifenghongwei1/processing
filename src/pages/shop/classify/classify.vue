<template>
  <view>
    <view class="pl15 pr15 pt15">
      <u-search
        v-model="value"
        :show-action="true"
        action-text="搜索"
        :clearabled="false"
        :animation="false"
        :action-style="stylesa"
        @custom="searchs"
        @search="searchs"
      ></u-search>
    </view>

    <view class="pl15 pr15 pt15">
      <u-tabs
        :list="list"
        :is-scroll="false"
        :current="current"
        @change="change"
      ></u-tabs>

      <view class="pt15 pl15 pr15 flex" v-for="i in 10">
        <image
          class="block br5"
          style="width:180rpx;height:180rpx;"
          src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4283265346,1280694101&fm=11&gp=0.jpg"
          mode=""
        />
        <view class="pl15 flex-1 flex flex-col flex-between">
          <view class="exceed-ellipsis2"
            >商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称</view
          >
          <view class="flex flex-between">
            <view style="color:#FF442A;" class="fs18 fw600"
              ><span class="fw100 fs12">￥</span>300</view
            >
            <image
              class="block br5"
              style="width:40rpx;height:40rpx;"
              src="/static/shop/jiahao.png"
              mode=""
            />
          </view>
        </view>
      </view>
      <!-- 悬浮球 -->
      <view class="bgxf fs14" @click="gopage">
        <image
          class="block br5"
          style="width:150rpx;height:150rpx;"
          src="/static/shop/gouwuche.png"
          mode=""
        />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    value: "",
    stylesa: {
      backgroundColor: "#2979ff",
      height: "60rpx",
      "border-radius": "30rpx",
      "line-height": "60rpx",
      color: "#fff",
      "text-align": "center",
      width: "130rpx",
    },
    current: 0,
    list: [
      {
        name: "综合推荐",
      },
      {
        name: "销量",
      },
      {
        name: "价格",
      },
      {
        name: "分类",
      },
    ],
  }),
  computed: {},
  methods: {
    change(e) {
      this.current = e;
    },
    searchs() {
      this.$u.api.goodsService
        .search({ goods_name: this.value })
        .then((res) => {
          if (res.code === "200") {
            console.log("商品搜索成功：：", res.data);
            this.goodslist = res.data;
          }
        });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
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
.bgxf {
  /* background: #ff442a; */
  color: #fff;
  text-align: center;
  width: 100rpx;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 50rpx;
  position: fixed;
  right: 60rpx;
  bottom: 200rpx;
}
</style>
