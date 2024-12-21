//import express
const express = require('express')
//import userController
const userController = require('./controllers/userController')

//project Controller
const projectController = require('./controllers/projectController')

//jwt middleare
const jwt = require('./middleware/jwtMiddleware')
//multer
const multer = require('./middleware/multerMiddleware')


//create object for router class
const router = new express.Router()

//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController) 

//add project

router.post("/add-project",jwt,multer.single("projectImg"),projectController.addProjectController);


//home project
router.get('/home-project',projectController.getHomeProjectController)

//get all project
router.get('/all-project',projectController.getAllProjectController)

//api for user controller
router.get('/user-project',jwt,projectController.getUserProjectController)

//delete user project
router.delete('/remove-userProject/:id',projectController.deleteUserProjectController)


//update profile
router.put('/update-profile', jwt, multer.single("profile"), userController.editProfileController);



//edit project
router.put("/edit-project/:id",jwt,multer.single("projectImg"),projectController.editProjectController); 




module.exports = router