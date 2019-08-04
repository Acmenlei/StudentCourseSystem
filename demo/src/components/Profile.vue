<template>
    <div class="user">
          <div>
      <el-avatar :size="100" 
      class='icon'
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
      </el-avatar>
    </div>
    <div>
      <div class="name"><label for="">姓名:</label>{{user}}</div>
    <div class="username"><label for="">学号:</label>{{username}}</div>
    <div class="username"><label for="">学院:</label>{{type}}</div>
    <div class="username"><label for="">专业:</label>{{program}}</div>
    <div class="username"><label for="">当前学分:</label>{{credit}}</div>
    </div>
    </div>
</template>
<script>
export default {
    name:'profile',
    data() {
        return {
            user:"",
            username:'',
            program:'',
            credit:'',
            type:''
      }
        
    },
    activated(){
      this.user=localStorage.getItem('name');
      this.username=localStorage.getItem('username');
      this.program=localStorage.getItem('program');
      this.type=localStorage.getItem('type');
      this.credit=localStorage.getItem('credit');
    }
}
</script>
<style scoped>
.user{
  display:flex;
  flex:1;
  align-items:center;
  padding-top: 2rem;
}
.user div{
  height: 50px;
  padding:0 2em;
}
.user label{
  color:#999;
  padding-right: 2em;
  font-size: 13px;
}
.load{
    margin-top: 1rem;
    margin-left: -1.5rem;
}
</style>