<template>
  <view class="pl15 pr15">
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
      <view class="flex">
        <view class="pt10">
          <image
            class="block br10"
            style="width:120rpx;height:120rpx;"
            :src="goodsdetial.goods_img"
            mode=""
          />
        </view>
        <view class="pt10 ml10 pr10">
          <view class="exceed-ellipsis2">{{ goodsdetial.goods_name }}</view>
          <view style="color:#FF442A;" class="fw600"
            >￥{{ goodsdetial.goods_retail }}</view
          >
        </view>
      </view>
    </view>

    <!-- 数量名称优惠券、 -->
    <view class="bg-white p15 br5 mt10">
      <!-- 数量 -->
      <view
        class="pb10 pr10 b-b-1 line-color-shallow flex flex-between align-items-center"
      >
        <view class="color-middle">购买数量</view>
        <u-number-box v-model="goodsnums"></u-number-box>
      </view>
      <view class="flex flex-between pb10 pt10 pr10 b-b-1 line-color-shallow">
        <view class="pt5">服务</view>
        <view class="flex flex-between">
          <view
            class="br5 fs14 p5 mr5 b-a-1 line-color-shallow"
            :class="gorunsid === item.runid ? 'activ' : ''"
            @click="changegorun(item.runid)"
            v-for="(item, index) in gorun"
            :key="index"
          >
            {{ item.text }}</view
          >
        </view>
      </view>
      <view
        class="flex flex-between pt15 pr10 alitn-items-center"
        @click="runcoupons"
      >
        <view>优惠券</view>
        <view class="flex flex-between alitn-items-center">
          <view class="fs14" v-if="!canuseronupon">暂无可用</view>
          <view class="iconfont icon-xiangyou fs18"> </view>
        </view>
      </view>
    </view>
    <!-- 开户类型、 -->
    <!-- <view class="br5 bg-white p15 mt10">
      <view class="flex flex-between pb10 pr10 b-b-1 line-color-shallow">
        <view class="pt5">开户类型</view>
        <view class="flex flex-between">
          <view
            @click="changehavepingid(item.id)"
            class="br5 fs14 p5 mr5 b-a-1 line-color-shallow "
            :class="havepingid === item.id ? 'activ' : ''"
            v-for="(item, index) in haveping"
            :key="index"
          >
            {{ item.text }}</view
          >
        </view>
      </view>
      <view
        v-if="havepingid === 1"
        class="flex flex-between pt15 pr10 align-items-center"
      >
        <view
          >押金
          <span class="color-shallow fs14 ml5"
            >需要缴纳钢瓶押金，退瓶时返还</span
          ></view
        >
        <view class="fs14 colors">￥{{ shopdetial.deposit }}</view>
      </view>
      <view v-else class="flex flex-between pt15 pr10 align-items-center">
        <view>上传图片 </view>
        <view>
          <view class="flex flex-between">
            <view></view>
            <view
              @click="uploadimg"
              v-if="imgurls.length <= 0"
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
            <view v-else class="relative">
              <image
                class="block br10"
                style="width:120rpx;height:120rpx;"
                :src="imgurls"
                mode=""
              />
              <view class="colo_close absolute top right" @click="closeimage"
                >×</view
              >
            </view>
          </view>

          <view class="fs14 mt10 color-shallow"
            >上传煤气瓶图片，需拍摄标准说明</view
          >
        </view>
      </view>
    </view> -->
    <!-- 备注 -->
    <view class="bg-white p15 mt10 br5">
      <view class="flex flex-between pt15 pr10 alitn-items-center">
        <view class="pr15">备注</view>
        <view class="flex-1">
          <u-input
            v-model="remarks"
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
import $config from "config/config.js";
export default {
  components: {},
  data: () => ({
    goods_id: 0,
    goodsdetial: {},
    shopdetial: {},
    address: [],
    gorun: [],
    couponslist: [],
    goodsnums: 1,
    userlocal: uni.getStorageSync("userlocal"),
    imgurls: "",
    gorunsid: 2,
    remarks: "",
    couponsxuanzhong: uni.getStorageSync("usecouponid"),
    canuseronupon: true,
    haveping: [
      { text: "新开户", id: 1 },
      { text: "自有瓶", id: 2 },
    ],
    havepingid: 2,
    // 订单
    urgent: 2,
    order_id: 0,
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
    //加急，非加急
    changegorun(id) {
      this.gorunsid = id;
      this.urgent = id;
    },
    // 新开户，自有瓶
    changehavepingid(id) {
      this.havepingid = id;
    },
    // 删除图片
    closeimage() {
      this.imgurls = [];
    },
    // 图片上传
    uploadimg() {
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        success: (chooseImageRes) => {
          const tempFilePaths = chooseImageRes.tempFilePaths;
          console.log("shangchuan", tempFilePaths);
          uni.uploadFile({
            url: $config.service + "/upload",
            filePath: tempFilePaths[0],
            name: "img",
            formData: {
              user: "测试",
            },
            success: (uploadFileRes) => {
              let successname = JSON.parse(uploadFileRes.data);
              if (successname.code === 200) {
                this.imgurls = successname.data.path;
              }
            },
          });
        },
      });
    },
    // 跳转我的收货地址
    goaddress() {
      uni.navigateTo({
        url: "/pages/my/address/address",
      });
    },
    //点击支付 跳转订单
    runorder() {
      this.$u.api.goodsService
        .ordermoney({
          goods_id: this.goodsdetial.goods_id,
          shop_id: this.shopdetial.shop_id,
          address_id: this.address[0].address_id,
          order_num: this.goodsnums,
          coup_id: this.couponsxuanzhong.coup_id || 0,
          remarks: this.remarks,
          account_type: this.havepingid,
          urgent: this.gorunsid,
          vase_img: this.imgurls,
          user_id: this.vuex_user.user_id,
        })
        .then((res) => {
          console.log("下订单了！！！！：：", res);

          if (res.code === "200") {
            this.order_id = res.data;
            this.baforepay();
          }
        });
      // uni.navigateTo({
      //   url: "/pages/shop/payend/payend",
      // });
    },
    baforepay(order_id) {
      this.$u.api.goodsService
        .baforepay({ order_id: this.order_id, user_id: this.vuex_user.user_id })
        .then((res) => {
          if (res.code === "200") {
            console.log("sssssssssss", res.data);
            uni.requestPayment({
              provider: "wxpay",
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: "MD5",
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
                });
              },
            });
          }
        });
    },
    // 获取商品
    getgoodsdetial(goods_id) {
      this.$u.api.goodsService
        .goodsdetails({ goods_id: goods_id })
        .then((res) => {
          if (res.code === "200") {
            console.log("商品搜索成功：：", res.data);
            this.goodsdetial = res.data;
            this.getshopdetail();
          }
        });
    },
    //获取店铺
    getshopdetail() {
      this.$u.api.newsService
        .shopdetail({
          lat: this.userlocal.latitude,
          lng: this.userlocal.longitude,
          shop_id: this.goodsdetial.shop_id,
        })
        .then((res) => {
          if (res.code === "200") {
            this.shopdetial = res.data;
            this.gorun = [
              { text: "不加急", runid: 2 },
              { text: "加急￥" + this.shopdetial.urgent_amount, runid: 1 },
            ];
            this.usercoupons();
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
    // 用户优惠券
    usercoupons() {
      this.$u.api.userService
        .userhave({
          shop_id: this.shopdetial.shop_id,
        })
        .then((res) => {
          if (res.code === "200") {
            console.log("我拿到了优惠券啊", res);
            this.couponslist = res.data;
            this.canuseronupon = res.data.length <= 0 ? false : true;
          }
        });
    },
    // 算总账
    userpaymoney() {
      // 优惠券

      let usescoupon = 0;
      if (this.goodsnums <= 1) {
        if (this.canuseronupon && this.couponsxuanzhong.coupon_id) {
          if (
            Number(this.goodsdetial.goods_retail) * this.goodsnums >=
            Number(this.couponsxuanzhong.satisfyprice)
          ) {
            usescoupon = usescoupon - Number(this.couponsxuanzhong.couprice);
          }
        } else {
          usescoupon = 0;
        }
      } else {
        if (this.canuseronupon && this.couponsxuanzhong.coupon_id) {
          if (
            Number(this.goodsdetial.goods_retail) * this.goodsnums >=
            Number(this.couponsxuanzhong.satisfyprice)
          ) {
            usescoupon = usescoupon - Number(this.couponsxuanzhong.couprice);
          }
        } else {
          usescoupon = 0;
        }
      }

      // 加急？
      let jiaji =
        this.gorunsid === 1 ? Number(this.shopdetial.urgent_amount) : 0;
      // 开户类型
      let kaihuleix =
        this.havepingid === 1 ? Number(this.shopdetial.deposit) : 0;
      return (
        this.goodsdetial.goods_retail * this.goodsnums +
        usescoupon +
        jiaji +
        kaihuleix
      );
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
  onUnload() {
    uni.setStorageSync("usecouponid", {});
  },
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
.colo_close {
  color: #ff442a;
  width: 30rpx;
  height: 30rpx;
  text-align: center;
  line-height: 15rpx;
}
</style>
