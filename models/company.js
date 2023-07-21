
const mongoose=require('mongoose');
//Compnay schama
const companySchama=new mongoose.Schema({

    company_name:{
        type:String,
        required:true,
        unique:true
    },
    interview_date:{
        type:Date,
        default:new Date(),
        required:true
    }

},{
    timestamps:true
});
//Model creation
const Company=mongoose.model('Company',companySchama);

module.exports=Company;