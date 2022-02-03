const express = require("express");
const Database = require("better-sqlite3");
const bodyParser = require("body-parser");

const app = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = Database("database.db")
const config = require("../config.json");

const createTableStatement = db.prepare("CREATE TABLE IF NOT EXISTS links (code text primary key, url text, views integer)");
createTableStatement.run();

app.post("/create", (req, res) => {
    const urlToShorten = req.body.url;
    const customCode = req.body.customCode;

    if (urlToShorten) {

        // Copied from stack overflow :), I'm horrible at regex
        const urlMatchRegex = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;
        const t = new RegExp(urlMatchRegex);

        if (urlToShorten.match(t)) {
        let code = getCode();

        const selectStatement = db.prepare("SELECT * FROM links WHERE code = ?");
        const dbData = selectStatement.get(code);

        let dbDataForCustomCode;

        if (customCode) {
            const selectStatementForCustomCode = db.prepare("SELECT * FROM links WHERE code = ?");
            dbDataForCustomCode = selectStatementForCustomCode.get(customCode);
            
            if (dbDataForCustomCode) {
                return res.send({
                    success: false,
                    cause: "This code is already taken! Please try a different code."
                });
            } else {
                code = customCode;
            };
        };

        if (dbData) {
            code = getCode();
        }

        const insertStatement = db.prepare("INSERT INTO links VALUES (?, ?, ?)");
        insertStatement.run(code, urlToShorten, 0);
    
        res.send({
            success: true,
            code: code
        });

        return;
        } else {
            res.send({
                success: false,
                cause: "Invalid URL Provided!"
            });
            
            return;
        };
    } else {
        return res.send({
            success: false,
            cause: "No URL Provided."
        });
    };
});

function getCode() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < config.shortURLCodeLength; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

module.exports = app;