const express = require("express")
const ToolController=require("../controllers/ToolController")
const router=express.Router()

router.get("/",ToolController.getAllTools)
router.get("/:id",ToolController.getToolById)
router.post("/",ToolController.createTool)
router.put("/",ToolController.updateTool)
router.delete("/",ToolController.deleteTool)

module.exports=router