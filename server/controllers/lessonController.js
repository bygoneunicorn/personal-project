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
    addLesson: (req, res, next) => {
        console.log(req.body)
        const {studentIdLessonToAdd, newLessonDate, newLessonPrice} = req.body
        req.app.get('db').add_lesson([studentIdLessonToAdd, newLessonDate, newLessonPrice])
            .then( lesson => {
                next(lesson)
            }).catch((err) => {
                console.log(err)
            })
    },
    updateLesson: (req, res, next) => {
        const {updateDate, updatePrice, lesson_id} = req.body
        req.app.get('db').update_lesson([updateDate, updatePrice, lesson_id])
            .then( lesson => {
                console.log('successfully updated')
                res.status(200).send()
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