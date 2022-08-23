<template>
  <div>
 <div class="project">
<div class="title">项目</div>
<el-carousel :interval="5000" arrow="always" height="900px" ref="card">
    <el-carousel-item v-for="item in imgs" :key="item.url">
    <img :src="item.url" alt="" @click="go(item.link)">
    </el-carousel-item>
  </el-carousel>
</div>
  </div>
</template>

<script>
export default {
 data() {
    return {
        imgs:[{url:require('../../assets/imges/pro1.png'),link:'/login'},{url:require('../../assets/imges/pro2.png')},{url:require('../../assets/imges/pro3.png')}]
    }
 },
 methods:{
   go(link){
    this.$router.push(link)
   }
 }
}
</script>

<style scoped>
.project{
    height: 900px;
    position: relative;
    background-color: #161616;
}
.title{
    position: absolute;
    left: 50%;
    top:120px;
    font-size: 40px;
    transform:translate(-60%);
    color: #fff;
}
.carousel{
    /* width: 100%;
    height: 900px; */
}
</style>