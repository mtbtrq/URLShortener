const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())

const port = process.env.PORT || 5000

const statistics = require("./routes/statistics")
app.use("/", statistics)

const create = require("./routes/create")
app.use("/", create)

const visit = require("./routes/visit")
app.use("/", visit)

const admin = require("./routes/admin")
app.use("/", admin)

app.listen(port, () => {
    console.log(`I am listening to requests on port ${port}`)
})