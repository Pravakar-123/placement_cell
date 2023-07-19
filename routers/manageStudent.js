const express=require('express');
const router=express.Router();
const auth=require('../middleware/authentication');
const manageStudentConttroller=require('../controllers/manageStudentController');

router.get('/',auth.authentication,manageStudentConttroller.home);
router.get('/addStudent',auth.authentication,manageStudentConttroller.showStudentForm);
router.get('/studentDetails/:id',auth.authentication,manageStudentConttroller.studentDetails);
router.get('/editStudent/:id',auth.authentication,manageStudentConttroller.editStudent);
router.post('/editStudent/:id',auth.authentication,manageStudentConttroller.updateStudent);
router.post('/addStudent',auth.authentication,manageStudentConttroller.addStudent);
router.get('/deleteStudent/:id',auth.authentication,manageStudentConttroller.deleteStudent);

module.exports=router;