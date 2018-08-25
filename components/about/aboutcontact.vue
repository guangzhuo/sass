<template>
  <div class="about-bg-h  about-pad-bottom-h">
    <div class="container">
      <div class="col-xs-10 col-xs-offset-1">
        <div class="row about-pad-top-h">
          <div class="row about-contact-p-h">联系我们</div>
          <div class="col-xs-6">
            <div class="row">
              <p>公司名称：浙江律讯网络科技有限公司</p>
              <p>公司地址：浙江省杭州市余杭区文一西路1198号万利大厦16层</p>
              <p>邮箱：lvxun@yunhetong.com</p>
              <p>客服时间：周一至周日 09:00&#45;&#45;21:00</p>
              <p>商务合作热线：0571-26307246</p>
              <p>渠道合作热线：400-600-3669</p>
            </div>
            <a href="./static/file/YunhetongFranchisee.rar" class="btn about-btn-join-h" target="_blank">申请加盟云合同</a>
          </div>
        </div>
        <div class="row about-pad-top-h">
          <div class="row about-contact-p-h">公司位置</div>
          <div class="row">
            <div class="row">
              <img src="~/assets/img/src/about/position-icon.png">
            </div>
            <div class="text-center about-map-h">
              <div id="l-map" style="width: 930px; height: 300px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let map = null;
export default {
  data() {
    return {};
  },
  components: {},
  mounted() {
    this.mapshow();
    map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
  },
  watch: {},
  methods: {
    mapshow() {
      map = new BMap.Map("l-map");
      map.centerAndZoom(new BMap.Point(119.985, 30.295), 15);

      var marker = new BMap.Marker(new BMap.Point("120.015637", "30.284589")); // 创建标注
      var content =
        "地址：浙江省杭州市余杭区文一西路1198号万利大厦16层<br>客服热线：400-600-366";
      map.addOverlay(marker); // 将标注添加到地图中
      this.addClickHandler(content, marker);
    },
    addClickHandler(content, marker) {
      marker.addEventListener("click", function(e) {
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var opts = {
          width: 450, // 信息窗口宽度
          height: 50, // 信息窗口高度
          title: "", // 信息窗口标题
          enableMessage: true //设置允许信息窗发送短息
        };
        var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
        map.openInfoWindow(infoWindow, point); //开启信息窗口
      });
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.about-pad-bottom-h {
  background-color: #f5f6fa;
  padding-bottom: 100px;
  @include responsive-default {
    .about-pad-top-h {
      padding-top: 60px;
    }
    .about-btn-join-h {
      background-color: #82abf6;
      color: #fff;
      padding: 5px 35px;
      border-radius: 4px;
    }
    .about-btn-join-h:hover {
      background-color: #4081ff;
    }
    .about-contact-p-h {
      font-weight: 700;
      border-left: 4px solid #83aaf7;
      padding-left: 10px;
      font-size: 22px;
      margin-bottom: 20px;
    }
    .about-map-h {
      background-color: #fff;
      padding: 10px;
      margin-top: 8px;
    }
    .about-margin-d {
      margin-top: 60px;
    }
  }
}
</style>
