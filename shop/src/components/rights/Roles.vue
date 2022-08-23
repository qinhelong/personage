<template>
  <div>  <!-- 面包屑 -->
   <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  <el-breadcrumb-item>角色列表</el-breadcrumb-item>
</el-breadcrumb>
<!-- 角色权限区域 -->
<el-card><el-table
      :data="rolesList"
      style="width: 100%"
      stripe
      border>
      <!-- 展开列表 -->
      <el-table-column type="expand">
        <template v-slot="scope">
        <!-- 一级权限 -->
        <el-row :class="['bdborder','center', i1 ===0 ?  'topborder' : '' ]" v-for="(item,i1) in scope.row.children" :key="item.id">
    <el-col :span="5">
  <el-tag closable @close="deletRoles(scope.row,item.id)">{{item.authName}}</el-tag>
  <i class="el-icon-caret-right"></i>
    </el-col>

<el-col :span="19">
<!-- 二级权限 -->
  <el-row :class="['bdborder','center', i1 ===0 ?  'topborder' : '' ]" v-for="(item2,i2) in item.children" :key="item2.id">
<el-col :span="8"><el-tag type="success" closable @close="deletRoles(scope.row,item2.id)">{{item2.authName}}</el-tag><i class="el-icon-caret-right"></i></el-col>
<!-- 三级权限 -->
<el-col :span="16">
<el-tag v-for="(item3,i3) in item2.children" :key="item3.id" type="warning" closable @close="deletRoles(scope.row,item3.id)">{{item3.authName}}
</el-tag></el-col>
  </el-row>
  </el-col>
        </el-row>
        </template>
        <!-- 角色名称和描述区域 -->
      </el-table-column>
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="roleName" label="角色名称"> </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
      <el-table-column label="操作">
      <template v-slot="scope">
        <!-- 修改按钮 -->
          <el-button type="primary" icon="el-icon-edit" >编辑</el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
          <!-- 分配角色 -->
           <el-tooltip effect="dark" content="分配角色">
      <el-button type="warning" icon="el-icon-s-tools" @click="fenpei(scope.row)">分配角色</el-button>
    </el-tooltip>
          
        </template>
        
        </el-table-column>
    </el-table></el-card>
    
 <!-- 分配角色提示框 -->
 <el-dialog
  title="提示"
  :visible.sync="dialogVisibl"
  width="30%"
  @close="emtpykeys">
  <!-- 树形控件 -->
<el-tree
  :data="lightslist"
  show-checkbox
  node-key="id"
 default-expand-all
  :default-checked-keys="defKeys"
  :props="treeprops"
  ref="treeRef">
</el-tree>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibl = false">取 消</el-button>
    <el-button type="primary" @click="allotRights">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import { nextTick } from 'vue'
export default {
    data() {
        return {
            // 角色列表
            rolesList:[],
            dialogVisibl:false,
            // 分配角色权限列表
            lightslist:[],
            // tree树形控件的分级属性
            treeprops:{
            children: 'children',
            label: 'authName'
            },
            // 树形控件中角色已经勾选的权限的ID
            defKeys:[],
            treeID:0

        }
      

        

    },
  beforeRouteEnter(to, from, next) {
  if(to.path == '/login') return next()
 const tokenstr = window.sessionStorage.getItem('token')
 if(!tokenstr) return next('/login')
 next()
},
    created(){
        this.getRolesList()
        // 获取树形控件
      
    },
    methods:{
        // 获取角色列表
       async getRolesList(){
          const {data:res} = await this.$http.get(`roles`)
        
          if(res.meta.status !== 200) return this.$message.error('获取失败') 
          this.rolesList = res.data
        },
        // 删除单个权限
       async deletRoles(item,roles){
             const res =  await this.$confirm('此操作将永久删除权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
           }).catch(err => err)
          
           if(res !== `confirm`) return this.$message.info('取消了删除')
            this.$message.success('确认删除')
         const {data:rel} = await this.$http.delete(`roles/${item.id}/rights/${roles}`)
           
             if(rel.meta.status !== 200 ) return this.$message.error(`删除权限失败`) 
            this.$message.success('删除权限成功')
            item.children = rel.data
        },
        // 分配角色tree树形控件的数据获取
       
        // 分配角色
      async fenpei(soles){   
        const{data:res} = await this.$http.get(`rights/tree`)
       if(res.meta.status !== 200) return this.$message.error('获取失败') 
       this.lightslist = res.data   
        this.treeID = soles.id 
        this.defKeys = []
       this.getkeys(soles,this.defKeys)
        
        this.$nextTick(function(){
          this.dialogVisibl = true
        })    
        },
        // 递归查询三级权限的id
        getkeys(soles,arr){
            if(!soles.children){
                return arr.push(soles.id)
            }
            soles.children.forEach(item => {
                this.getkeys(item,arr)
            });
        },
        // 关闭时重置权限数组
        emtpykeys(){
            this.defKeys=[]
            
        },
       async allotRights(){
         const keys = [...this.$refs.treeRef.getCheckedKeys(),...this.$refs.treeRef.getHalfCheckedKeys()]
         console.log(keys);
         const idstr = keys.join(',')
        const{data:res} = await this.$http.post(`roles/${this.treeID}/rights`,{rids:idstr})
        console.log(res);
        if(res.meta.status !== 200) return this.$message.error('更新失败') 
        this.$message.success('更新成功')
        this.getRolesList()
        
        this.dialogVisibl = false

        }
    }
}
</script>

<style>
.topborder{
    border-top: 1px solid #eee;
}
.bdborder{
    border-bottom: 1px solid #eee;
}
.el-tag{
    margin: 7px;
}
.center{
    display: flex;
    align-items: center;
}
</style>