<template>
 
  <el-container class="home-container">
    <!-- 头部 -->
  <el-header>
    <div>
        <span>电商后台管理系统</span>
    </div> 
    <el-button type="danger" @click="quit">退出</el-button></el-header>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside :width="isfoldData ? '64px':'200px'">
        <div class="foldBnt" @click="isfold">|||</div>
    <!-- 侧边栏菜单 -->
        <el-menu 
        background-color="#fff"
       text-color="#383838"
       active-text-color="#1677ff"
       unique-opened
       :collapse="isfoldData"
       :collapse-transition="false"
       router
        >
      <!-- 一级菜单 -->
      <el-submenu :index="item.id + ''" v-for="item in menuData" :key="item.id" > 
        <!-- 一级菜单模版区域 -->
        <template slot="title">
            <!-- 图标 -->
          <i :class="iconsObj[item.id]"></i>
          <!-- 文字 -->
          <span>{{item.authName}}</span>
        </template>   
        <!-- 二级菜单       -->
          <el-menu-item :index="'/' + childItem.path" 
          v-for="childItem in item.children" :key="childItem.id" 
           >
            <template slot="title">
            <!-- 图标 -->
          <i class="el-icon-menu"></i>
          <!-- 文字 -->
          <span>{{childItem.authName}}</span>
        </template></el-menu-item>
          
       </el-submenu></el-menu>

    </el-aside>
    <el-main>
       <!-- 组件站位 -->
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
    name:'Home',
    data() {
        return {
            // 左侧菜单列表数据
            menuData:[],
            // 一级菜单图标
            iconsObj:{
            "125":'el-icon-user-solid',
            "103":'el-icon-s-tools',
            "101":'el-icon-s-goods',
            "102":'el-icon-s-order',
            "145":'el-icon-s-marketing',
           },
           isfoldData: false,
          
        }
    },
    // 加载页面时
    created(){
            this.getmenuData()
          
    },
   
    methods:{
        quit(){
            window.sessionStorage.clear();
            this.$router.push('/login')
        },
        async getmenuData(){
            const res = await this.$http.get('menus')
           
            if(res.status !== 200) return this.$message.error(res.data.meta.msg);
            this.menuData = res.data.data
        },
        isfold(){
            this.isfoldData = ! this.isfoldData
        },
      
    }

}
</script>

<style scoped>
.el-header{
    background-color: #fff;
    border-bottom: 1px solid #1E1E1E;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#002140
}
.el-header div{
    font-size: 20px;
    font-weight: 700;
} 
.el-aside{
    background-color:#fff;
    
}
.el-menu{
    border-right: none;
}
.home-container{
    height: 100%;
}
.foldBnt{
    background-color: #e9f2ff;
    font-size:10px;
    text-align: center;
    color: #1677ff;
    line-height: 30px;
    letter-spacing: 0.2em;
}

</style>