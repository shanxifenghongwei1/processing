<template>
  <view>
    <messageitem v-for="i in 3" :key="i"></messageitem>
  </view>
</template>

<script>
import messageitem from "components/message/messageitem";
export default {
  components: {
    messageitem,
  },
  data() {
    return {
      sasas: 1,
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style></style>
