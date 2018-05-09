module.exports = {
    getPaymentLessons: (req, res, next) => {
        const {user_id} = req.params
        req.app.get('db').get_lessons_for_payment([user_id]).then( lessons => {
            res.status(200).send(lessons)
        }).catch((err) => {
            console.log(err)
        })
    },
    addToCheckout: (req, res) => {
        const {lesson_id} = req.params
        const {user_id} = req.user
        req.app.get('db').update_unpaid_to_pending([lesson_id, user_id]).then( payments => {
            res.status(200).send(payments)
        }).catch((err) => {
            console.log(err)
        })
    },
    removeFromCheckout: (req, res) => {
        const {lesson_id} = req.params
        const {user_id} = req.user
        req.app.get('db').update_pending_to_unpaid([lesson_id, user_id]).then( payments => {
            res.status(200).send(payments)
        }).catch((err) => {
            console.log(err)
        })
    },
    completePayment: (req, res) => {
        console.log(req)
        const {user_id} = req.params

        req.app.get('db').complete_payment([user_id]).then( payments => {
            res.status(200).send(payments)
        }).catch((err) => {
            console.log(err)
        })
    }
}