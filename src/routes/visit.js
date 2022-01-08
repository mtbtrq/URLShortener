const express = require("express");
const Database = require("better-sqlite3");

const app = express.Router();
app.use(express.urlencoded({ extended:true }))
const db = Database("database.db")

app.get("/:code", (req, res) => {
    const code = req.params.code;

    const checkStatement = db.prepare("SELECT * FROM links WHERE code = ?");
    const dbData = checkStatement.all(code);

    const url = dbData[0]["url"];

    return res.redirect(url)
})

module.exports = app;