/**
 * Created by yeoman on 2014/12/3.
 */
 function cutString(str, len) {
    //length属性读出来的汉字长度为1
    if(str.length*2 <= len) {
        return str;
    }
    var strlen = 0;
    var s = "";
    for(var i = 0;i < str.length; i++) {
        s = s + str.charAt(i);
        if (str.charCodeAt(i) > 128) {
            strlen = strlen + 2;
            if(strlen >= len){
                return s.substring(0,s.length-1) + "...";
            }
        } else {
            strlen = strlen + 1;
            if(strlen >= len){
                return s.substring(0,s.length-2) + "...";
            }
        }
    }
    return s;
}
const ueditorExtend = function($){
    'use strict';
    let ueditor = {};
    ueditor.util = {
        myEditor:UE.getEditor('editor'),
        rePost:true,
        postils: {},
        sup: null,
        init: function(){
          //给编辑器注册，并在初始化时，设置编辑区样式
            ueditor.util.myEditor.ready(function() {
                $(ueditor.util.myEditor.body).css({"padding":"16px 34px","word-break":"break-all","word-wrap":"break-word"});
                $("#edui1_bottombar").hide();
                ueditor.util.reLoad();
            });
            ueditor.util.bindOptionEvents();
            ueditor.util.myEditor.addListener( 'contentChange', function() {
      ueditor.util.rePost = false;
            });
        },
        reLoad : function(){
          if($("#ctit").val()){
                $("#titInput").val($("#ctit").val());
                ueditor.util.myEditor.setContent($('#contract_content').contents().find("body").first().html());
        //ueditor.util.myEditor.setContent($("#contract_content").text());
                ueditor.util.upHNode(1);
                ueditor.util.upCatalogue();
                if($("#cid").val() && "0" != $("#cid").val()){
                  ueditor.util.rePost = true;
                }else{
                  ueditor.util.rePost = false;
                }

                $(ueditor.util.myEditor.body).find("sup").css("color", "#fa0202").css("font-weight", "bold").css("display", "none");
            }
          if($("#cid").val() && $("#cid").val() > 1){
            $.ajax({
              type : "GET",
              url : "/contract/contractPostil",
              data : {"cid":$("#cid").val()},
              success : function(result) {
                if (result.success) {
                  for(var i=0;i<result.list.length;i++){
                    var id = result.list[i].id;
                    ueditor.util.postils[id] = result.list[i];
                    var supNode = $(ueditor.util.myEditor.body).find("#"+id);
                    $(supNode).show();
                  }
                }
              }
            });
          }
        ueditor.util.bindSupEvent();
        },
        bindSupEvent : function(){
        $(ueditor.util.myEditor.body).find("sup").on("mouseover", function(){
            $("#puname").text(ueditor.util.postils[this.id].userName);
            $("#pdate").text(ueditor.util.postils[this.id].gmtCreate);
            $("#pCont").text(ueditor.util.postils[this.id].content);
        ueditor.util.sup = $(this);
        setTimeout("ueditor.util.showPostil()", 300);
      });
        $(ueditor.util.myEditor.body).find("sup").on("mouseout", function () {
          setTimeout("ueditor.util.hidePostil()", 100);
      });
        $(ueditor.util.myEditor.body).find("sup").on("contextmenu",function(){
          return false;
      });
        $("#postil").mouseover(function(){
        $(this).show();
        });
      $("#postil").mouseout(function () {
          $(this).hide();
      });
        },
        //更新H标签的name属性
        upHNode : function(n){
            var hNodes = $(ueditor.util.myEditor.body).find("h"+n);
            if(hNodes.length > 0){
              var m = 0;
              var maxM = '0';
              var unNameNodes = [];
              $(hNodes).each(function(){
                if($(this).attr("name")){
                  if($(this).attr("name").localeCompare(maxM)){
                    maxM = $(this).attr("name");
                  }
                }else{
                  unNameNodes.push(this);
                }
              });
              if(unNameNodes.length > 0){
                if(maxM.localeCompare('0')){
                  var maxMarr = maxM.split("_");
                  m = parseInt(maxMarr[maxMarr.length-1]);
                }
                $(unNameNodes).each(function(){
                  m++;
                  $(this).attr("name","h_"+n+"_"+m);
                });
              }
            }
            if(n < 6){
                ueditor.util.upHNode(n+1);
            }
        },
        //更新目录
        upCatalogue : function(){
            $("#treeUl").empty();
            var hNodes = $(ueditor.util.myEditor.body).find("[name^='h_']");
            var uHNodes = [];
            var flag = false;
            $(hNodes).each(function(){
              //查找元素在数组中的位置，不存在时返回－1
              if($.inArray($(this).attr("name"),uHNodes) != -1){
                $(this).removeAttr("name");
                flag = true;
              }else{
                uHNodes.push($(this).attr("name"));
              }
            });
            if(flag){
              ueditor.util.upHNode(1);
              hNodes = $(ueditor.util.myEditor.body).find("[name^='h_']");
            }
            $(hNodes).each(function(){
                if("H" === this.tagName.charAt(0)){
                    var hn = parseInt(this.tagName.charAt(1));
                    var text = $.trim($(this).text());
                    //根据几级标题计算列表缩进位
                    if(text.length > 15-hn){
                        text = text.substr(0,15-hn) + "…";
                    }
                    $("#treeUl").append("<li class='h"+hn+"-spac' name='"+$(this).attr("name")+"'>"+text+"</li>");
                }
            });
        },
        toSave: function(promp){
          $(".promp-li").text("");
            var titInput = document.getElementById("titInput");
            var cTitle = $.trim($(titInput).val());
            if (cTitle === titInput.defaultValue) {
                $(".promp-li").text("提示： 合同标题不能为空！");
                $(".promp-li").css("display", "block");
                return false;
            }
          if(cTitle.length > 64){
            $(".promp-li").text("提示： 合同标题超出最大长度！");
                $(".promp-li").css("display", "block");
                return false;
          }
            if (ueditor.util.myEditor.hasContents()) {
              if(ueditor.util.rePost){
                if(!promp){
                  swal("未作修改","未作修改，无需保存！","warning");
                }
                return true;
              }
               var cContent = $.trim(ueditor.util.myEditor.body.innerHTML);
                if(cTitle === $.trim($("#ctit").val()) && cContent === $.trim($("#contract_content").text()) && "0" != $("#cid").val()){
                  ueditor.util.rePost = true;
                  if(!promp){
                    swal("未作修改","未作修改，无需保存！","warning");
                  }
                  return true;
                }
                $("#ctit").val(cTitle);
                $("#contract_content").text(cContent);
                ueditor.util.rePost = true;
        //console.log("id:"+$("#cid").val(),"title:"+cTitle,"content:"+cContent,"defineNo:"+"","defineTag:"+"");
                /*$("body").showLoading();*/
                $.ajax({
              type : "POST",
          url : "/contract/contractEdit/l_save",
              data : {"id":$("#cid").val(),"title":cTitle,"content":cContent,"defineNo":defineNo,"defineTag":defineTag},
              async: false,
              success : function(result) {
//console.log("result:"+JSON.stringify(result));
                /*$("body").hideLoading();*/
                if (result.success) {
                  if(!promp){
                lx.util.tooltips("保存成功","success",2000);
                  }
                  if(!$("#cid").val() || $("#cid").val() < 1){
                    $("#cid").val(result.data.id);
                    if(result.data.parter){
                      $("#pid").val(result.data.parter.id);
                      if(!promp){
                        setTimeout(function(){window.location.href = "../../../app/contract/contract/contract_edit.html?pid="+result.data.parter.id;},2000);
                      }
                    }
                  }
                  if(!promp && window.opener != null){
                window.opener.location.reload()
              }
                  return true;
                } else {
                  $("body").hideLoading();
                  swal(result.msg,result.msg,"error");
                  return false;
                }
              }
            });
            } else {
                $(".promp-li").text("提示： 合同内容不能为空！");
                $(".promp-li").css("display", "block");
                return false;
            }
        },
        refrushPage: function(pid){
      window.location.href = "../../../app/contract/contract/contract_edit.html?pid="+pid;
        },
        showPostil: function(){
          if(ueditor.util.sup != null && $(ueditor.util.sup).is(':hover')){
            $("#pCont").scrollTop(10);
            while($("#pCont").scrollTop() > 0){
              $("#pCont").height($("#pCont").height()+20);
              $("#postil").height($("#postil").height()+20);
              $("#pCont").scrollTop(10);
            }
            var documentScrollLeft = ueditor.util.getScrollLeft();
            var varLeft = $(ueditor.util.sup).offset().left+306-documentScrollLeft+$(".abodyDIV").offset().left-$("#postil").outerWidth(true);
            var documentScrollTop = ueditor.util.getScrollTop();
            var myEditorScrollTop = ueditor.util.myEditor.body.scrollTop;
            if(myEditorScrollTop <= 0){
              //IE9可以，IE8不行
              myEditorScrollTop = $("#ueditor_0").contents().find("html").scrollTop();
            }
            if(myEditorScrollTop <= 0){
              //IE8可以，IE9不行
              myEditorScrollTop = $("#ueditor_0").contents().find("body").scrollTop();
            }
            if (UE.browser.ie) {
              myEditorScrollTop += 8;
            }
            var varTop = $(ueditor.util.sup).offset().top+105-documentScrollTop+$(".abodyDIV").offset().top-myEditorScrollTop;
            $("#postil").css("left", varLeft+"px");
            $("#postil").css("top", varTop+"px");
            $("#postil").show();
          }
        },
        hidePostil: function(){
          if(!$("#postil").is(':hover')){
        $("#postil").hide();
      }
        },
      getScrollLeft: function (){
          var scrollLeft=0;
          if(document.documentElement&&document.documentElement.scrollLeft){
              scrollLeft = document.documentElement.scrollLeft+4;
          }else if(document.body){
              scrollLeft = document.body.scrollLeft;
          }
          return scrollLeft;
      },
      getScrollTop: function (){
        var scrollTop=0;
        if(document.documentElement&&document.documentElement.scrollTop){
          scrollTop = document.documentElement.scrollTop;
        }else if(document.body){
          scrollTop = document.body.scrollTop;
        }
        return scrollTop;
      },
        bindOptionEvents: function() {
            //给合同标题输入框注册获得和失去焦点事件
            $("#titInput").focus(function(){
                $(this).css("color", "black");
                if($(this).val() === this.defaultValue){
                    $(this).val("");
                }
            });
            $("#titInput").keydown(function(event){
              if(13 === event.keyCode){
                return false;
              }
            });
            $("#titInput").on("input", function(){
                var titLen = $(this).val().length;
              if(titLen > 64){
                    $(".promp-li").text("提示： 合同标题超出最大长度！");
                    $(".promp-li").css("display","block");
                }else{
                  $(".promp-li").text("");
                  $(".promp-li").css("display","none");
                }
            });
            $("#titInput").blur(function(){
              if(!$.trim($(this).val())){
                $(this).val(this.defaultValue);
                $(this).css("color", "#999");
              }
              ueditor.util.rePost = false;
            });
            //给目录注册鼠标进入事件，以更新目录
            $(".cata-li").mouseenter(function () {
                ueditor.util.upHNode(1);
                ueditor.util.upCatalogue();
            });
            //给目录注册鼠标点击事件，以实现定位跳转
            $(".cata-li").click(function (event) {
                var name = $(event.target).attr("name");
                $(ueditor.util.myEditor.body).find("[name='" + name + "']").each(function () {
                    this.scrollIntoView(true);
                    if (UE.browser.ie) {
                        //IE8浏览器IE 8以上时
                        if (UE.browser.version > 8) {
                            var uer = ueditor.util.myEditor.selection.getRange();//获取当前选区
                            uer.selectNode(this);//选中指定元素
                            uer.setEnd(this, 0);//设置选区结束位置
                            uer.setCursor(true);//关闭选区，并定位光标到选区后的位置
                            ueditor.util.myEditor.selection.clearRange();//清除选区
                        }
                    }
                    return false;
                });
            });
            //给保存菜单注册鼠标点击事件，以实现保存合同的功能
            $("#save-li").click(function () {
              addContractMess(false,3,"","");
            });
        }
    };
    ueditor.util.init();
};
export default ueditorExtend;
