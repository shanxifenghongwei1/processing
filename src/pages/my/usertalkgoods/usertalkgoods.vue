<template>
  <view>
    <view class="pl15 pr15 pt15">
      <!-- 商家 -->
      <view class="bg-white pl15 pt15 pr15">
        <view class="flex align-items-center mb15">
          <image
            class="block br5 mr5"
            style="width:60rpx;height:60rpx;"
            :src="detials.shop_portal"
            mode=""
          />
          <view class="bowrap">{{ detials.shop_name }}</view>
        </view>
        <!-- 星星 -->
        <view class="flex flex-center mt15 mb15">
          <u-rate
            :count="5"
            v-model="value"
            :size="42"
            :gutter="15"
            active-color="#FC7C04"
          ></u-rate>
        </view>
        <view class="mb15 text-center" style="color:#FC7C04">{{ value }}</view>

        <view class="flex flex-center pb15">
          <u-input
            class="flex-1"
            v-model="text"
            type="textarea"
            :border="true"
            :height="height"
            :auto-height="autoHeight"
          />
        </view>
      </view>
    </view>
    <view class="mt15">
      <!-- 骑手 -->
      <view class="bg-white pl15 pt15 pr15">
        <view class="flex align-items-center mb15">
          <image
            class="block br5 mr5"
            style="width:60rpx;height:60rpx;"
            :src="userinfetial.img"
            mode=""
          />
          <view class="bowrap">{{ userinfetial.name }}</view>
        </view>
        <!-- 星星 -->
        <view class="flex flex-center mt15 mb15">
          <u-rate
            :count="5"
            v-model="value1"
            :size="42"
            :gutter="15"
            active-color="#FC7C04"
          ></u-rate>
        </view>
        <view class="mb15 text-center" style="color:#FC7C04">{{ value1 }}</view>

        <view class="flex flex-center pb15">
          <u-input
            class="flex-1"
            v-model="text1"
            type="textarea"
            :border="true"
            :height="height"
            :auto-height="autoHeight"
          />
        </view>
      </view>
    </view>
    <u-toast ref="uToast" />
    <!-- 下面的 -->
    <view style="height:100px;"></view>
    <view
      class="bgstyles text-center pt10 pb10 fixed bottom left right"
      @click="submits"
      >提交</view
    >
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    value: 5,
    value1: 5,
    text: "",
    text1: "",
    height: 300,
    autoHeight: true,
    detials: {},
    userinfetial: {},
  }),
  computed: {},
  methods: {
    getdetials() {
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
          }
        });
    },
    submits() {
      this.$u.api.userService
        .meiqidingdanpingjia({
          order_id: this.order_id,
          shop_id: this.detials.shop_id,
          shop_star: this.value,
          shop_content: this.text.length > 0 ? this.text : "五星好评",
          horseman_id: this.userinfetial.user_id,
          horseman_star: this.value1,
          horseman_content: this.text1.length > 0 ? this.text : "五星好评",
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
.bgstyles {
  background: #2979ff;
  color: #ffffff;
}
</style>
