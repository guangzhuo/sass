<template>
  <div class="attachment-view">
    <div class="attachment-box">
      <lvx-collapse class="attachment" @change="toggleFiles" v-model="fileList.length ? '1' : ''">
        <lvx-collapse-item name="1">
          <template slot="title">
            <div class="custome-title" v-text="text">
            </div>
          </template>
          <div class="files-box">
            <div class="at-file sas-float-left"  :title="file.fileName" v-for="file in fileList" >
              <span class="file-name sas-cursor-pointer" v-text="file.fileShowName" @click="viewClick(file.fileId)"></span>
              <i v-if="allowDel" class="icon iconfont lvx-icon-del sas-cursor-pointer" title="删除附件" @click="delClick(file.fileId)"></i>
            </div>
          </div>
        </lvx-collapse-item>
      </lvx-collapse>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'

export default {
  data () {
    return {
      text: '查看附件'
    }
  },
  computed: {
    ...mapState({
    })
  },
  props: {
    // labelText: {
    //   type: String,
    //   default: '查看附件'
    // },
    fileList: {
      type: Array,
      required: true
    },
    allowDel: {
      type: Boolean,
      default: true
    }

  },
  mounted () {
   
  },
  watch: {
    fileList(newVal, oldVal) {
      if(newVal.length && newVal != oldVal) {
        this.text = '收起附件';
      }
    }
  },
  mixins: [{
    methods: {
    }
  }],
  methods: {
    toggleFiles() {
      this.text === '查看附件' ? this.text = '收起附件' : this.text = '查看附件';
    },
    viewClick(id) {
      this.$emit('after-view', id);
    },
    delClick(id) {
      this.$emit('after-del', id);
    }
  },
  components: {
    
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~styles/base.scss";
  .attachment-view{
    @include responsive-default {
      .attachment-box{
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 100%;
        z-index: 999;
        background: rgba(214,223,238,.9);
        .attachment{
          padding: 0 calc(50% - 570px);
          .custome-title{
            background: rgba(214,223,238,.9);
          }
          .files-box{
            .file-name{
              display: inline-block;
              width: 150px;
            }
            .at-file{
              &:not(:last-child) {
                &:after{
                  content: '|';
                  margin-left: 5px;
                }
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .attachment-box{
    .attachment{
      .lvx-collapse-item__header{
        height: 25px;
        line-height: 25px;
        .lvx-collapse-item__arrow{
          line-height: 25px;
        }
      }
      .lvx-collapse-item__content{
        background: rgba(214,223,238,.9);
        overflow: hidden;
      }
    }
  }
</style>
