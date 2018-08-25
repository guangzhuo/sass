<template>
  <div class="contract-edit-yasha">
    <div class="content-wraper">
      <div class="content-top edit-handle clearfix">
        <div class="top-row">
          <!-- <span class="btn-item item-save">
            <sas-button category="primary" size="medium" >保存</sas-button>
          </span> -->
          <span class="btn-item item-sign" @click="doSign" @mouseover="activeToolsBtn = 'sign'" @mouseleave="activeToolsBtn = ''">
            <span class="">
              <i :class="['iconsprite', activeToolsBtn == 'sign' ? 'icon-btn-sign-b' : 'icon-btn-sign-g']"></i>
            </span>
            <br/>
            <span>签署</span>
          </span>
          <span class="btn-item item-send" @click="doSend" @mouseover="activeToolsBtn = 'send'" @mouseleave="activeToolsBtn = ''">
            <span>
              <i :class="['iconsprite', activeToolsBtn == 'send' ? 'icon-btn-send-b' : 'icon-btn-send-g']"></i>
            </span>
            <br/>
            <span>发送</span>
          </span>
        </div>
      </div>
      <div class="editor-panel">
        <header class="sas-position-relative">
          <lvx-input :input-style="inputBorderStyle" placeholder="请输入合同标题" v-model="title" readonly></lvx-input>
        </header>
        <div class="editor-edit">

          <p><br></p><p><span style="font-size:16px">&nbsp;</span></p><p style="text-align:center"><b><span style="font-size:24px;font-family:黑体">蘑菇加整体家装服务合同</span></b></p><p><span style="font-size:16px">&nbsp;</span></p><p><span style="font-size:16px">&nbsp;</span></p>
          <div style="margin-left:32px">
            <p><b><span style="font-size:14px;font-family:黑体">甲方：（姓名）</span></b><u><span style="font-size: 13px;font-family:仿宋">

              <span @focus="inputFocus('anameFocus', aname)" :class="{'border-input': !isSubmited && !aname}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:110px;text-indent: initial;" :style="anameFocus" contenteditable="true" @input="setFormItem($event, 'aname')" @blur="inputBlur('anameFocus', aname, '1px')"></span>

              <!-- <span id="aname" v-else style="display:inline-block;min-width:110px;text-decoration: underline;" contenteditable="true" @blur="aname? '': anameFocus = false"  @input="setFormItem($event, 'aname')"></span> -->
            </span>
            </u><span style="font-size:13px;font-family:仿宋">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="font-size:14px;font-family:黑体">身份证号：</span></b><u>
            <span style="font-size:13px;font-family:仿宋">
              <span @focus="inputFocus('acidFocus', acid)" :class="{'border-input': !isSubmited && !acid}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:230px;text-indent: initial;border-bottom:1px solid;" :style="acidFocus" contenteditable="true" @input="setFormItem($event, 'acid')" @blur="inputBlur('acidFocus', acid, '1px')"></span>

              <!-- <span id="acid" v-else style="display:inline-block;min-width:230px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'acid')" @blur="acid? '': acidFocus = false"></span> -->
            </span>
            </u></p><p><span style="font-size:16px">&nbsp;</span></p><p><b><span style="font-size:14px;font-family:黑体">现居住地详细地址：</span></b><u>

              <span @focus="inputFocus('aaddressFocus', aaddress)" :class="{'border-input': !isSubmited && !aaddress}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:230px;text-indent: initial;border-bottom:1px solid;" :style="aaddressFocus" contenteditable="true" @input="setFormItem($event, 'aaddress')" @blur="inputBlur('aaddressFocus', aaddress, '1px')"></span>

              <!-- <span id="aaddress" v-else style="font-size:13px;font-family: 仿宋;display:inline-block;min-width:230px;text-decoration: underline;" contenteditable="true" @blur="aaddress? '': aaddressFocus = false" @input="setFormItem($event, 'aaddress')"></span> -->
            </u></p><p><span style="font-size:16px">&nbsp;</span></p><p><b><span style="font-size:14px;font-family:黑体">联系电话：</span></b><u>

              <span @focus="inputFocus('aphoneFocus', aphone)" :class="{'border-input': !isSubmited && !aphone}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:180px;text-indent: initial;border-bottom:1px solid;" :style="aphoneFocus" contenteditable="true" @input="setFormItem($event, 'aphone')" @blur="inputBlur('aphoneFocus', aphone, '1px')"></span>

              <!-- <span id="aphone" v-else  style="font-size: 13px;font-family:仿宋;display:inline-block;min-width:180px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'aphone')" @blur="aphone? '': aphoneFocus = false"></span> -->
            </u><span style="font-size:13px;font-family:仿宋">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="font-size:14px;font-family:黑体">电子邮箱：</span></b><u>

              <span @focus="inputFocus('aemailFocus', aemail)" :class="{'border-input': !isSubmited && !aemail}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:180px;text-indent: initial;border-bottom:1px solid;" :style="aemailFocus" contenteditable="true" @input="setFormItem($event, 'aemail')" @blur="inputBlur('aemailFocus', aemail, '1px')"></span>

              <!-- <span id="aemail" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:180px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'aemail')" @blur="aemail? '': aemailFocus = false"></span> -->
            </u></p><p><span style="font-size:16px">&nbsp;</span></p><p><b><span style="font-size:14px;font-family:黑体">乙方：蘑菇加城市运营商<span>&nbsp;&nbsp;&nbsp;&nbsp; </span>即：</span></b><u>

              <span @focus="inputFocus('bnameFocus', bname)" :class="{'border-input': !isSubmited && !bname}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:186px;text-indent: initial;border-bottom:1px solid;" :style="bnameFocus" contenteditable="true" @input="setFormItem($event, 'bname')" @blur="inputBlur('bnameFocus', bname, '1px')"></span>

              <!-- <span id="bname" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:186px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'bname')" @blur="bname? '': bnameFocus = false"></span> -->
            </u></p><p><span style="font-size:16px">&nbsp;</span></p><p><b><span style="font-size:14px;font-family:黑体">委托代理人：</span></b><u>

              <span @focus="inputFocus('bagentFocus', bagent)" :class="{'border-input': !isSubmited && !bagent}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:106px;text-indent: initial;border-bottom:1px solid;" :style="bagentFocus" contenteditable="true" @input="setFormItem($event, 'bagent')" @blur="inputBlur('bagentFocus', bagent, '1px')"></span>

            <!--  <span id="bagent" v-else style="font-size:13px;font-family: 仿宋;display:inline-block;min-width:106px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'bagent')" @blur="bagent? '': bagentFocus = false"></span> -->
            </u><span style="font-size:13px;font-family:仿宋">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="font-size:14px;font-family:黑体">联系电话：</span></b><u>

              <span @focus="inputFocus('bphoneFocus', bphone)" :class="{'border-input': !isSubmited && !bphone}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:106px;text-indent: initial;border-bottom:1px solid;" :style="bphoneFocus" contenteditable="true" @input="setFormItem($event, 'bphone')" @blur="inputBlur('bphoneFocus', bphone, '1px')"></span>

              <!-- <span id="bphone" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:106px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'bphone')" @blur="bphone? '': bphoneFocus = false"></span> -->
            </u></p><p><span style="font-size:16px">&nbsp;</span></p><p><b><span style="font-size:14px;font-family:黑体">丙方：浙江蘑菇加电子商务有限公司</span></b></p><p><span style="font-size:16px">&nbsp;</span></p><p><b><span style="font-size:14px;font-family:黑体">委托代理人：</span></b><u>
              <span @focus="inputFocus('cagentFocus', cagent)" :class="{'border-input': !isSubmited && !cagent}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:174px;text-indent: initial;border-bottom:1px solid" :style="cagentFocus" contenteditable="true" @input="setFormItem($event, 'cagent')" @blur="inputBlur('cagentFocus', cagent, '1px')"></span>

              <!-- <span id="cagent" v-else style="font-size:13px;font-family: 仿宋;display:inline-block;min-width:174px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'cagent')" @blur="cagent? '': cagentFocus = false"></span> -->
            </u><span style="font-size:13px;font-family:仿宋">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="font-size:14px;font-family:黑体">联系电话：</span></b><u>

              <span @focus="inputFocus('cphoneFocus', cphone)" :class="{'border-input': !isSubmited && !cphone}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:170px;text-indent: initial;border-bottom:1px solid;" :style="cphoneFocus" contenteditable="true" @input="setFormItem($event, 'cphone')" @blur="inputBlur('cphoneFocus', cphone, '1px')"></span>

              <!-- <span id="cphone" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:170px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'cphone')" @blur="cphone? '': cphoneFocus = false"></span> -->
            </u></p><p><span style="font-size:16px">&nbsp;</span></p><p><span style="font-size:16px">&nbsp;</span></p>
          </div>
          <p style="margin-left:8px;line-height:19px;text-indent:0;">
            <span style="font-size:14px;font-family:仿宋">
              &nbsp;&nbsp;&nbsp;&nbsp;鉴于丙方拥有互联网家装蘑菇加品牌，负责蘑菇加品牌的管理与技术支持， 甲、乙、丙三方经友好协商，依照《中华人民共和

