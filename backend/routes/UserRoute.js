const express = require("express")
const UserController=require("../controllers/UserController")
const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")
const router=express.Router()

router.use(verifyJWT)
router.use(verifyAdmin)

router.get("/",UserController.getAllUsers)
router.get("/:id",UserController.getUserById)
router.post("/",UserController.createUser)
router.put("/",UserController.updateUser)
router.delete("/",UserController.deleteUser)

module.exports=router