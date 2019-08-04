<template>
  <div class="register">
     <el-alert v-show="success" class="show" title="注册成功" type="success"></el-alert>
      <el-alert v-show="err" class="show" title="该用户已存在！" type="error"></el-alert>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm box">
    <label class="header">注册学生用户</label>
    <p class="login_back" @click="backClick">返回登录</p>
  <el-form-item label="学号:" prop="name">
    <el-input v-model="ruleForm.name" ></el-input>
  </el-form-item>
  <el-form-item label="密码:" prop="pass">
    <el-input v-model="ruleForm.pass" show-password ></el-input>
  </el-form-item>
   <el-form-item label="所属院系:" prop="type">
    <el-select v-model="ruleForm.type" placeholder="请选择所属院系">
      <el-option label="信息工程学院" value="信息工程学院"></el-option>
      <el-option label="能源工程学院" value="能源工程学院"></el-option>
      <el-option label="机械工程学院" value="机械工程学院"></el-option>
      <el-option label="基础教育学院" value="基础教育学院"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="专业:" prop="program">
    <el-input v-model="ruleForm.program" ></el-input>
  </el-form-item>
  <el-form-item label="姓名:" prop="username">
    <el-input v-model="ruleForm.username" ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click.enter="submitForm('ruleForm')">立即注册</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
  export default {
    name:'register',
    data() {
      return {
        ruleForm: {
          name: '',
          pass:'',
          type: '',
          program:'',
          username:''
        },
        rules: {
          name: [
             { required: true, message: '请输入你的学号!', trigger: 'blur' },
            { min: 11, max: 11, message: '学号长度在 11 位!', trigger: 'blur' }
          ],
          type: [
            { type: 'string', required: true, message: "请选择你的所属院系!", trigger: 'blur' }
          ],
           username: [
            { required: true, message: '请输入你的姓名!', trigger: 'blur' }
          ],
            program: [
            { required: true, message: '请选择你的专业!', trigger: 'blur' }
          ],
             pass: [
            { required: true, message: '请输入密码!', trigger: 'blur' }
          ]
        },
        success:false,
        err:false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          /* 符合条件的情况下 */
          if (valid) {
          this.axios.post('/api/register',this.ruleForm)
          .then(res => {
              if(res.data=="注册成功") {
              this.success=!this.success;
              setTimeout(() => {
              this.success=!this.success;
              }, 2000);
            }else if(res.data=="-999"){
              this.err=!this.err;
              setTimeout(() => {
              this.err=!this.err;
              }, 2000);
            }
          })
          } else {
            /* 出错的情况下 */
            window.console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },  
      backClick() {
       this.$store.commit('updateRegister')
       this.$store.commit('updateLogin')
    },
    },
    mounted(){
        document.onkeydown=(event) =>{
        if(event.keyCode==13) {
          this.submitForm('ruleForm');
        }
      }
    }
  }
</script>
<style scoped>
.register{
  max-width: 450px;
  min-width: 400px;
  margin: 5rem auto;
  opacity: 0;
  position: relative;
}
.header{
  font-size:20px;
  display: block;
  text-align: left;
  padding: 0 0  1rem 6.3rem;
  color: rgb(190, 205, 206);
}
.login_back{
  position: absolute;
  right: 0;
  top: 0;
  font-size: 12px;
  cursor: pointer;
  color:#333;
}
.login_back:hover{
  color: rgb(51, 132, 207);
}
.show{
  position: absolute;
  z-index: 999;
  width: 300px;
  width: 300px;
  left: 6.1rem;
  top: -3rem;
  transition: all 1s;
}
</style>
