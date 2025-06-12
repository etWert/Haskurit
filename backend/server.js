require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/connectDB")

const app = express()
const PORT = process.env.PORT || 1000

app.use(cors(corsOptions))
app.use(express.json())
const cookieParser = require("cookie-parser")
app.use(cookieParser())
// app.use(express.static("public"))

connectDB()

app.use("/api/tool/", require("./routes/ToolRoute"))
app.use("/api/user/", require("./routes/UserRoute"))
app.use("/api/auth/", require("./routes/AuthRoute"))

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})