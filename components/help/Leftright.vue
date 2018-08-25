<template>
  <div class="helpvi-d" v-html="videodemo">
  </div>

</template>
<script>
  import bus  from '~/components/help/eventBus'
  export default {
    data () {
      return {
        testvid:'',
        list:[],
        videodemo:''
      }
    },
    watch:{
      testvid:function(vid){
        this.list = [];
        this.videochange(vid);
      }
    },
    created: function () {
      var xdd='';
      bus.$on('showParentComp',function (msg) {
        this.testvid=msg;
      }.bind(this));
    },
    computed:{
    },
    mounted () {
      this.videochange('webFull');
    },
    methods: {
      videochange(v){
        this.videodemo=`<video style="float: none; margin: 60px 0 0 115px; width: 570px;height: 360px;border: 30px solid #e2e2e2; border-radius: 10px;box-shadow: 0 0 0 1px #fff;"  controls="controls"  preload="none" poster="./static/img/video.png"  width="620" height="350" title="云合同">
                          <source src="http://video.yunhetong.com/shipin/Formation/${v}.m4v" type="video.mp4" />
                          <source src="http://video.yunhetong.com/shipin/Formation/${v}.webm" type="video.webm" />
                          <source src="http://video.yunhetong.com/shipin/Formation/${v}.ogv" type="video.ogg" />
                          <source src="http://video.yunhetong.com/shipin/Formation/${v}.mp4" />
                        </video>`;
      }
    }
  }
</script>
