require('dotenv').config({path: __dirname + '/.env'})

const PORT = process.env.PORT
const dbURI = process.env.DBURI
const SALT = process.env.SALT
const SESSION_SECRET = process.env.SESSION_SECRET

module.exports = {
    PORT,
    dbURI,
    SALT,
    SESSION_SECRET,
}