const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['admin'],
    },
},{
    timestamps:true
})
module.exports=mongoose.model('User',userSchema)