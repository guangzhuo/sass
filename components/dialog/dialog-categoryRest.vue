<template>
  <lvx-dialog title-class="categoryAdd-header" title="文件重命名" :visible.sync="categoryRestVisible" width="460px" top="calc(50vh - 115px)" :before-close="handleClose">
    <div class="categoryAdd-content">
      <div class="fl">文件夹名称:</div>
      <div class="fr category-input">
        <lvx-input v-model.trim="categoryTextRest"></lvx-input>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <lvx-button size="medium" type="primary" @click="categoryRest()">&nbsp;确定&nbsp;</lvx-button>
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
      categoryRestVisible: this.show, //修改归类是否显示
      categoryTextRest: "",
      restFromId: "" //修改归类ID
    };
  },
  computed: {
    ...mapState({})
  },
  props: {
    show: Boolean,
    propsCategoryText: String,
    propsRestFromId: Number
  },
  created() {},
  mounted() {
    // this.fetchData();
  },
  watch: {
    show(categoryText, restFromId) {
      this.categoryRestVisible = this.show;
      if (categoryText) {
        this.categoryTextRest = this.propsCategoryText;
        this.restFromId = this.propsRestFromId;
      }
    }
  },
  methods: {
    handleCancel() {
      this.$emit("update:show", false);
      this.categoryTextRest = "";
      this.restFromId = "";
    },
    handleClose(done) {
      this.$emit("update:show", false);
      this.categoryTextRest = "";
      this.restFromId = "";
    },
    categoryRest() {
      console.log(this.restFromId);
      if (this.categoryTextRest.length > 0) {
        if (this.categoryTextRest.length > 20) {
          this.$createMessage({
            type: "error",
            duration: 3000,
            spinnerText: "文件名不能超过20个字符"
          });
        } else {
          this.$axios
            .post(apis.categoryUpdate, {
              fromId: this.restFromId,
              categoryName: this.categoryTextRest
            })
            .then(res => {
              if (res.data.success) {
                this.categoryRestVisible = false;
                this.categoryTextRest = "";
                this.restFromId = "";
                this.$emit("onComplete", true);
                this.$emit("update:show", false);
                this.$createMessage({
                  type: "success",
                  duration: 3000,
                  spinnerText: "修改完成"
                });
              } else {
                this.categoryRestVisible = true;
                this.$emit("onComplete", false);
                this.$emit("update:show", true);
                this.$createMessage({
                  type: "error",
                  duration: 3000,
                  spinnerText: res.data.msg
                });
              }
            })
            .catch(err => {
              this.categoryRestVisible = true;
              this.$emit("onComplete", false);
              this.$emit("update:show", true);
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

