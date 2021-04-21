<template>
  <view>
    <view v-if="pagezt === 0">
      <view class="pb65 pt15 bg-main1 relative">
        <view
          class="absolute axis-x-center br10 bg-white flex flex-between sons"
        >
          <view class="pl15 pr15  flex-1  flex flex-col flex-between">
            <view class="fw600 pt15 nowrap"
              >店铺店铺名称店铺名称店铺名称店铺名称名称</view
            >
            <view class="flex-1 pt10 pb10 flex flex-between">
              <view class="flex">
                <u-icon class="mr5" name="star-fill" color="#FF7404"></u-icon> |
                <span class="fw600 ml5" style="color:#FF7404"> 4.5</span>
                <span class="ml5">192评价</span>
              </view>
              <view class="flex">
                <u-icon class="" name="map" color="#2CBC94"></u-icon>
                <span>1.5km</span>
              </view>
            </view>
            <span class="mb15 exceed-ellipsis2 lh2"
              >地址地址很长啊地址很长啊地址很长啊地址很长啊地址很长啊地址很长啊很长啊</span
            >
          </view>
          <view class="pr15 flex flex-center pt15">
            <image
              class="br5"
              style="width:140rpx;height:140rpx;"
              src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4283265346,1280694101&fm=11&gp=0.jpg"
              mode=""
            />
          </view>
        </view>
      </view>
      <view class="pb65 pt15"></view>
      <!-- 优惠券 -->
      <view class="pl15 pr15 pt15">
        <view class="fw600">优惠</view>
        <scroll-view
          class="pt15 flex flex-nowrap"
          style="white-space: nowrap"
          scroll-x="true"
        >
          <view
            v-for="i in 10"
            :key="i"
            style="display: inline-block;"
            class="mr15 bgcounp fs14"
          >
            <view class="flex flex-between text-heig color-white fs12">
              <view class="flex-1 pl3">
                <span>￥</span> <span class="fs18 fw600">100</span> 满900可用
              </view>
              <view class="pr5">领取</view>
            </view>
          </view>
        </scroll-view>
      </view>
      <!-- 热门商品 -->
      <view class="pl15 pr15 pt15">
        <view class="fw600 pt15 pb15">热门商品</view>
        <view class="flex flex-wrap flex-between">
          <goodsitems3 style="width:48%;" v-for="i in 5"></goodsitems3>
        </view>
      </view>
      <!-- 悬浮球 -->
      <view class="bgxf fs14" @click="gopage">抢修</view>
    </view>
    <!-- 商家信息表现形式 -->
    <view v-if="pagezt === 2">
      <view class="pb65 pt15 bg-main1 relative">
        <view
          class="absolute axis-x-center br10 bg-white flex flex-between sons"
        >
          <view class="pl15 pr15 flex-1  flex flex-col flex-between">
            <view class="fw600 pt15 nowrap">店铺店铺名称店</view>
            <view class="pt10 pb15 flex flex-between">
              <view class="flex">
                <u-icon class="mr5" name="star-fill" color="#FF7404"></u-icon>
                <span class="fw600" style="color:#FF7404"> 4.5</span>
                <span class="ml5">| 192评价</span>
              </view>
              <view class="flex">
                <u-icon class="" name="map" color="#2CBC94"></u-icon>
                <span>1.5km</span>
              </view>
            </view>
          </view>
          <view class="pr15 pb15 flex flex-center pt15">
            <image
              class="br5"
              style="width:140rpx;height:140rpx;"
              src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4283265346,1280694101&fm=11&gp=0.jpg"
              mode=""
            />
          </view>
        </view>
      </view>
      <view class="pb65"> </view>
      <!-- 商家介绍 -->
      <view class="pl15 pr15 flex pb15">
        <view class="pr15">
          <image
            style="width:32rpx;height:32rpx;"
            src="/static/other/dpjj.png"
            mode=""
          />
        </view>
        <view class="flex-1">
          <view class="fw600 pb8">商家介绍</view>
          <view
            >商家介绍商家介绍商家介绍商家介绍商家介绍商家介绍商家介绍商家介绍商家介绍商家介绍</view
          >
        </view>
      </view>
      <view class="pt10 bg-main"></view>
      <!-- 地址 -->
      <view class="pl15 pt15 pr15 flex pb15">
        <view class="pr15">
          <image
            style="width:32rpx;height:32rpx;"
            src="/static/other/dizh.png"
            mode=""
          />
        </view>
        <view class="flex-1">
          <view class="pb8">这是一个地址啊啊啊</view>
          <view class="flex flex-between">
            <view class="fs14">距离我3km</view>
            <view
              @click="chooslocal"
              class="fs14 flex flex-center align-items-center"
            >
              <view style="color:#2BC098">查看地图</view>
              <image
                class="ml5"
                style="width:32rpx;height:32rpx;"
                src="/static/other/xiangyou.png"
                mode=""
              />
            </view>
          </view>
        </view>
      </view>

      <view class="pt10 bg-main"></view>
      <!-- 店铺评价 -->
      <view class="pl15 pt15 pr15 flex pb15">
        <view class="pr15">
          <image
            style="width:32rpx;height:32rpx;"
            src="/static/other/dpjj.png"
            mode=""
          />
        </view>
        <view class="flex-1">
          <view class="flex flex-between">
            <view class="fw600 pb8">店铺评价</view>
            <view class="color-shallow" @click="runpage"
              >查看全部<span class="iconfont icon-xiangyou"></span>
            </view>
          </view>
          <view>
            <talkitem></talkitem>
          </view>
        </view>
      </view>
    </view>
    <!-- 下面的tabbar -->
    <u-tabbar
      v-model="current"
      active-color="#4782F6"
      @change="select"
      :list="list"
    ></u-tabbar>
  </view>
