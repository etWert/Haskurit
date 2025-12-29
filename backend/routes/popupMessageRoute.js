const express = require("express")
const PopupMessageController = require("../controllers/PopupMessageController")
const { popupUpload } = require("../config/cloudinary")
const handleUploadErrors = require("../middleware/handleUploadErrors")
const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")
const router = express.Router()

router.get("/", PopupMessageController.getAllPopupMessages)
router.get("/active", PopupMessageController.getActivePopupMessages)
router.get("/random", PopupMessageController.getRandomActivePopup)
router.get("/:id", PopupMessageController.getPopupMessageById)
router.post("/", verifyJWT, verifyAdmin, popupUpload.single('image'), handleUploadErrors, PopupMessageController.createPopupMessage)
router.put("/", verifyJWT, verifyAdmin, popupUpload.single('image'), handleUploadErrors, PopupMessageController.updatePopupMessage)
router.delete("/", verifyJWT, verifyAdmin, PopupMessageController.deletePopupMessage)

module.exports = router