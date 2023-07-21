const express=require('express');
const manageInterviewController=require('../controllers/manageInterviewController');
const auth=require('../middleware/authentication');

const router=express.Router();

//This routes is to show company list
router.get('/',auth.authentication,manageInterviewController.showCompanyList);
//This routes is to show interview allocation form
router.get('/interviewAllocation',auth.authentication,manageInterviewController.interviewAllocationForm);
//This routes is to show company add form
router.get('/addCompany',auth.authentication,manageInterviewController.showCompanyAddForm);
//This routes is to add a company
router.post('/addCompany',auth.authentication,manageInterviewController.addCompany);
//This routes is to allocate interview
router.post('/interviewAllocation',auth.authentication,manageInterviewController.interviewAllocation);
//This routes is to show all the student for a particular company
router.get('/showStudent/:id',auth.authentication,manageInterviewController.showStudent);
//This routes is to show update result form
router.get('/updateResult/:id',auth.authentication,manageInterviewController.showUpdateForm);
//This routes is to update result of interview
router.post('/updateResult',auth.authentication,manageInterviewController.updateResult);





module.exports=router;
