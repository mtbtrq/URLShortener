const express = require("express");
const Database = require("better-sqlite3");
const bodyParser = require("body-parser");

const app = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = Database("database.db")
const config = require("../config.json");

const createTableStatement = db.prepare("CREATE TABLE IF NOT EXISTS links (code text primary key, url text)");
createTableStatement.run();

app.post("/create", (req, res) => {
    const urlToShorten = req.body.url;
    if (urlToShorten) {
        let code = getCode(7);

        const selectStatement = db.prepare("SELECT * FROM links WHERE code = ?");
        const dbData = selectStatement.run(code);

        if (dbData) {
            code = getCode();
        }

        const insertStatement = db.prepare("INSERT INTO links VALUES (? ,?)");
        insertStatement.run(code, urlToShorten);
    
        res.send({
            success: true,
            code: code
        })
        return
    } else {
        return res.send({
            success: false,
            cause: "No URL Provided."
        })
    }
})

function getCode() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < config.shortURLCodeLength; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

module.exports = app;
