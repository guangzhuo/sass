<template>
  <div class="about-pad-bottom-h">
    <div class="lx-container">
      <div class="row about-pad-top-h">
        <h3 class="text-center">诚聘英才</h3>
      </div>
      <div class="row all-relative">
        <div class="col-xs-8 col-xs-offset-2"><img src="~/assets/img/src/about/map-bg.jpg" width="100%"></div>
        <div class="row col-xs-10 col-xs-offset-1 about-invite-position-h">
          <ul class="row nav nav-tabs1-h">
            <li class="col-xs-4 about-center-h" :class="{'active':isC}" @click="ActiveShow('C')">
              <a class="about-invite-circle-h about-margin-auto-h" data-toggle="tab">
                <p class="about-margin-top-h">销售中心</p>
                <p class="font-weight-h about-p-size-h">客服销售类</p>
                <p class="about-invite-span-h">—</p>
                <p>2016/06/05</p>
              </a>
            </li>
            <li class="col-xs-4 about-center-h" :class="{'active':isD}" @click="ActiveShow('D')">
              <a class="about-invite-circle-h about-margin-auto-h" data-toggle="tab">
                <p class="about-margin-top-h">营销推广</p>
                <p class="font-weight-h about-p-size-h">运营推广类</p>
                <p class="about-invite-span-h">—</p>
                <p>2016/06/05</p>
              </a>
            </li>
            <li class="col-xs-4 about-center-h" :class="{'active':isE}" @click="ActiveShow('E')">
              <a class="about-invite-circle-h about-margin-auto-h" data-toggle="tab">
                <p class="about-margin-top-h">技术支持</p>
                <p class="font-weight-h about-p-size-h">产品技术类</p>
                <p class="about-invite-span-h">—</p>
                <p>2016/06/05</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane" :class="{'active':isC}">
          <div class="row">
            <ul class="nav nav-tabs2-h text-center">
              <li class="col-xs-15 col-xs-offset-4 about-invite-btn-h"
                  :class="{'active':isA}" @click="ActiveShow('A')">
                <a class="about-p-size-h" data-toggle="tab">销售代表</a></li>
              <li class="col-xs-15 about-invite-btn-h"
                  :class="{'active':isB}" @click="ActiveShow('B')">
                <a class="about-p-size-h" data-toggle="tab">客服专员</a></li>
            </ul>
          </div>
          <div class="tab-content">
            <div class="tab-pane" :class="{'active':isA}" id="sell-job1">
              <div class="row about-invite-bg-h">
                <h4 class="font-weight-h">销售代表</h4>
                <p>职位描述：</p>
                <p>1、挖掘并跟踪潜在客户，介绍并销售云合同产品及服务；</p>
                <p>2、利用电话、上门拜访、客户见面会等多元化的方式进行推销；</p>
                <p>3、负责通过CRM系统、网站推广等终端销售，市场开发；</p>
                <p>4、根据客户的不同需求，有针对性的为客户设计及推销合适的产品和服务；</p>
                <p>5、保持与客户的沟通与联系；</p>
                <p>6、每月完成既定的销售指标；</p>
                <p>7、协助经理完成销售部其他相关事宜；</p>
                <p>职位要求：</p>
                <p>1、本科以上学历（优秀候选人或有销售经验可放宽到大专），年龄23-32岁；</p>
                <p>2、富有激情，热爱销售工作，善于表现和沟通，有很强的成功欲望，敢于挑战高薪；</p>
                <p>3、熟悉使用办公软件；</p>
                <p>4、良好的职业道德、职业操守及团队合作意识；</p>
                <p>5、有在互联网、股权众筹，人力资源，中介，通信、培训、保险、金融服务领域、物流行业等从事者优先，待遇从优；</p>
                <p>6、有相关工作经验者可适当放宽条件；</p>
              </div>
            </div>
            <div class="tab-pane" :class="{'active':isB}" id="sell-job2">
              <div class="row about-invite-bg-h">
                <h4 class="font-weight-h">客服专员</h4>
                <p>职位描述：</p>
                <p>1、负责来访、电话以及网络上所有客户的咨询、查询的解答；</p>
                <p>2、负责产品介绍、演示及客户使用问题等服务；</p>
                <p>3、负责用户的注册、实名认证的审核工作；</p>
                <p>4、负责客户电话回访、跟进及处理客户投诉等问题；</p>
                <p>5、负责做好工作周报，及时反馈信息的统计、分析和汇报；</p>
                <p>6、完成上级安排的其他工作任务；</p>
                <p>职位要求：</p>
                <p>1、声音清晰有力，普通话标准；</p>
                <p>2、有较强的学习能力，回答问题的应变能力，能够适应值班；</p>
                <p>3、最好有客服工作经验，接受应届生；</p>
                <p>4、良好的工作执行力，严格按规范及流程进行工作或相关操作；</p>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane" :class="{'active':isD}">
          <div class="row">
            <ul class="nav nav-tabs2-h text-center">
              <li class="col-xs-15 col-xs-offset-4 about-invite-btn-h" :class="{'active':isF}" @click="ActiveShow('F')"><a class="about-p-size-h" data-toggle="tab">平面设计师</a></li>
              <li class="col-xs-15 about-invite-btn-h" :class="{'active':isG}" @click="ActiveShow('G')"><a class="about-p-size-h" data-toggle="tab">文案</a></li>
            </ul>
          </div>
          <div class="tab-content">
            <div class="tab-pane" :class="{'active':isF}">
              <div class="row about-invite-bg-h">
                <h4 class="font-weight-h">平面设计师</h4>
                <p>职位描述：</p>
                <p>1、负责公司整体形象设计；</p>
                <p>2、负责公司各类市场活动的海报、展板、宣传材料、赠品包装及其它有关的视觉策划和设计制作；</p>
                <p>3、负责公司各类PPT美化及宣传彩页设计；</p>
                <p>职位要求：</p>
                <p>1、设计类相关专业大专以上学历；</p>
                <p>2、有较强的美术功底和色彩运用功底及良好的艺术修养，有优秀创意、审美及实现能力，有美工设计、样本印刷制作经验；</p>
                <p>3、熟练掌握包括Photoshop、Illustrator等设计软件；</p>
                <p>4、有大型公司平面设计经验，有一定的团队领导能力者优先；</p>
                <p>5、认真诚恳，责任心强，有良好的沟通能力及团队合作能力，较强的上进心、踏实肯干；愿意接受挑战和承受工作压力；</p>
              </div>
            </div>
            <div class="tab-pane" :class="{'active':isG}">
              <div class="row about-invite-bg-h">
                <h4 class="font-weight-h">文案</h4>
                <p>职位描述：</p>
                <p>1、负责公司常规的对外传播文案，能独立撰写各类稿件（新闻稿、综述稿、评论稿、专访稿等）、策划方案、报告等；</p>
                <p>2、能够紧跟网络文化并发挥自己的创意，协助团队，完成文案的创作和编辑；</p>
                <p>3、协助团队完成网站、微信、微博等新媒体的内容编辑、专题策划；</p>
                <p>4、协助团队对产品页面进行文案描述；</p>
                <p>5、负责促销活动文案的构思和编写；</p>
                <p>职位要求：</p>
                <p>1、本科以上学历，中文、新闻、传媒等相关专业；</p>
                <p>2、文字功底扎实，文笔出众，擅长撰写各类文字稿件；</p>
                <p>3、对互联网与移动互联网有一定的了解；</p>
                <p>4、具有杂志、纸媒采访、微文撰写等经验，有实际约稿、改稿、审稿的经验；</p>
                <p>5、能够准确捕捉产品亮点，具备恰如其分的文字表现能力；</p>
                <p>6、具有专业创意思维、敏锐的洞察力、丰富的想象力、新闻敏感度且善于与人沟通；</p>
                <p>7、具有深厚的文字功底，掌握不同风格文案写作方法,精通各种文案的处理方法，熟练应用office办公软件；</p>
                <p>8、积极主动、敬业、责任心强、快速适应新环境，能承受一定的工作压力；</p>
              </div>
            </div>
            <div class="tab-pane" id="operate-job3">
              <div class="row about-invite-bg-h">
                <h4 class="font-weight-h">客服</h4>
                <p>职位描述：</p>
                <p>1、挖掘并跟踪潜在客户，介绍并销售云合同产品及服务；</p>
                <p>2、利用电话、上门拜访、客户见面会等多元化的方式进行推销；</p>
                <p>3、负责通过CRM系统、网站推广等终端销售，市场开发；</p>
                <p>4、根据客户的不同需求，有针对性地为客户设计及推销合适的产品和服务；</p>
                <p>5、保持与客户的沟通与联系；</p>
                <p>6、每月完成既定的销售指标；</p>
                <p>7、协助经理完成销售部其他相关事宜；</p>
                <p>职位要求：</p>
                <p>1、本科以上学历（优秀候选人或有销售经验可放宽至大专），年龄23-32岁；</p>
                <p>2、富有激情，热爱销售工作，善于表现和沟通，有很强的成功欲望，学习欲望，敢于挑战高薪；</p>
                <p>3、熟悉使用办公软件；</p>
                <p>4、良好的职业道德，职业操守及团队合作意识；</p>
                <p>5、有在互联网、通信、培训、保险、金融服务领域、机械行业或物流行业等从事营销1-2年经验者优先，待遇从优；</p>
                <p>6、有相关工作经验者可适当放宽条件；</p>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane" :class="{'active':isE}">
          <div class="row">
            <ul class="nav nav-tabs2-h text-center">
              <li  :class="{'active':isH}" @click="ActiveShow('H')" class="col-xs-15 col-xs-offset-3 about-invite-btn-h"><a class="about-p-size-h" data-toggle="tab">技术经理</a></li>
              <li  :class="{'active':isM}" @click="ActiveShow('M')" class="col-xs-15 about-invite-btn-h"><a class="about-font-h" data-toggle="tab" style="padding-top: 10px">资深移动端开发工程师</a></li>
              <li  :class="{'active':isN}" @click="ActiveShow('N')" class="col-xs-15 about-invite-btn-h"><a class="about-p-size-h" data-toggle="tab">高级前端开发工程师</a></li>
              <li  :class="{'active':isO}" @click="ActiveShow('O')" class="col-xs-15 col-xs-offset-4 about-invite-btn-h"><a class="about-p-size-h" data-toggle="tab">高级Java开发工程师</a></li>
              <li  :class="{'active':isP}" @click="ActiveShow('P')" class="col-xs-15 about-invite-btn-h"><a class="about-p-size-h" data-toggle="tab">产品经理</a></li>
            </ul>
          </div>
          <div class="tab-content">
            <div class="tab-pane" :class="{'active':isH}">
              <div class="row about-invite-bg-h">
                <h4 class="font-weight-h">技术经理</h4>
                <p>职位描述：</p>
                <p>1、项目核心模块开发与日后关键技术选型，对目前的技术框架进行优化与完善；</p>
                <p>2、能够随着项目发展，对关键代码进行优化重构；</p>
                <p>3、辅助部门主管完成人员招聘，培训指导，绩效管理及团队建设等方面工作；</p>
                <p>职位要求：</p>
                <p>1、有5年WEB项目开发经验(互联网行业优先)，参与过中大型网站的开发和设计，最好带领过团队；</p>
                <p>2、精通java语言与另外一门脚本语言(python,ruby,php等)；</p>
                <p>3、熟悉流行的J2EE开发框架，精通spring框架.掌握前端开发技术：Ajax,css等；</p>
                <p>4、熟悉Tomcat，Nginx等应用服务器；</p>
                <p>5、熟悉mysql数据库系统，会基本的应用优化；</p>
                <p>6、掌握基本的linux命令，能够独立部署应用；</p>
                <p>7、熟悉Maven,Git/Svn,Jenkins/Hudson等开发工具者优先；</p>
                <p>8、对分布式集群搭建，负载均衡都有一定的实际经验优先；</p>
                <p>9、对网络传输与存储安全有一定的研究经验者优先；</p>
                <p>10、有恒心，有毅力，不怕疑难杂症，爱攻克难题,热爱学习专研新技术，乐于分享；</p>
              </div>
            </div>
            <div class="tab-pane" :class="{'active':isM}">
              <div class="row about-invite-bg-h">
                <h4 class="font-weight-h">资深移动端开发工程师</h4>
                <p>职位描述：</p>
                <p>1、负责iOS/Android系统手机软件设计与开发，第三方SDK的集成及编写；</p>
                <p>2、参与公司项目需求分析、产品模块的概要和详细设计，编写设计开发及实现文档；</p>
                <p>3、按计划完成产品模块的代码编写，产品模块测试，保证代码质量；</p>
                <p>4、参与产品的架构设计，持续优化保证产品的质量、性能、用户体验；</p>
                <p>职位要求：</p>
                <p>1、对IOS和Android开发都具有一定的经验，熟练掌握Objective-C，JAVA，javascript语言，两端都能独立开发APP，并存在现有APP作品；</p>
                <p>2、熟悉移动端开发架构；</p>
                <p>3、有良好的UI/UE，用户体验的见解与认识；</p>
                <p>4、对手机软件性能优化，内存优化有一定的经验；</p>
                <p>5、具有SDK开发经验者优先；</p>
                <p>6、最好拥有个人技术博客和个人网站、公众号</p>
                <p>7、对开源社区做过贡献或有相关著作者优先；</p>
                <p>8、有过团队管理和建设经验优先；</p>
              </div>
            </div>
            <div class="tab-pane" :class="{'active':isN}">
              <div class="row about-invite-bg-h">
                <h4 class="font-weight-h">高级前端开发工程师</h4>
                <p>职位描述：</p>
                <p>1、负责网站产品的开发和维护；</p>
                <p>2、依据产品需求完成高质量的Web前端开发和维护；</p>
                <p>3、对具体的产品进行性能优化，实现极致的Web加载、执行和渲染时间；</p>
                <p>4、在理解前端开发流程的基础上，结合前端实际建立或优化提升工作效率的工具；</p>
                <p>5、在理解产品业务的基础上，结合前端技术建立或优化Web的交互方式；</p>
                <p>职位要求：</p>
                <p>1、两年以上前端开发经验；</p>
                <p>2、精通JavaScript等主流Web前端技术，如XHTML或XML或CSS或Javascript等；</p>
                <p>3、深刻理解Web标准，对浏览器兼容性问题有丰富经验；</p>
                <p>4、至少熟悉一门非Web前端脚本的语言（如Java或PHP或C++或Node.js）并有实践经验；</p>
                <p>5、细心，热爱技术，喜欢钻研；</p>
                <p>6、成就感来自用户的认可，来自亲手实现的产品，来自亲手解决的疑难杂症；</p>
                <p>7、良好的表达和理解能力，良好的学习能力，良好的解决问题能力；</p>
              </div>
            </div>
            <div class="tab-pane" :class="{'active':isO}">
              <div class="row about-invite-bg-h">
                <h4 class="font-weight-h">高级Java开发工程师</h4>
                <p>职位描述：</p>
                <p>1、网站产品的开发与维护，各种疑难杂症的解决与规避；</p>
                <p>2、后端应用的开发与维护；</p>
                <p>职位要求：</p>
                <p>1、三年以上Web开发经验，热爱技术，喜欢钻研；</p>
                <p>2、精通PHP/Java，熟悉Mysql，熟悉Linux；</p>
                <p>3、有分布式系统经验优先；</p>
                <p>4、熟悉一些开源框架者优先；</p>
              </div>
            </div>
            <div class="tab-pane" :class="{'active':isP}">
              <div class="row about-invite-bg-h">
                <h4 class="font-weight-h">产品经理</h4>
                <p>职位描述：</p>
                <p>1、研究市场、了解客户需求、竞争对手状况，根据项目战略，协助领导确定商业模式，制定长中短期的发展战略；</p>
                <p>2、负责公司产品框架的整体规划，制定产品策略、方案并组织执行；</p>
                <p>3、配合公司营销部业务拓展，促成产品合作的商务谈判及产品合作协议的签订；</p>
                <p>职位要求：</p>
                <p>1、全日制本科及以上学历，计算机、电子、通信、类等专业；</p>
                <p>2、2年以上产品开发管理、设计和运营的工作经验，对产品有深刻理解，有成功案例；</p>
                <p>3、熟习产品交互设计的相关流程，包括功能分析、原型设计、界面开发、易用性测试等；</p>
                <p>4、抗压能力强，有较强的沟通协调能力和团队合作意识；</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row text-center">
          <div class="col-xs-4 col-xs-offset-4 security-mar-top4-h">
            <a class="col-xs-12 about-btn-invite-h">简历投递至  zhanghaiyue@yunhetong.net</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isA: true,//销售代表
        isB: false,//客服专员
        isC: true,//销售中心
        isD: false,//营销推广
        isE: false,//技术支持
        isF: true,//平面设计师
        isG: false,//文案
        isH: true,//技术经理
        isM: false,//资深移动端开发工程师
        isN: false,//高级前端开发工程师
        isO: false,//高级Java开发工程师
        isP: false//产品经理
      }
    },
    components: {
    },
    mounted () {
    },
    watch: {
    },
    methods: {
      ActiveShow(val){
        //此函数为销售中心切换 销售代表和客服专员的tab
        switch (val){
          case 'A':
            this.isA = true;
            this.isB = false;
            break;
          case 'B':
            this.isA = false;
            this.isB = true;
            break;
          case 'C':
            this.isC = true;
            this.isD = false;
            this.isE = false;
            break;
          case 'D':
            this.isC = false;
            this.isD = true;
            this.isE = false;
            break;
          case 'E':
            this.isC = false;
            this.isD = false;
            this.isE = true;
            break;
          case 'F':
            this.isF = true;
            this.isG = false;
            break;
          case 'G':
            this.isF = false;
            this.isG = true;
            break;
          case 'H':
            this.isH = true;
            this.isM = false;
            this.isN = false;
            this.isO = false;
            this.isP = false;
            break;
          case 'M':
            this.isH = false;
            this.isM = true;
            this.isN = false;
            this.isO = false;
            this.isP = false;
            break;
          case 'N':
            this.isH = false;
            this.isM = false;
            this.isN = true;
            this.isO = false;
            this.isP = false;
            break;
          case 'O':
            this.isH = false;
            this.isM = false;
            this.isN = false;
            this.isO = true;
            this.isP = false;
            break;
          case 'P':
            this.isH = false;
            this.isM = false;
            this.isN = false;
            this.isO = false;
            this.isP = true;
            break;
          default:
            console.log('val'+val);
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~styles/base.scss";
  .about-pad-bottom-h {
    background-color: #f5f6fa;
    padding-bottom: 40px;
    @include responsive-default {
      .about-pad-top-h{padding-top: 100px;}
      .all-relative{position: relative;}
      .container {
        width: 1230px!important;
        margin-right: auto;
        margin-left: auto
      }

      .container:after,.container:before {
        display: table;
        line-height: 0;
        content: ""
      }

      .container:after {
        clear: both
      }
      .about-invite-position-h{position: absolute; top: 20%;}
      .nav-tabs1-h>li>a {
        color: #333;
      }
      .nav-tabs1-h>li.active>a,.nav-tabs1-h>li.active>a:focus,.nav-tabs1-h>li.active>a:hover,.nav-tabs1-h>li>a:hover {
        background-color: #1e5cc3;
      }
      .nav-tabs1-h>li.active>a p,.nav-tabs1-h>li.active>a:focus p,.nav-tabs1-h>li.active>a:hover p,.nav-tabs1-h>li>a:hover p {
        color: #fff
      }
      .nav-tabs2-h>.col-xs-15 { margin-bottom: 30px; margin-right: 20px; padding: 0; width: 15.5%;}
      .col-xs-offset-4 { margin-left: 33.33333333%; }
      .col-xs-15 {  padding-right: 5px;padding-left: 5px;float: left;width: 15%;position: relative;min-height: 1px;}
      .about-btn-invite-h { color: #666; padding: 8px 0; border-radius: 5px }
      .about-center-h{text-align: center;}
      .about-invite-circle-h{width: 180px; height: 180px; border-radius: 90px; border: 2px solid #1e5cc3; background-color: #fff;}
      .about-margin-auto-h{margin: 0 auto;}
      .about-margin-top-h{margin-top: 25px;}
      .font-weight-h{font-weight: 600;}
      .about-p-size-h{font-size: 18px;}
      .about-invite-span-h{color: #1e5cc3; font-weight: 600;}
      .about-invite-btn-h{border: 1px solid #eee;}
      .about-p-size-h{font-size: 18px;}
      .about-invite-bg-h{background-color: #fff; padding: 10px 20px; margin: 0 100px;}
      .nav-tabs2-h >li >a{color: #333; font-weight: 600; height: 42px; padding: 8px 0;}
      .nav-tabs2-h > li.active > a, .nav-tabs2-h > li.active > a:hover, .nav-tabs2-h > li.active > a:focus, .nav-tabs2-h > li > a:hover{background-color: #94a4c5; color: #fff;}
      .nav-tabs2-h > .col-xs-15{margin-bottom: 30px;  margin-right: 20px; padding: 0;}
      .security-mar-top4-h{margin-left: 50px;}
      .about-font-h{font-size: 17px;}
    }
  }
</style>
