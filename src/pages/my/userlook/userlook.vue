<template>
  <view>
    <u-toast ref="uToast" />
    <view v-if="pagezt === 0">
      <view
        class="pl15 pr15 ml15 mr15 mt15 pt15 bg-white fs13"
        v-for="(item, index) in order_list"
        :key="index"
      >
        <view class="flex flex-between pb10 b-b-1 line-color-shallow">
          <view class="flex"
            ><view class="relative">
              <view
                class="absolute top left pszwidth"
                v-if="item.order_status === 5"
                >前往中</view
              >
              <view
                class="absolute top left pszwidth"
                v-if="item.order_status === 9 || item.order_status === 8"
                >已到达</view
              >
              <view style="width:140rpx"></view>
            </view>
            <view class="jiaqicolor">{{
              item.order_type === 1 ? "加气订单" : "退瓶订单"
            }}</view></view
          >
          <view class="fs14 color-shallow line-color-shallow">{{
            item.created_at
          }}</view>
        </view>
        <view class="pt15 pl10 pr10 pb15 mt15 bg-lists">
          <view class="flex align-items-center mb10">
            <image
              class="block"
              style="width:60rpx;height:60rpx;border-radius:80rpx"
              :src="item.user.img"
              mode=""
            />
            <view class="ml15">{{ item.user.name }}</view>
          </view>
          <view class="exceed-ellipsis2">{{ item.address_detail }}</view>
        </view>
        <view class="flex flex-row-reverse pt15 pb15">
          <u-button
            type="primary"
            shape="circle"
            size="mini"
            @click="qishoujiedan(item.order_no)"
            >接单</u-button
          >
          <u-button
            class="pl15 pr15"
            type=""
            shape="circle"
            size="mini"
            @click="goiphone(item.user.tel)"
            >拨打电话</u-button
          >
          <u-button
            type=""
            shape="circle"
            size="mini"
            @click="lookxiangqing(item.order_no)"
            >详情</u-button
          >
        </view>
      </view>
      <u-divider v-if="total !== 0" bg-color="">{{ moreTip }}</u-divider>
      <view class="pt15" v-if="total === 0">
        <u-empty text="暂无数据" mode="list"></u-empty>
      </view>
    </view>
    <!-- 商家信息表现形式 -->
    <view v-if="pagezt === 1">
      <view class="flex flex-between pl15 pb10">
        <view style="width:30%;">
          <u-tabs
            :list="list1"
            bg-color="#f8f8f8"
            :is-scroll="false"
            :current="current1"
            @change="change1"
          ></u-tabs
        ></view>

        <view class="flex-1"></view>
      </view>
      <view
        class="pl15 pr15 pt15 pt15 ml15 mr15 bg-white fs13"
        v-for="(item, index) in my_order_list"
        :key="index"
      >
        <view class="flex flex-between pb10 b-b-1 line-color-shallow">
          <view class="flex"
            ><view class="relative">
              <view
                class="absolute top left "
                :class="current1 === 1 ? 'yiwanvheng' : 'pszwidth'"
                >{{ current1 === 1 ? "已完成" : "配送中" }}</view
              >
              <view style="width:140rpx"></view>
            </view>
            <view class="jiaqicolor">{{
              item.order_type === 1 ? "加气订单" : "退瓶订单"
            }}</view></view
          >
          <view class="fs14 color-shallow line-color-shallow">{{
            item.created_at
          }}</view>
        </view>
        <view class="pt15 pl10 pr10 pb15 mt15 bg-lists">
          <view class="flex align-items-center mb10">
            <image
              class="block"
              style="width:60rpx;height:60rpx;border-radius:80rpx"
              src="https://img2.baidu.com/it/u=2909072015,3629141008&fm=26&fmt=auto&gp=0.jpg"
              mode=""
            />
            <view class="ml15">{{ item.user.name }}</view>
          </view>
          <view class="exceed-ellipsis2">{{ item.address_detail }}</view>
        </view>
        <view v-if="current1 === 0" class="flex flex-row-reverse pt15 pb15">
          <u-button
            v-if="item.order_status === 5"
            type="primary"
            shape="circle"
            size="mini"
            @click="qishoudaoda(item.order_no, 8)"
            >到达</u-button
          >
          <u-button
            v-if="item.order_status === 8"
            type="primary"
            shape="circle"
            size="mini"
            @click="qishoudaoda(item.order_no, 10)"
            >发起安检</u-button
          >
          <u-button
            v-if="item.order_status === 10"
            type="primary"
            shape="circle"
            size="mini"
            @click="qishoudaoda(item.order_no, 9)"
            >完成</u-button
          >
          <u-button
            class="pl15 pr15"
            type=""
            shape="circle"
            size="mini"
            @click="goiphone(item.user.tel)"
            >拨打电话</u-button
          >
          <u-button
            type=""
            shape="circle"
            size="mini"
            @click="lookxiangqing(item.order_no)"
            >详情</u-button
          >
        </view>
        <view v-if="current1 === 1" class="flex flex-row-reverse pt15 pb15">
          <u-button
            type="primary"
            shape="circle"
            size="mini"
            @click="lookxiangqing(item.order_no)"
            >详情</u-button
          >
        </view>
      </view>
      <u-divider v-if="total1 !== 0" bg-color="">{{ moreTip1 }}</u-divider>
      <view class="pt15" v-if="total1 === 0">
        <u-empty text="暂无数据" mode="list"></u-empty>
      </view>
    </view>
    <view v-if="pagezt === 2">
      <view class="box_3706X1 pt15 flex flex-center align-items-center">
        <view class="pl15 mr15 ml15 pl15 pt15" style="width:80%;height:80%;">
          <view class="flex">
            <image
              class="block bordertime"
              style="width:120rpx;height:120rpx;border-radius:200rpx"
              :src="userinfetial.img"
              mode=""
            />
            <view class="pl15 color-white flex-1">
              <view class="fs18 ">{{ userinfetial.name }}</view>
              <view class="color-shallow">113122</view>
              <view class="pt15 nowrap">{{ userinfetial.shop.shop_name }}</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 下面的列表、 -->
      <view class="relative">
        <view class="bg-white mr15 ml15 pb15 pl15 pr15 pt15 br10 ">
          <view class="absolute left width-full smalroudif"></view>
          <view class="flex align-items-center flex-between">
            <view class="flex align-items-center">
              <span class="fw600 fs30 diancolor">·</span>
              <span class="fw600 ">日提成</span>
            </view>
            <view class="flex align-items-center diancolor" @click="runitem(1)">
              <span>查看明细</span>
              <u-icon name="arrow-right" color="#2cc199" size="28"></u-icon>
            </view>
          </view>
          <view class="pb10"
            >￥{{ userticheng.todat_count_money }}
            <span>共{{ userticheng.today_num }}单</span></view
          >
          <view class="pt15 flex flex-between">
            <view>
              <view class="color-shallow">普通订单提成</view>
              <view>￥{{ userticheng.today_royalty }}</view>
            </view>
            <!-- <view>
              <view class="color-shallow">商业用气订单</view>
              <view>￥120</view>
            </view> -->
          </view>
        </view>
      </view>

      <!-- 下面的列表、月提成 -->
      <view class="">
        <view class="bg-white mr15 ml15 mt15 pb15 pl15 pr15 pt15 br10 ">
          <view class="flex align-items-center flex-between">
            <view class="flex align-items-center">
              <span class="fw600 fs30 diancolor">·</span>
              <span class="fw600 ">月提成</span>
            </view>
            <view class="flex align-items-center diancolor" @click="runitem(2)">
              <span>查看明细</span>
              <u-icon name="arrow-right" color="#2cc199" size="28"></u-icon>
            </view>
          </view>
          <view class="pb10"
            >￥{{ userticheng.tomonth_count_money }}
            <span>共{{ userticheng.tomonth_num }}单</span></view
          >
          <view class="pt15 flex flex-between">
            <view>
              <view class="color-shallow">普通订单提成</view>
              <view>￥{{ userticheng.tomonth_royalty }}</view>
            </view>
            <!-- <view>
              <view class="color-shallow">商业用气订单</view>
              <view>￥120</view>
            </view> -->
          </view>
        </view>
      </view>

      <!-- 下面的列表、年提成 -->
      <view class="">
        <view class="bg-white mr15 ml15 mt15 pb15 pl15 pr15 pt15 br10 ">
          <view class="flex align-items-center flex-between">
            <view class="flex align-items-center">
              <span class="fw600 fs30 diancolor">·</span>
              <span class="fw600 ">年提成</span>
            </view>
            <view class="flex align-items-center diancolor" @click="runitem(3)">
              <span>查看明细</span>
              <u-icon name="arrow-right" color="#2cc199" size="28"></u-icon>
            </view>
          </view>
          <view class="pb10"
            >￥{{ userticheng.toyear_count_money }}
            <span>共{{ userticheng.toyear_num }}单</span></view
          >
          <view class="pt15 flex flex-between">
            <view>
              <view class="color-shallow">普通订单提成</view>
              <view>￥{{ userticheng.toyear_royalty }}</view>
            </view>
            <!-- <view>
              <view class="color-shallow">商业用气订单</view>
              <view>￥120</view>
            </view> -->
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
        iconPath: "/static/my/admin/jdt.png",
        selectedIconPath: "/static/my/admin/jdt.png",
        text: "接单台",
        count: 0,
        isDot: true,
        customIcon: false,
      },
      {
        iconPath: "/static/my/admin/wddd.png",
        selectedIconPath: "/static/my/admin/wddd.png",
        text: "我的订单",
        customIcon: false,
      },
      {
        iconPath: "/static/my/admin/grzx.png",
        selectedIconPath: "/static/my/admin/grzx.png",
        text: "个人中心",
        count: 0,
        isDot: false,
        customIcon: false,
      },
    ],
    current: 0,
    list1: [
      {
        name: "进行中",
      },
      {
        name: "已完成",
      },
    ],
    order_list: [],
    my_order_list: [],
    current1: 0,
    pagezt: 0,
    userinfetial: {},
    userticheng: {},
    // 分页
    pages: 1,
    isPullUp: false,
    moreTip: "",
    total: 0,
    pages1: 1,
    isPullUp1: false,
    moreTip1: "",
    total1: 0,
  }),
  computed: {},
  methods: {
    goiphone(e) {
      console.log("点击了拨打电话", e);
      uni.makePhoneCall({
        phoneNumber: "" + e,
      });
    },
    lookxiangqing(e) {
      uni.navigateTo({
        url: `/pages/my/adminorderdetial/adminorderdetial?order_no=${e}`,
      });
    },
    runitem(id) {
      uni.navigateTo({
        url: `/pages/my/adminmakeitem/adminmakeitem?run_id=${id}`,
      });
    },
    // 到达
    qishoudaoda(id, status) {
      this.$u.api.newsService
        .qishouzhuangtai({
          order_status: status,
          order_no: id,
        })
        .then((res) => {
          if (res.code === 200) {
            this.$refs.uToast.show({
              title: "操作成功",
              callback: () => {
                this.init1();
                this.getqishoumyorder();
              },
            });
          }
        });
    },
    select(e) {
      console.log("选中的下标？", e);
      this.pagezt = e;
    },
    change1(e) {
      this.current1 = e;
      this.init1();
      this.getqishoumyorder();
    },
    init1() {
      this.pages1 = 1;
      this.isPullUp1 = false;
      this.moreTip1 = "";
      this.total1 = 0;
      this.my_order_list = [];
    },
    init() {
      this.pages = 1;
      this.isPullUp = false;
      this.moreTip = "";
      this.total = 0;
      this.order_list = [];
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
    // 获取接单台列表
    getqishoureceiving() {
      this.$u.api.newsService
        .qishoureceiving({
          page: this.pages,
          user_id: this.vuex_qishou.user_id,
        })
        .then((res) => {
          if (res.code === 200) {
            this.order_list = this.order_list.concat(res.data.data);
            this.total = res.data.count;
            if (res.data.count > this.order_list.length) {
              this.isPullUp = true;
            } else {
              this.isPullUp = false;
              this.moreTip = "我也是有底线的";
            }
          }
        });
    },
    // qishoujiedan
    qishoujiedan(id) {
      this.$u.api.newsService
        .qishoujiedan({
          user_id: this.vuex_qishou.user_id,
          order_no: id,
        })
        .then((res) => {
          if (res.code === 200) {
            this.$refs.uToast.show({
              title: "操作成功",
              callback: () => {
                this.init();
                this.getqishoureceiving();
              },
            });
          }
        });
    },
    // get userinfo
    getqishoudetial() {
      this.$u.api.newsService
        .qishoudetial({
          user_id: this.vuex_qishou.user_id,
        })
        .then((res) => {
          if (res.code === 200) {
            this.userinfetial = res.data;
          }
        });
    },
    // 获取我的订单，数据
    getqishoumyorder() {
      this.$u.api.newsService
        .qishoumyorder({
          page: this.pages1,
          order_status: this.current1 === 1 ? 9 : 0,
          user_id: this.vuex_qishou.user_id,
        })
        .then((res) => {
          if (res.code === 200) {
            this.my_order_list = this.my_order_list.concat(res.data.data);
            this.total1 = res.data.count;
            if (res.data.count > this.my_order_list.length) {
              this.isPullUp1 = true;
            } else {
              this.isPullUp1 = false;
              this.moreTip1 = "我也是有底线的";
            }
          }
        });
    },
    getticheng() {
      this.$u.api.newsService
        .qishouticheng({
          user_id: this.vuex_qishou.user_id,
          // condition: "condition",
        })
        .then((res) => {
          if (res.code === 200) {
            this.userticheng = res.data;
          }
        });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getqishoureceiving();
    this.getqishoudetial();
    this.getqishoumyorder();
    this.getticheng();
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
  onReachBottom() {
    if (this.isPullUp) {
      this.pages++;
      this.getqishoureceiving();
    } else {
      this.isPullUp = false;
      this.moreTip = "我也是有底线的";
    }
    if (this.isPullUp1) {
      this.pages1++;
      this.getqishoumyorder();
    } else {
      this.isPullUp1 = false;
      this.moreTip1 = "我也是有底线的";
    }
  },
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
.bg-lists {
  background: #f5f7f8;
}
.pszwidth {
  width: 120rpx;
  padding: 5rpx 10rpx;
  background: #2cc199;
  color: #fff;
  border-top-right-radius: 50rpx;
  border-bottom-right-radius: 50rpx;
}

.yiwanvheng {
  background: #b2bfc6;
  width: 120rpx;
  padding: 5rpx 10rpx;
  color: #fff;
  border-top-right-radius: 50rpx;
  border-bottom-right-radius: 50rpx;
}
.jiaqicolor {
  color: #ff8d1a;
  /* #4580FF */
}

.box_3706X1 {
  width: 100%;
  height: 280rpx;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(71, 130, 246, 1);
  font-size: 28rpx;
  /* border-bottom-right-radius: 70rpx;
  border-bottom-left-radius: 70rpx; */
}
.smalroudif {
  z-index: -1;
  top: -120rpx;
  background: #4782f6;
  border-bottom-right-radius: 100rpx;
  border-bottom-left-radius: 100rpx;
  height: 200rpx;
}
.bordertime {
  border: 2px solid #fff;
}
.diancolor {
  color: #2cc199;
}
</style>
