const express = require("express")
const UserController=require("../controllers/UserController")
const router=express.Router()

router.get("/",UserController.getAllUsers)
router.get("/:id",UserController.getUserById)
router.post("/",UserController.createUser)
router.put("/",UserController.updateUser)
router.delete("/",UserController.deleteUser)

module.exports=router