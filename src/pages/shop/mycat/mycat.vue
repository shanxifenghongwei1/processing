<template>
  <view>
    <view class="pl15 pr15">
      <!-- 一个店铺+ 商品 -->
      <view class="bg-white pl15 pr15 mt15 pt15">
        <view class="flex flex-between align-items-center">
          <view class="nowrap">店铺名称</view>
          <view class="getcolor">领券</view>
        </view>

        <u-checkbox-group
          @change="checkboxGroupChange"
          icon-size="20"
          shape="circle"
        >
          <u-checkbox
            :wrap="true"
            @change="checkboxChange"
            v-model="item.checked"
            v-for="(item, index) in list"
            :key="index"
            label-disabled="true"
            :name="index"
          >
            <!-- 每个商品 -->
            <view
              class="flex flex-between align-items-center pt10 pb10 width-full"
            >
              <view class="pl10 pr10">
                <image
                  class="block br5"
                  style="width:140rpx;height:140rpx;"
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201508%2F15%2F20150815131712_fEyPM.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622115531&t=52a1a0110f28770c3013c71e6cb5bf67"
                  mode=""
                />
              </view>
              <view class="">
                <p class="exceed-ellipsis4">
                  商品名商品名称商品名称商品名称商品名称商品名称称
                </p>
                <view
                  @click="showprop"
                  class="flex flex-between align-items-center"
                >
                  <view>规格</view>
                  <u-icon name="arrow-down" color="#2979ff" size="28"></u-icon>
                </view>
                <view class="flex flex-between">
                  <view class="moneycolor">￥100</view>
                  <view><u-number-box v-model="value"></u-number-box></view>
                </view>
              </view>
            </view>
          </u-checkbox>
        </u-checkbox-group>
      </view>
      <!-- 弹窗 -->
      <u-popup v-model="show" border-radius="20" mode="bottom">
        <!-- <view class="pt15 pl15 flex"> -->
        <view class="pl15 pt15 pr15">
          <view class="pb15">{{ skulist[0].specs_name }}</view>
          <view class="flex flex-wrap">
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
          <view class="flex-1 bgxiadan" @click="useroksuk">
            确认
          </view>
        </view>
        <!-- </view> -->
      </u-popup>
      <!-- 下面的tabbar -->
      <view style="height:100rpx"></view>
      <view
        class="fixed left bottom flex align-items-center flex-between width-full pl15 bg-white"
      >
        <view>
          <u-checkbox-group @change="checkboxGroupChange1">
            <u-checkbox
              @change="checkboxChange1"
              v-model="item.checked"
              shape="circle"
              v-for="(item, index) in list1"
              :key="index"
              :name="item.id"
              >{{ item.name }}</u-checkbox
            >
          </u-checkbox-group>
        </view>
        <view class="flex-1 flex flex-between pr15">
          <view></view>
          <view>合计: <span class="moneycolor">￥100</span> </view>
        </view>
        <view class="flex-1 bgxiadan" @click="showprop">
          结算
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    show: false,
    skulist: [],
    actid: -1,
    actid1: -1,
    list: [
      {
        name: "apple",
        checked: false,
        disabled: false,
      },
      {
        name: "banner",
        checked: false,
        disabled: false,
      },
      {
        name: "orange",
        checked: false,
        disabled: false,
      },
    ],
    list1: [
      {
        name: "全选",
        id: 999,
        checked: false,
        disabled: false,
      },
    ],
    value: 1,
  }),
  computed: {},
  methods: {
    checkboxChange(e) {
      console.log(e);
    },
    checkboxChange1(e) {
      //console.log(e);
    },
    // 选中任一checkbox时，由checkbox-group触发
    checkboxGroupChange(e) {
      // console.log(e);
    },
    // 全选
    checkboxGroupChange1(e) {
      if (e.length > 0) {
        this.list.map((val) => {
          val.checked = true;
        });
      } else {
        this.list.map((val) => {
          val.checked = false;
        });
      }
    },
    // 规格1
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
    // 规格2
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
    showprop() {
      this.getsku();
      this.show = true;
    },
    useroksuk() {
      this.show = false;
    },
    getsku() {
      this.$u.api.goodsService.specs({ goods_id: 1 }).then((res) => {
        if (res.code === "200") {
          console.log("商品搜索成功：：", res.data);
          this.skulist = res.data;
        }
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
page {
  background: #f8f8f8;
}

.getcolor {
  color: #2cc199;
}
.bgxiadan {
  background: #4782f6;
  color: #ffffff;
  text-align: center;
  line-height: 80rpx;
}

.moneycolor {
  color: #ff4a31;
}
.active {
  background: #000000;
  color: white;
}
</style>
