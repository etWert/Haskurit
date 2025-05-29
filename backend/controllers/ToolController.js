const Tool = require("../models/Tool")

const getAllTools = async (req, res) => {
    const tools = await Tool.find().lean()
    if (!tools) {
        return res.status(400).json({
            error: true,
            message: "לא נמצאו כלים",
            data: null
        })
    }
    res.json({
        error: false,
        message: "",
        data: tools
    })
}
const getToolById = async (req, res) => {
    const { id } = req.params
    const tool = await Tool.findById(id).lean()
    if (!tool) {
        return res.status(400).json({
            error: true,
            message: "כלי לא נמצא",
            data: null
        })
    }
    res.json({
        error: false,
        message: "",
        data: tool
    })
}
const createTool = async (req, res) => {
    const { name, description, price, imageUrl } = req.body
    if (!name || !price || !imageUrl) {
        return res.status(400).json({
            error: true,
            message: "שם, מחיר, ותמונה הם שדות חובה",
            data: null
        })
    }
    if (price <= 0) {
        return res.status(400).json({
            error: true,
            message: "המחיר חייב להיות מספר חיובי גדול מ- 0",
            data: null
        })
    }
    const tool = await Tool.create({ name, description, price, imageUrl })
    if (!tool) {
        return res.status(404).json({
            error: true,
            message: "שגיאה בהוספת הכלי",
            data: null
        })
    }
    res.json({
        error: false,
        message: "הכלי נוסף בהצלחה",
        data: { name: tool.name, description: tool.description, price: tool.price, imageUrl: tool.imageUrl }
    })
}
const updateTool = async (req, res) => {
    const { id, name, description, price, imageUrl } = req.body
    if (!id) {
        return res.status(400).json({
            error: true,
            message: "מספר מזהה זה שדה חובה",
            data: null
        })
    }
    const tool = await Tool.findById(id).exec()
    if (!tool) {
        return res.status(400).json({
            error: true,
            message: "כלי לעדכון לא נמצא",
            data: null
        })
    }
    tool.name = name
    tool.description = description
    tool.price = price
    tool.imageUrl = imageUrl
    const newTool = await tool.save()
    res.json({
        error: false,
        message: "הכלי עודכן בהצלחה",
        data: { name: tool.name, description: tool.description, price: tool.price, imageUrl: tool.imageUrl }
    })

}
const deleteTool = async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).res.json({
            error: true,
            message: "מספר מזהה זה שדה חובה",
            data: null
        })
    }
    const tool = await Tool.findById(id).exec()
    if (!tool) {
        return res.status(400).json({
            error: true,
            message: "כלי לא נמצא",
            data: null
        })
    }
    const deletedTool = await tool.deleteOne()
    res.json({
        error: false,
        message: "הכלי נמחק בהצלחה",
        data: deletedTool
    })
}
module.exports = { getAllTools, getToolById, createTool, updateTool, deleteTool }