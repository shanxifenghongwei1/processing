<template>
  <view class="mb15" @click="runpage">
    <image
      style="width:100%;"
      class="block"
      :src="item.goods_img"
      mode="widthFix"
    />
    <view class="exceed-ellipsis2">{{ item.goods_name }}</view>
    <view style="color:#FF442A;" class="fs18 fw600"
      ><span class="fw100 fs12">￥</span>{{ item.goods_retail }}</view
    >
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    item: Object,
  },
  methods: {
    runpage() {
      uni.navigateTo({
        url: "/pages/shop/goods/goods",
      });
    },
  },
};
</script>
