import axios from 'axios';

const initialState = {
    unpaidPayments: [],
    paidPayments: []
}

const GET_ALL_UNPAID_LESSONS = 'GET_ALL_UNPAID_LESSONS';
const GET_ALL_PAID_LESSONS = 'GET_ALL_PAID_LESSONS';

export function getUnpaidLessons(user_id){
    let unpaidLessonData = axios.get(`/payments/unpaid/${user_id}`).then( res=> {
        return res.data
    })
    return{
        type: GET_ALL_UNPAID_LESSONS,
        payload: unpaidLessonData
    }
}
export function getPaidLessons(user_id){
    let paidLessonData = axios.get(`/payments/paid/${user_id}`).then( res=> {
        return res.data
    })
    return{
        type: GET_ALL_PAID_LESSONS,
        payload: paidLessonData
    }
}

export default function paymentsReducer( state = initialState, action){
    switch (action.type) {
        case GET_ALL_UNPAID_LESSONS + '_FULFILLED':
            return Object.assign({}, state, {unpaidPayments: [...action.payload]})
        case GET_ALL_PAID_LESSONS + '_FULFILLED':   
            return Object.assign({}, state, {paidPayments: [...action.payload]})
        default:
            return state;
    }
}