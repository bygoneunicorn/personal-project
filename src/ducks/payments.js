import axios from 'axios';

const initialState = {
    unpaidPayments: [],
    paidPayments: [],
    readyForCheckout: []
}

const GET_ALL_UNPAID_LESSONS = 'GET_ALL_UNPAID_LESSONS';
const GET_ALL_PAID_LESSONS = 'GET_ALL_PAID_LESSONS';
const ADD_TO_CHECKOUT = 'ADD_TO_CHECKOUT';

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
export function addToCheckout(lesson, index){
    var temp = [lesson]
    return{
        type: ADD_TO_CHECKOUT,
        payload: temp,
        index: index
    }
}

export default function paymentsReducer( state = initialState, action){
    switch (action.type) {
        case GET_ALL_UNPAID_LESSONS + '_FULFILLED':
            return Object.assign({}, state, {unpaidPayments: [...action.payload]})
        case GET_ALL_PAID_LESSONS + '_FULFILLED':   
            return Object.assign({}, state, {paidPayments: [...action.payload]})
        case ADD_TO_CHECKOUT:
            return Object.assign(
                {}, 
                state, 
                {readyForCheckout: [...action.payload, ...state.readyForCheckout]},
                {unpaidPayments: [...state.unpaidPayments.slice(0, action.index),...state.unpaidPayments.slice(action.index+1)]})
        default:
            return state;
    }
}