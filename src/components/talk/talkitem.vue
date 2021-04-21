<template>
  <view>
    <view class="pt10">
      <view class="flex flex-between align-items-center fs14">
        <view class="flex flex-1 align-items-center">
          <image
            style="width:100rpx;height:100rpx;border-radius:50rpx;dixplay:bolck;"
            src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4283265346,1280694101&fm=11&gp=0.jpg"
            mode=""
          />
          <view class="pl15">
            <view class="pl5">评论名字</view>
            <view
              ><u-rate
                active-color="#FC941C"
                size="25"
                :count="value"
                v-model="value"
              ></u-rate
            ></view>
          </view>
        </view>
        <view>2020-1-10</view>
      </view>
      <view class="pt10"
        >评论文字评论文字评论文字评论文字评论文字评论文字评论文字</view
      >
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
};
</script>
