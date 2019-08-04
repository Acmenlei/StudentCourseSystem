var express = require('express');
var router = express.Router();
/* 引入mysql */
var connection=require('./mysql')
/* 登陆接口 */
router.post('/userlogin', function(req, res) {
  let {name,pass}=req.body;
  connection.connect(() => {console.log("数据库连接成功")})
  connection.query(`SELECT * FROM user WHERE username='${name}' and password='${pass}';`,(err,data)=>{
    if(err) {
      throw err;
    }
    else{
      res.send(data);
      console.log('查询成功');
    }
  })
});
/* 注册接口 */
router.post('/register',(req,res) => {
    const {name,pass,type,program,username} = req.body;
    const id="000000"+parseInt(Math.random()*1000)+99999;
    connection.connect(() =>{
      console.log("数据库已连接..")
    })
   connection.query(`SELECT * FROM user WHERE username='${name}';`,(err,data) => {
     /* 如果用户名不存在则创建 */
     if(data.length==0){
      connection.query(`INSERT INTO user(id,username,password,name,program,type,credit) VALUES(${id},'${name}','${pass}','${username}','${program}','${type}',0);`,(err) => {
        if(err) {
          throw err;
        } else {
          res.send("注册成功");
          /* 创建学生表 */
          connection.query(`CREATE TABLE ${name}_course(course_id bigint(8),course_name varchar(32),teacher_name varchar(8),grade int(2));`,(err,data)=>{
            if(!err){
              console.log("创建完成");
            }
          })
        }
      });
      /* 否则不创建 */
     }else{
       res.send("-999");
     }
   })
})
module.exports = router;
