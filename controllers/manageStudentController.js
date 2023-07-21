const Student = require('../models/student');
const Interview_allocation = require('../models/interview_allocation');

// This function show student details 
module.exports.home = function (req, res) {
    Student.find({}).then((result) => {
        console.log(result);
        res.render('studentList', { result: result });
        return;
    })

    return;
}

//This function show student add form
module.exports.showStudentForm = function (req, res) {
    res.render('addStudent');
    return;
}

//This function show student in details
module.exports.studentDetails = function (req, res) {
    const id = req.params.id;
    console.log(id);
    Student.findById(id).then((result) => {
        Interview_allocation.find({ student: id }).populate('company').then((interview) => {
            if (!result) {
                res.redirect('/manageStudent');


            }
            else {
                res.render('studentDetails', {
                    result: result,
                    interview:interview
                });

                console.log(result);

            }

        })



    }).catch((err) => {
        console.log(err);
        return;
    })
    // console.log(req.params.id);

    return;
}


//This function help to edit a student
module.exports.editStudent = function (req, res) {
    const id = req.params.id;
    Student.findById(id).then((result) => {
        res.render('studentEdit', {
            result: result
        });

        console.log(result);

    }).catch((err) => {
        console.log(err);
        return;
    })


    return;
}

//This function add a student 
module.exports.addStudent = function (req, res) {
    console.log(req.body);
    Student.find({email:req.body.email}).then((result)=>{
        if(result.length>0){
            res.redirect('/manageStudent');
        }
        else{

            const student = new Student({
                email: req.body.email,
                name: req.body.name,
                college: req.body.college,
                batch: req.body.batch,
                placement_status: req.body.status,
                dsa_score: req.body.dsa_score,
                webd_score: req.body.webd_score,
                react_score: req.body.react_score
            })
        
            student.save().then((result) => {
                console.log(result);
                res.redirect('../manageStudent');
                return;
        
            }).catch((err) => {
                console.log(err);
                res.redirect('back');
                return;
            })
        
        

        }
    })

   
    return;
}

//This functio update a student
module.exports.updateStudent = function (req, res) {
    // res.send(req.params.id);

    console.log(req.body);
    const id = req.params.id;
    Student.findByIdAndUpdate(id,
        {
            name: req.body.name,
            college: req.body.college,
            placement_status: req.body.placement_status,
            batch: req.body.batch,
            dsa_score: req.body.dsa_score,
            webd_score: req.body.webd_score,
            react_score: req.body.react_score
        }).then((result) => {
            let url = '/manageStudent/studentDetails/' + id;
            res.redirect(url);
            console.log(result);
            return;
        }).catch((err) => {
            console.log(err);
            return;
        })
    return;
}

//This function delete a student
module.exports.deleteStudent = function (req, res) {
    const id = req.params.id;
    Interview_allocation.deleteMany({ student: id }).then((ans) => {
        Student.findByIdAndDelete(id).then((result) => {
            res.redirect('/manageStudent');
            return;
        }).catch((err) => {
            console.log(err);
            return;
        })

    }).catch((err) => {
        console.log(err);
        return;
    })

    return;



}


