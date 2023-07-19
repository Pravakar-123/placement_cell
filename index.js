const express=require('express');
const router=require('./routers');
const path=require('path');
const db=require('./config/dbConnect');
const cookieParser=require('cookie-parser');

const app=express();
const port=8000;


//Used to collect form data
app.use(express.urlencoded());
app.use(cookieParser());

//set view engine

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('./assets'));

app.use('/',require('./routers'));




app.use('*',(req,res)=>{
    res.send("Page not found");
    return;
});

app.listen(port,(err)=>{
    if(err){
        console.log("Error in running at port no : 8000");
        return;
    }
    console.log("Server is running at port no : 8000");
})