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
        })
    }
}