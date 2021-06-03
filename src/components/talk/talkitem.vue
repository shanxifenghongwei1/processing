<template>
  <view>
    <view class="pt10 mt10">
      <view class="flex flex-between  fs14">
        <view class="flex flex-1 align-items-center">
          <image
            style="width:100rpx;height:100rpx;border-radius:50rpx;dixplay:bolck;"
            :src="item.user_img"
            mode=""
          />
          <view class="pl15">
            <view class="pl5">{{ item.user_name }}</view>
            <view
              ><u-rate
                active-color="#FC941C"
                size="25"
                :count="item.star"
                v-model="item.star"
              ></u-rate
            ></view>
          </view>
        </view>
        <view class="fs14 color-shallow">{{ item.addtime }}</view>
      </view>
      <view class="pt10">{{ item.content }}</view>
      <view class="flex">
        <view
          style="width:33%;"
          class="flex felx-center"
          v-for="(atim, index) in imgs"
          :key="index"
        >
          <image
            style="width:180rpx;height:180rpx;dixplay:bolck;"
            :src="item.user_img"
            mode=""
          />
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      // 星星数量
      value: 4,
    };
  },
  props: {
    item: Object,
  },
};
</script>
