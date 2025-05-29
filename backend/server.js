require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/connectDB")

const app = express()
const PORT = process.env.PORT || 1000

app.use(cors(corsOptions))
app.use(express.json())
// app.use(express.static("public"))

connectDB()

app.use("/tools/", require("./routes/ToolRoute"))

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})