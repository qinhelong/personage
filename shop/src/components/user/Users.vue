<template>
  <div>
    <!-- 面包屑 -->
   <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
</el-breadcrumb>
<!-- 卡片区域 -->
<el-card >
    <!-- 搜索框 -->

  <el-row :gutter="10">
  <el-col :span="10"><el-input placeholder="请输入内容" v-model="queryIonf.query" clearable @clear="getUserlist"><el-button slot="append" icon="el-icon-search" @click="getUserlist"></el-button></el-input></el-col>
  <el-col :span="4"><el-button type="primary" @click="dialogVisible = true ">添加用户</el-button></el-col>
  </el-row>
  <!-- 用户列表区域 -->
    <el-table
      :data="userList"
      style="width: 100%"
      border
      stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column prop="mg_state" label="状态">
        <template v-slot="scope"><el-switch
  v-model="scope.row.mg_state"
  active-color="#13ce66"
  inactive-color="#ff4949"
  @change="updateStatus(scope.row)">
</el-switch></template>
      </el-table-column>
      <el-table-column label="操作" class="caozuo">
        <template v-slot="scope">
        <!-- 修改按钮 -->
          <el-button type="primary" icon="el-icon-edit" @click="compileusers(scope.row.id)"></el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" icon="el-icon-delete" @click="deleteUser(scope.row.id)"></el-button>
          <!-- 分配角色 -->
           <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false" >
      <el-button type="warning" icon="el-icon-s-tools" @click="allotRole(scope.row)"></el-button>
    </el-tooltip>
          
        </template>
      </el-table-column>
     
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryIonf.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryIonf.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
<!-- 添加弹出对话框 -->
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="50%"
  @close="emptyContent">
  <!-- 内容区域 -->
 <el-form :model="addruleForm" ref="addFromr" :rules="addFromrules"  label-width="70px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addruleForm.username"></el-input></el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="addruleForm.password" type="password"></el-input></el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="addruleForm.email"></el-input></el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="addruleForm.mobile"></el-input></el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dataCheck">确 定</el-button>
  </span>
</el-dialog>
<!-- 修改对话框 -->
<el-dialog
  title="提示"
  :visible.sync="compileVisible"
  width="30%"
  @close="emptyCompileDataRef">
<el-form ref="compileDataRef" :model="compileData" label-width="80px" :rules="compileDataRules">
  <el-form-item label="用户名">
    <el-input v-model="compileData.username" disabled></el-input></el-form-item >
    <el-form-item label="邮箱" prop="email">
    <el-input v-model="compileData.email" ></el-input></el-form-item>
     <el-form-item label="手机" prop="mobile">
    <el-input v-model="compileData.mobile" > </el-input></el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="compileVisible = false">取 消</el-button>
    <el-button type="primary" @click="subAmendUser">确 定</el-button>
  </span>
