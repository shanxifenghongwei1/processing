<template>
  <view>
    <view class="pt15">
      <view class="pl15 pr15">请填写申请送气站入驻资料</view>

      <u-form :model="form" label-position="top" ref="uForm">
        <view class="mt15 ml15 mr15  pl15 pr15 bg-white br10">
          <u-form-item label="店铺名称">
            <u-input v-model="form.shop_name" placeholder="请输入店铺名称" />
          </u-form-item>

          <u-form-item label-width="130" label="身份证">
            <view class="flex">
              <u-upload
                ref="uUpload"
                :max-count="1"
                :action="action"
                name="img"
                :auto-upload="true"
                :show-progress="false"
                @on-success="imgsfz1success"
                @on-remove="imgsfz1remove"
              ></u-upload>
              <u-upload
                ref="uUpload"
                :max-count="1"
                :action="action"
                name="img"
                :auto-upload="true"
                :show-progress="false"
                @on-success="imgsfz2success"
                @on-remove="imgsfz2remove"
              ></u-upload>
            </view>
          </u-form-item>

          <u-form-item label="联系方式">
            <u-input v-model="form.shop_tel" placeholder="请输入联系方式" />
          </u-form-item>

          <u-form-item label-width="130" label="店铺地址">
            <u-input
              v-model="form.address"
              type="textarea"
              :border="true"
              :height="height"
              :auto-height="autoHeight"
              placeholder="请输入店铺地址"
            />
          </u-form-item>

          <u-form-item label-width="130" label="营业执照">
            <u-upload
              ref="uUpload"
              :max-count="1"
              :action="action"
              name="img"
              :auto-upload="true"
              :show-progress="false"
              @on-success="imgsgzsuccess"
              @on-remove="imgsgzremove"
            ></u-upload>
          </u-form-item>
          <!-- 新增 -->
          <u-form-item label-width="130" label="门头照片">
            <u-upload
              ref="uUpload"
              :max-count="1"
              :action="action"
              name="img"
              :auto-upload="true"
              :show-progress="false"
              @on-success="shop_portalsuccess"
              @on-remove="shop_portalremove"
            ></u-upload>
          </u-form-item>
        </view>
      </u-form>
      <!-- 新增/ -->
      <view class="mt15 ml15 mr15 pl15 pr15 pt15 pb15 bg-white">
        <view class="flex flex-between align-items-center">
          <view>开通商业用气服务</view>
          <view
            ><u-switch
              slot="right"
              @change="swval"
              size="30"
              v-model="switchVal"
            ></u-switch
          ></view>
        </view>
        <view class="fs13 mt10 color-shallow"
          >申请开通商业用气之后会在“商业用气“中显示商家，平台将按年收取￥100的费用</view
        >
      </view>
      <view class="pt15 pb15 mb15 btnsstyle">
        <u-button class="width-full" type="primary" @click="submit"
          >提交</u-button
        >
      </view>
      <u-toast ref="uToast" />
    </view>
  </view>
</template>

<script>
import $config from "config/config.js";
export default {
  components: {},
  data: () => ({
    form: {
      shop_name: "",
      shop_tel: "",
      address: "",
    },
    switchVal: true,
    height: 100,
    autoHeight: true,
    // 上岗证
    action: $config.service + "/upload",
    fileList: [],
    fileListsfz: [],
    fileListsfz2: [],
    shop_portal: [],
  }),
  computed: {},
  methods: {
    swval(e) {
      console.log("开关", e);
    },
    // this.$refs.uUpload.upload();
    submit() {
      this.form.shop_cate = 1;
      this.form.shop_license = this.fileList[0];
      this.form.shop_idcard_front = this.fileListsfz[0];
      this.form.shop_idcard_back = this.fileListsfz2[0];
      this.form.shop_portal = this.shop_portal[0];
      this.form.open_business = this.switchVal ? 1 : 2;
      this.$u.api.newsService
        .shanghuruzhusongqi({
          ...this.form,
          user_id: this.vuex_user.user_id,
        })
        .then((res) => {
          if (res.code === 200) {
            // this.qishouinfo = res.data;
            this.$refs.uToast.show({
              title: "操作成功",
              url: "/pages/tab-bar/my",
              isTab: true,
            });
          }
        });
    },
    // 上岗证成功
    imgsgzsuccess(res) {
      this.fileList = [res.data.path];
    },
    // 上岗证删除
    imgsgzremove() {
      this.fileList = [];
    },
    // 身份证1证成功
    imgsfz1success(res) {
      this.fileListsfz = [res.data.path];
    },
    // 身份证1删除
    imgsfz1remove() {
      this.fileListsfz = [];
    },

    // 身份证2证成功
    imgsfz2success(res) {
      this.fileListsfz2 = [res.data.path];
    },
    // 身份证2删除
    imgsfz2remove() {
      this.fileListsfz2 = [];
    },
    // 门头2证成功
    shop_portalsuccess(res) {
      this.shop_portal = [res.data.path];
    },
    // 门头2证成功2删除
    shop_portalremove() {
      this.shop_portal = [];
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
.btnsstyle {
  margin: 0 auto;
  width: 90%;
}
page {
  background: #f8f8f8;
}
</style>
