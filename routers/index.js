const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const auth=require('../middleware/authentication');


router.use('/manageStudent',auth.authentication,require('./manageStudent'));
router.use('/manageInterview',auth.authentication,require('./manageInterview'));
router.get('/',userController.login);
router.get('/register',userController.register);
router.post('/',userController.createLogin);
router.post('/register',userController.createRegister);
router.get('/logout',userController.logout);
router.get('/downloadCsv',auth.authentication,userController.downloadCsv);

module.exports=router;  