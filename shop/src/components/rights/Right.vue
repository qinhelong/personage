<template>
  <div>
     <!-- 面包屑 -->
   <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card >
    <!-- 表格区域 -->
     <el-table
      :data="rigthsList"
      style="width: 100%"
      stripe
      border>
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="authName" label="权限名称"> </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column prop="level" label="权限等级" type="flex" class="row-bg" justify="center"> 
  <template v-slot="scope">
<el-tag v-show="scope.row.level == '0'">一级</el-tag>
<el-tag type="success" v-show="scope.row.level == '1'">二级</el-tag>
<el-tag type="danger" v-show="scope.row.level == '2'">三级</el-tag>
  
  </template>


       </el-table-column>
       
      </el-table>

</el-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
            rigthsList:[]
        }
    },
    created(){
        this.getRightList()
    },
    
  beforeRouteEnter(to, from, next) {
  if(to.path == '/login') return next()
 const tokenstr = window.sessionStorage.getItem('token')
 if(!tokenstr) return next('/login')
 next()
},
  
    methods:{
       async getRightList(){
     const {data:res} = await this.$http.get(`rights/list`)
         console.log(res);
         if(res.meta.status !== 200) return this.$message.error('获取权限列表失败')
         this.rigthsList = res.data

        }
    }

}
</script>

<style scoped>


.el-card{
    margin-top: 15px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1)
}

</style>