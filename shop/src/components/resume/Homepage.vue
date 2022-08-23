<template>
  <div>
    <!-- 头部导航栏 -->
    <div :class="nav">
       <a href="JavaScript:;"><span :class="pick == 1  ?  'frist' : ''" @click="goFrist">首页<i :class="pick == 1 ?  'fristI' : ''"></i></span></a>
        <a href="JavaScript:;"> <span @click="goAbout" :class="pick == 2  ?  'frist' : ''">关于我<i :class="pick == 2 ?  'fristI' : ''"></i></span></a>
          <a href="JavaScript:;"><span @click="goSkill" :class="pick == 3  ?  'frist' : ''">技能<i :class="pick == 3 ?  'fristI' : ''"></i></span></a>
           <a href="JavaScript:;"><span @click="goProject" :class="pick == 4  ?  'frist' : ''">项目<i :class="pick == 4 ?  'fristI' : ''"></i></span></a>
    </div>
<div class="firstPage">
    
    <div class="tixing"><img src="../../assets/imges/未标题-1.png" alt=""></div>
    <div class="annulus"></div>
    <div class="introduce"><h1>秦贺龙</h1>
    <div class="embellish"></div><h2>前端开发&小程序<br>平面设计</h2>
    <h3>喜欢钻研网络技术，不求高薪，希望能在工作中不断学习新技术提升自己</h3>
    </div>
    <div class="download"><a href=""><i class="el-icon-download"></i><span>下载我的简历</span></a></div>
    <div class="Social"><span></span><span></span><span></span></div>
</div>
<div class="goTop" v-show="scorlltop" @click="goTop"><i class="el-icon-upload2"></i></div>
   <Aboutme></Aboutme>
   <skill></skill>
   <Project></Project>
   <Contact></Contact>
  </div>

</template>

<script>
import Aboutme from './Aboutme.vue';
import Skill from './Skill.vue';
import Project from './Project.vue';
import Contact from './Contact.vue';

export default {
  data() {
    return {
      scorlltop:false,
      // frist:'frist',
      // fristI:'fristI',
      pick:1,
      navOpacity:false,
    //  nav:'navigation',
    //  navop:'navigationOpacity'
    }
  },
  components:{ Aboutme, Skill, Project, Contact },
computed:{
 nav(){
  // 计算是否给导航栏设置透明度
   return this.navOpacity ?  'navigation navigationOpacity' : 'navigation'
 }



},


 methods:{
  goFrist(){
    // 回到首页
window.scrollTo({ 
      top: 0, 
       behavior: "smooth" 
      
})
; this.pick = 1
  },
  goSkill(){
    // 跳转到技能
window.scrollTo({ 
      top: 1550, 
       behavior: "smooth" 
      
});this.pick=3
  },
  goProject(){
    // 跳转到项目
window.scrollTo({ 
      top: 2350, 
       behavior: "smooth" 
      
});this.pick=4
  },
  // 跳转到关于我
   goAbout(){
      window.scrollTo({ 
      top: 900, 
       behavior: "smooth" 
      
})
; this.pick = 2
   },
  //  控制导航栏的透明度
   navigationOpacity(){
var a = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      console.log(a);
      if(a>=10){
      this.navOpacity = true
      }else{
      this.navOpacity = false
      }
   },

  // 返回顶部按钮的隐藏
   scrollToTop(){
      var a = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      console.log(a);
      if(a>=700){
      this.scorlltop = true
      }else{
      this.scorlltop = false
      }
   },

  //  返回顶部
   goTop(){
     window.scrollTo({ 
      top: 0, 
       behavior: "smooth" })

   },
   pickI(){
    // 设置当前选项栏的的焦点
    var a = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if(a>=2200){ this.pick =4}
    else if(a>=1400){
      this.pick=3
    }else if(a>=800){
      this.pick = 2
    }else if(a<=700){this.pick = 1}
   
   }
   
  //  监听窗口滚动事件
   },mounted(){
      window.addEventListener('scroll', this.scrollToTop)
      window.addEventListener('scroll', this.navigationOpacity)
      window.addEventListener('scroll', this.pickI)
   }

   }

</script>

<style scoped>
.firstPage{
    
    height: 1000px;
    overflow: hidden;
    background-color: #3f3f3f;
    padding-top: 50px;
    box-sizing: border-box;
    position: relative;
   /* background-image: url(../../assets/imges/未标题-1.png);
   background-repeat: no-repeat;
   background-position: 0px 0px; */
   z-index: 1;
}
.navigation{
  position: fixed;
  top:50px;
  left: 50%;
  transform: translate(-50%);
    width: 606px;
    height: 50px;
  
    display: flex;
    justify-content: space-between;
    z-index: 4; 
}
.navigation:hover{
  opacity: 1 !important;
}
.navigationOpacity{
  opacity: 0.2;
}
.navigation span{
    font-size: 29px;
    color: #fff;
     position: relative;
     z-index: 999;
}
.navigation span:hover{
color:#13ff00; 
/* background-color:#fff;
border-radius: 10px; */
}
.navigation span:hover i{
 display: block;
 
}
.frist{
 color:#13ff00 !important
}
.fristI{
   display: block !important;
}
.navigation i{
    position: absolute;
    left:50%;
    top:-12px;
    transform:translate(-50%,0);
    width: 10px;
	height: 10px;
    border-radius:50%;
	background-color: #13ff00;
    display: none;
  
}
/* .tixing{
  position: absolute;
  left: -50px;
  top:0;
  width: 1550px;
  height: 100%;
  background: linear-gradient(90deg,transparent -130%,#202020 30%)0px 0px,
  linear-gradient(-120deg,transparent 47%,#202020 0%)100% 0px;
  background-size: 51% 100%;
  background-repeat: no-repeat;
  z-index: -2;
  
} */
.tixing{
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
}
.annulus{
  width: 958px;
	height: 958px;
	border: solid 10px #13ff00;
  border-radius:50%;
  z-index: 2;
  position: absolute;
  left:648px;
  top:110px;
  box-shadow: 0px 0px 10px 5px rgba(19, 255, 0,1) inset, 0px 0px 10px 5px rgba(19, 255, 0,1) ;
 
}
.introduce{
  width: 590px;
  height: 380px;
  position: absolute;
  left: 190px;
  top:280px;
  z-index: 4;
  font-size: 40px;
	
	color: rgba(19, 255, 0, 1);
}
.embellish{
  width: 440px;
  height: 5px;
  background-color: #13ff00;
  float: right;
  margin-top:10px;
}
.introduce h2{
  margin-top:30px;
  color: #fff;
}
.introduce h3{
  font-size: 18px;
  color:#989898
}
.download{
 position: absolute;
 left: 190px;
 top:728px;
z-index: 4;

}
.download a{

  color: #fff;
}
.Social{
  position: absolute;
  left: 190px;
  top:862px;
  height: 70px;
  width: 400px;
  z-index: 4;
  display: flex;
  justify-content: space-between;
}
.Social span{
  display: inline-block;
  width: 70px;
  height: 70px;
  border-radius:50%;
  background-color: #13ff00;
  z-index: 4;
}
.goTop{
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  font-size: 40px;
  color: #13ff00;
  z-index: 999;
  background-color:rgba(244,239, 239, 0.2);
  text-align: center;
  line-height: 50px;
 
}

</style>