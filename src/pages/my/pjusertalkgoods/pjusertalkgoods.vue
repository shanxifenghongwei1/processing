<template>
  <view>
    <view class="pl15 pt15 pr15">
      <view class="pt15 pr15 pl15 bg-white pb15 br5">
        <view class="flex">
          <image
            class="block"
            style="width:100rpx;height:100rpx;"
            :src="detials.goods_img"
            mode=""
          />
          <view class="flex-1 pl15">
            <view class="mowrap">{{ detials.goods_name }}</view>
            <view class="color-shallow pt10">规格</view>
          </view>
        </view>
      </view>
      <view class="mt10 pt15 pr15 pb10 pl15 bg-white pb15 br5">
        <view class="flex">
          <view>评分</view>
          <view class="pl15 pb10 ">
            <u-rate
              :count="5"
              v-model="value"
              :size="40"
              :gutter="15"
              active-color="#FC7C04"
            ></u-rate
          ></view>
        </view>
      </view>
      <view class="flex flex-center pb15 bg-white pl15 pr15">
        <u-input
          class="flex-1"
          v-model="text"
          type="textarea"
          :border="true"
          :height="height"
          :auto-height="autoHeight"
        />
      </view>

      <!-- 上传图片 -->
      <view class="bg-white pl15 pb15 pr15">
        <view v-if="imgurls.length > 0" class="flex flex-center">
          <view
            class="relative  mt15 mb15 mr15 ml15 "
            v-for="(item, index) in imgurls"
            :key="index"
          >
            <image
              class="block"
              style="width:120rpx;height:120rpx;"
              :src="item"
              mode=""
            />
            <view
              class="colo_close absolute top right"
              @click="closeimage(index)"
              >×</view
            >
          </view>
        </view>
        <view class="flex flex-between pt15 pr10 align-items-center">
          <view>
            <view class="flex flex-between">
              <view></view>
              <view v-if="imgurls.length <= 2" class="flex align-items-end">
                <view
                  @click="uploadimg"
                  class="box_660X1 line-color-shallow pl10 pr10 flex flex-col flex-center align-items-center"
                >
                  <image
                    class="block pt10"
                    style="width:50rpx;height:50rpx;"
                    src="/static/other/tjtp.png"
                    mode=""
                  />
                  <view class="fs12 color-shallow mt10 mb10">添加图片</view>
                </view>
                <view class="fs10 ml15 color-shallow">最多添加三张照片</view>
              </view>
            </view>
          </view>
          <view> </view>
        </view>
      </view>
    </view>
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
import $config from "config/config.js";
export default {
  components: {},
  data: () => ({
    value: 5,
    imgurls: [],
    order_id: 0,
    detials: {},
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
          }
        });
    },
    // 图片上传
    uploadimg() {
      uni.chooseImage({
        count: 3, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        success: (chooseImageRes) => {
          const tempFilePaths = chooseImageRes.tempFilePaths;
          console.log("shangchuan", tempFilePaths);
          uni.uploadFile({
            url: $config.service + "/upload",
            filePath: tempFilePaths[0],
            name: "img",
            formData: {
              user: "测试",
            },
            success: (uploadFileRes) => {
              let successname = JSON.parse(uploadFileRes.data);
              if (successname.code === 200) {
                this.imgurls = this.imgurls.concat(successname.data.path);
              }
            },
          });
        },
      });
    },
    // 删除图片
    closeimage(index) {
      this.imgurls.splice(index, 1);
    },
    submits() {
      this.$u.api.userService
        .pjpingjia({
          star: this.value,
          content: this.text.length > 0 ? this.text : "五星好评",
          order_id: this.order_id,
          imgs: this.imgurls[0],
          user_id: this.vuex_user.user_id,
        })
        .then((res) => {
          if (res.code === 200) {
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
.box_660X1 {
  border: 1rpx dashed;
}
.bgstyles {
  background: #2979ff;
  color: #ffffff;
}
.colo_close {
  color: #ff442a;
  width: 30rpx;
  height: 30rpx;
  text-align: center;
  line-height: 15rpx;
}
</style>
