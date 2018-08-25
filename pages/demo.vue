<template>
  <section class="row saas-demo">
    <div class="sas-tooltip-bottom">
      Tip hover here
      <span class="tooltiptext">aa</span>
    </div>
    <div style="width:200px;">
      <span class="sas-text-overflow">这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的描述文本。</span>
    </div>
    <sas-breadcrumb >
      <sas-breadcrumb-item :to="{ path: '/' }">首页</sas-breadcrumb-item>
      <sas-breadcrumb-item>活动管理</sas-breadcrumb-item>
      <sas-breadcrumb-item>活动列表</sas-breadcrumb-item>
      <sas-breadcrumb-item >活动详情</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div>
      <lvx-cascader
        :options="options1"
        v-model="selectedOptions"
       >
      </lvx-cascader>
      <sas-select  placeholder="请选择" :model="value" @change="change" >
        <sas-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </sas-option>
      </sas-select>
      <sas-select  placeholder="请选择" :model="value" >
        <sas-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </sas-option>
      </sas-select>
      <sas-button category="primary" @click="changeSelect" disabled>双皮奶</sas-button>
      <sas-button category="secondary" >次要按钮1</sas-button>
      <sas-button category="gray" >次要按钮</sas-button>
      <sas-button category="dotted" >次要按钮</sas-button>

      <sas-button category="primary" @click="changeSelect" size="medium" >双皮奶</sas-button>
      <sas-button category="secondary" size="medium">次要按钮</sas-button>
      <sas-button category="gray" size="medium">次要按钮</sas-button>
      <sas-button category="dotted" size="medium">次要按钮</sas-button>

      <sas-button category="primary" @click="changeSelect" size="small">双皮奶</sas-button>
      <sas-button category="secondary" size="small">次要按钮</sas-button>
      <sas-button category="gray" size="small">次要按钮</sas-button>
      <sas-button category="dotted" size="small">次要按钮</sas-button>

      <sas-button category="primary" icon="lvx-icon-search">搜索</sas-button>
      <lvx-radio-group v-model="radio2" >
        <lvx-radio disabled :label="3" class="sas-radio">备选项</lvx-radio>
        <lvx-radio  :label="6" class="sas-radio">备选项</lvx-radio>
        <lvx-radio  :label="9" class="sas-radio">备选项</lvx-radio>
      </lvx-radio-group>
      <lvx-checkbox-group v-model="checkList" >
        <lvx-checkbox label="复选框 A" class="sas-checkbox"></lvx-checkbox>
        <lvx-checkbox label="复选框 B" class="sas-checkbox"></lvx-checkbox>
        <lvx-checkbox label="复选框 C" class="sas-checkbox"></lvx-checkbox>
        <lvx-checkbox label="禁用" class="sas-checkbox" disabled></lvx-checkbox>
        <lvx-checkbox label="选中且禁用" class="sas-checkbox" disabled></lvx-checkbox>
      </lvx-checkbox-group>
      <sas-button category="primary" @click="openLoading">打开loading</sas-button>
      <sas-button category="primary" @click="openLoading('正在读取数据，请稍等')">打开自定义内容loading</sas-button>
      <sas-button category="primary" @click="openConfirm">打开confirm</sas-button>
      <sas-confirm
        :isShow.sync="confirmisShow"
        type="info"
        title="确定要修改您的手机号码吗？"
        smallTitle="请修改后您将收不到信息提示"
        enBtnFont="左按钮"
        catchBtnFont="右按钮"
        leftBtnType="success"
        rightBtnType="info"
        @enSure="enSureConfirm"
        @cancel="cancelConfirm"
      >
        <div>SLOT</div>
      </sas-confirm>
    </div>

    <div>
      <lvx-table
        :data="tableData"
        style="width: 100%"

      >
        <lvx-table-column
          label="日期"
          :renderHeader="renderHeader"
          header-align="center"
        >
          <template slot-scope="scope">
            <i class="lvx-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </lvx-table-column>
        <lvx-table-column
          label="姓名"
          width="180">
          <template slot-scope="scope">
            <lvx-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <lvx-tag size="medium">{{ scope.row.name }}</lvx-tag>
              </div>
            </lvx-popover>
          </template>
        </lvx-table-column>
        <lvx-table-column label="操作">
          <template slot-scope="scope">
            <lvx-button type="text">编辑</lvx-button>
            <lvx-button type="text">删除</lvx-button>

          </template>
        </lvx-table-column>
      </lvx-table>
      <sas-pagination :total="total" @current-change="pageChange"></sas-pagination>
      <div>
        <sas-steps :active="active1" align-center	 :line-type="lineType1">
          <sas-step title="选择合同" icon="lvx-icon-edit"></sas-step>
          <sas-step title="资料提交" icon="lvx-icon-upload"></sas-step>
          <sas-step title="支付" icon="lvx-icon-service"></sas-step>
          <sas-step title="受理成功" icon="lvx-icon-picture"></sas-step>
        </sas-steps>
        <lvx-steps :active="active1" align-center  :line-type="lineType1">
          <lvx-step title="选择合同" icon="lvx-icon-edit"></lvx-step>
          <lvx-step title="资料提交" icon="lvx-icon-upload"></lvx-step>
          <lvx-step title="支付" icon="lvx-icon-service"></lvx-step>
          <lvx-step title="受理成功" icon="lvx-icon-picture"></lvx-step>
        </lvx-steps>
      </div>
      <div style="margin: 20px 30px;">
        <sas-steps :active="active2" align-center heightval="medium"	direction="vertical" :line-type="lineType2">
          <sas-step title="选择合同" description="222"></sas-step>
          <sas-step title="资料提交" description="444"></sas-step>
          <sas-step title="支付" description="555"></sas-step>
        </sas-steps>
      </div>
      <div>
        <sas-button category="primary" @click="open1">消息</sas-button>
        <sas-button category="gray" @click="open2">成功</sas-button>
        <sas-button category="secondary" @click="open3">警告</sas-button>
        <sas-button category="dotted" @click="open4">失败</sas-button>
      </div>
      <div class="user-img">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <lvx-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          @success="handleAvatarSuccess"
        >
          <i class="lvx-icon-setting"></i>修改头像
        </lvx-upload>
      </div>
    </div>

    <lvx-row>
      <lvx-col :span="12">
        <sas-button category="primary" @click="centerDialogVisible = true">点击打开dialog</sas-button>
        <sas-dialog
          :show.sync="centerDialogVisible"
          title="本地上传"
          width="30%"
        >
          <div >自定义内容</div>
        </sas-dialog>
      </lvx-col>

      <lvx-col :span="12">
        <sas-input placeholder="请输入内容" disabled :model="inputM1"></sas-input>
        <sas-input placeholder="请输入内容"  :model.sync="inputM"></sas-input>
        <sas-button category="primary" @click="print">打印</sas-button>
      </lvx-col>
    </lvx-row>

    <div class="form-panel">
      <lvx-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <lvx-form-item label="活动名称" prop="name">
          <sas-input :model.sync="ruleForm.name" ></sas-input>
        </lvx-form-item>
      </lvx-form>
    </div>

  </section>

