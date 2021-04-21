<template>
  <view class="pl15 pr15">
    <view
      class="bg-white br5 pl15 pr15 pt20 pb20 flex flex-between align-items-center"
    >
      <view>
        <view class="color-shallow pb10 fs14"
          >倩倩 <span>1304241561311</span></view
        >
        <view>广东省 天河区 彩频路 6号</view>
      </view>
      <view>
        <view class="fw600 iconfont icon-xiangyou"></view>
      </view>
    </view>
    <!-- 店铺商品信息 -->
    <view class="bg-white br5 p15 mt10">
      <view class="pb10 b-b-1 line-color-shallow">店铺名字</view>
      <view class="flex flex-between">
        <view class="pt10">
          <image
            class="block br10"
            style="width:120rpx;height:120rpx;"
            src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4283265346,1280694101&fm=11&gp=0.jpg"
            mode=""
          />
        </view>
        <view class="pt10 ml10 pr10">
          <view class="exceed-ellipsis2"
            >商品名字商品名字商品名字商品名字商品名字商品名字商品名字商品名字商品名字商品名字</view
          >
          <view style="color:#FF442A;" class="fw600">￥1200</view>
        </view>
      </view>
    </view>
    <!-- 数量名称优惠券、 -->
    <view class="bg-white p15 br5 mt10">
      <view class="flex flex-between pb10 pr10 b-b-1 line-color-shallow">
        <view class="pt5">服务</view>
        <view class="flex flex-between">
          <view class="br5 fs14 p5 mr5 b-a-1 line-color-shallow activ">
            不加急</view
          >
          <view class="br5 fs14 p5 mr5 b-a-1 line-color-shallow">加急￥4</view>
        </view>
      </view>
      <view class="flex flex-between pt15 pr10 alitn-items-center">
        <view>优惠券</view>
        <view class="flex flex-between alitn-items-center">
          <view class="fs14">暂无可用</view>
          <view class="iconfont icon-xiangyou fs18"> </view>
        </view>
      </view>
    </view>
    <!-- 开户类型、 -->
    <view class="br5 bg-white p15 mt10">
      <view class="flex flex-between pb10 pr10 b-b-1 line-color-shallow">
        <view class="pt5">开户类型</view>
        <view class="flex flex-between">
          <view class="br5 fs14 p5 mr5 b-a-1 line-color-shallow activ">
            新开户</view
          >
          <view class="br5 fs14 p5 mr5 b-a-1 line-color-shallow">自有瓶</view>
        </view>
      </view>
      <view class="flex flex-between pt15 pr10 align-items-center">
        <view
          >押金
          <span class="color-shallow fs14 ml5"
            >需要缴纳钢瓶押金，退瓶时返还</span
          ></view
        >
        <view class="fs14 colors">￥50</view>
      </view>
      <view class="flex flex-between pt15 pr10 align-items-center">
        <view>上传图片 </view>
        <view>
          <view class="flex flex-between">
            <view></view>
            <view
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
          </view>

          <view class="fs14 mt10 color-shallow"
            >上传煤气瓶图片，需拍摄标准说明</view
          >
        </view>
      </view>
    </view>
    <!-- 备注 -->
    <view class="bg-white p15 mt10 br5">
      <view class="flex flex-between pt15 pr10 alitn-items-center">
        <view class="pr15">备注</view>
        <view class="flex-1">
          <u-input
            v-model="value"
            type="textarea"
            :border="true"
            :fixed="true"
            :auto-height="true"
          />
        </view>
      </view>
    </view>
    <view style="height:200rpx"></view>
    <!-- 下面的tabbar -->
    <view
      class="fixed left bottom flex alitn-items-center flex-between pt10 pb10 pl15 pr15 width-full bg-white"
    >
      <view class="mr15 fs14 flex line-height1">
        <view class="color-shallow fs12 mr5">共计1件商品</view>
        <view
          >应付 <span style="color:#FF442A;" class="fw600">￥152</span>
        </view>
      </view>

      <view style="width:40%;">
        <u-button shape="circle" type="primary" @click="runorder"
          >支付</u-button
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    value: "",
  }),
  computed: {},
  methods: {
    runorder() {
      uni.navigateTo({
        url: "/pages/shop/payend/payend",
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
page {
  background: #f8f8f8;
}

.activ {
  border-color: #2979ff;
  color: #2979ff;
}
.colors {
  color: #2979ff;
}
.box_660X1 {
  border: 1rpx dashed;
}
.line-height1 {
  line-height: 78rpx;
}
</style>
