const User = require("../models/User")
const bcrypt = require("bcrypt")

const getAllUsers = async (req, res) => {
    const users = await User.find({}, { password: 0 }).lean()
    if (!users.length) {
        return res.status(400).json({
            error: true,
            messaga: 'לא נמצאו משתמשים',
            data: null
        })
    }
    res.json({
        error: false,
        message: "",
        data: users
    })
}
const getUserById = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id, { password: 0 }).lean()
    if (!user) {
        return res.status(400).json({
            error: true,
            message: "משתמש לא נמצא",
            data: null
        })
    }
    res.json({
        error: false,
        message: "",
        data: user
    })
}
const createUser = async (req, res) => {
    const { name, username, password, email, role } = req.body
    if (!name || !username || !password || !email || !role) {
        return res.status(400).json({
            error: true,
            message: "יש למלא את כל הפרטים",
            data: null
        })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const duplicate = await User.findOne({ username }).lean()
    if (duplicate) {
        return res.status(409).json({
            error: true,
            message: "שם משתמש תפוס",
            data: null
        })
    }
    const user = await User.create({ name, username, password: hashPassword, email, role })
    if (!user) {
        return res.status(404).json({
            error: true,
            message: "לא ניתן להוסיף את המשתמש",
            data: null
        })
    }
    res.json({
        error: false,
        message: "",
        data: user
    })
}
const updateUser = async (req, res) => {
    const { _id, name, username, password, email } = req.body
    if (!_id) {
        return res.status(404).json({
            error: true,
            message: "חובה להכניס מספר מזהה",
            data: null
        })
    }
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(400).json({
            error: true,
            message: "לא ניתן לעדכן את המשתמש כי לא נמצא",
            data: null
        })
    }
    if (password) {
        const hashPassword = await bcrypt.hash(password, 10)
        user.password = hashPassword
    }
    if (username) {
        const duplicate = await User.findOne({ username }).lean()
        if (duplicate && duplicate.username !== user.username) {
            return res.status(409).json({
                error: true,
                message: "שם משתמש תפוס",
                data: null
            })
        }
    }
    user.name = name ? name : user.name
    user.username = username ? username : user.username
    user.email = email ? email : user.email

    const updatedUser = await user.save()
    res.send({
        error: false,
        message: "משתמש עודכן בהצלחה",
        data: updateUser
    })
}
const deleteUser = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(404).json({
            error: true,
            message: "חובה להכניס מספר מזהה",
            data: null
        })
    }
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.json({
            error: true,
            message: "לא ניתן למחוק את המשתמש כי לא נמצא",
            data: null
        })
    }
    const deletedUser = await user.deleteOne()
    res.json({
        error: false,
        message: "המשתמש נמחק בהצלחה",
        data: deletedUser
    })
}
module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser }