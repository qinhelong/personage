<template>
  <div class="skill">
  <div class="title">我的技能</div>
  <div class="icon1"><i class="el-icon-discover"></i><span>网页开发</span></div>
  <div class="icon2"><i class="el-icon-monitor"></i><span>平面设计</span></div>
  <div class="icon3"><i class="el-icon-mobile-phone"></i><span>移动开发</span></div>
  <div class="icon4"><i class="el-icon-magic-stick"></i><span>不断探索</span></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.skill{
    height: 610px;
    background-color: #1d1d1d;
    padding-top: 100px;
    position: relative;
}
.title{
     height: 45px;
    width: 192px;
    margin: 0 auto;
    font-size: 40px;
    color: #fff;
}
.icon1{
position: absolute;
left: 420px;
top:210px;
height: 66px;
width: 220px;


}
i{
font-size: 60px;
color: #13ff00;
vertical-align:middle
}
span{
    font-size: 30px;
   vertical-align:middle;
   margin-left: 10px;
   color: #fff;
}
.icon2{
 position: absolute;
right: 395px;
top:210px;
height: 66px;
width: 220px;
}
.icon3{
position: absolute;
left: 420px;
top:400px;
height: 66px;
width: 220px;
}
.icon4{
     position: absolute;
right: 395px;
top:400px;
height: 66px;
width: 220px;
}
</style>