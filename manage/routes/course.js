var express = require('express');
var router = express.Router();
/* 引入sql */
var connection=require('./mysql')
/* 查询所有课程 */
router.get('/getxxcoursedata', function(req, res) {
  connection.connect(() => {
    console.log("数据库连接成功");
  })
  connection.query(`SELECT * FROM xx_course;`,(err,data)=>{
    if(err) {
      throw err;
    }
    else{
      res.send(data);
      console.log('数据调出成功');
    }
  })
});
/* 根据前台传参查询不同的数据表 */
router.get(`/getcoursedata`, function(req, res) {
  connection.connect(() => {
    console.log("数据库连接成功");
  })
  connection.query(`SELECT * FROM ${req.query.classid}_course;`,(err,data)=>{
    if(err) {
      throw err;
    }
    else{
      res.send(data);
      console.log('数据调出成功')
    }
  })
});
/* 添加学生个人课程 */
router.post('/addcourse',function(req,res){
    const {username,course_name,course_id,teacher_name,grade}=req.body;
    connection.connect(()=>{
        console.log('数据库已经连接..')
    })
    connection.query(`SELECT * FROM ${username}_course WHERE course_id='${course_id}';`,(err,data)=>{
      if(err) {
        throw err;
      }
      else{
        if(data.length==0) {
          connection.query(`INSERT INTO ${username}_course(course_id,course_name,teacher_name,grade) VALUES('${course_id}','${course_name}','${teacher_name}','${grade}');`,(err,data) => {
            if(!err) {
                res.send("添加成功");
            }else{
                throw err;
            }
        })
        }else{
          res.send("您已经添加了该课程不要重复添加!");
        }
      }
    })
    /*  */
    
    /*  */
});
/* 添加公共课程 */
router.post('/addnewcourse',function(req,res){
  const course_id = "000000"+parseInt(Math.random()*999999);
  const {course_name,teacher_name,grade,course_nav}=req.body;
  connection.connect(()=>{
      console.log('数据库已经连接..')
  })
  connection.query(`INSERT INTO xx_course(course_id,course_name,teacher_name,grade,course_nav) VALUES('${course_id}','${course_name}','${teacher_name}','${grade}','${course_nav}');`,(err,data) => {
      if(!err) {
          res.send("添加成功");
      }else{
          res.send("-999");
          throw err;
      }
  })
})
/* 删除个人课程 */
router.post('/delcourse',(req,res) => {
  const {course_name,classid} = req.body;
  connection.connect(() => {
    console.log('连接数据库..')
  })
  connection.query(`DELETE FROM ${classid}_course WHERE course_name='${course_name}';`,(err,data) => {
    if(!err) {
      res.send("删除成功"+data);
    }else {
      throw err;
    }
  })
});
/* 删除公共课程 */
router.post('/deletecourse',(req,res) => {
  const {classid} = req.body;
  connection.connect(() => {
    console.log('连接数据库..')
  })
  connection.query(`DELETE FROM xx_course WHERE course_id='${classid}';`,(err,data) => {
    if(!err) {
      res.send("删除成功"+data);
    }else {
      throw err;
    }
  })
});
module.exports = router;
