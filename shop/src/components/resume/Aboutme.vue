<template>
  <div class="about" ref="about">
  <div class="me">关于我</div> 
  <div class="ab">关于</div>
  <div class="describe">
    <p>我叫<span>秦贺龙</span>，今年<span>21岁</span>，现居住在<span>河南省平顶山市</span>。个人掌握<span>Html，Css，JavaScript</span>等网页编辑基础。能够熟练使用<span>Vue</span>
    ，了解jq等其他前端框架，能够熟练的使用Photoshop，Ai等设计软件，拥有<span>较好的审美能力，</span>对<span>页面交互</span>有一定的理解。可以接受外地工作</p> 
  </div>
<div class="decorate">
    <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
    <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
    <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>


  </div>
</template>

<script>
export default {
    mounted(){
    
    }
}
</script>

<style scoped>
.about{
    width: 100%;
    height: 762px;
    background-color: #161616;
    padding-top: 160px;
    position: relative;
    overflow: hidden;
}
.me{
    height: 45px;
    width: 145px;
    margin: 0 auto;
    font-size: 40px;
    color: #fff;
    
}
.ab{
    font-size: 180px;
   color: #272727;
   position: absolute;
   right:-40px;
   top:40px;
}
.describe{
    width: 900px;
    margin: 0 auto;
    margin-top:90px;
    font-size: 36px;
   text-align: justify;
   color:#fff
}
.describe span{
    color: #13ff00;
}
.decorate{
    position: absolute;
    left: -15px;
    bottom: 10px;
}
.decorate ul{
width: 230px;
display: flex;
justify-content: space-between;
margin-bottom: 20px;
}
.decorate ul li{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #272727;
  
    
}
</style>