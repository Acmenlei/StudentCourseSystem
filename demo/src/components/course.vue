<template>
<div id="addnewcourse">
  <p style="color:#333;font-weight:bold;padding:2rem 0.5rem;;">选修课程添加页：</p>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="课程名称:">
    <el-input v-model="form.course_name"></el-input>
  </el-form-item>

  <el-form-item label="是否可见:">
    <el-switch v-model="form.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="学分设置:">
    <el-radio-group v-model="form.grade">
      <el-radio label="1" name="type"></el-radio>
      <el-radio label="2" name="type"></el-radio>
      <el-radio label="3" name="type"></el-radio>
      <el-radio label="4" name="type"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="授课老师:">
     <el-input v-model="form.teacher_name"></el-input>
  </el-form-item>
  <el-form-item label="课程介绍:">
    <el-input type="textarea" v-model="form.course_nav"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即添加</el-button>
    <el-button @click="back(form)">取消</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    name:"addnewcourse",
    data() {
      return {
        form: {
          course_name: '',
          delivery: false,
          grade: 0,
          teacher_name: '',
          course_nav: ''
        }
      }
    },
    methods: {
      onSubmit() {
        this.axios.post('/api/course/addnewcourse',this.form)
        .then(res => {
          if(res.data=="添加成功") {
            this.$message({
          showClose: true,
          message: '恭喜你，添加成功!',
          type: 'success'
        });
          }else 
          {
            alert("添加失败!")
          }
        })
      },
      back(obj) {
        obj.course_name=''
        obj.delivery=false
        obj.grade=1
        obj.teacher_name=''
        obj.course_nav=''
      }
    }
  }
</script>
<style scoped>
#addnewcourse{
  position: relative;
  top: 2rem;
  padding: 1rem 2rem;
}
</style>
