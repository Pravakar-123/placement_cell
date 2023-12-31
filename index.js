const express=require('express');
const router=require('./routers');
const path=require('path');
const db=require('./config/dbConnect');
const cookieParser=require('cookie-parser');

const app=express();
const port=process.env.PORT || 8001;


//Used to collect form data
app.use(express.urlencoded());
app.use(cookieParser());

//set view engine

app.set('view engine','ejs');
app.set('views','./views');

//Telling express that we are using this static file
app.use(express.static('./assets'));

//Main routes
app.use('/',require('./routers'));



//universal routing 
app.use('*',(req,res)=>{
    res.send("Page not found");
    return;
});

//Setup the port no
app.listen(port,(err)=>{
    if(err){
        console.log("Error in running at port no :",port);
        return;
    }
    console.log("Server is running at port no : ",port);
})