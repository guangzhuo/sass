<script>
  export default {
    name: 'SasPagination',
    render (h) {
      const data = {
        attrs: this.$props
      }
      return (
        <div class="sas-pagination">
          <lvx-pagination
            layout="prev, pager, next"
            more-pages={this.morePages}
            more-style={this.moreStyle}
            pre-style={this.preStyle}
            next-style={this.nextStyle}
            pager-class="pager-style"
            pager-style={this.pagerStyle}
            active-class="page-active-style"
            active-style={this.pagerActiveStyle}
            {...data}
            on-current-change={this.currentChangeHandle}
            >
          </lvx-pagination>
        </div>
        );
    },
    data: function () {
      return {
        morePages: 5,
        pagerStyle: {
          width: '26px',
          minWidth: '26px',
          height: '26px',
          lineHeight: '26px',
          border: 'solid 1px #d9d9d9',
          borderRadius: '4px',
          fontSize: '12px',
          padding: '0'
        },
        pagerActiveStyle: {
          color: '#fff',
          backgroundColor: '#4081ff',
          border: 'none'
        },
        moreStyle: {
          marginRight: '5px',
          width: '26px',
          minWidth: '26px',
          height: '26px',
          lineHeight: '26px',
          border: 'solid 1px #d9d9d9',
          borderRadius: '4px',
          fontSize: '12px',
          padding: '0'
        },
        preStyle: {
          width: '26px',
          height: '26px',
          minWidth: '26px',
          border: 'solid 1px #d9d9d9',
          borderRadius: '4px',
          padding: '0',
          marginRight: '5px'
        },
        nextStyle: {
          width: '26px',
          height: '26px',
          minWidth: '26px',
          border: 'solid 1px #d9d9d9',
          borderRadius: '4px',
          padding: '0',
          marginLeft: '5px'
        }
      };
    },
    methods: {
      currentChangeHandle(v) {
        this.$emit('current-change', v)
      }
    },
    props: {
      pageSize: {
        type: Number,
        default: 10
      },
      small: Boolean,

      total: Number,

      pageCount: Number,

      currentPage: {
        type: Number,
        default: 1
      },

      pageSizes: {
        type: Array,
        default() {
          return [10, 20, 30, 40, 50, 100];
        }
      },

      popperClass: String,
    }
  };
</script>
<style lang="scss" type="text/scss" >
@import "~styles/base.scss";
  .sas-pagination{
    display: inline-block;

    .pager-style{
      &:not(:last-child){
        margin-right: 5px;
      }
    }
    .page-active-style{
      color: #fff;
      background-color: $theme-color;
      border: none;
    }
  }
</style>
