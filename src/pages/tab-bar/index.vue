<template>
  <view class="content">
    <!-- 顶部标题栏 -->
    <u-navbar
      back-text="广州"
      :back-text-style="back_text_style"
      back-icon-color="#fff"
      back-icon-name="map"
      :custom-back="gopage"
      :background="background"
      title-color="#fff"
      title="燃眉之急"
    ></u-navbar>
    <view>
      <view class="width-full bg-mines">
        <!-- 上面的tag -->
        <view
          class="width-full bg-white top_list pt15 pb15 pl10 pr15 flex flex-between align-items-stretch"
        >
          <view style="width:70%;">
            <u-tabs
              :list="toplist"
              :is-scroll="false"
              :current="current"
              @change="change"
            ></u-tabs>
          </view>
          <u-icon name="search" size="40" @click="runsearch"></u-icon>
        </view>
      </view>
      <!-- 轮播 -->
      <view v-if="current <= 1" class="pl15 pr15 bg-white">
        <u-swiper :list="imagelist" height="360"></u-swiper>
      </view>
      <view v-if="current <= 1" class="pl15 pt15 pr15">
        <u-notice-bar
          type="primary"
          border-radius="100"
          mode="vertical"
          @click="godetial"
          :list="tostlist"
        ></u-notice-bar>
      </view>
      <!-- 下面的tag -->
      <view v-if="current <= 1" class="mt15" style="width:70%;">
        <u-tabs
          bg-color="#F8F8F8"
          :list="bottomlist"
          :is-scroll="false"
          :current="current1"
          @change="changes"
        ></u-tabs>
      </view>
      <!-- 商品列表 -->
      <view class="pl15 pr15">
        <view v-if="current === 2">
          <goodsitems
            v-for="(item, index) in shoplist"
            :key="index"
            :item="item"
          ></goodsitems>
        </view>
        <view v-if="current <= 1">
          <goodsitem
            v-for="(item, index) in goodslist"
            :key="index"
            :item="item"
          ></goodsitem>
        </view>
        <u-divider v-if="total !== 0 && current === 0" bg-color="">{{
          moreTip
        }}</u-divider>
        <u-divider v-if="total1 !== 0 && current === 1" bg-color="">{{
          moreTip1
        }}</u-divider>
        <u-divider v-if="total1 !== 0 && current === 2" bg-color="">{{
          moreTip1
        }}</u-divider>
      </view>
    </view>
  </view>
</template>

