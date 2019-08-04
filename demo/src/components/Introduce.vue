<template>
<div class="intorduce">
  <marquee style="padding-top:1rem;">
   <i style="font-size:13px;"> 亲爱的 <span class="el-icon-user"
    style="color: #409EFF;"> {{name}}</span>
    ,欢迎进入选课系统!</i>
    </marquee>
    <div class="nav">
        <span class="head_title "><span class="el-icon-edit"></span> 即时公告：</span>
         <span class="title">介绍:</span><p style="border-bottom: 1px dashed #409EFF;">
          本系统可以方便老师、学生更方便的选课。实现全校学生选课在线查询。还可以对新来的学生信息进行信息录入。
          由于学生上课情况复杂，可以实现信息修改，及时调整学生的基本情况。</p>
      <span class="title">功能:</span><div style="border-bottom: 1px dashed rgb(96, 235, 96);">
        <p>1.能够实现学生基本信息的录入、修改、删除等操作，其中学生信息包括班号、学号、性别等；</p>
       <p> 2.能够实现课程信息的录入、修改、删除等功能，其中课程信息包括课程号、课程名、学分等；</p>
      <p>  3.能实现选课功能，每个学生有选修学分限制，超出可选学分限制会提示；</p>
        <p>4.能方便的对学生选课情况进行查询，可以根据学号、姓名、班级、课程名等多种方式查询；</p>
        </div>
       <span class="title">Ps:</span><p style="border-bottom: 1px dashed orange">本站秉承社会主义核心价值观，
              社会主义核心价值观是社会主义核心价值体系的内核，
              体现社会主义核心价值体系的根本性质和基本特征，
              反映社会主义核心价值体系的丰富内涵和实践要求，
              是社会主义核心价值体系的高度凝练和集中表达。</p>
    </div>
</div>
</template>
<script>
  export default {
    name:'intorduce',
    data () {
      return {
         name:"",
         sex:""
      };
    },
    created() {
       this.name=window.localStorage.getItem("name");
    },
  }
</script>
<style scoped>
.intorduce p{
    text-indent: 2em;
    font-family: 'Courier New', Courier, monospace;
    font-size: 13px;
    padding: 8px 10px;
}
.head_title{
    position: absolute;
    top: -2rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-family:'Courier New', Courier, monospace!important;
}
.title{
    padding: 1rem 0;
    font-size: 17px;
    font-weight: bold;
    display: block;
    animation: flash 8s alternate infinite;
}
.title:nth-child(2){
    color: #409EFF;
}
.title:nth-child(4){
    color: rgb(96, 235, 96);
}
.title:nth-child(6){
    color:orange;
}
.nav{
    position: relative;
    top: 4rem;
    margin: 0 auto;
    max-width: 1000px;
    min-width: 500px;
    padding: 2rem 3rem;
    border-radius: 1rem;
    background-color: #fff;
}
@keyframes flash{
    0%{
      transform: rotateY(90deg);
    }
    25%{
      transform: rotateY(0deg);
    }
    50%{
      transform: rotateX(90deg);
    }
    75%{
      transform: rotateX(0deg);
    }
    100%{
      transform: rotateY(90deg);
    }
}
</style>