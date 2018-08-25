<script>
  export default {
    name: 'SasSteps',
    render(h){
      //设置竖版步骤条高度
      const sizeMap = {
        default: 'lvx-steps--default',
        medium: 'lvx-steps--medium',
        small: 'lvx-steps--small'
      }

      //将传递的属性对象拷贝给propslist对象
      const propslist = Object.assign({}, this.$props);

      //删除heightval属性
      delete propslist.heightval;
      const data = {
        attrs: propslist
      }

      //判断当direction为vertical或者heightval有值的时候才获取步骤条高度
      const sizevalue = {
        class: propslist.direction == 'vertical' && this.heightval? sizeMap[this.heightval]: '',
      }
      // debugger
      return (
        <div class="sas-steps" { ...sizevalue }>
          <lvx-steps { ...data }>
            {this.$slots.default}
          </lvx-steps>
        </div>
    );
    },
    data: function () {
      return{
      };
    },
    methods:{

    },
    props: {
      space: [Number, String],
      active: {
        type: Number,
        default: 1
      },
      direction: {
        type: String,
        default: 'horizontal'
      },
      alignCenter: Boolean,
      simple: Boolean,
      finishStatus: {
        type: String,
        default: 'finish'
      },
      processStatus: {
        type: String,
        default: 'process'
      },
      lineType: {
        type: String,
        default: 'solid'
      },
      heightval:{
        type: String,
        default: ''
      },
    },
  }
</script>
<style lang="scss" type="text/scss">
  @import "~styles/base.scss";
  .sas-steps{
    &.lvx-steps--default{
      height: 300px;
    }
    &.lvx-steps--medium{
      height: 600px;
    }
    &.lvx-steps--small{
      height: auto;
    }
  }
</style>
