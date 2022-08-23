<template>
  <div>
    <div class="contact">
   <div class="card">
<div class="left"><h1>联系方式</h1>
 <div class="xiushi1"></div>
<h2><i class="
el-icon-phone-outline"></i>15836925085</h2>
<h2><i class="
el-icon-message"></i>2235680435@qq.com</h2>
<h2><i class="
el-icon-location-information"></i>河南省平顶山市鲁山县</h2>
<div class="xiushi2"></div>

</div>
<div class="right">
 <div class="name"><div>您的姓名</div><input type="text"></div>
 <div class="tel"><div>您的电话</div><input type="text"></div>
 <div class="gs"><div>您的公司</div><input type="text"></div>
 <div class="leave"><div>内容</div><textarea class="content"></textarea></div>
<div class="sub">发送</div>

</div>


   </div>



    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.contact{
    height: 1140px;
    background-color: #1d1d1d;
    padding-left: 240px;
    padding-top:240px;
}
.card{
    position: relative;
    width: 1440px;
    height: 670px;
    
    border-radius: 20px;
    overflow: hidden;
}
.left{
    position: relative;
    float: left;
    width: 610px;
    height: 100%;
    background-color: #272727;
}
h1{
    color: #fff;
    margin-top: 70px;
    margin-left: 105px;
    font-size: 36px;
}
.xiushi1{
    position: absolute;
    right: 0;
    top:93px;
    width: 300px;
    height: 2px;
    background-color: #fff;
    
}
.xiushi2{
     position: absolute;
    left: 0;
    bottom:93px;
    width: 300px;
    height: 2px;
    background-color: #fff;
}
h2{
    color: #fff;
    margin-top:85px;
    margin-left: 105px;
    font-size: 30px;
}
h2 i {
    margin-right: 10px;
}
.right{position: relative;
    float: left;
    width: 830px;
    height: 100%;
    background-color: #161616;
}
.name{
    
    margin-top:70px;
    margin-left:60px;
    font-size: 30px;
    color: #fff;
}
.gs{
     position: absolute;
   left: 60px;
   top:200px;

    font-size: 30px;
    color: #fff;
}
.leave{
     position: absolute;
   left: 60px;
   top:320px;

    font-size: 30px;
    color: #fff;
}
.tel{
   position: absolute;
   left: 480px;
   top:70px;

    font-size: 30px;
    color: #fff;
}
input{
    background-color: #272727;
    height: 50px;
    width: 315px;
    border-radius: 5px;
    margin-left: -10px;
    font-size: 20px;
    color: #fff;
    padding-left: 10px;
}
.content{
    height: 155px;
    width: 735px ;
     border-radius: 5px;
    margin-left: -10px;
    font-size: 20px;
    color: #fff;
    padding-left: 10px;
     background-color: #272727;
}
.sub{position: absolute;
right: 40px;
bottom: 45px;
    width: 160px;
    height: 50px;
    background-color: #13ff00;
    border-radius: 5px;
    font-size: 26px;
    font-weight: 600;
    text-align: center;
    line-height: 50px;
}
</style>