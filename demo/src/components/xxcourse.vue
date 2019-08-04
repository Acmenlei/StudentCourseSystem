<template>
  <div id="xxcourse">
        <input class="search" v-model="input" placeholder="输入课程或教师搜索">
  <p class="head">可选课程目录：</p>
 <el-table class="table_box" :data="newtableData" style="width: 95%;font-size:13px;color:rgb(46, 142, 221);" max-height="100%">
    <el-table-column fixed prop="course_id" label="课程代码" width="150"></el-table-column>
    <el-table-column prop="course_name" label="课程名" width="150"></el-table-column>
    <el-table-column prop="teacher_name" label="任课老师" width="150"></el-table-column>
    <el-table-column prop="grade" label="可获学分" width="150"></el-table-column>
    <el-table-column prop="course_nav" label="课程介绍" width="300"></el-table-column>
    <el-table-column fixed="right" label="操作" width="150">
      <template slot-scope="scope">
        <el-button  @click.native.prevent="addRow(scope.$index, tableData)" type="text" size="small">
          加入课程
        </el-button>
        <el-button v-if="ShowFlag" @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
          删除课程
        </el-button>
      </template>
    </el-table-column>
  </el-table>
     <div class="homefooter">
<a @click="preventPage" class="prevent">上一页</a>
<!-- 分页部分 -->
    <div class="paegs">
    <span :class="{current:page===index+1}" 
    v-for="(item,index) in items" 
    :key="index"
    @click="Jump(index)">{{index+1}}</span>
    </div>
    <a class="next" @click="nextPage">下一页</a>
  </div>
  </div>
</template>
<script>
  export default {
    name:'xxcourse',
    props:{},
     data() {
      return {
        tableData:[], newtableData:[], page:1, star:0, end:7, temp:[], input:""
      }
    },
   mounted() {
     document.onkeydown=(event)=>{
       if(event.keyCode==13) {
         this.Showsearch();
       }
     }
   },
    created() {
     this.axios.get("/api/course/getxxcoursedata").then(res=>{
          /* 展示7条数据 */
          this.tableData = res.data;
         this.newtableData=this.tableData.slice(0,7);
        /* 将所有的数据存储存储到临时变量 */
        this.temp=this.tableData;
     })
    },
    methods: {
      addRow(index, rows) {
       const course=rows[(this.page-1)*7+index];
       course.username=localStorage.getItem("classid");
       this.axios.post('/api/course/addcourse',course).then(res=>{
         if(res.data=='添加成功'){
            this.$message({
          message: '课程添加成功!',
          type: 'success'
        });
         }else if(res.data=='您已经添加了该课程不要重复添加!') {
             this.$message({
            type: 'error',
            message: res.data
          });   
         }
       })
      },
      deleteRow(index, rows) {
      this.$confirm('确定删除该学生账户吗?删除后不可恢复!', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      const course=rows[(this.page-1)*7+index];
      window.console.log(course)
       this.axios.post('/api/course/deletecourse',{classid:course.course_id}).then(res=>{
         if(res.data.length>0){
            this.$message({
            type: 'success',
            message: '课程删除成功!'
          });
        location.reload();
         }
       })
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消该操作！'
          });          
        });
      },
       searchNav() {
        /* 对数据进行过滤 */
        let arr=[];
        /* 遍历临时变量 */
        this.temp.forEach(element => {
          if(element.course_name.indexOf(this.input)>-1 || element.teacher_name.indexOf(this.input)>-1){
            arr.push(element)
          }
        })
        /* 全都进行初始化 */
        this.star=0,this.end=7,this.page=1;this.tableData=arr;
        this.newtableData=arr.slice(this.star,this.end);
      },
      /* 简易分页 */
      nextPage() {
        this.star=this.end;
        this.end=this.end+7;
        if(this.end>this.tableData.length){
          /* 还剩下多少条就展示剩下的余数 */
          this.end=this.tableData.length;
          this.star=this.tableData.length-this.tableData.length%7;
        }
        this.newtableData=this.tableData.slice(this.star,this.end);
        if(this.page<this.items) {
          this.page++;
        }else{
          return;
        }
      },
      preventPage() {
        this.end=this.star;
        this.star=this.star-7;
        if(this.star<=0){
          this.star=0;
          this.end=7;
        }
        this.newtableData=this.tableData.slice(this.star,this.end);
        if(this.page>1) {
          this.page--;
        }else{
          return;
        }
      },
      Showsearch() {
        /* 对数据进行过滤 */
        let arr=[];
        /* 遍历临时变量 */
        this.temp.forEach(element => {
          if(element.course_name.indexOf(this.input)>-1 || element.teacher_name.indexOf(this.input)>-1){
            arr.push(element)
          }
        })
        /* 全都进行初始化 */
        this.star=0,this.end=7,this.page=1;this.tableData=arr;
        this.newtableData=arr.slice(this.star,this.end);
      },
      Jump(index) {
        this.page=index+1;
        this.newtableData=this.tableData.slice(index*7,(index+1)*7)
      },
    },
    computed: {
         items() {
          if(this.tableData.length%7>0) {
            return parseInt(this.tableData.length/7)+1;
          }
          else{
            return parseInt(this.tableData.length/7);
          }
        },
      ShowFlag() {
        if(localStorage.getItem("classid")==20180602064){
          return true;
        }else {
          return false;
        }
    }
    },
  }

</script>
<style scoped>
#xxcourse{
  width: 100%;
  height: 100%;
  position: relative;
  top: 1rem;
}
.item{
  height: 20px;
}
.homefooter {
    padding: 2em 0;
    position: absolute;
    display: flex;
    justify-content: center;
}
.homefooter span{
    display: inline-block;
    padding: 3px 8px;
    border: 1px solid #f2f2f2;
    margin: 8px 5px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 12px;
}
.prevent,.next{
    font-size: 12px;
    height: 35px;
    width: 70px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    color: teal;
    cursor: pointer;
    text-decoration: underline;
}
.prevent:hover,.next:hover{
  color: #333;
}
.current {
  background: rgb(92, 216, 164);
  color: white;
}
.homefooter span:hover{
  color: white;
}
.search {
  border: 1px solid #ccc;
  position: absolute;
  top: -7.2rem;
  left: 2rem;
  z-index: 999;
  height: 25px;
  border-radius: 15px;
  font-size: 12px;
  text-indent: 1em;
  outline: none;
}
.table_box{
  margin-top: 4rem;
  border: 1px solid #ccc;
}
.head{
position:absolute;top:-3rem;left:0.5rem;
z-index: 999;
}
</style>