国合同法》、《中华人民共和国消费者权益保护法》等有关法律、法规的规定，在平等、自愿、公平、诚实信用的基础上和丙方蘑菇加品牌管理体系的指导下，就乙方承包甲方的家庭居室硬装工程、软装、智装、家电等整体装修工程（以下简称“工程”或“项目”）有关事宜，达成如下协议：
              </span></p>
          <div class="one-title" style="margin-left:-24px;">
            <p data-v-39e231d3="" style="line-height: 21px;"><span data-v-39e231d3="" style="font-size: 16px;">&nbsp;</span></p>
              <p style="margin-left:56px;line-height:16px"><b><span style="font-size:14px;font-family:黑体">一、</span></b><span style="font-size:13px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="font-size:14px;font-family:黑体">工程概况</span></b></p><p style="line-height:21px"><span style="font-size:16px">&nbsp;</span></p>
              <p style="margin-left:57px;line-height: 16px"><span style="font-size:14px;font-family:仿宋">1.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">甲方装修住房系合法居住用房。</span></p><p style="line-height:16px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style="margin-left:57px;text-indent:0;line-height:16px"><span style="font-size:14px;font-family:仿宋">2.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">工程地点：</span><u>

                <span @focus="inputFocus('pprovinceFocus', pprovince)" :class="{'border-input': !isSubmited && !pprovince}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:54px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="pprovinceFocus" contenteditable="true" @input="setFormItem($event, 'pprovince')" @blur="inputBlur('pprovinceFocus', pprovince, '1px')"></span>

                <!-- <span id="pprovince" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:54px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'pprovince')"  @blur="pprovince? '': pprovinceFocus = false"></span> -->
                </u><span style="font-size:14px;font-family:仿宋">省</span><u>
                <!-- <input type="text" v-if="!pcityFocus" name="" @focus="inputFocus('pcityFocus', 'pcity')" style="padding:0;width:60px;border: none;border-bottom: 1px solid;"/> -->

                <span @focus="inputFocus('pcityFocus', pcity)" :class="{'border-input': !isSubmited && !pcity}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:60px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="pcityFocus" contenteditable="true" @input="setFormItem($event, 'pcity')" @blur="inputBlur('pcityFocus', pcity, '1px')"></span>

                <!-- <span id="pcity" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:60px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'pcity')" @blur="pcity? '': pcityFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">市</span><u>

                <span @focus="inputFocus('pareaFocus', parea)" :class="{'border-input': !isSubmited && !parea}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:110px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="pareaFocus" contenteditable="true" @input="setFormItem($event, 'parea')" @blur="inputBlur('pareaFocus', parea, '1px')"></span>
                <!-- <span id="parea" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:110px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'parea')" @blur="parea? '': pareaFocus = false"></span> -->
              </u><span style="font-size: 14px;font-family:仿宋">区</span><u>

                <span @focus="inputFocus('proadFocus', proad)" :class="{'border-input': !isSubmited && !proad}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:106px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="proadFocus" contenteditable="true" @input="setFormItem($event, 'proad')" @blur="inputBlur('proadFocus', proad, '1px')"></span>

              <!--  <span id="proad" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:106px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'proad')" @blur="proad? '': proadFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">路</span><u>

                <span @focus="inputFocus('phousenumberFocus', phousenumber)" :class="{'border-input': !isSubmited && !phousenumber}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:50px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="phousenumberFocus" contenteditable="true" @input="setFormItem($event, 'phousenumber')" @blur="inputBlur('phousenumberFocus', phousenumber, '1px')"></span>

                <!-- <span id="phousenumber" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:50px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'phousenumber')" @blur="phousenumber? '': phousenumberFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">号</span><u>

                <span @focus="inputFocus('phouseFocus', phouse)" :class="{'border-input': !isSubmited && !phouse}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:132px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="phouseFocus" contenteditable="true" @input="setFormItem($event, 'phouse')" @blur="inputBlur('phouseFocus', phouse, '1px')"></span>


              <!--  <span id="phouse" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:132px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'phouse')" @blur="phouse? '': phouseFocus = false"></span> -->
              </u><span style="font-size: 14px;font-family:仿宋">小区</span><u>

                <span @focus="inputFocus('pbuildingFocus', pbuilding)" :class="{'border-input': !isSubmited && !pbuilding}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:32px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="pbuildingFocus" contenteditable="true" @input="setFormItem($event, 'pbuilding')" @blur="inputBlur('pbuildingFocus', pbuilding, '1px')"></span>
    <!--
                <span id="pbuilding" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:32px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'pbuilding')" @blur="pbuilding? '': pbuildingFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">幢</span><u>

                <span @focus="inputFocus('punitFocus', punit)" :class="{'border-input': !isSubmited && !punit}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:32px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="punitFocus" contenteditable="true" @input="setFormItem($event, 'punit')" @blur="inputBlur('punitFocus', punit, '1px')"></span>

                <!-- <span id="punit" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:32px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'punit')" @blur="punit? '': punitFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">单元</span><u>

                <span @focus="inputFocus('pfloorFocus', pfloor)" :class="{'border-input': !isSubmited && !pfloor}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:32px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="pfloorFocus" contenteditable="true" @input="setFormItem($event, 'pfloor')" @blur="inputBlur('pfloorFocus', pfloor, '1px')"></span>

              <!--  <span id="pfloor" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:32px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'pfloor')" @blur="pfloor? '': pfloorFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">室。</span></p><p style="line-height:16px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style="margin-left:57px;text-indent:0;line-height:16px"><span style="font-size:14px;font-family:仿宋">3.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">工程户型结构：</span><u>

                <span @focus="inputFocus('proomFocus', proom)" :class="{'border-input': !isSubmited && !proom}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="proomFocus" contenteditable="true" @input="setFormItem($event, 'proom')" @blur="inputBlur('proomFocus', proom, '1px')"></span>

                <!-- <span id="proom" v-else style="font-size: 13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'proom')" @blur="proom? '': proomFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">室</span><u>

                <span @focus="inputFocus('phallFocus', phall)" :class="{'border-input': !isSubmited && !phall}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="phallFocus" contenteditable="true" @input="setFormItem($event, 'phall')" @blur="inputBlur('phallFocus', phall, '1px')"></span>

                <!-- <span id="phall" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'phall')" @blur="phall? '': phallFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">厅</span><u>

                <span @focus="inputFocus('pkitchenFocus', pkitchen)" :class="{'border-input': !isSubmited && !pkitchen}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="pkitchenFocus" contenteditable="true" @input="setFormItem($event, 'pkitchen')" @blur="inputBlur('pkitchenFocus', pkitchen, '1px')"></span>

                <!-- <span id="pkitchen" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'pkitchen')" @blur="pkitchen? '': pkitchenFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">厨</span><u>

                <span @focus="inputFocus('ptoiletFocus', ptoilet)" :class="{'border-input': !isSubmited && !ptoilet}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="ptoiletFocus" contenteditable="true" @input="setFormItem($event, 'ptoilet')" @blur="inputBlur('ptoiletFocus', ptoilet, '1px')"></span>

                <!-- <span id="ptoilet" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'ptoilet')" @blur="ptoilet? '': ptoiletFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">卫</span><u>

                <span @focus="inputFocus('pbalconyFocus', pbalcony)" :class="{'border-input': !isSubmited && !pbalcony}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="pbalconyFocus" contenteditable="true" @input="setFormItem($event, 'pbalcony')" @blur="inputBlur('pbalconyFocus', pbalcony, '1px')"></span>

                <!-- <span id="pbalcony" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'pbalcony')" @blur="pbalcony? '': pbalconyFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">阳台。住宅房屋的建筑面积：</span><u>

                <span @focus="inputFocus('psquaremetreFocus', psquaremetre)" :class="{'border-input': !isSubmited && !psquaremetre}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:56px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="psquaremetreFocus" contenteditable="true" @input="setFormItem($event, 'psquaremetre')" @blur="inputBlur('psquaremetreFocus', psquaremetre, '1px')"></span>

                <!-- <span id="psquaremetre" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:56px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'psquaremetre')" @blur="psquaremetre? '': psquaremetreFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">平方米。</span></p><p style="line-height:23px"><span style="font-size:16px">&nbsp;</span></p><p style=";margin-right:7px;margin-left:28px;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;text-indent:28px;line-height:21px"><span style="font-size:14px;font-family:仿宋">4.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">工程内容：甲方选择丙方标准化的家装设计方案和材料配置方案，由乙方提供材料（包含物料产品，乙方提供材料以附件《工程预算清单》（含材料配置）为准），且选择乙方提供家装施工服务；工程竣工验收后，由乙方提供后期维保服务。</span></p><p style="line-height:22px"><span style="font-size:16px">&nbsp;</span></p>
              <p class="MsoListParagraph" style="margin-left:28px;line-height:16px;margin-bottom: 0px;text-align: justify;text-indent: 28px;line-height: 21px;">
                <span style="font-size:14px;font-family:仿宋">
                  5.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp;</span>
                </span>
                <span style="font-size:14px;font-family:仿宋">甲方选择丙方的家居整体解决方案为：</span>
              <u>
                <span @focus="inputFocus('pseriesFocus', pseries)" :class="{'border-input': !isSubmited && !pseries}" style="text-underline-position: under;line-height:19px;font-size:19px;font-family:黑体;display:inline-block;min-width:130px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="pseriesFocus" contenteditable="true" @input="setFormItem($event, 'pseries')" @blur="inputBlur('pseriesFocus', pseries, '1px')"></span>
              </u><span style="font-size:14px;font-family:仿宋">（系列）。深化设计及施工图纸由乙方在丙方设计方案的基础上提供，图纸一式二份，由甲方和乙方确认图纸内容，详见附件《工程设计图纸》。新增套餐外设计费由甲方与乙方另行书面确认并由乙方抄送给丙方，各方据此调整工程装修总价款（详见附件：《工程预算清单》（含材料配置））。</span></p>
              <p class="MsoListParagraph" style="text-indent:27px"><span style="font-size:13px">&nbsp;</span></p>
              <!-- <p class="MsoListParagraph" style="text-indent:27px"><span style="font-size:13px">&nbsp;</span></p>
              <p class="MsoListParagraph" style="text-indent:27px"><span style="font-size:13px">&nbsp;</span></p>
              <p class="MsoListParagraph" style="text-indent:27px"><span style="font-size:13px">&nbsp;</span></p>
              <p class="MsoListParagraph" style="text-indent:27px"><span style="font-size:13px">&nbsp;</span></p>
              <p style="text-align:center;line-height:11px"><br></p> -->
              <p class="MsoListParagraph" style="margin-left:28px;line-height:16px;margin-bottom: 0px;text-align: justify;text-indent: 28px;line-height: 21px;">
                <span style="font-size:13px">
                  6.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp;</span>
                </span>
                <span style="font-size:14px;font-family:仿宋">总工期为</span><u>

                <span @focus="inputFocus('pdaysFocus', pdays)" :class="{'border-input': !isSubmited && !pdays}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="pdaysFocus" contenteditable="true" @input="setFormItem($event, 'pdays')" @blur="inputBlur('pdaysFocus', pdays, '1px')"></span>

              <!--  <span id="pdays" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'pdays')" @blur="pdays? '': pdaysFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">日。开工日期：</span><u>

                <span @focus="inputFocus('psyearFocus', psyear)" :class="{'border-input': !isSubmited && !psyear}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="psyearFocus" contenteditable="true" @input="setFormItem($event, 'psyear')" @blur="inputBlur('psyearFocus', psyear, '1px')"></span>
    <!--
                <span id="psyear" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'psyear')" @blur="psyear? '': psyearFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">年</span><u>

                <span @focus="inputFocus('psmonthFocus', psmonth)" :class="{'border-input': !isSubmited && !psmonth}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="psmonthFocus" contenteditable="true" @input="setFormItem($event, 'psmonth')" @blur="inputBlur('psmonthFocus', psmonth, '1px')"></span>

                <!-- <span id="psyear" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'psmonth')" @blur="psmonth? '': psmonthFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">月</span><u>

                <span @focus="inputFocus('psdayFocus', psday)" :class="{'border-input': !isSubmited && !psday}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="psdayFocus" contenteditable="true" @input="setFormItem($event, 'psday')" @blur="inputBlur('psdayFocus', psday, '1px')"></span>

                <!-- <span id="psday" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'psday')" @blur="psday? '': psdayFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">日；竣工日期：</span><u>

                <span @focus="inputFocus('peyearFocus', peyear)" :class="{'border-input': !isSubmited && !peyear}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="peyearFocus" contenteditable="true" @input="setFormItem($event, 'peyear')" @blur="inputBlur('peyearFocus', peyear, '1px')"></span>

                <!-- <span id="peyear" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'peyear')" @blur="peyear? '': peyearFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">年</span><u>

                <span @focus="inputFocus('pemonthFocus', pemonth)" :class="{'border-input': !isSubmited && !pemonth}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="pemonthFocus" contenteditable="true" @input="setFormItem($event, 'pemonth')" @blur="inputBlur('pemonthFocus', pemonth, '1px')"></span>

            <!--    <span id="pemonth" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'pemonth')" @blur="pemonth? '': pemonthFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">月</span><u>

                <span @focus="inputFocus('pedayFocus', peday)" :class="{'border-input': !isSubmited && !peday}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="pedayFocus" contenteditable="true" @input="setFormItem($event, 'peday')" @blur="inputBlur('pedayFocus', peday, '1px')"></span>

                <!-- <span id="peday" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;" contenteditable="true" @input="setFormItem($event, 'peday')" @blur="peday? '': pedayFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">日；开工日期需要变更的，以开工确认单为准，竣工日期相应顺延。</span></p><p style="line-height:1px"><span style="font-size:16px">&nbsp;</span></p><p style="line-height:23px"><span style="font-size:13px">&nbsp;</span></p><p style=";margin-right:7px;margin-left:28px;margin-bottom:0;text-indent:28px;line-height:19px"><span style="font-size:14px;font-family:仿宋">7.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">合同实施中遇法定主要节假日或物业、政府部门要求的禁止施工日时，由此造成的合同无法正常执行，甲乙双方均不承担任何责任，工期应相应顺延。</span></p><p style="line-height:20px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:56px;line-height:16px"><b><span style="font-size:14px;font-family:黑体">二、</span></b><span style="font-size:13px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="font-size:14px;font-family:黑体">合同价款</span></b></p><p style="line-height:20px"><span style="font-size:13px">&nbsp;</span></p><p style="text-indent:28px;line-height:20px;margin-left:30px;"><span style="font-size:14px;font-family:仿宋">工程装修总价款为￥</span><u>

                <span @focus="inputFocus('ptotalFocus', ptotal)" :class="{'border-input': !isSubmited && !ptotal}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:60px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="ptotalFocus" contenteditable="true" @input="setFormItem($event, 'ptotal')" @blur="inputBlur('ptotalFocus', ptotal, '1px')"></span>

                <!-- <span id="ptotal" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:60px;text-decoration: underline;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'ptotal')" @blur="ptotal? '': ptotalFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">元，大写金额为：</span><u>

                <span @focus="inputFocus('pmillionunitFocus', pmillionunit)" :class="{'border-input': !isSubmited && !pmillionunit}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="pmillionunitFocus" contenteditable="true" @input="setFormItem($event, 'pmillionunit')" @blur="inputBlur('pmillionunitFocus', pmillionunit, '1px')"></span>

              <!--  <span id="pmillionunit" v-else style="font-size:13px;font-family: 仿宋;display:inline-block;min-width:30px;text-decoration: underline;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'pmillionunit')" @blur="pmillionunit? '': pmillionunitFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">佰</span><u>

                <span @focus="inputFocus('phundredthousandunitFocus', phundredthousandunit)" :class="{'border-input': !isSubmited && !phundredthousandunit}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="phundredthousandunitFocus" contenteditable="true" @input="setFormItem($event, 'phundredthousandunit')" @blur="inputBlur('phundredthousandunitFocus', phundredthousandunit, '1px')"></span>

              <!--  <span id="phundredthousandunit" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'phundredthousandunit')" @blur="phundredthousandunit? '': phundredthousandunitFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">拾</span><u>

                <span @focus="inputFocus('ptenthousandunitFocus', ptenthousandunit)" :class="{'border-input': !isSubmited && !ptenthousandunit}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="ptenthousandunitFocus" contenteditable="true" @input="setFormItem($event, 'ptenthousandunit')" @blur="inputBlur('ptenthousandunitFocus', ptenthousandunit, '1px')"></span>

              <!--  <span id="ptenthousandunit" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'ptenthousandunit')" @blur="ptenthousandunit? '': ptenthousandunitFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">万</span><u>

                <span @focus="inputFocus('pthousandunitFocus', pthousandunit)" :class="{'border-input': !isSubmited && !pthousandunit}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="pthousandunitFocus" contenteditable="true" @input="setFormItem($event, 'pthousandunit')" @blur="inputBlur('pthousandunitFocus', pthousandunit, '1px')"></span>

                <!-- <span id="pthousandunit" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'pthousandunit')" @blur="pthousandunit? '': pthousandunitFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">仟</span><u>

                <span @focus="inputFocus('phundredunitFocus', phundredunit)" :class="{'border-input': !isSubmited && !phundredunit}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="phundredunitFocus" contenteditable="true" @input="setFormItem($event, 'phundredunit')" @blur="inputBlur('phundredunitFocus', phundredunit, '1px')"></span>

                <!-- <span id="phundredunit" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'phundredunit')" @blur="phundredunit? '': phundredunitFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">佰</span><u>

                <span @focus="inputFocus('ptenunitFocus', ptenunit)" :class="{'border-input': !isSubmited && !ptenunit}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="ptenunitFocus" contenteditable="true" @input="setFormItem($event, 'ptenunit')" @blur="inputBlur('ptenunitFocus', ptenunit, '1px')"></span>

              <!--  <span id="ptenunit" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'ptenunit')" @blur="ptenunit? '': ptenunitFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">拾</span><u>

                <span @focus="inputFocus('pyuanFocus', pyuan)" :class="{'border-input': !isSubmited && !pyuan}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="pyuanFocus" contenteditable="true" @input="setFormItem($event, 'pyuan')" @blur="inputBlur('pyuanFocus', pyuan, '1px')"></span>

              <!--  <span id="pyuan" v-else style="font-size:13px;font-family:仿宋;display:inline-block;,min-width:30px;text-decoration: underline;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'pyuan')" @blur="pyuan? '': pyuanFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">元。（其中含已付定金</span><u>

                <span @focus="inputFocus('ppaymentFocus', ppayment)" :class="{'border-input': !isSubmited && !ppayment}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:60px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="ppaymentFocus" contenteditable="true" @input="setFormItem($event, 'ppayment')" @blur="inputBlur('ppaymentFocus', ppayment, '1px')"></span>

                <!-- <span id="ppayment" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:60px;text-decoration: underline;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'ppayment')" @blur="ppayment? '': ppaymentFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋;text-indent:30px;">元，从</span><u>

                <span @focus="inputFocus('pstageFocus', pstage)" :class="{'border-input': !isSubmited && !pstage}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align:center;" :style="pstageFocus" contenteditable="true" @input="setFormItem($event, 'pstage')" @blur="inputBlur('pstageFocus', pstage, '1px')"></span>

                <!-- <span id="pstage" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'pstage')" @blur="pstage? '': pstageFocus = false"></span> -->
              </u><span style="font-size:14px;font-family:仿宋">阶段工程款中扣除。）</span></p><p style="line-height:20px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:56px;line-height:16px"><b><span style="font-size:14px;font-family:黑体">三、</span></b><span style="font-size:13px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="font-size:14px;font-family:黑体">工程款支付方式及流程</span></b></p><p style="line-height:23px"><span style="font-size:13px">&nbsp;</span></p>
              <p style="margin-bottom: 0;margin-left:28px;margin-bottom:0;text-indent:28px;line-height: 26px">
                <span style="font-size:14px;font-family:仿宋">
                  1.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span>
                </span>
                <span style="font-size:14px;font-family:仿宋">甲乙丙三方约定按以下付款方式支付合同款项：合同成立后，甲方按以下约定直接支付款项：</span></br>
                <span style="font-size:14px;font-family:仿宋"></span>
              </p>
              <p style="line-height:21px">
                <span style="font-size:13px">&nbsp;</span>
              </p>

              <div style="margin-left:38px">
                <p style="text-indent:28px;line-height:16px">
                  <span style="font-size:14px;font-family:仿宋">（<span>1</span>）签订合同当日，甲方支付合同总额的</span>
                <u>

                  <span @focus="inputFocus('pdownpaymentsFocus', pdownpayments)" :class="{'border-input': !isSubmited && !pdownpayments}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:60px;text-indent: initial;border-bottom:1px solid;text-align: center;" :style="pdownpaymentsFocus" contenteditable="true" @input="setFormItem($event, 'pdownpayments')" @blur="inputBlur('pdownpaymentsFocus', pdownpayments, '1px')"></span>

                  <!-- <span id="pdownpayments" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'pdownpayments')" @blur="pdownpayments? '': pdownpaymentsFocus = false"></span> -->
                </u>
                <span style="font-size:14px;font-family:仿宋">%</span><span style="font-size:14px;font-family:仿宋">为首付款，即人民币</span><u>

                  <span @focus="inputFocus('pdownpaymentsyuanFocus', pdownpaymentsyuan)" :class="{'border-input': !isSubmited && !pdownpaymentsyuan}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:60px;text-indent: initial;border-bottom:1px solid;text-align: center;" :style="pdownpaymentsyuanFocus" contenteditable="true" @input="setFormItem($event, 'pdownpaymentsyuan')" @blur="inputBlur('pdownpaymentsyuanFocus', pdownpaymentsyuan, '1px')"></span>

                <!--  <span id="pdownpaymentsyuan" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:60px;text-decoration: underline;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'pdownpaymentsyuan')" @blur="pdownpaymentsyuan? '': pdownpaymentsyuanFocus = false"></span> -->
                </u><span style="font-size:14px;font-family:仿宋">元；</span></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p><p style="text-indent:28px;line-height:21px"><span style="font-size:14px;font-family:仿宋">（<span>2</span>）水电隐蔽工程验收合格后三日内，甲方支付合同总额的</span><u>


                  <span @focus="inputFocus('ptailmoneyFocus', ptailmoney)" :class="{'border-input': !isSubmited && !ptailmoney}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align: center;" :style="ptailmoneyFocus" contenteditable="true" @input="setFormItem($event, 'ptailmoney')" @blur="inputBlur('ptailmoneyFocus', ptailmoney, '1px')"></span>

                  <!-- <span id="ptailmoney" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'ptailmoney')" @blur="ptailmoney? '': ptailmoneyFocus = false"></span> -->
                </u><span style="font-size:14px;font-family:仿宋">%</span><span style="font-size:14px;font-family:仿宋">，即人民币</span><u>

                  <span @focus="inputFocus('ptailmoneyyuanFocus', ptailmoneyyuan)" :class="{'border-input': !isSubmited && !ptailmoneyyuan}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:60px;text-indent: initial;border-bottom:1px solid;text-align: center;" :style="ptailmoneyyuanFocus" contenteditable="true" @input="setFormItem($event, 'ptailmoneyyuan')" @blur="inputBlur('ptailmoneyyuanFocus', ptailmoneyyuan, '1px')"></span>

                  <!-- <span id="ptailmoneyyuan" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:60px;text-decoration: underline;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'ptailmoneyyuan')" @blur="ptailmoneyyuan? '': ptailmoneyyuanFocus = false"></span> -->
                </u><span style="font-size:14px;font-family:仿宋">元；</span></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p><p style="text-indent:28px;line-height:21px"><span style="font-size:14px;font-family:仿宋">（<span>3</span>）泥木工程验收合格后三日内，甲方支付合同总额的</span><u>

                  <span @focus="inputFocus('ptailmoney1Focus', ptailmoney1)" :class="{'border-input': !isSubmited && !ptailmoney1}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:30px;text-indent: initial;border-bottom:1px solid;text-align: center;" :style="ptailmoney1Focus" contenteditable="true" @input="setFormItem($event, 'ptailmoney1')" @blur="inputBlur('ptailmoney1Focus', ptailmoney1, '1px')"></span>

                  <!-- <span id="ptailmoney1" v-else style="font-size:13px;font-family:仿宋;display:inline-block;min-width:30px;text-decoration: underline;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'ptailmoney1')" @blur="ptailmoney1? '': ptailmoney1Focus = false"></span> -->
                </u><span style="font-size:14px;font-family:仿宋">%</span><span style="font-size:14px;font-family:仿宋">，即人民币</span><u>
                  <!-- <input type="text" v-if="!ptailmoneyyuan1Focus" name="" @focus="inputFocus('ptailmoneyyuan1Focus', 'ptailmoneyyuan1')" style="padding:0;width:60px;border: none;border-bottom: 1px solid;"/> -->
                  <span @focus="inputFocus('ptailmoneyyuan1Focus', ptailmoneyyuan1)" :class="{'border-input': !isSubmited && !ptailmoneyyuan1}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:60px;text-indent: initial;border-bottom:1px solid;text-align: center;" :style="ptailmoneyyuan1Focus" contenteditable="true" @input="setFormItem($event, 'ptailmoneyyuan1')" @blur="inputBlur('ptailmoneyyuan1Focus', ptailmoneyyuan1, '1px')"></span>
                <!--  <span id="ptailmoneyyuan1" v-else style="font-size:14px;font-family:仿宋;display:inline-block;min-width:60px;text-decoration: underline;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'ptailmoneyyuan1')" @blur="ptailmoneyyuan1? '': ptailmoneyyuan1Focus = false"></span> -->
                </u><span style="font-size:14px;font-family:仿宋">元；</span></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p>
                <p style="margin-left:28px;"><span style="font-size:13px;font-family:仿宋">（<span>4</span>）另行约定：<u>
                  <!-- <input type="text" v-if="!pconventionsFocus" name="" @focus="inputFocus('pconventionsFocus', 'pconventions')" style="padding:0;width:476px;border: none;border-bottom: 1px solid;"/> -->
                  <span @focus="inputFocus('pconventionsFocus', pconventions)" :class="{'border-input': !isSubmited && !pconventions}" style="text-underline-position: under;font-size:14px;font-family:仿宋;display:inline-block;min-width:476px;text-indent: initial;border-bottom:1px solid;" :style="pconventionsFocus" contenteditable="true" @input="setFormItem($event, 'pconventions')" @blur="inputBlur('pconventionsFocus', pconventions, '1px')"></span>
                </u></span></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:28px;line-height:16px"><span style="font-size:14px;font-family:仿宋">（<span>5</span>）工程如有变更，增项部分全额支付后施工。甲方在任一阶段性工程竣工验收合格后未按照本合同约定支付下一阶段工程款的，乙方有权停工，工期顺延。</span></p>
              </div>
              <p style="line-height:23px"><span style="font-size:13px">&nbsp;</span></p><p style=";margin-right:7px;margin-left:28px;margin-bottom:0;text-indent:28px;line-height:19px"><span style="font-size:14px;font-family:仿宋">2.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">施工过程中工程变更款应立即结算；乙方应制作增项工程结算清单，经甲方确认并付款后，抄送丙方。</span></p><p style="line-height:21px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style=" margin-left: 28px;text-indent: 28px;line-height: 19px"><span style="font-size:14px;font-family:仿宋">3.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">工程验收合格后，乙方应向甲方提出工程结算，并将有关资料送交甲方。甲方收到资料后3日内如未有异议，即视为同意，甲乙双方应填写工程结算单（见《工程结算单》）并签署确认，乙方向甲方开具正式统一发票为本合同价款结算凭证。甲方与乙方应自行组织工程阶段性验收、竣工验收、工程款结算事宜，甲方与乙方之间存在的工程质量、施工时间等与施工行为相关的纠纷由甲乙双方自行处理。</span></p><p style="line-height:24px"><span style="font-size:13px">&nbsp;</span></p><p style=";margin-right:7px;margin-left:28px;margin-bottom:0;text-indent:28px;line-height:19px"><span style="font-size:14px;font-family:仿宋">4.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">合同签订后，甲方应在规定的时间内支付合同款，超过五日未支付工程款，乙方有权不进入或撤离施工现场，由此造成工期延误以及给乙方造成的损失由甲方负责。</span></p><p style="line-height:21px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p>
              <p style="margin-left:28px;line-height: 16px;margin-bottom: 0px;text-indent: 28px;line-height: 19px;"><span style="font-size:14px;font-family:仿宋">5.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">丙方作为第三方平台方，提供蘑菇加品牌支撑、技术支持的平台服务。</span></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:56px;line-height:16px"><b><span style="font-size:14px;font-family:黑体">四、</span></b><span style="font-size:13px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="font-size:14px;font-family:黑体">甲方的权利与义务</span></b></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p>
          </div>
          <p style="margin-left: 4px;text-indent: 28px;line-height: 16px">
            <span style="font-size:14px;font-family:仿宋">1.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">甲方有权监督和检查乙方的工程质量和施工进度，同时甲方应积极配合乙方进行工程材料的验收、工程分阶段验收和竣工验收，以免影响工期。</span>
          </p>
          <p style="line-height:23px">
            <span style="font-size:14px;font-family:仿宋">&nbsp;</span>
          </p>
          <p style=";margin-right:13px;margin-bottom: 0;margin-left:4px;margin-bottom:0;text-indent:28px;line-height: 19px">
            <span style="font-size:14px;font-family:仿宋">2.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">开工前<span> 5 </span>天，甲方为乙方入场施工创造条件。包括：搬清室内家具、陈设或将室内不易搬动的家具、陈设归堆、遮盖，以不影响施工为原则。</span>
          </p>
          <p style="line-height:23px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p>
          <p style=";margin-right:13px;margin-bottom: 0;margin-left:4px;margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:28px;line-height:21px"><span style="font-size:14px;font-family:仿宋">3.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp;</span></span><span style="font-size:14px;font-family:仿宋">甲方需于乙方进场前办理完所处小区内物业管理手续，物业所收取的任何费用均由甲方全部承担，乙方提供必要的配合。如果由于甲方没有办理好进场手续而延误工期，工期顺延、相关责任由甲方承担。</span></p><p style="line-height:24px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style=";margin-right:7px;margin-left:4px;margin-bottom:0;text-indent:28px;line-height:21px"><span style="font-size:14px;font-family:仿宋">4.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">甲方需保证乙方进行施工房屋的水电齐全、符合乙方施工条件。甲方保证向乙方无偿提供施工所需的水、电，并确保乙方使用的时间。如在施工过程中连续停水、停电<span> 4 </span>小时或间歇性停水、停电两天以上，工程期限顺延。</span></p><p style="line-height:23px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style=";margin-right:13px;margin-bottom: 0;margin-left:4px;margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:28px;line-height:21px"><span style="font-size:14px;font-family:仿宋">5.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp;</span></span><span style="font-size:14px;font-family:仿宋">甲方如确实需要拆、改原建筑物结构或设备、管线、墙体，应向相关房管部门及其他相关部门办理书面核准手续，并与乙方签订《施工责任保证书》，且改造验收后，乙方只承担合同约定保修范围内的维修责任，不承担其他赔偿责任。</span></p><p style="line-height:22px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p>
          <p style="margin-left: 4px;;line-height: 15px;text-indent: 28px;">
            <span style="font-size:13px;font-family:仿宋">6.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span>
            </span>
            <span style="font-size:13px;font-family:仿宋">甲方应按照本协议约定的支付金额及方式付清工程款；无故逾期的，每天按延迟部分的<span> 0.3%</span>向乙方支付滞纳金，同时乙方有权停止施工，工期相应顺延。</span>
          </p>
          <p style="line-height:8px">
            <span style="font-size:13px">&nbsp;</span>
          </p>
          <p style="margin-left:4px;line-height:16px">
            <span style="font-size:14px;font-family:仿宋"></span>
          </p>
          <p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p>
          <p style="margin-left: 4px;text-indent: 28px;line-height: 16px"><span style="font-size:14px;font-family:仿宋">7.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">本合同生效后，甲方不得随意变更所选风格和功能模块。</span></p>
          <p style="line-height:21px">
            <span style="font-size:13px">&nbsp;</span>
          </p>
          <p style="margin-left:32px;line-height:16px">
            <span style="font-size: 14px;font-family:仿宋">
            8.</span><span style="font-size:13px">&nbsp;&nbsp;&nbsp;</span>
            <span style="font-size:14px;font-family:仿宋">甲方指派</span><b>
            <u>
            <span  @focus="inputFocus('adelegateFocus', adelegate)" :class="{'border-input': !isSubmited && !adelegate}" style="text-underline-position: under;line-height:19px;font-size:19px;font-family:黑体;display:inline-block;min-width:90px;text-align: center;" :style="adelegateFocus" contenteditable="true" @input="setFormItem($event, 'adelegate')" @blur="inputBlur('adelegateFocus', adelegate, '1px')"></span>
            </u></b>
            <span style="font-size:14px;font-family:仿宋">为甲方代表，身份证号：</span><b><u>
            <span @focus="inputFocus('adelegatecidFocus', adelegatecid)" :class="{'border-input': !isSubmited && !adelegatecid}" style="text-underline-position: under;line-height:19px;font-size:19px;font-family:黑体;display:inline-block;min-width:172px;text-align: center;" :style="adelegatecidFocus" contenteditable="true" @input="setFormItem($event, 'adelegatecid')" @blur="inputBlur('adelegatecidFocus', adelegatecid, '1px')"></span>
            </u></b>
            <span style="font-size:13px;font-family:仿宋">，联系方式：</span>
            <u>
              <span @focus="inputFocus('adelegatephoneFocus', adelegatephone)" :class="{'border-input': !isSubmited && !adelegatephone}" style="text-indent: initial;text-underline-position: under;line-height:19px;font-size:19px;font-family:黑体;display:inline-block;min-width:130px;text-align: center;" :style="adelegatephoneFocus" contenteditable="true" @input="setFormItem($event, 'adelegatephone')" @blur="inputBlur('adelegatephoneFocus', adelegatephone, '1px')"></span>
            </u>
            <span style="font-size:14px;font-family:仿宋">。代为监督合同履行，行使验收确认、工程监督的权利。</span>
          </p>
          <p style="line-height:1px"><span style="font-size:13px">&nbsp;</span></p>
          <p style="line-height:7px"><span style="font-size:13px">&nbsp;</span></p>
          <p style="margin-left:4px;text-indent:28px;line-height:16px">
          </p>
          <p style="margin-left:32px;line-height:19px"><b><span style="font-size:14px;font-family:黑体">五、</span></b><span style="font-size:13px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="font-size:14px;font-family:黑体">乙方的权利和义务</span></b></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p>
          <p style="margin-left:4px;text-indent: 28px;line-height: 16px"><span style="font-size:14px;font-family:仿宋">1.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">乙方根据甲方选择确定的设计方案（含材料配置方案）负责户型数据实际测量、复核和深化</span></p><p style="line-height:23px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style=";margin-right:13px;margin-bottom: 0;margin-left:4px;margin-bottom:0;text-indent:28px;line-height: 19px"><span style="font-size:14px;font-family:仿宋">2.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">乙方负责提供给甲方硬装材料（以附件《工程预算清单》（含材料配置）为准），同时负责配送材料至项目施工现场。</span></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:32px;line-height:16px"><span style="font-size: 14px;font-family:仿宋">3.</span><span style="font-size:13px">&nbsp;&nbsp;&nbsp; </span><span style="font-size:14px;font-family:仿宋">乙方指派</span><b><u>

            <span @focus="inputFocus('bdelegateFocus', bdelegate)" :class="{'border-input': !isSubmited && !bdelegate}" style="text-underline-position: under;line-height:19px;font-size:19px;font-family:黑体;display:inline-block;min-width:90px;text-align: center;" :style="bdelegateFocus" contenteditable="true" @input="setFormItem($event, 'bdelegate')" @blur="inputBlur('bdelegateFocus', bdelegate, '1px')"></span>

            <!-- <span style="line-height:19px;font-size:19px;font-family:黑体;display:inline-block;width:90px;border-bottom: 2px solid;" contenteditable="true" @input="setFormItem($event, 'bdelegate')"></span> -->
          </u></b><span style="font-size:14px;font-family:仿宋">为乙方代表，身份证号：</span><b><u>

            <span @focus="inputFocus('bdelegatecidFocus', bdelegatecid)" :class="{'border-input': !isSubmited && !bdelegatecid}" style="text-underline-position: under;line-height:19px;font-size:19px;font-family:黑体;display:inline-block;min-width:172px;text-align: center;" :style="bdelegatecidFocus" contenteditable="true" @input="setFormItem($event, 'bdelegatecid')" @blur="inputBlur('bdelegatecidFocus', bdelegatecid, '1px')"></span>

            <!-- <span style="line-height:19px;font-size:19px;font-family:黑体;display:inline-block;width:172px;border-bottom: 2px solid;" contenteditable="true" @input="setFormItem($event, 'bdelegatecid')"></span> -->
          </u></b><span style="font-size:13px;font-family:仿宋">，</span><span style="font-size:14px;font-family:仿宋">联系方式：</span><b><u>

            <span @focus="inputFocus('bdelegatephoneFocus', bdelegatephone)" :class="{'border-input': !isSubmited && !bdelegatephone}" style="text-underline-position: under;line-height:19px;font-size:19px;font-family:黑体;display:inline-block;min-width:130px;text-align: center;" :style="bdelegatephoneFocus" contenteditable="true" @input="setFormItem($event, 'bdelegatephone')" @blur="inputBlur('bdelegatephoneFocus', bdelegatephone, '1px')"></span>

           <!--  <span style="line-height:19px;font-size:19px;font-family:黑体;display:inline-block;width:130px;border-bottom: 2px solid;" contenteditable="true" @input="setFormItem($event, 'bdelegatephone')"></span> -->
          </u></b><span style="font-size:14px;font-family:仿宋">。落实本合同的施工进度、施工质量、安全施工、文明施工和治安管理义务。</span></p><p style="line-height:1px"><span style="font-size:13px">&nbsp;</span></p><p style="line-height:20px"><span style="font-size:13px">&nbsp;</span></p>
          <p style="margin-left:4px;text-indent: 28px;line-height: 16px"><span style="font-size:14px;font-family:仿宋">4.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">乙方应严格按照国家有关标准、本合同约定标准，保质、保量、按期完成工程任务。</span></p><p style="line-height:23px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style=";margin-right:7px;margin-left:4px;margin-bottom:0;text-indent:28px;line-height:21px"><span style="font-size:14px;font-family:仿宋">5.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">乙方应严格遵守甲方所在物业的相关规定，负责将施工垃圾运送至物业指定的小区内垃圾堆放处， 如需乙方外运，甲方需承担额外运费。如因乙方原因违反相关规定给甲方造成损失，由乙方承担责任。</span></p><p style="line-height:22px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p>
          <p style="margin-left:4px;text-indent: 28px;line-height: 15px"><span style="font-size:13px;font-family:仿宋">6.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:13px;font-family:仿宋">乙方应遵守有关安全文明施工的规定，未采取必要的安全防护措施所导致的损失由乙方承担。</span></p><p style="line-height:21px"><span style="font-size:13px;font-family:仿宋">&nbsp;</span></p>
          <p style="margin-left:4px;text-indent: 28px;line-height: 16px">
            <span style="font-size:14px;font-family:仿宋">
              7.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span>
            </span>
            <span style="font-size:14px;font-family:仿宋">乙方提供施工图纸并严格按施工图施工。</span>
          </p>
          <p style="line-height:25px">
            <span style="font-size:14px;font-family:仿宋">&nbsp;</span>
          </p>
          <p style=";margin-right:7px;margin-left:4px;margin-bottom:0;text-indent:28px;line-height:19px"><span style="font-size:14px;font-family:仿宋">8.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">乙方应提前五日通知甲方参加工程材料验收、工程分段验收及竣工验收，验收过程中甲方提出异议的，乙方应按照按照国家有关标准、本合同约定标准以及甲方的合理要求进行整改。</span></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:32px;line-height:16px"><b><span style="font-size:14px;font-family:黑体">六、</span></b><span style="font-size:13px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="font-size:14px;font-family:黑体">丙方的权利与义务</span></b></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p>
          <p style="margin-left:4px;text-indent: 28px;line-height: 16px"><span style="font-size:14px;font-family:仿宋">1.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">丙方提供蘑菇加整体家装解决方案（含硬装、软装、设计和产品物料配置方案）。</span></p><p style="line-height:21px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p>
          <p style="margin-left:4px;text-indent: 28px;line-height: 16px"><span style="font-size:14px;font-family:仿宋">2.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">丙方负责蘑菇加管理体系与标准化产品体系的输出。</span></p><p style="line-height:23px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style="margin-left:4px;text-indent:28px;line-height: 19px"><span style="font-size:14px;font-family:仿宋">3.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">丙方作为第三方平台方，提供品牌蘑菇加的整体营销推广、蘑菇加标准化产品的研发与设计、蘑菇加平台运营与管理、渠道内主材供应、售后平台等服务。</span></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:32px;line-height:16px"><b><span style="font-size:14px;font-family:黑体">七、</span></b><span style="font-size:13px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="font-size:14px;font-family:黑体">质量标准</span></b></p><p style="line-height:22px"><span style="font-size:13px">&nbsp;</span></p>
          <p style="margin-left:4px;text-indent: 28px;line-height: 15px">
            <span style="font-size:13px;font-family:仿宋">
            1.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span>
            </span>
            <span style="font-size:13px;font-family:仿宋">甲乙双方约定本工程施工质量按照国家标准<span> GB50096</span>－<span>2011</span>《住宅设计规范》、<span>GB50327</span>－<span>2001</span></span>
            <span style="font-size:14px;font-family:仿宋">《住宅装饰装修工程施工规范》、<span>GB50210</span>－<span>2001</span>《建筑装饰装修工程质量验收规范》执行。</span>
          </p>
          <p style="margin-left:4px;line-height:16px">

          </p>
            <p style="line-height:23px"><span style="font-size:13px">&nbsp;</span></p><p style=";margin-right:7px;margin-left:4px;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;text-indent:28px;line-height:22px"><span style="font-size:14px;font-family:仿宋">2.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">施工过程中甲乙双方对工程施工质量发生争议，甲乙双方确认由甲乙双方认可的独立质检部门对工程质量予以认证，经认证工程质量不符合合同约定以及相关国家标准，认证过程支出的相关费用由乙方承担，因处理上述争议以及质检认证时间造成工期延误的，工期不顺延，由此导致延期竣工的，由乙方承担违约责任；经认证工程质量符合合同约定以及相关国家标准，认证过程支出的相关费用由甲方承担，因处理上述争议以及质检认证时间造成工期延误的，工期顺延，由甲方承担延期付款的违约责任。</span></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:32px;line-height:16px"><b><span style="font-size:14px;font-family:黑体">八、</span></b><span style="font-size:13px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="font-size:14px;font-family:黑体">材料供应</span></b></p><p style="line-height:23px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:4px;text-indent:28px;line-height: 21px"><span style="font-size:14px;font-family:仿宋">1.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">由甲方提供的材料、设备，在材料设备到施工现场前，甲方应通知乙方。双方就材料、设备质量、环保标准共同验收并办理交接手续。 如甲方所供材料、设备有质量问题或规格差异，若乙方未向甲方提出更换或异议，对工程造成损失，责任由乙方负责。</span></p><p style="line-height:23px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style=";margin-right:7px;margin-left:4px;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;text-indent:28px;line-height:21px"><span style="font-size:14px;font-family:仿宋">2.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">应由乙方提供的材料、设备，在材料、设备到施工现场前，乙方应通知甲方。双方就材料、设备质量、环保标准共同验收。实际进料如与附件《工程预算清单》不符，不符合设计、施工要求或规格有差异，应禁止使用，若已使用对工程造成的损失由乙方承担。</span></p><p style="line-height:21px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p>
          <p style="margin-left:4px;text-indent: 28px;line-height: 16px"><span style="font-size:14px;font-family:仿宋">3.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">乙方施工人员对现场成品应认真清点及保护。如发现损坏和丢失的，由乙方负责赔偿。</span></p><p style="line-height:23px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style=";margin-right:7px;margin-left:4px;margin-bottom:0;text-indent:28px;line-height:19px"><span style="font-size:14px;font-family:仿宋">4.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">甲方向乙方采购的装饰材料、设备均应用于本合同规定的住宅装饰，非经甲方同意，乙方不得挪作他用。如乙方违反此规定，按挪用材料设备价款的双倍赔偿给甲方。</span></p><p style="line-height:23px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style=";margin-right:7px;margin-left:4px;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;text-indent:28px;line-height:21px"><span style="font-size:14px;font-family:仿宋">5.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">乙供材料的补充购料必须与原预算清单中乙供材料的材料品牌、规格、型号相符（经甲乙双方确认，根据实际需要调整乙供材料的材料品牌、规格、型号的除外），补充购料价格与原预算清单中乙供材料的材料价格一致，相关费用应在补充购料施工前结算，乙方应制作补充购料结算清单，经甲方确认并付款后，抄送丙方。</span></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:32px;line-height:16px"><b><span style="font-size:14px;font-family:黑体">九、</span></b><span style="font-size:13px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="font-size:14px;font-family:黑体">工程变更</span></b></p><p style="line-height:23px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:4px;text-indent:28px;line-height: 19px"><a></a><span style="font-size:13px;font-family:仿宋">1.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:13px;font-family:仿宋">工程项目及施工方式如需变更，甲乙双方应协商一致，共同在《工程变更单》签字确认，同时调整相关工程费用及工期， 并书面告知丙方工程变更情况。对于甲乙双方口头交流确认的意见应当于24小时内形成书面意见，并书面告知丙方，丙方未收到书面通知的，不对甲乙双方口头交流确认所发生的行为负责。</span></p><p style="line-height:21px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p>
          <p style="margin-left:4px;line-height: 16px;text-indent: 28px;"><span style="font-size:14px;font-family:仿宋">2.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">如甲方需要临时增减项目须和原报价享受同等价格折扣。</span></p><p style="line-height:23px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style=";margin-right:7px;margin-left:4px;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;text-indent:28px;line-height:21px"><span style="font-size:14px;font-family:仿宋">3.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">装修合同报价所有涉及到数量和面积的项目，乙方相关人员应当仔细测量和计算。如果结算超出预算的百分之五以上部分，甲方有权拒绝支付超出预算的百分之五以上部分费用。甲方要求变更图纸造成项目增减的费用除外，变更图纸造成的增减项目必须经过双方《工程变更单》书面签字确认价格，否则乙方不能增加任何费用。</span></p>
          <p style="line-height:21px">
            <span style="font-size:13px">&nbsp;</span></p>
            <p style="margin-left:32px;line-height:16px">
              <b><span style="font-size:14px;font-family:黑体">十、</span></b>
              <span style="font-size:13px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
              <b><span style="font-size:14px;font-family:黑体">工期延误</span></b>
            </p>
            <p style="line-height:23px"><span style="font-size:13px">&nbsp;</span></p>
          <p style="margin-bottom: 0;margin-left:4px;margin-bottom:0;text-indent:28px;line-height: 26px">
            <span style="font-size:14px;font-family:仿宋">1.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span>
            </span>
            <span style="font-size:14px;font-family:仿宋">因以下原因造成竣工日期延误的，经甲方确认后工期应当顺延：</span>
          </p>
          <p style="line-height:21px">
            <span style="font-size:14px;font-family:仿宋">&nbsp;</span>
          </p>
          <div style="margin-left:27px;">
            <p style="margin-left:17px;line-height:16px">
              <span style="font-size:14px;font-family:仿宋">（<span>1</span>）工程量变化或设计变更；</span>
            </p>
            <p style="line-height:21px">
              <span style="font-size:14px;font-family:仿宋">&nbsp;</span>
            </p>
            <p style="margin-left:17px;line-height:16px">
              <span style="font-size:14px;font-family:仿宋">（<span>2</span>）不可抗力；</span>
            </p>
            <p style="line-height:21px">
              <span style="font-size:14px;font-family:仿宋">&nbsp;</span>
            </p>
            <p style="margin-left:17px;line-height:16px">
              <span style="font-size:14px;font-family:仿宋">（<span>3</span>）甲方同意工期顺延的其他情况。</span></p><p style="line-height:21px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p>
          </div>
            <p style="margin-left:4px;text-indent: 28px;line-height: 16px"><span style="font-size:14px;font-family:仿宋">2.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">因以下原因造成竣工日期延误的，工期应当顺延：</span></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p>
            <div style="margin-left:27px;">
            <p style="margin-left:17px;line-height:16px"><span style="font-size:14px;font-family:仿宋">（<span>1</span>）甲方未按合同约定完成其应当负责的工作而影响工期的；</span></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:17px;line-height:16px"><span style="font-size:14px;font-family:仿宋">（<span>2</span>）甲方未按合同约定支付工程款影响正常施工的；</span></p>
              <p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p>
              <p style="margin-left:17px;line-height:16px">
                <span style="font-size:14px;font-family:仿宋">（<span>3</span>）因甲方责任造成工期延误的其他情况。</span>
            </p>
          </div>
          <p style="line-height:23px"><span style="font-size:13px">&nbsp;</span></p>
          <p style="margin-left:4px;margin-bottom:0;text-indent:28px;line-height:19px">
              <span style="font-size:14px;font-family:仿宋">3.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span>
              <span style="font-size:14px;font-family:仿宋">因乙方责任不能按期完工的，工期不顺延；因乙方责任造成工程质量存在问题需要返工的，返工费用由乙方承担，工期不顺延。</span>
          </p>
          <p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:32px;line-height:16px"><b><span style="font-size:14px;font-family:黑体">十一、</span></b><span style="font-size:13px">&nbsp;&nbsp; </span><b><span style="font-size:13px;font-family:黑体">工程验收</span></b></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p>
          <p style="margin-left:4px;line-height: 16px;text-indent: 28px;">
            <span style="font-size:14px;font-family:仿宋">1.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span>
            <span style="font-size:14px;font-family:仿宋">在施工过程中分以下阶段对工程质量进行验收：</span>
          </p>
          <p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p>
          <p style="margin-left:47px;line-height:16px"><span style="font-size:14px;font-family:仿宋">（<span>1</span>）水电施工验收；（<span>2</span>）泥、木施工验收；（<span>3</span>）油漆施工验收；（<span>4</span>）工程竣工验收。</span></p><p style="line-height:23px"><span style="font-size:13px">&nbsp;</span></p><p style=";margin-right:7px;margin-left:4px;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;text-indent:28px;line-height:21px"><span style="font-size:14px;font-family:仿宋">2.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">阶段工程完成或全部工程竣工后，乙方通知甲方验收，甲方自接到验收通知后三日内及时组织验收，甲方延期未组织验收或未提出异议的，视为验收合格。工程竣工验收合格后，双方办理移交手续，结清尾款，签署保修卡。</span></p><p style="line-height:21px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p>
          <p style="margin-left:4px;line-height: 16px;text-indent: 28px;"><span style="font-size:14px;font-family:仿宋">3.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">硬装竣工验收前，乙方负责保护工程成品和工程现场的全部安全。</span></p><p style="line-height:23px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style="margin-left:4px;text-indent:28px;line-height: 19px"><span style="font-size:14px;font-family:仿宋">4.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">施工过程中或完工后未经验收，甲方如自行搬进入住或擅自加门、加锁或启用新的门锁装置，视为验收合格，由此产生的一切问题由甲方承担。</span></p>

          <p class="MsoListParagraph" style="text-indent:0;line-height:11px"><b><span style="font-size:10px;font-family:仿宋">&nbsp;</span></b></p>
          <p class="MsoListParagraph" style="text-indent:0;line-height:11px"><b><span style="font-size:10px;font-family:仿宋">&nbsp;</span></b></p>
          <p style="margin-left:32px;line-height:16px"><a></a><b><span style="font-size:14px;font-family:黑体">十二、</span></b><span style="font-size:13px">&nbsp;&nbsp; </span><b><span style="font-size:13px;font-family:黑体">维保责任</span></b>
          </p><p style="line-height:23px"><span style="font-size:13px">&nbsp;</span></p><p style=";margin-right:13px;margin-bottom: 0;margin-left:4px;margin-bottom:0;text-indent:28px;line-height: 19px"><span style="font-size:14px;font-family:仿宋">1.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">甲方对整体家装解决方案实施成果验收合格签字后，乙方向甲方办理移交并发放装饰工程保修卡，进入保修期。</span></p><p style="line-height:23px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style=";margin-right:13px;margin-bottom: 0;margin-left:4px;margin-bottom:0;text-indent:28px;line-height: 19px"><span style="font-size:14px;font-family:仿宋">2.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">乙方保修以保修卡为准，防水工程保修期为五年；室内装饰装修施工项目保修期为二年，自工程竣工验收合格之日起开始计算；主材以厂家保修期限为准。</span></p><p style="line-height:23px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style=";margin-right:13px;margin-bottom: 0;margin-left:4px;margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:28px;line-height:21px"><span style="font-size:14px;font-family:仿宋">3.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">工程保修期内由乙方提供免费维护，但因甲方使用不当，或非施工的外力原因引起的变形、损毁或甲方自行提供的材料引起的问题等，不属保修范围，如委托乙方维修，甲方需支付相应的维修金。</span></p><p style="line-height:21px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p>
          <p style="margin-left:4px;text-indent: 28px;line-height: 16px"><span style="font-size:14px;font-family:仿宋">4.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">保修期满，甲方同样可委托乙方维修，但需向乙方支付相应的维修金。</span></p><p style="line-height:23px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style=";margin-right:7px;margin-left:4px;margin-bottom:0;text-indent:28px;line-height:19px"><span style="font-size:13px;font-family:仿宋">5.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:13px;font-family:仿宋">整体家装服务过程中的相关问题，甲方应先与乙方服务人员进行协调沟通，由乙方服务人员全程跟踪、协调，确保施工过程顺利。乙方应在接到甲方待服务热电后<span> 24 </span>小时内予以回复解决方案。</span></p><p style="line-height:8px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:4px;line-height:16px"><span style="font-size:14px;font-family:仿宋">乙方服务热线：</span><b><u>

            <span @focus="inputFocus('bhotphoneFocus', bhotphone)" :class="{'border-input': !isSubmited && !bhotphone}"  style="text-underline-position: under;line-height:19px;font-size:19px;font-family:黑体;display:inline-block;min-width:106px;text-align: center;" :style="bhotphoneFocus" contenteditable="true" @input="setFormItem($event, 'bhotphone')" @blur="inputBlur('bhotphoneFocus', bhotphone, '1px')"></span>

            <!-- <span style="line-height:19px;font-size: 19px;font-family:黑体;display:inline-block;width:106px;border-bottom: 2px solid;" contenteditable="true" @input="setFormItem($event, 'bhotphone')"></span> -->
          </u></b></p><p style="line-height:1px"><span style="font-size:13px">&nbsp;</span></p><p style="line-height:22px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:4px;text-indent:28px;line-height: 21px"><span style="font-size:14px;font-family:仿宋">6.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">发生以下情形时，甲方可直接通过蘑菇加官网或拨打蘑菇加全国统一服务中心电话进行咨询、投诉与协调，由丙方协调解决：（蘑菇加全国统一服务中心电话为：<span>400-8888-095</span>；蘑菇加官网在线投诉：<span> www.mhome.com</span>）</span></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p>
          <div style="margin-left:22px;">
            <p style="margin-left:17px;line-height:16px"><span style="font-size:14px;font-family:仿宋">（<span>1</span>）乙方接到甲方咨询、投诉来电，<span>24 </span>小时内未响应回复的；</span></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:17px;line-height:16px"><span style="font-size:14px;font-family:仿宋">（<span>2</span>）乙方未按回复约定如期解决甲方服务需求问题；</span></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:17px;line-height:16px"><span style="font-size:14px;font-family:仿宋">（<span>3</span>）甲乙双方在服务过程中发生分歧，导致服务无法履行的。</span></p><p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p>
          </div>
          <p style="margin-left:32px;line-height:16px"><b><span style="font-size:14px;font-family:黑体">十三、</span></b><span style="font-size:13px">&nbsp;&nbsp; </span><b><span style="font-size:13px;font-family:黑体">违约责任</span></b></p><p style="line-height:23px"><span style="font-size:13px">&nbsp;</span></p><p style=";margin-right:13px;margin-bottom: 0;margin-left:4px;margin-bottom:0;text-indent:28px;line-height: 19px"><span style="font-size:14px;font-family:仿宋">1.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">本合同签订生效后，三方签订的合同不得擅自变更或解除，否则违约方将分别向合同其他方支付本合同价总额的<span> 5%</span>的违约金，并承担因此造成的其他经济损失。</span></p><p style="line-height:23px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style=";margin-right:13px;margin-bottom: 0;margin-left:4px;margin-bottom:0;text-indent:28px;line-height: 19px"><span style="font-size:14px;font-family:仿宋">2.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">由于甲方原因导致延期开工或中途停工，甲方应补偿乙方因停工、窝工所造成的损失，每停工或窝工一天，甲方应支付乙方合同总额<span> 0.3‰</span>的违约金，工期顺延。</span></p><p style="line-height:21px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p>
          <p style="margin-left:4px;line-height: 16px;text-indent: 28px;">
            <span style="font-size:14px;font-family:仿宋">3.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span>
            <span style="font-size:14px;font-family:仿宋">由于乙方原因未按照丙方标准化产品生产周期竣工的，每逾期一天，乙方支付甲方合同总额的0.3%违约金；但因甲方原因或不可抗力等因素造成延期的，乙方无需承担责任。</span>
          </p>
          <p style="line-height:23px">
            <span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style=";margin-right:13px;margin-bottom: 0;margin-left:4px;margin-bottom:0;text-indent:28px;line-height: 19px"><span style="font-size:14px;font-family:仿宋">4.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">在服务过程中，如乙方偷工减料、恶意拖延工期等行为导致甲方不同意继续履行合同的，合同可以终止。</span></p><p style="line-height:23px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style=";margin-right:13px;margin-bottom: 0;margin-left:4px;margin-bottom:0;text-indent:28px;line-height: 19px"><span style="font-size:14px;font-family:仿宋">5.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">甲方未办理任何手续，要求乙方改变房屋结构，乙方不得施工；若甲方坚持，由此发生的损失或事故（包括罚款）由甲方负责承担。</span></p><p style="line-height:21px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p>
          <p style="margin-left:4px;text-indent: 28px;line-height: 16px">
            <span style="font-size:14px;font-family:仿宋">6.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span>
            </span>
            <span style="font-size:14px;font-family:仿宋">未经甲方同意，乙方擅自改变房屋结构，由此发生的损失或事故（包括罚款），由乙方负责</span>
            <span style="font-size:14px;font-family:仿宋">承担。</span>
          </p>
          <p style="line-height:21px"><span style="font-size:13px">&nbsp;</span></p>
          <p style="margin-left:4px;text-indent:28px;line-height: 19px"><span style="font-size:14px;font-family:仿宋">7.<span style="font-variant-numeric: normal;font-variant-east-asian: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: 'Times New Roman'">&nbsp;&nbsp; </span></span><span style="font-size:14px;font-family:仿宋">甲乙双方因工程施工、材料供应、质量标准、工程验收、工程款支付以及工程维保等与本工程装修产生的争议，由甲乙双方自行处理，与丙方无涉。</span></p><p style="line-height:21px">
            <span style="font-size:13px">&nbsp;</span>
          </p>
          <p style="margin-left:32px;line-height:16px">
            <b><span style="font-size:14px;font-family:黑体">十四、</span></b>
            <span style="font-size:13px">&nbsp;&nbsp; </span>
            <b><span style="font-size:13px;font-family:黑体">其他</span></b>
          </p>
          <p style="line-height:23px"><span style="font-size:13px">&nbsp;</span></p>
          <p style="margin-left:4px;text-indent:28px;line-height:19px">
            <span style="font-size:14px;font-family:仿宋">1.</span><span style="font-size:14px;font-family:仿宋">本合同履行过程中，如发生争议的，应协商解决，解决不成的，任意一方可向合同签约地人民法院提起诉讼。</span>
          </p>
          <p style="line-height:23px">
            <span style="font-size:14px;font-family:仿宋">&nbsp;</span>
          </p>
          <p style="margin-left:4px;text-indent:28px;line-height:19px">
            <span style="font-size:14px;font-family:仿宋">2.</span><span style="font-size:14px;font-family:仿宋">本合同经甲方、乙方、丙方签字或盖章后成立，甲方首付款支付完毕后合同生效。本合同一式叁份，三方各执壹份。</span>
          </p>
          <p style="line-height:21px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span>
          </p>
          <p style="margin-left:4px;text-indent:28px;line-height:16px">
            <span style="font-size:14px;font-family:仿宋">3.</span><span style="font-size:14px;font-family:仿宋">其他约定：</span>
          </p>
          <p style="line-height:19px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p>
          <p style="text-indent:28px;line-height:19px"><b><u>

            <span @focus="inputFocus('agree1Focus', agree1)" :class="{'border-input': !isSubmited && !agree1}"  style="text-underline-position: under;line-height:19px;font-size:19px;text-indent: initial;font-family:黑体;display:inline-block;min-width:586px;" :style="agree1Focus" contenteditable="true" @input="setFormItem($event, 'agree1')" @blur="inputBlur('agree1Focus', agree1, '1px')"></span>

            <!-- <span style="line-height:19px;font-size:19px;font-family:黑体;display:inline-block;width:586px;border-bottom: 2px solid;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'agree1')"></span> -->
          </u></b></p>
          <p style="text-indent:21px;line-height:19px"><u style="text-decoration: none;"><span style="font-size:14px;font-family:仿宋"><span>&nbsp;</span></span></u></p>
          <p style="text-indent:28px;line-height:19px"><b><u>

            <span @focus="inputFocus('agree2Focus', agree2)" :class="{'border-input': !isSubmited && !agree2}" style="text-underline-position: under;text-indent: initial;line-height:19px;font-size:19px;font-family:黑体;display:inline-block;min-width:586px;" :style="agree2Focus" contenteditable="true" @input="setFormItem($event, 'agree2')" @blur="inputBlur('agree2Focus', agree2, '1px')"></span>

            <!-- <span style="line-height:19px;font-size:19px;font-family:黑体;display:inline-block;width:586px;border-bottom: 2px solid;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'agree2')"></span> -->
          </u></b></p>
          <p style="text-indent:28px;line-height:19px"><b><u style="text-decoration: none;"><span style="font-size:19px;font-family:黑体"><span>&nbsp;</span></span></u></b></p><p style="text-indent:28px;line-height:19px"><b><u>

            <span @focus="inputFocus('agree3Focus', agree3)" :class="{'border-input': !isSubmited && !agree3}" style="text-underline-position: under;text-indent: initial;line-height:19px;font-size:19px;font-family:黑体;display:inline-block;min-width:586px;" :style="agree3Focus" contenteditable="true" @input="setFormItem($event, 'agree3')" @blur="inputBlur('agree3Focus', agree3, '1px')"></span>

            <!-- <span style="line-height:19px;font-size:19px;font-family:黑体;display:inline-block;width:586px;border-bottom: 2px solid;text-indent: initial;" contenteditable="true" @input="setFormItem($event, 'agree3')"></span> -->
          </u></b></p><p style="line-height:19px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p>
          <p style="margin-left:4px;text-indent:28px;line-height:16px">
            <span style="font-size:14px;font-family:仿宋">4.</span><span style="font-size:14px;font-family:仿宋">本合同附件：</span>
          </p>
          <p style="line-height:1px"><span style="font-size:13px">&nbsp;</span></p>
          <p style="line-height:20px"><span style="font-size:13px">&nbsp;</span></p>
          <p style="margin-left:4px;text-indent:28px;line-height:16px">
            <span style="font-size:14px;font-family:仿宋">1)</span><span style="font-size:14px;font-family:仿宋">《工程设计图纸》</span></p>
            <p style="line-height:21px"><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p>
            <p style="margin-left:4px;text-indent:28px;line-height:16px">
              <span style="font-size:14px;font-family:仿宋">2)</span><span style="font-size:14px;font-family:仿宋">《工程预算清单》<span>(</span>含材料配置<span>)</span></span></p><p style="line-height:16px"><a></a><span style="font-size:14px;font-family:仿宋">&nbsp;</span></p><p style="line-height:19px"><span style="font-size:13px">&nbsp;</span></p><p style="line-height:19px"><span style="font-size:13px">&nbsp;</span></p><p style="line-height:19px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:13px;line-height:21px"><b><span style="font-size:19px;font-family:黑体">甲方：</span></b></p><p style="line-height:13px"><span style="font-size:13px">&nbsp;</span></p><p style="line-height:20px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:13px;line-height:21px"><b><span style="font-size:19px;font-family:黑体">乙方：</span></b></p><p style="line-height:24px"><span style="font-size:13px">&nbsp;</span></p><p style="line-height:24px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-left:13px;line-height:21px"><b><span style="font-size:19px;font-family:黑体">丙方：浙江蘑菇加电子商务有限公司</span></b></p><p style="line-height:24px"><span style="font-size:13px">&nbsp;</span></p><p style="line-height:24px"><span style="font-size:13px">&nbsp;</span></p><p style="line-height:24px"><span style="font-size:13px">&nbsp;</span></p><p style="line-height:24px"><span style="font-size:13px">&nbsp;</span></p>
          <!-- <p style="line-height:24px"><b><span style="font-size:18px;font-family:黑体">签署时间</span></b><b><span style="font-size:19px;font-family:黑体">： <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>年 <span>&nbsp;&nbsp;&nbsp;</span>月 <span>&nbsp;&nbsp;&nbsp;</span>日</span></b></p> -->
          <p style="line-height:24px;margin-left:18px;"><span style="font-size:13px">&nbsp;</span></p><p style="line-height:24px;margin-left:18px;"><b><span style="font-size:19px;font-family:黑体">签约地点：绍兴市上虞区</span></b></p><p style="line-height:24px"><span style="font-size:13px">&nbsp;</span></p><p style="line-height:24px"><span style="font-size:13px">&nbsp;</span></p><p style="line-height:24px"><span style="font-size:13px">&nbsp;</span></p><p style="margin-right:19px;text-align:center;line-height:11px">&#8203;<br></p><p><br></p>
        </div>

      </div>
    </div>
    <sas-confirm title="你还未实名认证，请前往认证." :isShow.sync="confirmToCert" @enSure="toCert"/>
    <sas-dialog-purchase :show.sync="purchaseDialogVisible" />
    <sas-dialog-no-signet :show.sync="visibleDialogNoSignet" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
