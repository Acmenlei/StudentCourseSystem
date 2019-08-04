const express = require('express')
const router = express.Router()
/* 引入数据库实例 */
const connection = require('./mysql')
/* 获取学生账号密码 */
router.get('/userdata',(req,res) => {
    connection.connect(()=>{
        console.log('数据库已连接!');
    })
    connection.query(`SELECT * FROM user;`,(err,data) => {
        if(!err) {
            res.send(data)
        }else {
            throw err;
        }
    })
});
/* 删除学生用户 */
router.post('/deleteuser',(req,res) => {
    const {username}=req.body;
    console.log(username)
    connection.connect(()=>{
        console.log('数据库已连接!');
    })
    connection.query(`DELETE FROM user WHERE username='${username}';`,(err) => {
        if(!err) {
            /* 删除对应的学生表 */
            connection.query(`DROP TABLE ${username}_course;`,(err,data) => {
                if(!err) {
                    res.send("删除成功"+data);
                }else {
                    throw err;
                }
            })
        }else {
            throw err;
        }
    })
});
module.exports = router;
