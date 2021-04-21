<template>
  <view class="mt15 mb15 bg-white" @click="runpage">
    <view class="flex pt10 pb10 pl10 border-box width-full">
      <view class="images mr10">
        <image
          style="width:140rpx;height:140rpx;"
          src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4283265346,1280694101&fm=11&gp=0.jpg"
          mode=""
        />
      </view>
      <view class="flex flex-col flex-between border-box flex-1">
        <view class="fw600 fs16">商家名称</view>
        <view class="flex flex-between pr10 width-full">
          <view class="flex fs14">
            <u-icon name="star-fill" color="#FF7404"></u-icon>
            <span class="fw600 mr5" style="color:#FF7404"> 4.5</span> |
            <view class="ml5">192评价</view>
          </view>
          <view
            class="p2 fs11"
            style="background:#FFEFE2;color:#FE720C;line-height:40rpx"
            >上次买过</view
          >
        </view>
        <view class="flex flex-between pr10 width-full fs14">
          <view class="nowrap flex-1 ">广州啥啥啥啥阿萨德ad啊按时</view>
          <view class="">| 3.1km</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    runpage() {
      uni.navigateTo({
        url: "/pages/index/homepage/homepage",
      });
    },
  },
};
</script>