import apis from "~/config/api";
import contractMixin from "~/mixins/contract-mixins";
import utils from "~/mixins/utils";
import dialogPurchase from "~/components/dialog/dialog-purchase";
import dialogNoSignet from "~/components/dialog/dialog-no-signet";
import Vuelidate from "vuelidate";
import { required, minLength, between } from "vuelidate/lib/validators";
let ueContentChangeTimes = 0;
export default {
  name: "contract-edit",
  metaInfo: {
    title: "合同编辑-云合同"
  },
  data() {
    return {
      inputBorderStyle: {
        borderRadius: "0px"
      },
      activeToolsBtn: "", // 正在操作的按钮名称
      ue: null,
      contractHtml: "",
      inputStyle: {
        border: "none",
        borderBottom: "1px solid #d8dce5",
        borderRadius: "0px"
      },
      isSubmited: false,
      visibleDialogNoSignet: false, //显示未设置签名弹窗
      title: this.$route.query.name,
      aname: "",
      anameFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      acid: "",
      acidFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      aaddress: "",
      aaddressFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      aemail: "",
      aemailFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      aphone: "",
      aphoneFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      bname: "",
      bnameFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      bagent: "",
      bagentFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      bphone: "",
      bphoneFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      cagent: "",
      cagentFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      cphone: "",
      cphoneFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      pprovince: "",
      pprovinceFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      pcity: "",
      pcityFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      parea: "",
      pareaFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      proad: "",
      proadFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      phousenumber: "",
      phousenumberFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      pseries: "",
      pseriesFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      phouse: "",
      phouseFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      pbuilding: "",
      pbuildingFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      punit: "",
      punitFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      pfloor: "",
      pfloorFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      proom: "",
      proomFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      phall: "",
      phallFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      pkitchen: "",
      pkitchenFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      ptoilet: "",
      ptoiletFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      pbalcony: "",
      pbalconyFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      psquaremetre: "",
      psquaremetreFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      pdays: "",
      pdaysFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      psyear: "",
      psyearFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      psmonth: "",
      psmonthFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      psday: "",
      psdayFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      peyear: "",
      peyearFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      pemonth: "",
      pemonthFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      peday: "",
      pedayFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      ptotal: "",
      ptotalFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      pmillionunit: "",
      pmillionunitFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      phundredthousandunit: "",
      phundredthousandunitFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      ptenthousandunit: "",
      ptenthousandunitFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      pthousandunit: "",
      pthousandunitFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      phundredunit: "",
      phundredunitFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      ptenunit: "",
      ptenunitFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      pyuan: "",
      pyuanFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      ppayment: "",
      ppaymentFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      pstage: "",
      pstageFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      pdownpayments: "",
      pdownpaymentsFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      pdownpaymentsyuan: "",
      pdownpaymentsyuanFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      ptailmoney: "",
      ptailmoneyFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      ptailmoneyyuan: "",
      ptailmoneyyuanFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      ptailmoney1: "",
      ptailmoney1Focus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      ptailmoneyyuan1: "",
      ptailmoneyyuan1Focus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      pconventions: "",
      pconventionsFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      adelegate: "",
      adelegateFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      adelegatecid: "",
      adelegatecidFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      adelegatephone: "",
      adelegatephoneFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      bdelegate: "",
      bdelegateFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      bdelegatecid: "",
      bdelegatecidFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      bdelegatephone: "",
      bdelegatephoneFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      bhotphone: "",
      bhotphoneFocus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      agree1: "",
      agree1Focus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      agree2: "",
      agree2Focus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      },
      agree3: "",
      agree3Focus: {
        textDecoration: "none",
        borderBottom: "1px solid"
      }
    };
  },
  validations: {
    aname: {
      required
    },
    acid: {
      required
    },
    aaddress: {
      required
    },
    aemail: {
      required
    },
    aphone: {
      required
    },
    bname: {
      required
    },
    bagent: {
      required
    },
    bphone: {
      required
    },
    cagent: {
      required
    },
    cphone: {
      required
    },
    pprovince: {
      required
    },
    pcity: {
      required
    },
    parea: {
      required
    },
    proad: {
      required
    },
    phousenumber: {
      required
    },
    pseries: {
      required
    },
    phouse: {
      required
    },
    pbuilding: {
      required
    },
    punit: {
      required
    },
    pfloor: {
      required
    },
    proom: {
      required
    },
    phall: {
      required
    },
    pkitchen: {
      required
    },
    ptoilet: {
      required
    },
    pbalcony: {
      required
    },
    psquaremetre: {
      required
    },
    pdays: {
      required
    },
    psyear: {
      required
    },
    psmonth: {
      required
    },
    psday: {
      required
    },
    peyear: {
      required
    },
    pemonth: {
      required
    },
    peday: {
      required
    },
    ptotal: {
      required
    },
    pmillionunit: {
      required
    },
    phundredthousandunit: {
      required
    },
    ptenthousandunit: {
      required
    },
    pthousandunit: {
      required
    },
    phundredunit: {
      required
    },
    ptenunit: {
      required
    },
    pyuan: {
      required
    },
    ppayment: {
      required
    },
    pstage: {
      required
    },
    pdownpayments: {
      required
    },
    pdownpaymentsyuan: {
      required
    },
    ptailmoney: {
      required
    },
    ptailmoneyyuan: {
      required
    },
    ptailmoney1: {
      required
    },
    ptailmoneyyuan1: {
      required
    },
    pconventions: {
      required
    },
    adelegate: {
      required
    },
    adelegatecid: {
      required
    },
    adelegatephone: {
      required
    },
    bdelegate: {
      required
    },
    bdelegatecid: {
      required
    },
    bdelegatephone: {
      required
    },
    bhotphone: {
      required
    },
    agree1: {
      required
    },
    agree2: {
      required
    },
    agree3: {
      required
    },
    validationGroup: [
      "aname",
      "acid",
      "aaddress",
      "aphone",
      "aemail",
      "bname",
      "bagent",
      "bphone",
      "cagent",
      "cphone",
      "pprovince",
      "pcity",
      "parea",
      "proad",
      "phousenumber",
      "phouse",
      "pbuilding",
      "punit",
      "pfloor",
      "proom",
      "phall",
      "pkitchen",
      "ptoilet",
      "pbalcony",
      "psquaremetre",
      "pdays",
      "psyear",
      "psmonth",
      "psday",
      "peyear",
      "pemonth",
      "peday",
      "ptotal",
      "pmillionunit",
      "phundredthousandunit",
      "ptenthousandunit",
      "pthousandunit",
      "phundredunit",
      "ptenunit",
      "pyuan",
      "ppayment",
      "pstage",
      "pdownpayments",
      "pseries",
      "pdownpaymentsyuan",
      "ptailmoney",
      "ptailmoneyyuan",
      "ptailmoney1",
      "ptailmoneyyuan1",
      "pconventions",
      "adelegate",
      "adelegatecid",
      "adelegatephone",
      "bdelegate",
      "bdelegatecid",
      "bdelegatephone",
      "bhotphone",
      "agree1",
      "agree2",
      "agree3"
    ]
  },
  mixins: [contractMixin, utils],
  async fetchData(to, from, context) {},

  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  filters: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    /*
    描述: 初始化 editor 数据、样式
    */
    init() {
      this.ue = UE.getEditor("editor");
      this.initUEditorStyle();
      this.addEditorChangeListeren(() => {
        ueContentChangeTimes++;
      });
      this.ue.addListener("ready", () => {
        this.ue.setContent(this.contractHtml);
      });
    },
    addEditorChangeListeren(cb) {
      this.ue.addListener("contentChange", cb);
    },
    /*
    描述: 初始化 editor 样式
    */
    initUEditorStyle() {
      this.ue.addListener("ready", () => {
        $(this.ue.body).css({
          padding: "16px 34px",
          "word-break": "break-all",
          "word-wrap": "break-word"
        });
        $("#edui1_bottombar").hide();
      });
    },
    /*
    设置输入内容
    */
    setFormItem($event, key) {
      this[key] = $event.target.innerHTML;
      this.$v[key].$touch();
    },
    /*
    校验合法输入
    */
    inputCheck() {
      // if(this.$v.validationGroup.$invalid) {
      //   this.$createMessage({
      //     type:'error',
      //     duration:3000,
      //     spinnerText: '输入项不允许为空'
      //   });
      //   return false;
      // } else {
      //   return true;
      // }
      return true;
    },
    //签署调用的保存
    async saveSign() {
      let contractHtml = $(".editor-edit").html();
      this.title = `${this.title}-${this.aname}-${this.bname}`;
      const r = await this.$axios
        .post(apis.saveContract, {
          id: "",
          title: this.title,
          content: contractHtml,
          defineNo: "",
          defineTag: ""
        })
        .then(data => data.data);
      return r;
    },
    /*
    签署
    */
    async doSign() {
      const loading = this.$createLoading();
      const r = await this.$axios
        .get(apis.getCertStatus)
        .then(data => data.data.data); //获取认证信息
      if (r === "unCerted") {
        //未认证
        this.confirmToCert = true;
        loading.close();
      } else {
        //已认证
        if (this.inputCheck()) {
          //输入校验通过
          this.isSubmited = true;
          const c = await this.saveSign().then(data => data); //保存合同

          let cid = c.data ? c.data.id : ""; //合同ID
          let pid = c.data ? c.data.parter.id : "";
          const n = await this.$axios
            .get(apis.checkContractNumIsNotFull, {
              params: {
                contractId: cid
              }
            })
            .then(data => data.data); //获取剩余签署份数
          if (n.code !== 200) {
            //剩余签署份数不够，弹窗购买套餐弹窗
            this.purchaseDialogVisible = true;
            this.isSubmited = false;
            loading.close();
          } else {
            // 合同图片是否生成成功
            const s = await this.$axios
              .get(apis.n_query, {
                params: {
                  pageNo: 1,
                  limit: 3
                }
              })
              .then(res => res.data); // 读取我的印章列表

            const a = await this.$axios
              .post(apis.authorizedSignList, {
                pageNo: 1,
                limit: 3
              })
              .then(res => res.data); // 读取授权的印章列表

            if (!s.data.rows.length && !a.data.rows.length) {
              //校验是否已有签名印章
              this.visibleDialogNoSignet = true;
              this.isSubmited = false;
              loading.close();
            } else {
              const g = await this.genContractImages(pid).then(data => data);
              if (g === true) {
                // 跳转合同签署页面
                loading.close();
                this.$router.push({
                  name: "manage-contract-contract-sign",
                  query: { pid: pid, cid: cid }
                });
              } else {
                this.$createMessage({
                  type: "error",
                  duration: 3000,
                  spinnerText: "合同加密失败，请重新尝试"
                });
                this.isSubmited = false;
                loading.close();
              }
            }
          }
        } else {
          loading.close();
        }
      }
    },
    /*
    描述：生成合同图片
    pid:
    返回值：
      成功：true
      失败：false
    */
    async genContractImages(pid) {
      const r = await this.$axios
        .post(apis.genContractImage, {
          pid: pid
        })
        .then(data => data.data);
      if (r.code == 200) {
        return true;
      } else {
        return false;
      }
    },
    /*
    描述： 合同编辑/合同发送
    */
    async doSend() {
      if (this.inputCheck()) {
        //输入校验通过
        this.isSubmited = true;
        const loading = this.$createLoading();
        const c = await this.saveSign().then(data => data); //保存合同
        let cid = c.data ? c.data.id : ""; //合同ID
        let pid = c.data ? c.data.parter.id : "";
        loading.close();
        this.$router.push({
          name: "manage-contract-contract-send",
          query: { pid: pid }
        });
      }
    },
    inputFocus(key, val) {
      if (!val) {
        this[key].textDecoration = "underline";
        this[key].borderBottom = "none";
        // this[key] = {'textDecoration': 'underline', 'borderBottom': 'none'};
      }
    },
    inputBlur(key, val, border = "2px") {
      if (!val) {
        this[key].textDecoration = "none";
        this[key].borderBottom = `${border} solid`;
        // this[key] = {'textDecoration': 'none', 'borderBottom': `${border} solid`};
      } else {
        // this[key].border = 'none';
        // this[key].textDecoration = 'underline'
      }
    }
  },
  components: {
    "sas-dialog-purchase": dialogPurchase,
    "sas-dialog-no-signet": dialogNoSignet
  }
};
</script>

