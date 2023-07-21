const mongoose=require('mongoose');
//Interview allocation schama
const interview_allocationSchama=new mongoose.Schema({
    result:{
        type:String,
        requird:true
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        requird:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        requird:true
        
    }
},{
    timestamps:true
});

//Interview allocation model
const Interview_allocation=mongoose.model('Interview_allocation',interview_allocationSchama);

module.exports=Interview_allocation;