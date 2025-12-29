const PopupMessage = require("../models/PopupMessage")
const { cloudinary } = require("../config/cloudinary")

const getAllPopupMessages = async (req, res) => {
    const messages = await PopupMessage.find().lean()
    if (!messages || messages.length === 0) {
        return res.status(404).json({
            error: true,
            message: "לא נמצאו הודעות",
            data: null
        })
    }
    res.json({
        error: false,
        message: "",
        data: messages
    })
}

const getActivePopupMessages = async (req, res) => {
    const messages = await PopupMessage.find({ isActive: true }).lean()

    if (!messages || messages.length === 0) {
        return res.status(404).json({
            error: true,
            message: "לא נמצאו הודעות פעילות",
            data: null
        })
    }
    res.json({
        error: false,
        message: "",
        data: messages
    })
}

const getRandomActivePopup = async (req, res) => {
    const messages = await PopupMessage.find({ isActive: true }).lean()

    if (!messages || messages.length === 0) {
        return res.status(404).json({
            error: true,
            message: "לא נמצאו הודעות פעילות",
            data: null
        })
    }

    const randomIndex = Math.floor(Math.random() * messages.length)
    const selectedMessage = messages[randomIndex]

    res.json({
        error: false,
        message: "",
        data: selectedMessage
    })
}

const getPopupMessageById = async (req, res) => {
    const { id } = req.params
    const message = await PopupMessage.findById(id).lean()
    if (!message) {
        return res.status(404).json({
            error: true,
            message: "הודעה לא נמצאה",
            data: null
        })
    }
    res.json({
        error: false,
        message: "",
        data: message
    })
}

const createPopupMessage = async (req, res) => {
    const { title, content, isActive, priority } = req.body

    if (!title || !content) {
        // אם יש תמונה, מחק אותה
        if (req.file && req.file.public_id) {
            await cloudinary.uploader.destroy(req.file.public_id)
        }
        return res.status(400).json({
            error: true,
            message: "כותרת ותוכן הם שדות חובה",
            data: null
        })
    }

    const messageData = {
        title,
        content,
        isActive: isActive !== undefined ? isActive : true,
        priority: priority || 5
    }

    if (req.file) {
        messageData.imageUrl = req.file.path
    }

    const popupMessage = await PopupMessage.create(messageData)

    if (!popupMessage) {
        // אם יש שגיאה, מחק את התמונה
        if (req.file && req.file.public_id) {
            await cloudinary.uploader.destroy(req.file.public_id)
        }
        return res.status(500).json({
            error: true,
            message: "שגיאה בהוספת ההודעה",
            data: null
        })
    }

    res.json({
        error: false,
        message: "ההודעה נוספה בהצלחה",
        data: popupMessage
    })
}

const updatePopupMessage = async (req, res) => {
    const { _id, title, content, isActive, priority } = req.body

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

    const message = await PopupMessage.findById(_id).exec()
    if (!message) {
        // מחק תמונה חדשה אם ההודעה לא נמצאה
        if (req.file && req.file.public_id) {
            await cloudinary.uploader.destroy(req.file.public_id)
        }
        return res.status(400).json({
            error: true,
            message: "הודעה לעדכון לא נמצאה",
            data: null
        })
    }

    // שמירת URL התמונה הישנה למקרה שצריך למחוק אותה
    const oldImageUrl = message.imageUrl

    message.title = title || message.title
    message.content = content || message.content
    message.isActive = isActive !== undefined ? isActive : message.isActive
    message.priority = priority || message.priority

    // אם הועלתה תמונה חדשה
    if (req.file) {
        message.imageUrl = req.file.path

        // מחק את התמונה הישנה מ-Cloudinary
        if (oldImageUrl) {
            try {
                const publicId = oldImageUrl.split('/').pop().split('.')[0]
                await cloudinary.uploader.destroy(`popups/${publicId}`)
            } catch (deleteError) {
                console.log('שגיאה במחיקת תמונה ישנה:', deleteError)
            }
        }
    }

    const updatedMessage = await message.save()

    res.json({
        error: false,
        message: "ההודעה עודכנה בהצלחה",
        data: updatedMessage
    })
}

const deletePopupMessage = async (req, res) => {
    const { _id } = req.body

    if (!_id) {
        return res.status(400).json({
            error: true,
            message: "מספר מזהה זה שדה חובה",
            data: null
        })
    }

    const message = await PopupMessage.findById(_id).exec()
    if (!message) {
        return res.status(400).json({
            error: true,
            message: "הודעה לא נמצאה",
            data: null
        })
    }

    // מחק תמונה אם יש
    if (message.imageUrl) {
        try {
            const publicId = message.imageUrl.split('/').pop().split('.')[0]
            await cloudinary.uploader.destroy(`popups/${publicId}`)
        } catch (deleteError) {
            console.log('שגיאה במחיקת תמונה:', deleteError)
        }
    }

    const deletedMessage = await message.deleteOne()

    res.json({
        error: false,
        message: "ההודעה נמחקה בהצלחה",
        data: deletedMessage
    })
}

module.exports = {
    getAllPopupMessages,
    getActivePopupMessages,
    getRandomActivePopup,
    getPopupMessageById,
    createPopupMessage,
    updatePopupMessage,
    deletePopupMessage
}