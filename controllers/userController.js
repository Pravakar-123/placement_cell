//Import User model
const User = require('../models/user');
//Import Student model
const Student = require('../models/student');
//Import Company model
const Company = require('../models/company');
//Import interview allocation model
const Interview_allocation = require('../models/interview_allocation');
//This module is used to convert json data into csv format
const { Parser } = require('json2csv');

//Node js core module file system module
const fs = require('fs');


//This function show login page
module.exports.login = function (req, res) {
    if (req.cookies.user_id) {
        console.log(req.cookies.user_id + 'this is cookie');
        User.findById(req.cookies.user_id).then((user) => {
            if (user) {
                res.render('home');
                return;
            } else {
                res.render('login');

            }

        })

    } else {
        return res.render('login');

    }

    return;
}


//This function show register page
module.exports.register = function (req, res) {
    res.render('register');
    return;
}


//This function login a user
module.exports.createLogin = function (req, res) {

    User.findOne({ email: req.body.username, password: req.body.password }).then((user) => {
        if (user) {
            res.cookie('user_id', user.id);
            res.render('home');
            return;

        }
        else{
            return res.redirect('back');
        }
    }).catch((err) => {
        res.redirect('back');
        return;
    })


    return;
}


//This function register a user
module.exports.createRegister = function (req, res) {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (password != confirmPassword) {
        console.log('Password not matching');
        return res.redirect('back');
    } else {
        User.findOne({ email: req.body.email }).then((user) => {

            if (!user) {
                const U = new User({
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password
                });
                U.save().then((result) => {
                    console.log(result);
                    res.redirect('/');
                    return;
                }).catch((err) => {
                    console.log(err);
                    res.redirect('back');
                    return;
                })



            }
            else{
                res.redirect('/');
            }


        }).catch((err) => {

            console.log('error in finding user in signing up',err);
            return;

        })

        return;

    }

}

//This function logout a user
module.exports.logout = function (req, res) {
    res.clearCookie('user_id');
    res.redirect('/');
    return;
}

//This function helps us to download student and interview details
module.exports.downloadCsv = async (req, res) => {
    function createStudent(id, name, email, college, status, batch, dsa, web, react, company, interviewDate, result) {
        let s1 = {};
        s1.id = id;
        s1.name = name;
        s1.email = email;
        s1.college = college;
        s1.placement_status = status;
        s1.batch = batch;
        s1.dsa_score = dsa;
        s1.webd_score = web;
        s1.react_score = react;
        s1.company = company;
        s1.interviewDate = interviewDate;
        s1.result = result;

        return s1;
    }
    var students = [];
    var studentId = [];

    await Interview_allocation.find({}).populate('student').populate('company').select({ _id: 0 }).then((result) => {
        // console.log(result);
        for (let i = 0; i < result.length; i++) {

            let id = result[i].student.id;
            let name = result[i].student.name;
            let email = result[i].student.email;
            let college = result[i].student.college;
            let status = result[i].student.placement_status;
            let batch = result[i].student.batch;
            let dsa = result[i].student.dsa_score;
            let web = result[i].student.webd_score;
            let react = result[i].student.react_score;
            let company = result[i].company.company_name;
            let interviewDate = result[i].company.interview_date;
            let result1 = result[i].result;
            studentId.push(email);
            let ans = new createStudent(id, name, email, college, status, batch, dsa, web, react, company, interviewDate, result1)
            students.push(ans);
            // console.log(ans)
        }



    })

    await Student.find({ email: { $nin: studentId } }).then((result) => {
        console.log(result);
        for (let i = 0; i < result.length; i++) {

            let id = result[i].id;
            let name = result[i].name;
            let email = result[i].email;
            let college = result[i].college;
            let status = result[i].placement_status;
            let batch = result[i].batch;
            let dsa = result[i].dsa_score;
            let web = result[i].webd_score;
            let react = result[i].react_score;
            let company = '';
            let interviewDate = '';
            let result1 = '';

            let ans = new createStudent(id, name, email, college, status, batch, dsa, web, react, company, interviewDate, result1)
            students.push(ans);
            // console.log(ans)
        }

    }).catch((err) => {
        console.log("Error to find student");
        console.log(err);
    })

    console.log(studentId);
    console.log(students);
    var json2csv = new Parser();
    var csv = json2csv.parse(students);
    console.log(csv);
    const csvFile = fs.writeFile(
        "uploads/studentsReport.csv",
        csv,
        function (err, data) {
            if (err) {
                console.log(err);
                return res.redirect("back");
            }
            return res.download("uploads/studentsReport.csv");
        }
    );


    //     res.redirect('/');
    //     return;
}