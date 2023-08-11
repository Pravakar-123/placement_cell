const express=require('express');
const router=express.Router();
const auth=require('../middleware/authentication');
const manageStudentConttroller=require('../controllers/manageStudentController');
//This routes is to show student list
router.get('/',auth.authentication,manageStudentConttroller.home);
//This routes is to show a form to add student
router.get('/addStudent',auth.authentication,manageStudentConttroller.showStudentForm);
//This routes is to show details of a particular student
router.get('/studentDetails/:id',auth.authentication,manageStudentConttroller.studentDetails);
//This routes is to show edit student form
router.get('/studentDetails/editStudent/:id',auth.authentication,manageStudentConttroller.editStudent);
//This routes is to update a sudent
router.post('/studentDetails/editStudent/:id',auth.authentication,manageStudentConttroller.updateStudent);
//This routes add a new student
router.post('/addStudent',auth.authentication,manageStudentConttroller.addStudent);
//This routes is to delete a particular student
router.get('/deleteStudent/:id',auth.authentication,manageStudentConttroller.deleteStudent);

module.exports=router;