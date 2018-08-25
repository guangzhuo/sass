<script>
  export default {
    render() {
      return (
            <lvx-table data={this.tablelist} stripe style="width: 100%" header-row-class-name="con-th-d" >
                <lvx-table-column label="合同标题" width="300" scopedSlots={
                  {
                    default:  scope => {
                      return [<div class="con-title-d" title={scope.row.entitle}> {scope.row.title} { scope.row.appendix == 1 ? <span class="con-fj-d"></span> :'' }</div>,<div class="con-fo-d" title={scope.row.enuserName}> {scope.row.userName}</div>]
                    }
                  }}>
                </lvx-table-column>
                <lvx-table-column label="合同状态" width="450"
                  render-header={this.changestatus}
                  scopedSlots={{
                    default: scope => {


                        function format (data)
                        {
                          switch (data) {
                            case 0:
                              return <span style='color: #91b6ff'>可编辑</span>;
                              break;
                            case 1:
                              return <span style='color: #a4c3ff'>授权中</span>;
                              break;
                            case 2:
                              return <span style='color: #68bdff'>查看中</span>;
                              break;
                            case 3:
                              return <span style='color: #94afe2'>律师审查中</span>;
                              break;
                            case 4:
                              return <span style='color: #769eea'>待发送</span>;
                              break;
                            case 10:
                              return <span style='color: #7ae2ab'>我已签</span>;
                              break;
                            case 20:
                              return <span style='color: #6bcc94'>要我签</span>;
                              break;
                            case 30:
                              return <span style='color: #a9badb'>已提交</span>;
                              break;
                            case 31:
                              return <span style='color: #ffac40'>审查完成</span>;
                              break;
                            case 32:
                              return <span style='color: #ffac40'>签署完成</span>;
                              break;
                            case 33:
                              return <span style='color: #68bdff'>查看中</span>;
                              break;
                            case 40:
                              return <span style='color: #c3c3c3'>已撤回</span>;
                              break;
                            case 41:
                              return <span style='color: #c3c3c3'>被退回</span>;
                              break;
                            case 42:
                              return <span style='color: #c3c3c3'>被废弃</span>;
                              break;
                            default:
                              return <span style='color: #ec2626'>未知</span>;
                          }
                        }

                      return [<span style="margin-left: 10px">{format(scope.row.colsStatus)}</span>]
                    }
                  }}></lvx-table-column>
                <lvx-table-column prop="gmtModify" label="更新时间" width="450" render-header={this.changetime}> </lvx-table-column>
                <lvx-table-column label="合同操作" scopedSlots={{
                  default: (scope) => {
                    return [
                      <lvx-button type="text" onClick={this.checkrouter.bind(this,scope.row.id, scope.row.contractId)}>查看</lvx-button>,
                      <lvx-button type="text" onClick={this.inforouter.bind(this,scope.row.id, scope.row.contractId)}>合同信息</lvx-button>
                    ]
                  }
                }}>
                </lvx-table-column>
        </lvx-table>
      );
    },
    data: function () {
      return {
        statuslist:[{
          value: '', label: '全部',},
          {value:'0', label: '起草中',
            children:[{
              value:'0',
              label:'可编辑'
            },
              {
                value:'2',
                label:'查看中'
              },
              {
                value:'3',
                label:'律师审查中'
              },{
                value:'4',
                label:'待发送'
              }]
          },{
            value:'1',
            label:'等待他人的签名',
            children:[{
              value: '10',
              label:'我已签'
            }]
          },{
            value:'2',
            label:'需要我的签名',
            children:[{
              value:'20',
              label:'要我签'
            }]
          },
          {
            value:'3',
            label:'已完成',
            children:[{
              value:'30',
              label:'已提交'
            },{
              value:'31',
              label:'审查完成'
            },{
              value:'32',
              label:'签署完成'
            },{
              value:'33',
              label:'查看中'
            }]
          },{
            value:'4',
            label:'已作废',
            children:[{
              value:'40',
              label:'已撤回'
            },
              {
                value:'41',
                label:'被退回'
              },{
                value:'42',
                label:'被废弃'
              }]
          }],
        level: false,
        value10:'',
        value2: '',
        tablelist: this.$props.list,
        scheck:'none',
      };
    },
    methods: {
      clickHandle(){
        this.$emit('click')
      },
      changestatus(h, { column, $index }){


        return (
          <span>
          <span style="float: left;line-height: 40px;height: 40px;">合同状态

          <span class="dropdown">
          <button type="button" class="con-btn-d" id="dropdownMenu_w" onClick={this.statusUl}>
          请选择合同状态
          <span class="caret"></span>
          </button>
          <ul class="dropdown-menu pull-right pull-right-d home-text-h" style={{display: this.scheck}}>
          <li  id="AllContract_all_w" role="presentation" style="margin-top: 17px;">
          <a class="div-status" role="menuitem" tabindex="-1" onClick="getSelectState()" accesskey="" id="selectall" data-toggle="tab">全部</a>
          </li>
          <li id="AllContract_w" role="presentation">
          <a class="div-status" role="menuitem" tabindex="-1" onClick="getSelectState(0)" accesskey="0" id="selectDraft" data-toggle="tab">起草中</a>
          <ul class="hide-w manage-menu1-d">
          <li class="sub-menu-w" data-Status="0" onClick="manage_Menu(0,0,1)">可编辑</li>
          <li class="sub-menu-w" data-Status="2" onClick="manage_Menu(0,2,2)">查看中</li>
          <li class="sub-menu-w" data-Status="3" onClick="manage_Menu(0,3,3)">律师审查中</li>
          <li class="sub-menu-w" data-Status="4" onClick="manage_Menu(0,4,4)">待发送</li>
          </ul>
          </li>
          <li id="oneMonth_w" role="presentation">
          <a class="div-status" role="menuitem" tabindex="-1" onClick="getSelectState(1)" accesskey="1" id="selectWait" data-toggle="tab">等待他人的签名</a>
          <ul class="hide-w manage-menu2-d">
          <li class="sub-menu-w" data-Status="10" onClick="manage_Menu(1,10,5)">我已签</li>
          </ul>
          </li>
          <li id="twoMonth_w" role="presentation">
          <a class="div-status" role="menuitem" tabindex="-1" onClick="getSelectState(2)" accesskey="2" id="selectNeed" data-toggle="tab">需要我的签名</a>
          <ul class="hide-w manage-menu3-d">
          <li class="sub-menu-w" data-Status="20" onClick="manage_Menu(2,20,6)">要我签</li>
          </ul>
          </li>
          <li id="threeMonth_w" role="presentation">
          <a class="div-status" role="menuitem" tabindex="-1" onClick="getSelectState(3)" accesskey="3" id="selectFinish" data-toggle="tab">已完成</a>
          <ul class="hide-w manage-menu4-d">
          <li class="sub-menu-w" data-Status="30" onClick="manage_Menu(3,30,7)">已提交</li>
          <li class="sub-menu-w" data-Status="31" onClick="manage_Menu(3,31,8)">审查完成</li>
          <li class="sub-menu-w" data-Status="32" onClick="manage_Menu(3,32,9)">签署完成</li>
          <li class="sub-menu-w" data-Status="33" onClick="manage_Menu(3,33,10)">查看中</li>
          </ul>
          </li>
          <li id="sixMonth_w" role="presentation">
          <a class="div-status" role="menuitem" tabindex="-1" onClick="getSelectState(4)" accesskey="4" id="selectRevoc" data-toggle="tab">已作废</a>
          <ul class="hide-w manage-menu5-d">
          <li class="sub-menu-w" data-Status="40" onClick="manage_Menu(4,40,11)">已撤回</li>
          <li class="sub-menu-w" data-Status="41" onClick="manage_Menu(4,41,12)">被退回</li>
          <li class="sub-menu-w" data-Status="42" onClick="manage_Menu(4,42,13)">被废弃</li>
          </ul>
          </li>
          </ul>
          </span>
          </span>
         </span>
      );


        //'contract-select':contractselect
        /*return (
          <span>
            <span style="float: left;line-height: 40px;height: 40px;">合同状态</span>
          <contractselect name="hehe"></contractselect></span>
        );*/
        /*return (<span><span style="float: left;line-height: 40px;height: 40px;">合同状态</span><lvx-cascader
                  options={this.statuslist}
                  expand-trigger="hover"
                  change-on-select
                  size = "mini"
                  showAllLevels={this.level}
        onChange={this.hehe}></lvx-cascader></span>)*/
      },
      getSelectState:function(state){
        this.current_page=1;
        this.poffset=0;
        var _menu = $('#dropdownMenu_w');
        $("#status").val(state);

        if (state == ''||state == undefined || state == null) {
          _menu.html('全部<span class="caret"></span>');
        }
        if (state == '0') {
          _menu.html('起草中<span class="caret"></span>');
        }
        if (state == '1') {
          _menu.html('等待他人的签名<span class="caret"></span>');
        }
        if (state == '2') {
          _menu.html('需要我的签名<span class="caret"></span>');
        }
        if (state == '3') {
          _menu.html('已完成<span class="caret"></span>');
        }
        if (state == '4') {
          _menu.html('已作废<span class="caret"></span>');
        }
        this.searchstate=state;
        this.searchcolsSta="";
        this.confresh();
      },
      getSelectTime:function(time) {
        this.current_page=1;
        this.poffset=0;
        if (time == '1') {
          $('#dropdownMenu').html('一个月内<span class="caret"></span>');
        }
        if (time == '2') {
          $('#dropdownMenu').html('两个月内<span class="caret"></span>');
        }
        if (time == '3') {
          $('#dropdownMenu').html('三个月内<span class="caret"></span>');
        }
        if (time == '6') {
          $('#dropdownMenu').html('半年内<span class="caret"></span>');
        }
        if (time == '0') {
          $('#dropdownMenu').html('全部<span class="caret"></span>');
        }
        this.searchMonth=time;
        this.searchMonth == null ? 0 : this.searchMonth;
        //this.confresh();
      },
      statusUl(){
        this.scheck= 'block';
      },
      statushide(v){
        this.scheck = 'none';
      },
      hehe(val){
        this.$emit('refreshList');
        this.$store.commit('SET_STATUS', val);
       // console.log(val);
      },
      changetime(){
        const options = [{
            value1: '',
            label: '全部'
        },{
            value1:'1',
            label:'一个月内'
          },{
          value1:'2',
          label:'两个月内'
        },{
          value1:'3',
          label:'三个月内'
        },{
          value1:'4',
          label:'半年内'
        }];

        return (
          <span><span style="float: left;line-height: 40px;height: 40px;">更新时间</span>
          <lvx-select  placeholder="请选择" size="mini" v-model={this.value2}>
          { options.map((message) =><lvx-option key = {message.value1} label ={message.label} value={message.value1}></lvx-option>) }
          </lvx-select></span>
          )
      },
      checkrouter(pid, cid){
            //console.log(pid,cid);
        //this.$router.push({ name: 'manage-contract-contract-view', query: { pid: pid,cid: cid }});
          this.$router.push({ name: 'manage-contract-contract-view', params: { pid: pid,cid: cid }});
      },
      inforouter(pid, cid){
          //console.log(pid,cid);
          this.$router.push({ name: 'manage-contract-contract-message', params: { pid: pid,cid: cid }});
      },
    },
      manage_Menu:function(staTus,colsSta,Text){
        this.current_page=1;
        this.poffset=0;
        this.searchstate = staTus;
        this.searchcolsSta = colsSta;

        resetOff = true;
        //this.confresh();
        $(".div-status").removeClass("div-select");
        $(this).parent().siblings().addClass("div-select");
        window.scrollTo(0, 0);
        var drop_Id = $("#dropdownMenu_w");
        /*$(".pagination").find(".page-number").eq(0).addClass("active disabled");*/
        switch (Text) {
          case 1:
            return drop_Id.html("可编辑"+"<span class='caret'></span>");
          case 2:
            return drop_Id.html("查看中"+"<span class='caret'></span>");
          case 3:
            return drop_Id.html("律师审查中"+"<span class='caret'></span>");
          case 4:
            return drop_Id.html("待发送"+"<span class='caret'></span>");
          case 5:
            return drop_Id.html("我已签"+"<span class='caret'></span>");
          case 6:
            return drop_Id.html("要我签"+"<span class='caret'></span>");
          case 7:
            return drop_Id.html("已提交"+"<span class='caret'></span>");
          case 8:
            return drop_Id.html("审查完成"+"<span class='caret'></span>");
          case 9:
            return drop_Id.html("签署完成"+"<span class='caret'></span>");
          case 10:
            return drop_Id.html("查看中"+"<span class='caret'></span>");
          case 11:
            return drop_Id.html("已撤回"+"<span class='caret'></span>");
          case 12:
            return drop_Id.html("被退回"+"<span class='caret'></span>");
          case 13:
            return drop_Id.html("被废弃"+"<span class='caret'></span>");
          default:
            return drop_Id.html("全部"+"<span class='caret'></span>");
        }

      },
    props: {
      list:Array,
    }
  }
