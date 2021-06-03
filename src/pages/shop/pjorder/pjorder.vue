<template>
  <view class=" ">
    <view
      v-if="address.length > 0"
      @click="goaddress"
      class="bg-white br5 pl15 pr15 pt20 pb20 flex flex-between align-items-center"
    >
      <view>
        <view class="color-shallow pb10 fs14"
          >{{ address[0].name }} <span>{{ address[0].tel }}</span></view
        >
        <view>{{ address[0].address + address[0].detaaddress }}</view>
      </view>
      <view>
        <view class="fw600 iconfont icon-xiangyou"></view>
      </view>
    </view>
    <view
      class="bg-white br5 pl15 pr15 pt20 pb20 flex align-items-center"
      v-else
    >
      <u-button
        class="width-full"
        type="primary"
        shape="circle"
        @click="goaddress"
        >添加收货地址</u-button
      >
    </view>
    <!-- 店铺商品信息 -->
    <view class="bg-white br5 p15 mt10">
      <view class="pb10 b-b-1 line-color-shallow">{{
        shopdetial.shop_name
      }}</view>
      <view class="flex flex-between">
        <view class="pt10">
          <image
            class="block br10"
            style="width:160rpx;height:160rpx;"
            :src="goodsdetial.goods_img"
            mode=""
          />
        </view>
        <view class="pt10 ml10 pr10 flex-1 flex flex-col flex-between">
          <view class="exceed-ellipsis2">{{ goodsdetial.goods_name }}</view>
          <view class="fs14 color-middle">规格</view>
          <view style="color:#FF442A;" class="fw600"
            >￥{{ goodsdetial.goods_retail }}</view
          >
        </view>
      </view>
    </view>
    <!-- 数量名称优惠券、 -->
    <view class="bg-white p15 br5 mt10">
      <view
        class="flex flex-between align-items-center pb10 pr10 b-b-1 line-color-shallow"
      >
        <view class="pt5">数量</view>
        <view class="pt5">
          <u-number-box v-model="numvalue"></u-number-box>
        </view>
      </view>

      <view
        class="flex flex-between pt15 pb10 pr10 alitn-items-center b-b-1 line-color-shallow"
        @click="runcoupons"
      >
        <view>优惠券</view>
        <view class="flex flex-between alitn-items-center">
          <view v-if="!canuseronupon" class="fs14">暂无可用</view>
          <view class="iconfont icon-xiangyou fs18"> </view>
        </view>
      </view>
      <!-- 备注 -->
      <view class="bg-white mt10 br5">
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
    </view>

    <view style="height:200rpx"></view>
    <!-- 下面的tabbar -->
    <view
      class="fixed left bottom flex alitn-items-center flex-between pt10 pb10 pl15 pr15 width-full bg-white"
    >
      <view class="mr15 fs14 flex line-height1">
        <view class="color-shallow fs12 mr5">共计1件商品</view>
        <view
          >应付
          <span style="color:#FF442A;" class="fw600"
            >￥{{ userpaymoney() }}</span
          >
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
    numvalue: 1,
    address: [],
    goods_id: 0,
    order_id: 0,
    goodsdetial: {},
    shopdetial: {},
    couponslist: [],
    canuseronupon: true,
    couponsxuanzhong: uni.getStorageSync("usecouponid"),
  }),
  computed: {},
  methods: {
    runcoupons() {
      if (this.canuseronupon) {
        uni.navigateTo({
          url: `/pages/shop/shopcoupon/shopcoupon?shop_id=${this.shopdetial.shop_id}`,
        });
      }
    },
    runorder() {
      // pgpay
      // uni.navigateTo({
      //   url: "/pages/shop/payend/payend",
      // });
      this.$u.api.newsService
        .pgpay({
          goods_id: this.goods_id,
          coup_id: this.couponsxuanzhong.coup_id || 0,
          order_num: this.numvalue,
          user_id: this.vuex_user.user_id,
          shop_id: this.shopdetial.shop_id,
          address_id: this.address[0].address_id,
          remarks: this.value,
        })
        .then((res) => {
          if (res.code === "200") {
            // this.detial = res.data;
            this.order_id = res.data;
            this.baforepay();
          }
        });
    },
    // 支付
    baforepay(order_id) {
      this.$u.api.goodsService
        .baforepay({ order_id: this.order_id, user_id: this.vuex_user.user_id })
        .then((res) => {
          if (res.code === "200") {
            uni.requestPayment({
              provider: "wxpay",
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: res.data.signType,
              paySign: res.data.paySign,
              success: (dds) => {
                uni.navigateTo({
                  url: `/pages/shop/payend/payend?money=${this.userpaymoney()}`,
                });
              },
              fail: (err) => {
                console.log("fail:" + JSON.stringify(err));
                uni.showToast({
                  title: "支付失败",
                  duration: 2000,
                  icon: "none",
                });
              },
            });
          }
        });
    },
    // 获取默认地址
    getdeteaddress() {
      this.$u.api.userService
        .morenaddress({
          user_id: this.vuex_user.user_id,
        })
        .then((res) => {
          if (res.code === "200") {
            this.address = res.data;
          }
        });
    },
    // 跳转我的收货地址
    goaddress() {
      uni.navigateTo({
        url: "/pages/my/address/address",
      });
    },
    // 获取商品
    getgoodsdetial(goods_id) {
      this.$u.api.goodsService
        .goodsdetails({ goods_id: goods_id })
        .then((res) => {
          if (res.code === "200") {
            this.goodsdetial = res.data;
            this.getshopdetail();
          }
        });
    },
    //获取店铺
    getshopdetail() {
      this.$u.api.newsService
        .pjshopdetial({
          shop_id: this.goodsdetial.shop_id,
        })
        .then((res) => {
          if (res.code === "200") {
            this.shopdetial = res.data;
            this.usercoupons();
          }
        });
    },
    // 用户优惠券
    usercoupons() {
      this.$u.api.userService
        .userhave({
          shop_id: this.shopdetial.shop_id,
        })
        .then((res) => {
          if (res.code === "200") {
            this.couponslist = res.data;
            this.canuseronupon = res.data.length <= 0 ? false : true;
          }
        });
    },
    // 算总账
    userpaymoney() {
      // 优惠券

      let usescoupon = 0;
      let goodsmoney = 0;
      if (this.numvalue < this.goodsdetial.goods_quantity) {
        goodsmoney = this.goodsdetial.goods_retail;
        if (this.canuseronupon && this.couponsxuanzhong.coupon_id) {
          if (
            Number(goodsmoney) * this.numvalue >=
            Number(this.couponsxuanzhong.satisfyprice)
          ) {
            usescoupon = usescoupon - Number(this.couponsxuanzhong.couprice);
          }
        } else {
          usescoupon = 0;
        }
      } else {
        // goods_quantity
        goodsmoney = this.goodsdetial.goods_trade;
        if (this.canuseronupon && this.couponsxuanzhong.coupon_id) {
          if (
            Number(goodsmoney) * this.numvalue >=
            Number(this.couponsxuanzhong.satisfyprice)
          ) {
            usescoupon = usescoupon - Number(this.couponsxuanzhong.couprice);
          }
        } else {
          usescoupon = 0;
        }
      }
      return goodsmoney * this.numvalue + usescoupon;
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.goods_id = options.goods_id;
    this.getgoodsdetial(options.goods_id);

    // this.vuex_user.user_id
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.getdeteaddress();
    this.couponsxuanzhong = uni.getStorageSync("usecouponid");
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
