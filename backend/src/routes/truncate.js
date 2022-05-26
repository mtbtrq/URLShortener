const express = require("express")
const Database = require("better-sqlite3")

const app = express.Router()
app.use(express.urlencoded({ extended: true }))
const db = Database("database.db")

app.post("/truncate", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (!(username && password)) return res.send({ success: true, cause: "Username or password not provided!" })

    const dbAdminSelectStatement = db.prepare("SELECT * FROM admins")
    const adminData = dbAdminSelectStatement.all()

    for (const admin of adminData) {
        if (admin.username == username && admin.password == password) {
            const truncateTableStatement = db.prepare("DELETE FROM links")
            truncateTableStatement.run()
        
            res.send({
                success: true
            })
            return
        } else {
            res.send({
                success: false,
                cause: "Invalid Username or Password."
            })
            return
        }
    }
})

module.exports = app