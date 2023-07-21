const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const auth=require('../middleware/authentication');

//Manage student routes
router.use('/manageStudent',auth.authentication,require('./manageStudent'));
//Manage Interveiw routes
router.use('/manageInterview',auth.authentication,require('./manageInterview'));
//Login page routes
router.get('/',userController.login);
//Register page routes
router.get('/register',userController.register);
//Routes to create login
router.post('/',userController.createLogin);
//Routes to create register
router.post('/register',userController.createRegister);
//Logout routes
router.get('/logout',userController.logout);
//This routes help to download student details
router.get('/downloadCsv',auth.authentication,userController.downloadCsv);

module.exports=router;  