</template>

<script>
import talkitem from "components/talk/talkitem";
import goodsitems3 from "components/goods/goodsitems-three";
export default {
  components: {
    talkitem,
    goodsitems3,
  },
  data: () => ({
    list: [
      {
        iconPath: "/static/shop/tabbar/indexno.png",
        selectedIconPath: "/static/shop/tabbar/index.png",
        text: "店铺首页",
        count: 0,
        isDot: true,
        customIcon: false,
      },
      {
        iconPath: "/static/my/list/lx.png",
        selectedIconPath: "/static/my/list/lx.png",
        text: "联系客服",
        customIcon: false,
      },
      {
        iconPath: "/static/shop/tabbar/myno.png",
        selectedIconPath: "/static/shop/tabbar/my.png",
        text: "商家信息",
        count: 0,
        isDot: false,
        customIcon: false,
      },
    ],
    current: 0,
    pagezt: 0,
  }),
  computed: {},
  methods: {
    select(e) {
      console.log("选中的下标？", e);
      this.pagezt = e;
    },
    runpage() {
      uni.navigateTo({
        url: "/pages/index/alltalk/alltalk",
      });
    },
    gopage() {
      uni.navigateTo({
        url: "/pages/index/fast/fast",
      });
    },
    chooslocal() {
      uni.openLocation({
        latitude: 37.73605,
        longitude: 112.56566,
        name: "电偶名字",
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
.sons {
  /* margin: 15px auto; */
  /* height: 150px; */
  box-shadow: 0 5rpx 10rpx #929292;
  width: 90%;
}
.bgcounp {
  background: url("/static/other/coupon.png") no-repeat center;
  background-size: cover;
  width: 300rpx;
  height: 72rpx;
}
.text-heig {
  line-height: 70rpx;
}
.bgxf {
  background: #ff442a;
  color: #fff;
  text-align: center;
  width: 100rpx;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 50rpx;
  position: fixed;
  right: 40rpx;
  bottom: 200rpx;
}
</style>