</el-dialog>
<!-- 分配角色 -->
<el-dialog
  title="分配角色"
  :visible.sync="roleVisible"
  width="50%"
  @close="allotRoleClose">
  <div><p>用户名：{{uesrsInfo.username}}</p><p>角色：{{uesrsInfo.role_name}}</p></div>
  <el-select v-model="selectRoleId" placeholder="请选择">
    <el-option
      v-for="item in rolesList"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>
  <span slot="footer" class="dialog-footer">
    <el-button @click="roleVisible = false">取 消</el-button>
    <el-button type="primary" @click="allotRoleId">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            queryIonf:{
                query:'',
                // 当前的页码
                pagenum:1,
                // 每页显示多少数据
                pagesize:2
            },
            userList:[],
            total:0,
            // 表单是否关闭
            dialogVisible: false,
            compileVisible:false,
            addruleForm:{
              username:'',
              password:'',
              email:'',
              mobile:''

            },addFromrules:{
             username:[{ required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
            password:[{ required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }],
            email:[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type:'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
            mobile:[{ required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }],           
            },
            compileData:{},
            compileDataRules:{
              email:[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type:'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
            mobile:[{ required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 14 个字符', trigger: 'blur' }], 




            },
            // 分配角色按钮的显示和隐藏
            roleVisible:false,
            // 接受分配按钮传入的用户数据
            uesrsInfo:{},
          //  角色列表
            rolesList:[],
            // 选中分配角色的id
            selectRoleId:''

             
            
        }
    },
   beforeRouteEnter(to, from, next) {
  if(to.path == '/login') return next()
 const tokenstr = window.sessionStorage.getItem('token')
 if(!tokenstr) return next('/login')
 next()
},
    created(){
      // 获取用户列表
     this.getUserlist()

    },
    methods:{
       async getUserlist(){
       const { data:res }  = await this.$http.get('users',{params:this.queryIonf})
   
    if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
    this.userList = res.data.users
    this.total = res.data.total
        },
        handleSizeChange(newSize){
          // 改变每页显示多少数据
       this.queryIonf.pagesize = newSize
       this.getUserlist()

        },
        handleCurrentChange(newenum){
          // 切换页码
          this.queryIonf.pagenum = newenum
          this.getUserlist()

        },
        // 修改用户状态
        async updateStatus(newStatus){
       
          const {data:res} = await this.$http.put(`users/${newStatus.id}/state/${newStatus.mg_state}`)
         
          if(res.meta.status !== 200){
            newStatus.mg_state = !newStatus.mg_state
            return this.$message.error(`数据修改失败`)
          }
          this.$message.success(`数据更新成功`)

        },
         emptyContent(){
          // 清空添加用户输入框
                this.$refs.addFromr.resetFields()
              },
              // 添加用户表单校验和发送请求
          dataCheck(){
            // 预校验
            this.$refs.addFromr.validate(async (vali)=>{
                 if(!vali) return 
             const {data:res} = await this.$http.post('users',this.addruleForm)
           
            if(res.meta.status !== 201) return this.$message.error('添加用户失败')
             this.$message.success('添加用户成功')
             this.dialogVisible = false
             this.getUserlist()


            })
          },
          // 修改用户的数据
         async compileusers(id){
          //
            this.compileVisible = true
            
          const {data:res} =  await this.$http.get(`users/${id}`)
                if(res.meta.status !== 200) return this.$message.error('数据获取失败')
                this.compileData = res.data
               

          },
          emptyCompileDataRef(){
            this.$refs.compileDataRef.resetFields()
          },
          // 提交修改信息
          subAmendUser(){
             this.$refs.compileDataRef.validate(async (vali)=>{
                 if(!vali) return 
               const{data:res} = await this.$http.put(`users/${this.compileData.id}`,{email:this.compileData.email,mobile:this.compileData.mobile})
               if(res.meta.status !== 200) return this.$message.error('修改失败')
                this.compileVisible = false
                this.getUserlist()
                this.$message.success('修改成功')
          })
          },
          async deleteUser(id){
         const res =   await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
           }).catch(err => err)
           
           if(res !== `confirm`) return this.$message.info('取消了删除')
          const{data:rel} = await this.$http.delete(`users/${id}`)
           if(rel.meta.status !== 200 ) return this.$message.error(`删除用户失败`) 
            this.$message.success('删除用户成功')
            this.getUserlist()
           },
          //  分配角色的弹窗
          async allotRole(uesrsInfo){
           
           this.uesrsInfo = uesrsInfo
          const{data:res} = await this.$http.get('roles')
          if(res.meta.status !== 200){return $this.$message.error('获取角色失败')}
           this.rolesList = res.data
           
           this.roleVisible = true
           },
          //  分配角色传递id
          async allotRoleId(){
           if(!this.selectRoleId) return this.$message('请选择角色')

          const{data:res} = await this.$http.put(`users/${this.uesrsInfo.id}/role`,{
            rid:this.selectRoleId
           })
           if(res.meta.status !== 200) return this.$message.error('角色分配失败')
            this.$message.success('角色更新成功')
            this.getUserlist()
           this.roleVisible = false

           },
          //  分配角色弹框关闭时 清空里面的数据
           allotRoleClose(){
            this.selectRoleId = ''
            this.uesrsInfo = {}
           }
    }

}
</script>


<style scopd>
.el-card{
    margin-top: 15px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1)
}
.el-table{
    margin-top: 15px;
}
.caozuo{
  padding-left: 15px;
}
</style>