</template>

<script>

  export default {
    name: 'demo',
    metaInfo: {
      title: '示例'
    },
    data () {
      return {
        selectedOptions: [],
        options1: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        confirmisShow: false,
        centerDialogVisible: false,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        radio2: 6,
        checkList: ['选中且禁用', '复选框 A'],
        total: 1000,
        active1: 1,
        active2: 2,
        imageUrl: require('~/assets/img/src/home/defaultAvat.png'),
        lineType1: 'dashed',
        lineType2: 'solid',
        inputM: '123',
        inputM1: '',
        ruleForm: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created () {

    },
    computed: {

    },
    watch: {
    },
    mounted () {
    },
    methods: {
      renderHeader(h, {column, $index, store, _self}){
        return <span>{column.label}</span>
      },
      change(v) {
        console.log(v)
      },
      changeSelect() {
        this.value = '选项2'
      },
      openLoading(text) {
        const loading = this.$createLoading({
          spinnerText: text ? text : ''
        })
        setTimeout(()=>{
          loading.close()
        }, 2000)
      },
      open1(){
        const message = this.$createMessage({
          type:'info',
          duration:3000,
          spinnerText:'这是一条消息提示'
        })
      },
      open2(){
        const message = this.$createMessage({
          type:'success',
          duration:3000,
          spinnerText:'恭喜你，这是一条成功消息'
        })
      },
      open3(){
        const message = this.$createMessage({
          type:'warning',
          duration:3000,
          spinnerText:'这是一条消息提示'
        })
      },
      open4(){
        const message = this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText:'错了哦，这是一条错误消息'
        })
      },
      pageChange(v) {
        console.log(v)
      },
      handleAvatarSuccess(v){
        console.log(v);
      },
      print() {
        this.inputM = ''
        console.log(this.inputM);
      },
      openConfirm() {
        this.confirmisShow = true
      },
      enSureConfirm() {
        console.log("确定")
      },
      cancelConfirm() {
        console.log("取消")
      }
    },
    components: {
    }

  }
</script>

<style lang="scss"  scoped >
  @import "~styles/base.scss";
  .saas-demo{
    // min-height: 100vh;
    margin-top: 67px;
    .user-img{
      display: inline-block;
      width: 80px;
      .avatar{
        width: 100%;
        height: auto;
        border-radius: 80px;
        border: 2px solid #d9d9d9;
      }
      .avatar-uploader{
        text-align: center;
        margin-top: 5px;
        .lvx-upload {
          font-size: 12px;
          color: #959595;
        }
      }

    }
  }
</style>
