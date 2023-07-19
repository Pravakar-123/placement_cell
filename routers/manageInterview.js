const express=require('express');
const manageInterviewController=require('../controllers/manageInterviewController');
const auth=require('../middleware/authentication');

const router=express.Router();

router.get('/',auth.authentication,manageInterviewController.showCompanyList);
router.get('/interviewAllocation',auth.authentication,manageInterviewController.interviewAllocationForm);
// router.get('/interviewDeallocation',manageInterviewController.interviewDeallocation);
router.get('/addCompany',auth.authentication,manageInterviewController.showCompanyAddForm);
router.post('/addCompany',auth.authentication,manageInterviewController.addCompany);
router.post('/interviewAllocation',auth.authentication,manageInterviewController.interviewAllocation);
// router.post('/interviewDeallocation',manageInterviewController.createInterviewDeallocation);
router.get('/showStudent/:id',auth.authentication,manageInterviewController.showStudent);
router.get('/updateResult/:id',auth.authentication,manageInterviewController.showUpdateForm);
router.post('/updateResult',auth.authentication,manageInterviewController.updateResult);





module.exports=router;
