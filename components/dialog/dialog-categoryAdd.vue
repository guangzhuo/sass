<template>
  <lvx-dialog title-class="categoryAdd-header" title="新建文件夹" :visible.sync="categoryAddVisible" width="460px" top="calc(50vh - 115px)" :before-close="handleClose">
    <div class="categoryAdd-content">
      <div class="fl">文件夹名称:</div>
      <div class="fr category-input">
        <lvx-input v-model.trim="categoryText"></lvx-input>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <lvx-button size="medium" type="primary" @click="categoryAdd()">&nbsp;创建&nbsp;</lvx-button>
      <lvx-button size="medium" @click="handleCancel()">&nbsp;取消&nbsp;</lvx-button>
    </span>
  </lvx-dialog>
</template>

<script>
import { mapState } from "vuex";
import apis from "~/config/api";
export default {
  data() {
    return {
      categoryAddVisible: this.show, //新增归类是否显示
      categoryText: ""
    };
  },
  computed: {
    ...mapState({})
  },
  props: {
    show: Boolean
  },
  created() {},
  mounted() {
    // this.fetchData();
  },
  watch: {
    show() {
      this.categoryAddVisible = this.show;
    }
  },
  methods: {
    handleCancel() {
      // if (this.categoryText.length > 0) {
      //   this.$confirm("确认取消？")
      //     .then(_ => {
      //       this.$emit("update:show", false);
      //       this.categoryText = "";
      //       this.categoryAddVisible = false;
      //     })
      //     .catch(_ => {});
      // } else {
      //   this.$emit("update:show", false);
      //   this.categoryText = "";
      //   this.categoryAddVisible = false;
      // }
      this.$emit("update:show", false);
      this.categoryText = "";
      this.categoryAddVisible = false;
    },
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      //     done();
      //     this.$emit("update:show", false);
      //     this.categoryText = "";
      //   })
      //   .catch(_ => {});
      this.$emit("update:show", false);
      this.categoryText = "";
    },
    categoryAdd() {
      if (this.categoryText.length > 0) {
        if (this.categoryText.length > 20) {
          this.$createMessage({
            type: "error",
            duration: 3000,
            spinnerText: "文件名不能超过20个字符"
          });
        } else {
          this.$axios
            .post(apis.categoryAdd, {
              categoryName: this.categoryText
            })
            .then(res => {
              if (res.data.success) {
                this.categoryAddVisible = false;
                this.$emit("update:show", false);
                this.$emit("onComplete", true);
                this.categoryText = "";
                this.$createMessage({
                  type: "success",
                  duration: 3000,
                  spinnerText: "新建完成!"
                });
              } else {
                this.$emit("update:show", false);
                this.$emit("onComplete", true);
                this.$createMessage({
                  type: "error",
                  duration: 3000,
                  spinnerText: res.data.msg
                });
              }
            })
            .catch(err => {
              this.$emit("update:show", false);
              this.$emit("onComplete", true);
              this.categoryText = "";
              this.$createMessage({
                type: "error",
                duration: 3000,
                spinnerText: err.data.msg
              });
            });
        }
      } else {
        this.$createMessage({
          type: "error",
          duration: 3000,
          spinnerText: "文件名不能为空"
        });
      }
    }
  },
  components: {}
};
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
@include responsive-default {
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .categoryAdd-header {
    border-bottom: 1px solid #dedede;
    color: #131313;
  }
  .categoryAdd-content {
    width: 350px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    margin: 40px auto;
    .category-input {
      width: 256px;
    }
  }
  .lvx-dialog__title {
    font-weight: 600;
    font-size: 16px;
  }
}
</style>
<style lang="scss">
</style>

