const verifyAdmin = (req, res, next) => {
    if (req.user && (req.user.role === "admin")) {
        next()
    }
    else {
        return res.status(401).json({
            error: true,
            message: "Not admin",
            data: null
        })
    }
}
module.exports = verifyAdmin
