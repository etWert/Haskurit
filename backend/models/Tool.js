const mongoose = require('mongoose')
const toolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:String,
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
module.exports=mongoose.model('Tool',toolSchema)