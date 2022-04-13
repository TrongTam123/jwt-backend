import bcrypt from 'bcryptjs'
import mysql from 'mysql2'

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt'
});

const salt = bcrypt.genSaltSync(10)

const hashUserPassWord = (userPassword) => {
     let hashPassWord = bcrypt.hashSync(userPassword, salt)
     return hashPassWord
}

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassWord(password)

    connection.query(
        "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",[email, hashPass, username],
        function(err, results, fields) {
            if (err) {
                console.log(err);
            } 
        }
    );
}

const getUserList = () => {
    let users = []
    connection.query(
        "Select * from users ",
        function(err, results, fields) {
            if (err) {
                console.log(err);
            } 
            console.log('check result', results);
        }
    );
}

module.exports = {
    createNewUser, getUserList
}