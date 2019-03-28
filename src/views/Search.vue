<template> 
<div>
  <van-search
    v-model="value"
    placeholder="请输入搜索关键词"
    show-action
    shape="round" 
  >
    <div slot="action" @click="fanhuiHandle">返回</div>
  </van-search> 
  <div class="rm"><span>热门搜索</span></div>
  <div class="bq">
    <van-tag round class="jg1">坚果-102</van-tag>
    <van-tag round class="jg2">chizi-1</van-tag>
    <van-tag round class="jg3">坚果 Pro -2</van-tag>
    <van-tag round class="jg4">锤子 pro -102</van-tag>
    <van-tag round class="jg5">坚果5</van-tag>
  </div>
  </div>

</template>
<script>
export default {
  data(){
    return{
      value:""
    }
  },
  methods: {
    fanhuiHandle(){
      this.$router.push({name: 'home'});
      this.$router.go(0)
    },
    }
}
</script>


<style>
body{
  background:#eee;
  width: 100%;
  height: 100%;
}
.rm{
height: 2rem;
line-height: 2rem;
margin: 1rem;
color: #999;
}
.bq{ 
}
.jg1,.jg2,.jg3,.jg4,.jg5{
  height: 1.5rem;
  font-size:1rem ;
  line-height: 1.5rem; 
  margin: 1rem;
}
.jg1{
  border-color:rgba(111, 111, 111, 0.5);
  color: rgba(111, 111, 111, 1);
  background: rgba(111, 111, 111, 0.2) !important; 
}
.jg2{
  border-color:rgba(150, 30, 30, 0.5);
  color: rgba(150, 30, 30, 1);
  background: rgba(150, 30, 30, 0.2) !important; 
}
.jg3{
  border-color:rgba(29, 54, 196, 0.5);
  color: rgba(29, 54, 196, 1);
  background: rgba(29, 54, 196, 0.2) !important; 
}
.jg4{
  border-color:rgba(34, 219, 105, 0.5);
  color: rgba(34, 219, 105, 1);
  background: rgba(34, 219, 105, 0.2) !important; 
}
.jg5{
  border-color:rgba(219, 141, 23, 0.5);
  color: rgba(219, 141, 23, 1);
  background: rgba(219, 141, 23, 0.2) !important; 
}
</style>

