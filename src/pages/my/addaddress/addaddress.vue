<template>
  <view>
    <u-form :model="form" ref="uForm">
      <view class="mt15 ml15 mr15  pl15 pr15 bg-white br10">
        <u-form-item label="姓名">
          <u-input v-model="form.name" placeholder="请输入姓名" />
        </u-form-item>
        <u-form-item label="电话">
          <u-input v-model="form.tel" placeholder="请输入电话" />
        </u-form-item>
        <u-form-item label="地区">
          <u-picker
            v-model="show"
            @confirm="getaddress"
            mode="region"
          ></u-picker>
          <u-input
            v-model="address"
            placeholder="请选择地区"
            @click="show = true"
            :type="type"
            :disabled="true"
            :border="border"
          />
        </u-form-item>
        <u-form-item label-width="130" label="详细地址">
          <u-input v-model="form.detaaddress" placeholder="请输入详细地址" />
        </u-form-item>
        <u-form-item label-width="130" label="邮政编码">
          <u-input v-model="form.postal" placeholder="请输入邮政编码" />
        </u-form-item>
      </view>

      <view class="mt15 ml15 mb15 pl15 pr15 bg-white br10">
        <u-form-item label-width="200" label="设为默认地址"
          ><u-switch slot="right" @change="swval" v-model="switchVal"></u-switch
        ></u-form-item>
      </view>
    </u-form>
    <view class="btnsstyle">
      <u-button
        class="width-full"
        form-type="submit"
        shape="circle"
        type="primary"
        @click="submit"
        >{{ id === 0 ? "提交" : "修改" }}</u-button
      >
    </view>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    show: false,
    address: "",
    switchVal: false,
    form: {
      name: "",
      tel: "",
      postal: "",
      detaaddress: "",
    },
    id: 0,
  }),
  computed: {},
  methods: {
    swval(e) {
      console.log("开关", e);
    },
    getaddress(e) {
      this.address = e.province.label + "-" + e.city.label + "-" + e.area.label;
    },
    submit() {
      this.form.user_id = this.vuex_user.user_id;
      this.form.address = this.address;
      this.form.is_default = this.switchVal ? 1 : 0;
      console.log(this.form);
      if (this.id == 0) {
        this.$u.api.userService
          .newaddress({
            ...this.form,
          })
          .then((res) => {
            console.log("成功了", res);
            if (res.code === "200") {
              this.$refs.uToast.show({
                title: "操作成功",
                url: "/pages/my/address/address",
                // 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
                // type: 'success',
                // 如果不需要图标，请设置为false
                // icon: false
              });
            }
          });
      } else {
        this.form.address_id = this.id;
        this.$u.api.userService
          .updateaddress({
            ...this.form,
          })
          .then((res) => {
            if (res.code === "200") {
              this.$refs.uToast.show({
                title: "操作成功",
                url: "/pages/my/address/address",
                // 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
                // type: 'success',
                // 如果不需要图标，请设置为false
                // icon: false
              });
            }
          });
      }
    },
    getdeteaddress(id) {
      this.$u.api.userService
        .deteaddress({
          address_id: id,
        })
        .then((res) => {
          console.log("成功了", res);
          if (res.code === "200") {
            this.address = res.data.address;
            res.data.is_default === 1
              ? (this.switchVal = true)
              : (this.switchVal = false);
            this.form = {
              name: res.data.name,
              tel: res.data.tel,
              postal: res.data.postal,
              detaaddress: res.data.detaaddress,
            };
          }
        });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.id = options.id;
    if (options.id === "0") {
      console.log("这里叫新增", options.id);

      this.form = {
        name: "",
        tel: "",
        postal: "",
        detaaddress: "",
      };
    } else {
      console.log("这里叫修改", options.id);

      this.getdeteaddress(options.id);
    }
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
page {
  background: #f8f8f8;
}
.btnsstyle {
  margin: 0 auto;
  width: 60%;
}
</style>
