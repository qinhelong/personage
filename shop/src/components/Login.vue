<template>
  <div class="login_back">
    <div class="login_box">
        <!-- 头像区域 -->
        <div class="icon">
            <img src="../assets/logo.png" alt="">
        </div>
        <!-- 登陆表单 -->
        <el-form label-width="0px" class="account" :model="loginFrom" :rules="loginRules" ref="loginFromref">
  <el-form-item prop="username">
    <el-input v-model="loginFrom.username" prefix-icon="el-icon-user-solid"></el-input>
  </el-form-item>
  <el-form-item prop="password">
    <el-input prefix-icon="el-icon-question" type="password" v-model="loginFrom.password"></el-input>
  </el-form-item>
  <!-- 按钮区域 -->
   <el-form-item class="btns">
    <el-button type="primary" @click="valid">登陆</el-button>
  <el-button type="info" @click="rest">重置</el-button>
  </el-form-item>
 
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
    name:'Login',
    data() {
        return {
           loginFrom:{
            // 输入数据储存
              username:'admin',
              password:'123456'
             },
           loginRules:{
            // 表单输入规则
              username: [
                { required:true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
              password:[
                { required:true, message: '请输入密码', trigger: 'blur' },
                { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }]                   
            }
           


        }
    },
   beforeRouteEnter(to, from, next) {
  if(to.path == '/login') return next()
 const tokenstr = window.sessionStorage.getItem('token')
 if(!tokenstr) return next('/login')
 next()
},
    methods:{
      rest(){
        // 重置按钮
        this.$refs.loginFromref.resetFields()
      },
      valid(){
        // 输入框验证是否符合规则,返回值是一个布尔值
        this.$refs.loginFromref.validate(async (boll)=>{
          if(!boll) return alert('请检查用户名或密码');
           const res =await this.$http.post('login',this.loginFrom)
              if(res.data.meta.status !== 200) return this.$message.error('登录失败');
              this.$message.success('登录成功');
              console.log(res.data.data.token);
              window.sessionStorage.setItem('token', res.data.data.token);
              this.$router.push('/home')
        })
      }

    }

}
</script>

<style scoped>
.login_back{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
width: 450px;
height: 300px;
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%,-50%);
background-color: #fff;
border-radius: 5px;
}
.login_box .icon{
width: 130px;
height: 130px;
border-radius: 50%;
border: 1px solid #eee;
padding: 10px;
position: absolute;
left: 50%;
transform: translate(-50%,-50%);
background-color: #fff;
box-shadow: 0 0 10px #eee;
}
.login_box .icon img{
 width: 100%;
 height: 100%;
 border-radius: 50%;
 background-color: #eee;

}
.account{
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}
.btns{
   display: flex;
    justify-content: flex-end;
}
</style>