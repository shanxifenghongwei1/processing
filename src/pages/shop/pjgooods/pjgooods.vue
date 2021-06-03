<template>
  <view>
    <view @click="navito" class="fixed topleft fs20">
      <u-icon name="arrow-left" color="#FFF"></u-icon>
    </view>
    <image style="width:100%;" :src="detial.goods_img" mode="widthFix" />
    <view class="">
      <view class="p15 bg-white br5">
        <view class="fs18 flex">
          <!-- 价格 -->
          <view class="mr15 pr15">
            <view class="fw600" style="color:#FF442A;">
              <span>￥</span>{{ detial.goods_retail }}</view
            >
            <view class="fs14 color-shallow">零售价</view>
          </view>
          <view class="ml15 pl15">
            <view class="fw600" style="color:#FF442A;">
              <span>￥</span>{{ detial.goods_trade }}</view
            >
            <view class="fs14 color-shallow"
              >{{ detial.goods_quantity }}件起批</view
            >
          </view>
        </view>
        <!-- 商品名称 -->

        <view class="fs18 fw600 pt15 mt15">{{ detial.goods_name }}</view>

        <!-- 星星+库存 -->
        <view class="mt15 flex flex-between">
          <view style="color:#FF7404" class="flex fw600">
            <u-icon name="star-fill" color="#FF7404"></u-icon>
            <view>{{ detial.goods_score }}</view>
          </view>
          <view class="fs14 color-shallow">
            库存：{{ detial.goods_stock }}
          </view>
        </view>
        <!-- 规格 -->
        <view
          class="mt15 mb15 ggstyle fs14 pt10 pb10 pl15 pr15 flex flex-between"
          @click="showprop"
        >
          <view>规格 <span class="ml15 color-shallow">型号/颜色</span></view>
          <view>
            <image
              style="width:20rpx;height:20rpx;"
              src="/static/shop/xiangyoule.png"
              mode=""
            />
          </view>
        </view>
      </view>
    </view>
    <!-- 弹窗 -->
    <u-popup v-model="show" border-radius="20" mode="bottom">
      <view class="pt15 pl15 flex">
        <image
          class="block"
          style="width:180rpx;height:180rpx;"
          :src="detial.goods_img"
          mode=""
        />
        <view>
          <view class="fw600 pl15" style="color:#FF442A;">
            <span>￥</span>{{ detial.goods_retail }}</view
          >
        </view>
      </view>
      <!-- v-for="(item, index) in skulist"
        :key="index" -->
      <view class="pl15 pt15 pr15">
        <view class="pb15">{{ skulist[0].specs_name }}</view>
        <view class="flex flex-wrap">
          <!-- <u-subsection
            bg-color="#ffffff"
            active-color="#ffffff"
            button-color="#000000"
            :list="skulist[0].sku"
            :current="curNow"
            @change="sectionChange"
          ></u-subsection> -->
          <view
            v-for="(i, e) in skulist[0].sku"
            :key="e"
            @click="sectionChange(e)"
          >
            <view
              class="smalbalk mr15 fs14 p5"
              :class="e === actid ? 'active' : 'b-a-1 line-color-shallow'"
              >{{ i.name }}</view
            >
          </view>
        </view>
      </view>

      <view class="pl15 pt15 pr15" v-if="skulist.length === 2">
        <view class="pb15">{{ skulist[0].specs_name }}</view>
        <view class="flex flex-wrap">
          <view
            v-for="(i, e) in skulist[1].sku"
            :key="e"
            @click="sectionChange1(e)"
          >
            <view
              class="smalbalk mr15 fs14 p5"
              :class="e === actid1 ? 'active' : 'b-a-1 line-color-shallow'"
              >{{ i.name }}</view
            >
          </view>
        </view>
      </view>
      <!-- <view class="pt15 pl15 pr15 flex flex-between align-items-center">
        <view class="color-middle">购买数量</view>
        <u-number-box v-model="value"></u-number-box>
      </view> -->
      <view class="pt15 flex">
        <!-- <view class="flex-1 bggouwuche" @click="addcat">
          加入购物车
        </view> -->
        <view class="flex-1 bgxiadan" @click="runorder">
          立即订购
        </view>
      </view>
    </u-popup>
    <!-- 商品评价 -->
    <view class=" mt10  bg-white">
      <view class="pl15 pt15 pr15 flex pb15">
        <view class="flex-1">
          <view class="flex flex-between">
            <view class="fw600 pb8">商品评价</view>
            <view class="color-shallow" @click="lookmore"
              >查看全部<span class="iconfont icon-xiangyou"></span>
            </view>
          </view>
          <!-- 有图好评等 -->
          <view class="flex">
            <view
              class="bg-commits fs9 mr10 p5"
              v-for="(item, index) in commitsa"
              :key="index"
              >{{ item.text }}</view
            >
          </view>
          <view>
            <talkitem
              v-for="(item, index) in commentlist"
              :key="index"
              :item="item"
            ></talkitem>
          </view>
        </view>
      </view>
    </view>

    <!-- 商品详情 -->
    <view class="mt10">
      <view class="p15 pr15 bg-white br5">
        <view class="flex felx-between align-items-center" @click="runshoppage">
          <view class="flex flex-center">
            <image
              class="br5"
              style="width:140rpx;height:140rpx;"
              src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3228549874,2173006364&fm=26&gp=0.jpg"
              mode=""
            />
          </view>
          <view class="pl15 pr15  flex-1  flex flex-col flex-between">
            <view class="fw600 pt15 nowrap">{{ shopdetial.shop_name }}</view>
            <view class="flex-1 pt10 pb10 ">
              <view class="flex">
                <u-icon class="mr5" name="star-fill" color="#FF7404"></u-icon>
                <span class="fw600" style="color:#FF7404">
                  {{ shopdetial.shop_score }}</span
                >
                <span class="ml5"> | {{ shopdetial.comment_num }}评价</span>
              </view>
            </view>
          </view>

          <view class="otherbg flex align-items-center flex-center"
            ><image
              class="br5"
              style="width:20rpx;height:20rpx;"
              src="/static/shop/xiangyoule.png"
              mode=""
          /></view>
        </view>
      </view>
    </view>

    <!-- 商品详情 -->
    <view class="mt10">
      <view class="p15 bg-white br5">
        <view class="fw600 pb10">商品描述</view>
        <view class=" pr15">
          <image
            style="width-full"
            :src="detial.goods_describe"
            mode="widthFix"
          />
        </view>
      </view>
    </view>
    <!-- 下面的tabbar -->
    <view style="height:200rpx"></view>
    <view class="fixed left bottom flex flex-around width-full pl15 bg-white">
      <view class="mr15 pt5 pb5">
        <image
          class="block"
          style="width:40rpx;height:40rpx;margin:0 auto;"
          src="/static/shop/lxkf.png"
          mode=""
        />
        <view class="fs14 color-shallow">联系客服</view></view
      >
      <!-- <view class="flex-1 bggouwuche pt5 pb5" @click="showprop">
        加入购物车
      </view> -->
      <view class="flex-1 bgxiadan pt5 pb5" @click="showprop">
        下单
      </view>
    </view>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