</script>
<style>
  .lvx-table__header-wrapper, .lvx-table__footer-wrapper{
    overflow-y: auto;
  }
  .lvx-table thead {
    font-size: 12px;
    color: #333;
    font-weight: 500;
  }
  .lvx-table th, .lvx-table td {
    padding: 0px 18px;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
  .lvx-table th > .cell{
    height: 40px;
    line-height: 40px;
  }
  .lvx-cascader__label{
    text-align: center;
    padding: 6px 25px 0 15px;
  }
  .lvx-input__suffix{
    right: 10px;
  }
 /* .lvx-table th div{
    width: 200px;
  }*/
  .lvx-table td{
    padding-left: 40px;
    height: 66px;
    font-size: 12px;
    border-bottom:none;
  }
  .lvx-table th{
    padding-left: 40px;
  }
  .dropdown {
    position: relative;
  }
  .con-btn-d{
    width: 140px;
    height: 24px;
    border: 1px solid #bccbdc;
    color: #959595;
    background-color: #fff;
    border-radius: 2px;
    padding-right: 20px;
    position: relative;
    font-size: 12px;
    font-weight: 400;
    margin: auto 10px;
    font-family: inherit;
    line-height: inherit;
    -webkit-appearance: button;
    cursor: pointer;
    text-transform: none;
    overflow: visible;
    line-height: 23px;
  }
  .con-btn-d .caret {
    position: absolute;
    right: 14px;
    top: 10px;
    display: inline-block;
    width: 7px;
    height: 7px;
    margin-top: -4px;
    border-top: 1px solid #000000;
    border-left: 1px solid #000000;
    transform: rotate(-135deg);
    border-right: none;
  }
  .dropdown-menu.pull-right {
    border-radius: 4px;
    top: 19px;
    left: 10px;
    border: 1px solid #f0f0f0;
    background-color: #fff;
    padding-bottom: 17px;
    background: #f7fbff;
  }
  .open>.dropdown-menu {
    display: block;
  }
  .dropdown-menu.pull-right {
    right: 0;
    left: auto;
  }
  .dropdown-menu {
    min-width: 140px;
    max-width: 140px;
    -webkit-box-shadow: 0 1px 6px rgba(0,0,0,.175);
    box-shadow: 0 1px 6px rgba(0,0,0,.175);
  }
  .home-text-h {
    font-size: 12px;
  }
  .pull-right {
    float: right!important;
  }
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    float: left;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    font-size: 14px;
    text-align: left;
    list-style: none;
    background-color: #fff;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid #ccc;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 0px;
    -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
  }
  .dropdown-menu>li>a {
    display: block;
    padding: 0 20px;
    clear: both;
    line-height: 28px;
    color: #333;
    white-space: nowrap;
    height: 28px;
  }
  a {
    text-decoration: none;
  }

  .lvx-table th,.lvx-table th div,.lvx-table,.lvx-table .cell{
    overflow: visible !important;
  }
</style>
<style lang="scss" scoped>
  .con-th-d {
    background-color: #e8f0f9;
    height: 40px;
  }


</style>
