module.exports = {
    getStudents : (req, res, next) => {
        const {user_id} = req.params
        req.app.get('db').get_students([user_id]).then( students =>{
            res.status(200).send(students)
        }).catch((err) => {
            console.log(err)
        })
    },
    getStudent : (req, res, next) => {
        const {student_id} = req.params
        req.app.get('db').get_student([student_id]).then( student => {
            res.status(200).send(student[0])
        }).catch((err) => {
            console.log(err)
        })
    },
    addStudent : (req, res, next) => {
        console.log(req.body)
            const {
                user_id,
                newStudentFirstName, 
                newStudentLastName,
                newStudentBirthday,
                newStudentHistory,
                newStudentGender 
} = req.body
            req.app.get('db').add_student(
                [
                    user_id, 
                    newStudentFirstName, 
                    newStudentLastName, 
                    newStudentBirthday, 
                    newStudentHistory, 
                    newStudentGender,
                ]).then( student => {
            res.status(200).send(student)
        }).catch((err) => {
            console.log(err)
        })
    },
    updateStudent: (req, res, next) => {
        const {student_id} = req.params;
        const {
            first_name, 
            last_name, 
            birthday, 
            history, 
            gender
        } = req.body
        req.app.get('db').update_student([student_id, first_name, last_name, birthday, history, gender]).then( student =>{
            res.status(200).send(student)
        }).catch((err) => {
            console.log(err)
        })
    },
    deleteStudent: (req, res, next) => {
        const {student_id} = req.params;

        req.app.get('db').delete_student([student_id]).then( () => {
            res.sendStatus(200)
        }).catch((err) => {
            console.log(err)
        })
    }
}