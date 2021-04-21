<template>
  <view>
    <view class="bg-white pl15 pt15 pb15">
      <view class="flex">
        <view class="">
          <image class="hend" :src="src" mode="" />
        </view>
        <view class="pl15 flex-1 flex flex-col flex-center">
          <view class="fs20 fw600">姓名</view>
          <view class="fs14 fw400">18435170200</view>
        </view>
      </view>
      <view>
        <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
          登录
        </button>
      </view>
    </view>
    <!-- 下面的横向列表 -->
    <view class="bg-white pl15 pr15 pt15 pb20 mt10">
      <view class="flex flex-between">
        <view class="fw600">煤气订单</view>
        <view @click="runpages"
          >全部订单 <span class="iconfont icon-xiangyou"></span
        ></view>
      </view>
      <view class="flex flex-around pt20 pb15">
        <view v-for="item in list1" :key="item.id">
          <view class="flex flex-center mb5" @click="runpages">
            <image
              class="block"
              style="width:40rpx;height:40rpx;"
              :src="item.image"
              mode=""
            />
          </view>
          <view class="text-center fs15 fw600">
            {{ item.name }}
          </view>
        </view>
      </view>
      <!-- 老用户一键定气 -->
      <view class="pl15 pr15">
        <view class="flex flex-between pl15 pr15 pt20 pb20 newbg">
          <view>
            <image
              style="width:40rpx;height:40rpx;"
              src="/static/my/lyhicon.png"
              mode=""
            />
            <image
              style="width:240rpx;height:30rpx;"
              class="pl15"
              src="/static/my/lyhwz.png"
              mode=""
            />
          </view>
          <view class="iconfont icon-xiangyou"></view>
        </view>
      </view>
    </view>
    <!-- 第二个列表 -->
    <view class="bg-white mt10 pl15 pr15">
      <view
        v-for="item in list2"
        :key="item.id"
        class="flex flex-between pt15 pb15"
        @click="runpageaaa(item.id)"
      >
        <view class="flex">
          <view class="flex flex-center">
            <image
              class="block"
              style="width:40rpx;height:40rpx"
              :src="item.image"
              mode=""
            />
          </view>
          <view class="pl15">{{ item.name }}</view>
        </view>
        <view class="iconfont icon-xiangyou"></view>
      </view>
    </view>
    <view class="mt15"></view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      src:
        "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4283265346,1280694101&fm=11&gp=0.jpg",
      list1: [
        {
          id: 1,
          name: "进行中",
          image: "/static/my/jxz.png",
        },
        {
          id: 2,
          name: "已完成",
          image: "/static/my/ywc.png",
        },
        {
          id: 2,
          name: "已取消",
          image: "/static/my/yqx.png",
        },
        {
          id: 4,
          name: "退瓶/抢修",
          image: "/static/my/tpqx.png",
        },
      ],
      list2: [
        {
          id: 1,
          name: "配件订单",
          image: "/static/my/list/pj.png",
        },
        {
          id: 2,
          name: "优惠券",
          image: "/static/my/list/yh.png",
        },
        {
          id: 3,
          name: "商家入口",
          image: "/static/my/list/sj.png",
        },
        {
          id: 4,
          name: "员工入口",
          image: "/static/my/list/yg.png",
        },
        {
          id: 5,
          name: "地址管理",
          image: "/static/my/list/dz.png",
        },
        {
          id: 6,
          name: "联系客服",
          image: "/static/my/list/lx.png",
        },
      ],
    };
  },
  methods: {
    runpageaaa() {
      uni.navigateTo({
        url: "/pages/my/orderlist/orderlist",
      });
    },
    runpages() {
      uni.navigateTo({
        url: "/pages/my/orderlist/orderlist",
      });
    },
    bindGetUserInfo(e) {
      console.log(e);
      let that = this;
      uni.login({
        provider: "weixin",
        success: (res) => {
          uni.getUserInfo({
            provider: "weixin",
            success: (info) => {
              //这里请求接口
              // &code=001NYPFa1tJwMA0bT9Ha1Gli5X0NYPFt/
              console.log("info:::", info.userInfo);

              this.$u.api.userService
                .login({
                  code: res.code,
                  name: info.userInfo.nickName,
                  img: info.userInfo.avatarUrl,
                })
                .then((res) => {
                  console.log("成功了");
                  this.$u.vuex("vuex_user", info.userInfo);
                  this.$u.vuex("vuex_islogin", true);
                });
              // console.log("res:::", res);
            },
            fail: () => {
              uni.showToast({ title: "微信登录授权失败", icon: "none" });
            },
          });
        },
        fail: () => {
          uni.showToast({ title: "微信登录授权失败", icon: "none" });
        },
      });
    },
  },
};
</script>
<style>
.hend {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
}
page {
  background: #f8f8f8;
}
.newbg {
  background: rgba(252, 252, 252, 1);
}
</style>
