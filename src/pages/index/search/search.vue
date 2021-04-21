<template>
  <view>
    <view class="pl15 pr15 pt15">
      <u-search
        v-model="value"
        :show-action="true"
        action-text="搜索"
        :clearabled="false"
        :animation="false"
        :action-style="stylesa"
        @custom="searchs"
        @search="searchs"
      ></u-search>
    </view>
    <view class="pl15 pr15 pt15 flex flex-between align-items-center">
      <view class="fw600 fs15">搜索记录</view>
      <view class="color-shallow"
        ><u-icon name="trash" size="40" @click="allclean"></u-icon
      ></view>
    </view>
    <view class="pt10 pl10">
      <view v-if="serachlist.length <= 0" class="fs15 pl10"
        >暂无搜索记录~~</view
      >
      <view class="flex flex-wrap " v-else>
        <view
          v-for="(item, index) in serachlist"
          :key="index"
          class="relative tags"
        >
          <view class="fs13">{{ item.text }}</view>
          <view class="absolute closes">
            <u-icon name="close" size="15" @click="cleanclost(index)"></u-icon>
          </view>
        </view>
      </view>
    </view>
    <view class="flex flex-wrap flex-between pl15 pr15 pt15">
      <view style="width:48%;" v-for="(item, index) in goodslist" :key="index">
        <goodsitems3 :item="item"></goodsitems3>
      </view>
    </view>
  </view>
</template>

<script>
import goodsitems3 from "components/goods/goodsitems-three";
export default {
  components: {
    goodsitems3,
  },
  data() {
    return {
      value: "",
      stylesa: {
        backgroundColor: "#2979ff",
        height: "60rpx",
        "border-radius": "30rpx",
        "line-height": "60rpx",
        color: "#fff",
        "text-align": "center",
        width: "130rpx",
      },
      serachlist: [],
      goodslist: [],
    };
  },
  computed: {},
  methods: {
    searchs() {
      console.log("开始搜索", this.value);
      // 去重
      if (this.serachlist.length < 1) {
        this.serachlist.push({ text: this.value });
        uni.setStorageSync("searchs", this.serachlist);
      } else {
        for (let i = 0; i++; i < this.serachlist.length) {
          if (this.serachlist[i].text != this.value) {
            this.serachlist.push({ text: this.value });
            uni.setStorageSync("searchs", this.serachlist);
          }
        }
      }

      this.$u.api.goodsService
        .search({ goods_name: this.value })
        .then((res) => {
          if (res.code === "200") {
            console.log("商品搜索成功：：", res.data);
            this.goodslist = res.data;
          }
        });
    },
    cleanclost(index) {
      this.serachlist.splice(index, 1);
      uni.setStorageSync("searchs", this.serachlist);
    },
    allclean() {
      this.serachlist = [];
      uni.setStorageSync("searchs", this.serachlist);
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    uni.getStorage({
      key: "searchs",
      success: (res) => {
        console.log("res.data", res.data);
        this.serachlist = res.data;
      },
    });
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

<style scoped lang="scss">
.put {
  padding-left: 90rpx;
  border-radius: 100rpx;
  height: 60rpx;
}
.tags {
  padding: 15rpx 30rpx;
  margin: 15rpx;
  border-radius: 100rpx;
  background: #f2f2f2;
}
.closes {
  top: -10rpx;
  right: -10rpx;
  background: #949494;
  border-radius: 100rpx;
  padding: 8rpx;
  color: #fff;
}
</style>
