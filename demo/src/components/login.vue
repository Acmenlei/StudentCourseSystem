<template>
 <div id='root'>
   <div id="canvans" :class="{show:flag}"
   v-loading="loading"
    element-loading-text="正在登陆.."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
   ></div>
    <div class="login">
      <div class="Mask"></div>
      <el-alert v-show="err" class="showerr" :title="titleNav" type="error"></el-alert>
  <el-form v-if="this.$store.state.loginShow" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm login_view">
      <el-form-item>
    <marquee class="ps"><span style="color:lightgreen;">Ps:</span> 社会主义核心价值观是社会主义核心价值体系的内核，
      体现社会主义核心价值体系的根本性质和基本特征，
      反映社会主义核心价值体系的丰富内涵和实践要求，
      是社会主义核心价值体系的高度凝练和集中表达。请同学们牢记！</marquee>
  </el-form-item>
    <label class="header">学生选课系统登录</label>
  <el-form-item label="学号:" prop="name">
    <el-input v-model="ruleForm.name" ></el-input>
  </el-form-item>
  <el-form-item label="密码:" prop="pass">
    <el-input v-model="ruleForm.pass" show-password></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
    <el-button @click="resetForm()">注册</el-button>
  </el-form-item>
    <p class="tishi">温馨提示: 请输入你注册的学号和密码,验证正确即可进入系统选课。</p>
</el-form>
<re-gister :loading="loading" v-if="this.$store.state.registerShow" class="register_view" ref="registers"/>
  </div>
 </div>
</template>
<script>
import reGister from './register'
  export default {
    name:"login",
    data() {
      return {
        ruleForm: {
          name: '', pass:''
        },
        rules: {
          name: [
            { required: true, message: '请输入正确的账号', trigger: 'blur' },
            { min: 11, max: 11, message: '学号长度在 11 位！', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码!', trigger: 'blur' }
          ]
        },
        loading:false, flag:false, err:false, titleNav:''
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          /* 符合条件的情况下 */
          if (valid) {
           this.axios.post('/api/userlogin',{name:this.ruleForm.name,pass:this.ruleForm.pass})
           .then(res =>{
             this.loading=!this.loading;
              this.flag=!this.flag;
             if(res.data.length>0) {
               setTimeout(()=> {
                   this.$router.replace('/introduce');
                   this.flag=!this.flag;
                   this.loading=!this.loading;
                    window.localStorage.setItem('name',res.data[0].name);
                    window.localStorage.setItem('classid',res.data[0].username);
                    window.localStorage.setItem('username',res.data[0].username);
                    window.localStorage.setItem('program',res.data[0].program);
                    window.localStorage.setItem('type',res.data[0].type);
                    window.localStorage.setItem('credit',res.data[0].credit);
                    window.localStorage.setItem('loginState',true);
               },1000)
             }else{
             setTimeout(() => {
                this.loading=!this.loading;
                this.flag=!this.flag;
                this.showError("账号密码错误请重新输入!");
             }, 1000);
             }
           })
          } else {
            /* 出错的情况下 */
           this.showError("请输入帐号密码再进行登录!");
          }
        });
      },
      /* 注册按钮 */
      resetForm() {
       this.$store.commit('updateRegister')
       this.$nextTick(()=>{
       this.$refs.registers.$el.style.opacity="1";
       this.$refs.ruleForm.$el.style.opacity='0';
       this.$store.commit('updateLogin')
            })
      },
      showError(string) {
         this.titleNav=string;
            this.err=!this.err;
            setTimeout(() => {
            this.err=!this.err;
            }, 5000);
            return false;
      }
    },
    components:{reGister},
    mounted(){
       this.$nextTick(()=>{
          document.onkeydown=(event) =>{
            if(event.keyCode==13) {
              this.submitForm('ruleForm');
            }
          }
       })
    }
  }
</script>
<style scoped>
#root{
  height: 100%;
  width: 100%;
}
#canvans{
  opacity: .8;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background: url('../assets/LoginImgs/img1.jpeg') no-repeat;
  background-size: 100% 100%;
}
.login{
  position: relative;
  max-width: 450px;
  min-width: 400px;
  height: 450px;
  top: 5rem;
  margin: 0 auto;
  padding:0 0 5em 0;
  box-shadow: 0 0 3px #555;
}
.Mask{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: .8;
  background: #333;
}
@keyframes flash{
  0%{color: white;}
    33%{color: yellow;
  }
    66%{
    color: lightgreen;
  }
    88%{
      color: cyan;
  }
  100%{
    color: crimson;
  }
}
.header{
  color: rgb(190, 205, 206);
  font-size:20px;
  display: block;
  padding: 1rem 0  1rem 6.3rem;
}
.register_view,.login_view{
  position: absolute;
  top: 0;
  left: 0;
  transition: all 1.5s;
}
.login_view{
  top: 5em;
}
.ps{
  width: 300px;
  color: rgb(219, 166, 20);
}
.tishi{
  max-width: 450px;
  min-width: 400px;
  position: absolute;
  bottom: -5rem;
  color: #ccc;
  font-size: 13px;
  left: 3rem;
  animation: flash 2s alternate infinite;
}
.show{
  z-index: 2;
}
.showerr{
  position: absolute;
  z-index: 999;
  width: 300px;
  width: 300px;
  left: 6.1rem;
  top: 7.5rem;
  transition: all 2s;
}
</style>
