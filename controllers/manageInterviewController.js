const Company=require('../models/company');
const Student=require('../models/student');
const Interview_allocation=require('../models/interview_allocation');

//This function update result of interview
module.exports.updateResult= async function(req,res){
    Student.findOne({email:req.body.email}).then((ans)=>{
        console.log(ans);
       Interview_allocation.findOneAndUpdate({company:req.body.company_id,student:ans.id},{
        result:req.body.result
       }).then((a)=>{
        console.log(a);
        const url='/manageInterview/showStudent/'+req.body.company_id;
        res.redirect(url);
        return;
       }).catch((err)=>{
        console.log(err);
        console.log('Interview  err');
        return;
       })
      

    }).catch((err)=>{
        console.log(err);
        console.log('student err');
    })
    return;
}

//This function show company list
module.exports.showCompanyList=function(req,res){
    Company.find({}).then((result)=>{
        var ans=result.map((company)=>{
            company.interview_date=company.interview_date.toLocaleDateString();
            let ans={};
            ans.interview_date=company.interview_date.toLocaleDateString();
            ans.company_name=company.company_name;
           return  ans;
        })
        console.log(result[0].interview_date.toLocaleDateString());
        console.log(ans);


        res.render('companyList',{result:ans});
        return;

    }).catch((err)=>{
        res.send('Internel server error');
        return;
    })
    
    return;
}


//This function help to allocate interview
module.exports.interviewAllocationForm=function(req,res){
   
    Student.find({}).then((student)=>{
        Company.find({}).then((company)=>{
            console.log(student);
            console.log(company);
            res.render('interviewAllocation',{
                student:student,
                company:company
            });
            return;

        }).catch((err)=>{
            console.log('Internel server error');
            return;
        })
      
       
    }).catch((err)=>{
        console.log(err);
        res.send('Internal server error');
        return;
    })
   
    
   
    return;
}

//This function help to deallcate interview
module.exports.interviewDeallocation=function(req,res){

    res.render('interviewDeallocation');
    return;
}

//This function show company add form
module.exports.showCompanyAddForm=function(req,res){
    res.render('addCompany');
    return;
}

//This function help to add a company
module.exports.addCompany=function(req,res){

    console.log(req.body);
    Company.find({company_name:req.body.company_name}).then((result)=>{
        if(result.length>0){
            res.redirect('/manageInterview');
        }else{
            const company=new Company({
                company_name:req.body.company_name,
                interview_date:req.body.date
            })
        
            company.save().then((result)=>{
                console.log(result);
                res.redirect('../manageInterview');
                return;
            }).catch((err)=>{
                console.log(err);
                res.send('Interner Server error');
                return;
            })

        }
    }).catch((err)=>{
        console.log("Error to find company",err);
        return res.redirect('back');

    })
   
   
    return;
}

//This function help to allocate a interview
module.exports.interviewAllocation=function(req,res){
    console.log(req.body);
   Interview_allocation.find({student:req.body.email,company:req.body.company_name}).then((present)=>{
    if(present.length>0){
        res.redirect('back');return;


    }
    else{
        const interview_allocation=new Interview_allocation({
            result:'On Hold',
            student:req.body.email,
            company:req.body.company_name
            
        });
    
        interview_allocation.save().then((result)=>{
            console.log(result);
            res.redirect('../manageInterview');
        }).catch((err)=>{
            console.log("Error to save interview allction data");
            return;
        })
    

    }

   }).catch((err)=>{
    console.log(err);
    console.log("Error to find that this interview is already allocated or not");
    return;
   })
    
    // res.send('done');
    return;
}


//This function show list of student allocated for a particular company
module.exports.showStudent=function(req,res){
    const id=req.params.id;
    console.log(id);
    Interview_allocation.find({company:id}).populate('student').then((ans)=>{
        console.log(ans);
        res.render('showStudent',{ans:ans});
        return;
    }).catch((err)=>{
        console.log(err);
        return;
    })
    
    return;
}

//This function show result update form
module.exports.showUpdateForm=function(req,res){
    const id=req.params.id;
    console.log(id);
    Interview_allocation.find({company:id}).populate('student').then((ans)=>{
        console.log(ans);
        res.render('updateResult',{ans:ans});
        return;
    }).catch((err)=>{
        console.log(err);
        return;
    })
    
   
    return;
}


