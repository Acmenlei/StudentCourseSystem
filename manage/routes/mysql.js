var mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '201314',
    database: 'student',
    port:'3306'
})
module.exports = connection