import talkitem from "components/talk/talkoneitem";
export default {
  components: {
    talkitem,
  },
  data: () => ({
    commentlist: [],
    goods_id: 0,
    detial: {},
    show: false,
    commitsa: [],
    list: [
      {
        name: "待发货",
      },
      {
        name: "待付款",
      },
      {
        name: "待评价",
      },
    ],
    list1: [
      {
        name: "正样",
      },
      {
        name: "小样",
      },
    ],
    actid: -1,
    actid1: -1,
    shopdetial: {},
    userlocal: uni.getStorageSync("userlocal"),
    skulist: [],
    pjlist: [],
    // value: 1,
  }),
  computed: {},
  methods: {
    // 加入购物车
    addcat() {},
    sectionChange(index) {
      this.actid = index;
      this.$u.api.goodsService
        .pushsku({ sku_id: this.skulist[0].sku[index].sku_id })
        .then((res) => {
          if (res.code === "200") {
            console.log(res.data);
            // this.detial = res.data;
          }
        });
    },
    sectionChange1(index) {
      this.actid1 = index;
      this.$u.api.goodsService
        .pushsku({ sku_id: this.skulist[1].sku[index].sku_id })
        .then((res) => {
          if (res.code === "200") {
            console.log(res.data);
            // this.detial = res.data;
          }
        });
    },
    runshoppage() {
      uni.navigateTo({
        url: `/pages/shop/pjhomepage/pjhomepage?shop_id=${this.shopdetial.shop_id}`,
      });
    },
    lookmore() {
      uni.navigateTo({
        url: `/pages/shop/allcommit/allcommit?goods_id=${this.goods_id}`,
      });
    },
    navito() {
      uni.navigateBack();
    },
    runorder() {
      if (this.skulist.length === 1) {
        console.log("走的1这里？");
        if (this.actid < 0) {
          this.$refs.uToast.show({
            title: "请选择规格哦",

            // 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
            // type: 'success',
            // 如果不需要图标，请设置为false
            // icon: false
          });
        } else {
          uni.navigateTo({
            url: `/pages/shop/pjorder/pjorder?goods_id=${this.detial.goods_id}`,
          });
        }
      } else if (this.skulist.length >= 2) {
        console.log("走的2这里？");
        if (this.actid < 0 || this.actid1 < 0) {
          this.$refs.uToast.show({
            title: "请选择规格",

            // 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
            // type: 'success',
            // 如果不需要图标，请设置为false
            // icon: false
          });
        } else {
          uni.navigateTo({
            url: `/pages/shop/pjorder/pjorder?goods_id=${this.detial.goods_id}`,
          });
        }
      }
    },
    getgoodsdetial(goods_id) {
      this.$u.api.goodsService
        .goodsdetails({ goods_id: goods_id })
        .then((res) => {
          if (res.code === "200") {
            console.log(res.data);
            this.detial = res.data;
            this.getshopdetail();
          }
        });
    },
    getsku() {
      this.$u.api.goodsService
        .specs({ goods_id: this.goods_id })
        .then((res) => {
          if (res.code === "200") {
            console.log("商品搜索成功：：", res.data);
            this.skulist = res.data;
          }
        });
    },
    showprop() {
      this.getsku();
      this.show = true;
    },

    // 评价
    getgoodscommit() {
      this.$u.api.goodsService
        .goodscommit({ goods_id: this.goods_id })
        .then((res) => {
          if (res.code === "200") {
            // console.log("商品评论成功：：", res.data);
            this.commentlist = res.data;
          }
        });
    },
    getpjlist() {
      this.$u.api.goodsService
        .pjlist({ goods_id: this.goods_id })
        .then((res) => {
          if (res.code === 200) {
            // console.log("商品评论成功：：", res.data);
            this.pjlist = res.data;
            this.commitsa = [
              { id: 1, text: "有图（" + res.data.imgs_num + ")" },
              { id: 2, text: "好评（" + res.data.goods_assess_num + ")" },
              { id: 3, text: "中评（" + res.data.medium_assess_num + ")" },
              { id: 4, text: "差评（" + res.data.fall_assess_num + ")" },
            ];
          }
        });
    },
    getshopdetail() {
      this.$u.api.newsService
        .pjshopdetial({
          shop_id: this.detial.shop_id,
        })
        .then((res) => {
          if (res.code === "200") {
            this.shopdetial = res.data;
          }
        });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    // goods_id
    this.goods_id = options.goods_id;
    this.getgoodsdetial(options.goods_id);
    this.getgoodscommit();
    this.getpjlist();
  },
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
.otherbg {
  border-radius: 100rpx;
  width: 50rpx;
  height: 50rpx;
  background: #f0f2f3;
}
.bg-commits {
  background: #f4f7ff;
  border-radius: 100rpx;
}

page {
  background: #f8f8f8;
}
.topleft {
  top: 70rpx;
  left: 30rpx;
}

.ggstyle {
  background: #f5f7f8;
}

.smalbalk {
}
.active {
  background: #000000;
  color: white;
}
.bggouwuche {
  background: #f1f4fc;
  color: #4782f6;
  text-align: center;
  line-height: 80rpx;
}
.bgxiadan {
  background: #4782f6;
  color: #ffffff;
  text-align: center;
  line-height: 80rpx;
}
</style>