<script>
import goodsitem from "components/goods/goodsitem";
import goodsitems from "components/goods/goodsitems";
export default {
  components: {
    goodsitem,
    goodsitems,
  },
  data() {
    return {
      title: "Hello",
      background: {
        backgroundColor: "#4782F6",
      },
      back_text_style: {
        color: "#fff",
      },
      toplist: [
        {
          name: "附近商家",
        },
        {
          name: "商业用气",
        },
        {
          name: "燃气管道",
        },
      ],
      bottomlist: [
        {
          name: "推荐",
        },
        {
          name: "距离",
        },
        {
          name: "销量",
        },
        {
          name: "评价",
        },
      ],
      current: 0,
      current1: 0,
      imagelist: [
        {
          image: "https://cdn.uviewui.com/uview/swiper/1.jpg",
        },
        {
          image: "https://cdn.uviewui.com/uview/swiper/2.jpg",
        },
        {
          image: "https://cdn.uviewui.com/uview/swiper/3.jpg",
        },
      ],
      tostlist: [],
      newlist: [],
      pages: 1,
      isPullUp: false,
      moreTip: "",
      total: 0,
      pages1: 1,
      isPullUp1: false,
      moreTip1: "",
      total1: 0,
      pages2: 1,
      isPullUp2: false,
      moreTip2: "",
      total2: 0,
      userlocal: {},
      goodslist: [],
      shoplist: [],
    };
  },
  onLoad() {
    // let searchs = [
    //   {
    //     text: "衬衫",
    //   },
    //   {
    //     text: "鞋子",
    //   },
    //   {
    //     text: "外套",
    //   },
    //   {
    //     text: "油烟机",
    //   },
    //   {
    //     text: "瞎写的",
    //   },
    // ];
    // uni.setStorageSync("searchs", searchs);
    let that = this;
    uni.getLocation({
      type: "wgs84",
      success: function(res) {
        console.log(res);
        console.log("当前位置的经度：" + res.longitude);
        console.log("当前位置的纬度：" + res.latitude);
        that.userlocal = res;
        uni.setStorageSync("userlocal", res);
        that.getnearbay();
      },
    });
    ///通知公告
    this.getnewlist();
    this.getbanner();
  },
  methods: {
    ///通知公告
    getnewlist() {
      this.$u.api.newsService.list().then((res) => {
        if (res.code === "200") {
          this.newlist = res.data;
          let a = [];
          res.data.forEach((element) => {
            a.push(element.title);
          });
          this.tostlist = a;
        }
      });
    },
    // 公告详情
    godetial(e) {
      console.log(e);

      uni.navigateTo({
        url: `/pages/index/newsdetial/newsdetial?notice_id=${this.newlist[e].notice_id}`,
      });
    },
    runsearch() {
      console.log(111111);
      uni.navigateTo({
        url: "/pages/index/search/search",
      });
    },
    change(index) {
      this.current = index;
      this.init();
      console.log("第几位了", index);
      if (index === 0) {
        this.getnearbay();
      } else if (index === 1) {
        this.getbusiness();
      } else if (index === 2) {
        this.getpipeline();
      }
    },
    getbanner() {
      this.$u.api.newsService.banner().then((res) => {
        console.log("拿到轮播图了", res);
        if (res.code === "200") {
          let a = [];
          res.data.forEach((item) => {
            a.push({ image: item.img, id: item.id, link: item.link });
          });
          this.imagelist = a;
        }
      });
    },
    changes(index) {
      this.current1 = index;
      this.init();
      if (this.toplist[this.current].name === "附近商家") {
        this.getnearbay();
      } else if (this.toplist[this.current].name === "商业用气") {
        this.getbusiness();
      }
    },
    gopage() {
      console.log("执行了");
      uni.navigateTo({
        url: "/pages/index/citys/city",
      });
    },
    init() {
      this.goodslist = [];
      this.shoplist = [];
      this.pages = 1;
      this.isPullUp = false;
      this.moreTip = "";
      this.total = 0;
      this.pages1 = 1;
      this.isPullUp1 = false;
      this.moreTip1 = "";
      this.total1 = 0;
    },
    // 附近商家
    getnearbay() {
      this.$u.api.newsService
        .nearby({
          page: this.pages,
          condition: this.bottomlist[this.current1].name,
          lat: this.userlocal.latitude,
          lng: this.userlocal.longitude,
        })
        .then((res) => {
          if (res.code === "200") {
            this.goodslist = this.goodslist.concat(res.data.shopInfo);
            this.total = res.data.count;
            if (res.data.count > this.goodslist.length) {
              this.isPullUp = true;
            } else {
              this.isPullUp = false;
              this.moreTip = "我也是有底线的";
            }
          }
        });
    },
    // 商业用气
    getbusiness() {
      this.$u.api.newsService
        .business({
          page: this.pages1,
          condition: this.bottomlist[this.current1].name,
          lat: this.userlocal.latitude,
          lng: this.userlocal.longitude,
        })
        .then((res) => {
          if (res.code === "200") {
            this.goodslist = this.goodslist.concat(res.data.shopInfo);
            this.total1 = res.data.count;
            if (res.data.count > this.goodslist.length) {
              this.isPullUp1 = true;
            } else {
              this.isPullUp1 = false;
              this.moreTip1 = "我也是有底线的";
            }
          }
        });
    },
    getpipeline() {
      this.$u.api.newsService
        .pipeline({
          page: this.pages1,
          lat: this.userlocal.latitude,
          lng: this.userlocal.longitude,
        })
        .then((res) => {
          console.log("拿到了燃气管道", res);
          if (res.code === "200") {
            this.shoplist = this.shoplist.concat(res.data.shopInfo);
            this.total2 = res.data.count;
            if (res.data.count > this.shoplist.length) {
              this.isPullUp2 = true;
            } else {
              this.isPullUp2 = false;
              this.moreTip2 = "我也是有底线的";
            }
          }
        });
    },
  },
  onReachBottom() {
    console.log("上啦到底了");
    if (this.isPullUp) {
      this.pages++;
      this.getnearbay();
    } else {
      this.isPullUp = false;
      this.moreTip = "我也是有底线的";
    }
    if (this.isPullUp1) {
      this.pages1++;
      this.getbusiness();
    } else {
      this.isPullUp1 = false;
      this.moreTip1 = "我也是有底线的";
    }
    if (this.isPullUp1) {
      this.pages2++;
      this.getpipeline();
    } else {
      this.isPullUp2 = false;
      this.moreTip2 = "我也是有底线的";
    }
  },
};
</script>

<style>
.top_list {
  border-top-left-radius: 80rpx;
  border-top-right-radius: 80rpx;
}
.bg-mines {
  background: #4782f6;
}
page {
  background: #f8f8f8;
}
</style>
