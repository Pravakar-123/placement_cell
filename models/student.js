const mongoose=require('mongoose');
//Student schame
const studentSchama=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    college:{
        type:String,
        requird:true
    },
    placement_status:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    dsa_score:{
        type:Number,
        requred:true
    },
    webd_score:{
        type:Number,
        required:true
    },
    react_score:{
        type:Number,
        required:true
    }
    


},{
    timestamps:true
});


//Student model
const Student=mongoose.model('Student',studentSchama);

module.exports=Student;