<template>
  <view>
    <u-form :model="form" label-position="top" ref="uForm">
      <view class="mt15 ml15 mr15  pl15 pr15 bg-white br10">
        <u-form-item label="姓名">
          <u-input v-model="form.name" placeholder="请输入姓名" />
        </u-form-item>
        <u-form-item label="手机号">
          <u-input v-model="form.tel" placeholder="请输入手机号" />
        </u-form-item>

        <!-- <u-form-item label-width="130" label="验证码" prop="name">
          <u-input v-model="form.name" placeholder="请输入验证码" />
        </u-form-item> -->

        <u-form-item label-width="130" label="上岗证">
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
      </view>
    </u-form>
    <view class="pt15 pb15 mb15 btnsstyle">
      <u-button class="width-full" shape="circle" type="primary" @click="submit"
        >确定</u-button
      >
    </view>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
import $config from "config/config.js";
export default {
  components: {},
  data: () => ({
    form: {
      name: "",
      tel: "",
    },
    // 上岗证
    action: $config.service + "/upload",
    fileList: [],
    fileListsfz: [],
    fileListsfz2: [],
  }),
  computed: {},
  methods: {
    // this.$refs.uUpload.upload();
    submit() {
      this.form.mount_guard = this.fileList[0];
      this.form.idcard_front = this.fileListsfz[0];
      this.form.idcard_back = this.fileListsfz2[0];
      this.$u.api.newsService
        .qishouenter({
          ...this.form,
          user_id: this.vuex_qishou.user_id,
        })
        .then((res) => {
          if (res.code === 200) {
            // this.qishouinfo = res.data;
            this.$refs.uToast.show({
              title: "操作成功",
              url: "/pages/my/userlook/userlook",
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
  width: 60%;
}
</style>
