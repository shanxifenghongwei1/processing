<template>
  <view>
    <view
      class="ml15 mr15 mt15 pl15 pt15 pr15 bg-white"
      v-for="(item, index) in list"
      :key="index"
    >
      <view class="flex flex-between">
        <view>{{ item.name }}</view>
        <view>{{ item.tel }}</view>
      </view>
      <view class="mt10 pb10 b-b-1 line-color-shallow">{{
        item.address + " " + item.detaaddress
      }}</view>
      <view class="flex flex-between pb15 pt15">
        <view class="flex">
          <image
            v-if="item.is_default === 1"
            style="width:40rpx;height:40rpx;"
            class="block"
            src="/static/shop/xuanzhong.png"
            mode=""
            @click="changs(item.address_id)"
          />
          <image
            v-else
            style="width:40rpx;height:40rpx;"
            class="block"
            src="/static/shop/meixuanzhong.png"
            mode=""
            @click="changs(item.address_id)"
          />

          <span class="pl5">默认地址</span>
        </view>
        <view class="flex">
          <view class="pr15" @click="deleteaddress(item.address_id)">删除</view>
          <view @click="updateaddress(item.address_id)">编辑</view>
        </view>
      </view>
    </view>
    <view class="fixed left bottom pl15 pr15 pb15 width-full bg-white">
      <u-button hover-class="none" type="primary" @click="runpage(2)"
        >新增地址</u-button
      >
    </view>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    list: [],
  }),
  computed: {},
  methods: {
    changs(id) {
      this.$u.api.userService
        .defaults({ user_id: this.vuex_user.user_id, address_id: id })
        .then((res) => {
          console.log("成功了", res);
          if (res.code === "200") {
            if (res.code === "200") {
              this.$refs.uToast.show({
                title: "修改成功",
                type: "primary",
              });
              this.getaddress();
            }
          }
        });
    },
    runpage(e) {
      if (e === 2) {
        uni.navigateTo({
          url: `/pages/my/addaddress/addaddress?id=0`,
        });
      }
    },
    updateaddress(id) {
      uni.navigateTo({
        url: `/pages/my/addaddress/addaddress?id=${id}`,
      });
    },
    deleteaddress(id) {
      this.$u.api.userService.deleaddress({ address_id: id }).then((res) => {
        console.log("成功了", res);
        if (res.code === "200") {
          if (res.code === "200") {
            this.$refs.uToast.show({
              title: "删除成功",
              type: "primary",
            });
            this.getaddress();
          }
        }
      });
    },
    getaddress() {
      this.$u.api.userService
        .address({ user_id: this.vuex_user.user_id })
        .then((res) => {
          console.log("成功了", res);
          if (res.code === "200") {
            this.list = res.data;
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
  onShow() {
    this.getaddress();
  },
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
