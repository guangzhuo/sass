<template>
  <lvx-dialog title-class="categoryAdd-header" title="归档合同" :visible.sync="categoryFileVisible" width="460px" top="0" custom-class="categoryFile" :before-close="handleClose">
    <div class="categoryAdd-content">
      <div class="category-list list-noData" v-if="contractList.rows==0">暂无分类!</div>
      <div class="category-list" v-for="(key, value) in contractList.rows" @click="fileContract(key.id,key)" :class="{active: listActive == key}" >
        {{key.name}}
      </div>
      <lvx-pagination
        v-if="total>10"
        small="true"
        background
        layout="prev, pager, next"
        @current-change="getContractCategoryList"
        :current-page.sync="pageNo"
        :total="total">
      </lvx-pagination>
    </div>
    <span slot="footer" class="dialog-footer">
      <lvx-button size="medium" type="primary" @click="categoryAdd()">&nbsp;确定&nbsp;</lvx-button>
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
      categoryFileVisible: this.show,
      categoryContractId: this.contractId,
      contractList: [],
      categoryId: "",
      listActive: "",
      total: 0,
      pageNo: 1
    };
  },
  computed: {
    ...mapState({})
  },
  props: {
    show: Boolean,
    contractId: Number
  },
  created() {},
  mounted() {},
  watch: {
    show() {
      this.categoryFileVisible = this.show;
      if (this.show) {
        this.getContractCategoryList();
      }
    }
  },
  methods: {
    handleCancel() {
      this.$emit("update:show", false);
      this.listActive = "";
    },
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      //     done();
      //     this.$emit("update:show", false);
      //     this.listActive = "";
      //   })
      //   .catch(_ => {});
      this.$emit("update:show", false);
      this.listActive = "";
    },
    fileContract(id, key) {
      this.categoryId = id;
      this.listActive = key;
    },
    categoryAdd() {
      if (this.categoryId == "" && this.contractList.rows != 0) {
        this.$createMessage({
          type: "error",
          duration: 3000,
          spinnerText: "未选择分类!"
        });
      } else if (this.contractList.rows == 0) {
        this.categoryFileVisible = false;
        this.$emit("onComplete", false);
        this.$emit("update:show", false);
      } else {
        this.$axios
          .post(apis.fileContract, {
            categoryId: this.categoryId,
            id: this.contractId
          })
          .then(res => {
            if (res.data.success) {
              this.categoryId = "";
              this.categoryFileVisible = false;
              this.$emit("onComplete", true);
              this.$emit("update:show", false);
              this.$createMessage({
                type: "success",
                duration: 3000,
                spinnerText: "归类完成!"
              });
            } else {
              this.categoryId = "";
              this.$emit("onComplete", false);
              this.$emit("update:show", false);
              this.$createMessage({
                type: "error",
                duration: 3000,
                spinnerText: res.data.msg
              });
            }
          })
          .catch(err => {
            this.categoryId = "";
            this.$emit("onComplete", false);
            this.$emit("update:show", false);
            this.$createMessage({
              type: "error",
              duration: 3000,
              spinnerText: err.data.msg
            });
          });
      }
    },
    async getContractCategoryList() {
      const r = await this.$axios
        .get(apis.contractCategoryList, {
          params: {
            pageNo: this.pageNo,
            limit: 10
          }
        })
        .then(res => res.data);
      if (r.code == 200) {
        this.contractList = r.data;
        this.total = r.data.total;
        // this.$store.state.LeftManager.contractCagetoryList = r.data;
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
    width: 100%;
    overflow: hidden;
    margin: 40px auto 20px;
    .category-list {
      height: 30px;
      background-color: #fff;
      color: #555;
      cursor: default;
      line-height: 30px;
      text-indent: 20px;
      transition: 0.2s;
      &:hover {
        background-color: #4081ff;
        color: #fff;
      }
      &.list-noData:hover {
        background-color: #fff;
        color: #555;
      }
    }
    .active {
      background-color: #4081ff;
      color: #fff;
    }
    .lvx-pagination {
      margin-top: 28px;
      text-align: right;
    }
  }
  .lvx-dialog__title {
    font-weight: 600;
    font-size: 16px;
  }
}
</style>
<style lang="scss">
.categoryFile {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>

