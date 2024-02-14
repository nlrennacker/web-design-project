const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    database: 'csc317db',
    user: 'root',
    password: 'n,l,andt'

});

module.exports = db.promise();