<style type="text/css">
</style>
<style lang="scss"  scoped >
@import "~styles/base.scss";
.contract-edit-yasha {
  @include responsive-default {
    background: #e6ecf5;
    .content-wraper {
      width: 904px;
      margin: 0 auto;
      /* min-height: 100%; */
      height: 100%;
      .edit-handle {
        position: fixed;
        width: 100%;
        top: 50px;
        left: 0;
        background: #e6ecf5;
        z-index: 2;
        .top-row {
          width: 904px;
          margin: 0 auto;
          text-align: right;
          height: 84px;
          .btn-item {
            position: relative;
            top: 50%;
            display: inline-block;
            text-align: center;
            cursor: pointer;
          }
          .item-save {
            transform: translateY(-32px);
          }
          .item-sign {
            transform: translateY(-21px);
            color: #95abd5;
          }
          .item-send {
            transform: translateY(-21px);
            color: #95abd5;
          }
          .btn-item:not(:last-child) {
            margin-right: 15px;
          }
        }
      }
      .editor-panel {
        background: #fff;
        margin-top: 84px;
        .editor-edit {
          padding: 0 42px;
          border: 1px solid #d5d5d5;
          p {
            margin: 0;
          }
          .border-input {
            border: 1px solid;
          }
          .border-strength-input {
            border: 2px solid;
          }
        }
      }
    }
  }
  #pseries {
    &:focus {
      // outline: none;
    }
  }
}
</style>
<style lang="scss">
// .ueditor-body{
//   .edit-panel{
//     height: 100%;
//     [id='editor']{
//       height: 100%;
//       .edui-editor{
//         height: 100%;
//         .edui-editor-iframeholder{
//           height: calc(100% - 57px) !important;
//         }
//       }
//     }
//   }
// }
</style>
