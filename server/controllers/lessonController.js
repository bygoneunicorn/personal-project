module.exports = {
    getAllLessons: (req, res, next) => {
        const {user_id} = req.params
        req.app.get('db').get_all_user_lessons([user_id]).then( lessons => {
            res.status(200).send(lessons)
        }).catch((err) => {
            console.log(err)
        })
    },
    getOneLesson: (req, res, next) => {
        const {lesson_id} = req.params
        req.app.get('db').get_one_lesson([lesson_id]).then(lesson => {
            res.status(200).send(lesson)
        }).catch((err) => {
            console.log(err)
        })
    },
    getLessonByStudent: (req, res, next) => {
        const {student_id} = req.params
        req.app.get('db').get_lesson_by_student([student_id]).then( lesson => {
            res.status(200).send(lesson)
        }).catch((err) => {
            console.log(err)
        })
    },
    getUnpaidLessons: (req, res, next) => {
        const {user_id} = req.params
        req.app.get('db').get_unpaid_lessons([user_id]).then( lessons => {
            res.status(200).send(lessons)
        }).catch((err) => {
            console.log(err)
        })
    },
    getPaidLessons: (req, res, next) => {
        const {user_id} = req.params
        req.app.get('db').get_paid_lessons([user_id]).then( lessons =>{
            res.status(200).send(lessons)
        }).catch((err) => {
            console.log(err)
        })
    },
    addLesson: (req, res, next) => {
        const {studentIdLessonToAdd, newLessonDate, newLessonTime, newLessonPrice} = req.body
        req.app.get('db').add_lesson([studentIdLessonToAdd, newLessonDate, newLessonTime, newLessonPrice])
            .then( lesson => {
                next(lesson)
            }).catch((err) => {
                console.log(err)
            })
    },
    deleteLesson: (req, res, next) => {
        const {lesson_id} = req.params
        req.app.get('db').delete_lesson([lesson_id])
            .then( () => {
                res.sendStatus(200)
            }).catch((err) => {
                console.log(err)
            })
    }
}