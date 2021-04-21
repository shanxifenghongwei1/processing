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
        <goodsitems v-if="current === 2"></goodsitems>
        <goodsitem v-if="current <= 1"></goodsitem>
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
    uni.getLocation({
      type: "wgs84",
      success: function(res) {
        console.log(res);
        console.log("当前位置的经度：" + res.longitude);
        console.log("当前位置的纬度：" + res.latitude);
      },
    });
    ///通知公告
    this.getnewlist();
  },
  methods: {
    ///通知公告
    getnewlist() {
      this.$u.api.newsService.list().then((res) => {
        if (res.code === "200") {
          this.newlist = res.data;
          console.log("请求到了啊", res.data);
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
    },
    changes(index) {
      this.current1 = index;
    },
    gopage() {
      console.log("执行了");
      uni.navigateTo({
        url: "/pages/index/citys/city",
      });
    },
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
