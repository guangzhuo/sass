<template>
 <sas-dialog
    :show.sync="visible"
    :title="dialogtitle"
    width="600px"
    class="swlogin-dialog"
    @close="$emit('update:show', false)"
    >
    <div class="content">
        <lvx-table ref="multipleTable" :data="tablelook"
          tooltip-effect="dark" style="width: 100%" height="250" stripe
          @selection-change="lookchange">
          <lvx-table-column  type="selection" width="95"
            ></lvx-table-column>
      <lvx-table-column label="查看人" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{ scope.row.toUids_cut }}</template>
      </lvx-table-column>
      <lvx-table-column prop="gmtCreate" label="时间" width="200" header-align="center"></lvx-table-column>
    </lvx-table>
    <div slot="footer" class="dialog-footer">
      <lvx-button @click="visible = false">取 消</lvx-button>
      <lvx-button type="primary" @click="delectlook">确 定</lvx-button>
    </div>
    </div>
  </sas-dialog>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
//import { getTGT, getST, logout, loginApp } from '~/extend/mixins'
export default {
  data () {
    return {
      visible: this.show,
      dialogtitle: this.title,
      tablelook:[],
      multipleSelection: [],
    }
  },
  computed: {
    ...mapState({

    })
  },
  props: {
    show: Boolean,
    title: {
      type: String,
      required: true,
      default:'',
    },
    pid:{
      type: [String,Number],
      required: true,
      default:'',
    }
  },
  mounted () {

  },
  watch: {
    show () {
      this.visible = this.show;
      if(this.visible){
        this.lookfetch();
      }
    },
    title(){
      this.dialogtitle = this.title;
    }

  },
  methods: {
    lookchange(val){
      this.multipleSelection.splice(0,this.multipleSelection.length);
      if(val){
          val.forEach(row =>{
              this.multipleSelection.push(row.userId);
          })
      }
      //console.log(this.multipleSelection);
    },
    delectlook(){
      const self = this;
      if(self.multipleSelection.length == 0){
          self.$createMessage({
            type:'warning',
            duration:3000,
            spinnerText:'未作任何操作'
          })
      }else{
        self.$axios.post(apis.delect_contractViewAuth,{
          pid: self.pid,
          users: self.multipleSelection
      }).then((res) => {
        if(res.data.success){
            location.reload();
        }else{
            self.$createMessage({
              type:'error',
              duration:3000,
              spinnerText:res.data.msg
            })
          }
      })
      }
    },
    onCancel() {
      this.$emit('update:show', false);
    },
   lookfetch(){
      const self = this;
      self.$axios.get(apis.l_getViews,{
        params:{
          pid: self.pid
        }
      }).then((res) => {
        const looklist = res.data;
         //console.log(res);
            if(looklist.success){
                //$("#auth_row").show();
                let result_Data = looklist.data;
                let auth_List = result_Data.list;
                if (auth_List != null) {
                    for(let i in auth_List){
                      auth_List[i].toUids_cut = this.cutString(auth_List[i].toUids, 24);
                    }

                    self.tablelook = auth_List;
                }
            }
            else {
              alert(looklist.msg);
            }
      });

    },
    cutString(str, len) {
        //length属性读出来的汉字长度为1
        if (str.length * 2 <= len) {
            return str;
        }
        var strlen = 0;
        var s = "";
        for (var i = 0; i < str.length; i++) {
            s = s + str.charAt(i);
            if (str.charCodeAt(i) > 128) {
                strlen = strlen + 2;
                if (strlen >= len) {
                    return s.substring(0, s.length - 1) + "...";
                }
            } else {
                strlen = strlen + 1;
                if (strlen >= len) {
                    return s.substring(0, s.length - 2) + "...";
                }
            }
        }
        return s;
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.swlogin-dialog{
  .content{
    .dialog-footer{
      margin: 16px 0px;
      height: 57px;
      text-align: center;
    }
  }
}
</style>

