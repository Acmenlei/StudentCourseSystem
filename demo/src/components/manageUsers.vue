<template>
  <div class="manageuser">
   <div class="person">
      <span style="font-size:18px;padding-right:1rem;">详情:</span>学生用户总数: <span style="color:red;margin:0 5px;font-size:18px;">{{Userlist.length}}</span>人，
      管理员用户: <span style="color:red;margin:5px 0;font-size:18px;">1</span>人.
   </div>
    <el-table
    :data="Userlist" style="width: 90%;margin-top:1rem;font-size:13px;color:skyblue;">
    <el-table-column label="Username" prop="username"></el-table-column>
    <el-table-column label="Name" prop="name"></el-table-column>
    <el-table-column label="Password" prop="password"></el-table-column>
    <el-table-column label="Program" prop="program"></el-table-column>
    <el-table-column label="Type" prop="type"></el-table-column>
    <el-table-column align="right">
      <template slot-scope="scope">
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
  export default {
    name:'manageuser',
    props:{},
    data () {
      return {
        Userlist:[]
      };
    },
    components: {},
    created() {
      this.axios.get('/api/user/userdata').then(res => {
        this.Userlist=res.data
      })
    },
    methods: {
      handleDelete(index, row) {
        this.$confirm('确定删除该学生账户吗?删除后不可恢复!', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.axios.post('/api/user/deleteuser',row)
       .then(res => {
         if(res.data.length>0) {
           this.$message({
            type: 'success',
            message: '删除成功!'
          });
         }
       })
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消该操作！'
          });          
        });
      }
    },
  }
</script>
<style scoped>
.person{
  width: 300px;
  height: 80px;
  font-size: 12px;
  margin-top: 1rem;
  color: #999;
  line-height: 80px;
}
.person img{
  width: 80px;
  height: 80px;
}
</style>