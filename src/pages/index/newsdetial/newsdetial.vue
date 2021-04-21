<template>
  <view class="p15">
    <p class="fs20 fw600 mb10">{{ detial.title }}</p>
    <view class="color-shallow fs14">{{ detial.created_at }}</view>
    <view class="mt15 mb15">{{ detial.content }}</view>
    <image style="width:100%;" :src="detial.img" mode="widthFix" />
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    detial: {},
  }),
  computed: {},
  methods: {
    getdetial(id) {
      this.$u.api.newsService.notice({ notice_id: id }).then((res) => {
        if (res.code === "200") {
          this.detial = res.data;
        }
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.getdetial(options.notice_id);
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {
    // notice
  },
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

<style></style>
