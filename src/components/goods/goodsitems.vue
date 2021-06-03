<template>
  <view class="mt15 mb15 bg-white">
    <view class="flex pt10 pb10 pl10 border-box width-full">
      <view class="images mr10">
        <image
          style="width:140rpx;height:140rpx;border-radius:15rpx;"
          :src="item.shop_portal"
          mode=""
        />
      </view>
      <view class="flex flex-col flex-center border-box flex-1">
        <view class="fw600 fs16">{{ item.shop_name }}</view>
        <view class="flex flex-between pr10 width-full fs14">
          <view class="nowrap flex-1 ">{{ item.address }}</view>
          <view class="">| {{ item.distance }}km</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {};
  },
  methods: {
    // runpage() {
    //   uni.navigateTo({
    //     url: "/pages/index/homepage/homepage",
    //   });
    // },
  },
};
</script>
