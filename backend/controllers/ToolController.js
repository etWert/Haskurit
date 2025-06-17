const Tool = require("../models/Tool")
const { cloudinary } = require("../config/cloudinary")

const getAllTools = async (req, res) => {
    const tools = await Tool.find().lean()
    if (!tools || tools.length === 0) {
        return res.status(404).json({
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
        return res.status(404).json({
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
    const { name, description, price } = req.body
    // בדיקה שהתמונה הועלתה
    if (!req.file) {
        return res.status(400).json({
            error: true,
            message: "חובה להעלות תמונה",
            data: null
        })
    }
    if (!name || !price) {
        // אם יש שגיאה, מחק את התמונה שהועלתה
        if (req.file && req.file.public_id) {
            await cloudinary.uploader.destroy(req.file.public_id)
        }
        return res.status(400).json({
            error: true,
            message: "שם ומחיר הם שדות חובה",
            data: null
        })
    }
    if (price <= 0) {
        // מחק תמונה אם המחיר לא תקין
        if (req.file && req.file.public_id) {
            await cloudinary.uploader.destroy(req.file.public_id)
        }
        return res.status(400).json({
            error: true,
            message: "המחיר חייב להיות מספר חיובי גדול מ- 0",
            data: null
        })
    }
    const tool = await Tool.create({ name, description, price, imageUrl: req.file.path /*URL של התמונה מ-Cloudinary*/ })
    if (!tool) {
        // אם יש שגיאה, מחק את התמונה שהועלתה
        if (req.file && req.file.public_id) {
            await cloudinary.uploader.destroy(req.file.public_id)
        }
        return res.status(500).json({
            error: true,
            message: "שגיאה בהוספת הכלי",
            data: null
        })
    }
    res.json({
        error: false,
        message: "הכלי נוסף בהצלחה",
        data: { _id: tool._id, name: tool.name, description: tool.description, price: tool.price, imageUrl: tool.imageUrl }
    })
}
const updateTool = async (req, res) => {
    const { _id, name, description, price } = req.body
    if (!_id) {
        // אם הועלתה תמונה חדשה אבל אין ID, מחק אותה
        if (req.file && req.file.public_id) {
            await cloudinary.uploader.destroy(req.file.public_id)
        }
        return res.status(400).json({
            error: true,
            message: "מספר מזהה זה שדה חובה",
            data: null
        })
    }
    const tool = await Tool.findById(_id).exec()
    if (!tool) {
        // מחק תמונה חדשה אם הכלי לא נמצא
        if (req.file && req.file.public_id) {
            await cloudinary.uploader.destroy(req.file.public_id)
        }
        return res.status(400).json({
            error: true,
            message: "כלי לעדכון לא נמצא",
            data: null
        })
    }
    // שמירת URL התמונה הישנה למקרה שצריך למחוק אותה
    const oldImageUrl = tool.imageUrl

    tool.name = name || tool.name
    tool.description = description || tool.description
    tool.price = price || tool.price
    // אם הועלתה תמונה חדשה
    if (req.file) {
        tool.imageUrl = req.file.path

        // מחק את התמונה הישנה מ-Cloudinary
        if (oldImageUrl) {
            try {
                // חילוץ public_id מה-URL
                const publicId = oldImageUrl.split('/').pop().split('.')[0]
                await cloudinary.uploader.destroy(`tools/${publicId}`)
            } catch (deleteError) {
                console.log('שגיאה במחיקת תמונה ישנה:', deleteError)
            }
        }
    }
    const updatedTool = await tool.save()
    res.json({
        error: false,
        message: "הכלי עודכן בהצלחה",
        data: { _id: updatedTool._id, name: updatedTool.name, description: updatedTool.description, price: updatedTool.price, imageUrl: updatedTool.imageUrl }
    })
}

const deleteTool = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({
            error: true,
            message: "מספר מזהה זה שדה חובה",
            data: null
        })
    }
    const tool = await Tool.findById(_id).exec()
    if (!tool) {
        return res.status(400).json({
            error: true,
            message: "כלי לא נמצא",
            data: null
        })
    }
    if (tool.imageUrl) {
        try {
            const publicId = tool.imageUrl.split('/').pop().split('.')[0]
            await cloudinary.uploader.destroy(`tools/${publicId}`)
        } catch (deleteError) {
            console.log('שגיאה במחיקת תמונה:', deleteError)
        }
    }
    const deletedTool = await tool.deleteOne()
    res.json({
        error: false,
        message: "הכלי נמחק בהצלחה",
        data: deletedTool
    })
}

module.exports = { getAllTools, getToolById, createTool, updateTool, deleteTool }