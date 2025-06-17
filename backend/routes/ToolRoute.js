const express = require("express")
const ToolController = require("../controllers/ToolController")
const { upload } = require("../config/cloudinary")
const handleUploadErrors = require("../middleware/handleUploadErrors")
const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")
const router = express.Router()

// GET routes
router.get("/", ToolController.getAllTools)
router.get("/:id", ToolController.getToolById)

// POST route - עם העלאת תמונה
router.post("/", verifyJWT, verifyAdmin, upload.single('image'), handleUploadErrors, ToolController.createTool)

// PUT route - עם העלאת תמונה אופציונלית  
router.put("/", verifyJWT, verifyAdmin, upload.single('image'), handleUploadErrors, ToolController.updateTool)

// DELETE route
router.delete("/", verifyJWT, verifyAdmin, ToolController.deleteTool)

module.exports = router