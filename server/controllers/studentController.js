module.exports = {
    getStudents : (req, res, next) => {
        const {user_id} = req.params
        req.app.get('db').get_students([user_id]).then( students =>{
            res.status(200).send(students)
        })
    },
    getStudent : (req, res, next) => {
        const {student_id} = req.params
        req.app.get('db').get_student([student_id]).then( student => {
            res.status(200).send(student[0])
        })
    },
    addStudent : (req, res, next) => {
        const {user_id, first_name, last_name, birthday, grade, history, gender} = req.body
        req.app.get('db').add_student([user_id, first_name, last_name, birthday, grade, history, gender]).then( student =>{
            res.status(200).send(student)
        })
    },
    updateStudent: (req, res, next) => {
        const {student_id} = req.params;
        const {first_name, last_name, birthday, grade, history, gender} = req.body
        req.app.get('db').update_student([student_id, first_name, last_name, birthday, grade, history, gender]).then( student => {
            res.status(200).send(student)
        })
    },
    deleteStudent: (req, res, next) => {
        const {student_id} = req.params;

        req.app.get('db').delete_student([student_id]).then( () => {
            res.sendStatus(200)
        })
    }
}