
const mongoose=require('mongoose');

const companySchama=new mongoose.Schema({

    company_name:{
        type:String,
        required:true,
        unique:true
    },
    interview_date:{
        type:Date,
        required:true
    }

},{
    timestamps:true
});

const Company=mongoose.model('Company',companySchama);

module.exports=Company;