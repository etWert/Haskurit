const express = require("express")
const ToolController = require("../controllers/ToolController")
const { toolUpload } = require("../config/cloudinary")
const handleUploadErrors = require("../middleware/handleUploadErrors")
const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")
const router = express.Router()

router.get("/", ToolController.getAllTools)
router.get("/:id", ToolController.getToolById)
router.post("/", verifyJWT, verifyAdmin, toolUpload.single('image'), handleUploadErrors, ToolController.createTool)
router.put("/", verifyJWT, verifyAdmin, toolUpload.single('image'), handleUploadErrors, ToolController.updateTool)
router.delete("/", verifyJWT, verifyAdmin, ToolController.deleteTool)

module.exports = router