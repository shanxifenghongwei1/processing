<template>
  <view>
    <view class="pl15 pr15 pt15">
      <u-toast ref="uToast" />
      <view class="pt15" v-if="list.length <= 0">
        <u-empty text="暂无数据" mode="list"></u-empty>
      </view>
      <!-- 一个列表 -->
      <view
        class="bg-white pl15 pr15 pt15 mt15 br5"
        v-for="(item, index) in list"
        :key="index"
      >
        <view class="flex align-items-center">
          <image
            class="block mr5 br5"
            style="width:60rpx;height:60rpx;"
            :src="item.shop_portal"
            mode=""
          />
          <view class="flex-1">
            <view class="nowrap">{{ item.shop_name }}</view>
            <view class="fs10 color-middle">{{ item.created_at }} 开户</view>
          </view>
        </view>
        <view class="flex align-items-center flex-between mt15 mb15">
          <view
            >押金 <span>￥{{ item.deposit }}</span></view
          >
          <view class="flex flex-row-reverse">
            <u-button
              shape="circle"
              hover-class="none"
              size="mini"
              @click="runmap(item.shop_id)"
              type="primary"
              >抢修</u-button
            >
            <u-button
              shape="circle"
              hover-class="none"
              class="mr10 ml10"
              size="mini"
              type="primary"
              @click="tuiping(item.shop_id)"
              >退瓶</u-button
            >
            <u-button
              shape="circle"
              size="mini"
              hover-class="none"
              @click="delets(item.vase_id)"
              >删除</u-button
            >
          </view>
        </view>
        <view class="pb15">
          <u-button
            shape="circle"
            size="default"
            type="primary"
            @click="giveago(item.goods_id)"
            :custom-style="customStyle"
            >再次购买</u-button
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    customStyle: {
      height: "60rpx", // 注意驼峰命名，并且值必须用引号包括，因为这是对象
      backgroundColor: "#2CC199",
      "font-size": "25rpx",
    },
    list: [],
  }),
  computed: {},
  methods: {
    giveago(id) {
      uni.navigateTo({
        url: `/pages/shop/goods/goods?goods_id=${id}`,
      });
    },
    runmap(id) {
      uni.navigateTo({
        url: `/pages/index/fast/fast?shop_id=${id}`,
      });
    },
    tuiping(id) {
      uni.navigateTo({
        url: `/pages/my/tuipingye/tuipingye?shop_id=${id}`,
      });
    },
    delets(id) {
      this.$u.api.goodsService
        .meiqishanchutuipin({ vase_id: id })
        .then((res) => {
          if (res.code === "200") {
            this.$refs.uToast.show({
              title: "操作成功",
            });
          }
        });
    },
    getlist() {
      // meiqituiping
      this.$u.api.goodsService
        .meiqituiping({ user_id: this.vuex_user.user_id })
        .then((res) => {
          if (res.code === "200") {
            this.list = res.data;
          }
        });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getlist();
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
.moneycolor {
  color: #ff4a31;
}
</style>
