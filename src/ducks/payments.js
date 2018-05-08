import axios from 'axios';

const initialState = {
    payments: []
}

const GET_ALL_LESSONS = 'GET_ALL_LESSONS';
const ADD_TO_CHECKOUT = 'ADD_TO_CHECKOUT';
const REMOVE_FROM_CHECKOUT = 'REMOVE_FROM_CHECKOUT';

export function getPaymentLessons(user_id){
    let paymentLessonData = axios.get(`/payments/${user_id}`).then( res=> {
        return res.data
    })
    return{
        type: GET_ALL_LESSONS,
        payload: paymentLessonData
    }
}
export function addToCheckout(lesson, index){
    const {lesson_id} = lesson
    let lessonData = axios.put(`/payments/checkout/${lesson_id}`).then( res => {
        console.log(res)
        return res.data
    })
    return{
        type: ADD_TO_CHECKOUT,
        payload: lessonData
    }
    // var temp = [lesson]
    // return{
    //     type: ADD_TO_CHECKOUT,
    //     payload: temp,
    //     index: index
    // }
}
export function removeFromCheckout(lesson){
    const {lesson_id} = lesson
    let lessonData = axios.put(`/payments/checkout/remove/${lesson_id}`).then( res => {
        return res.data
    })
    return{
        type: REMOVE_FROM_CHECKOUT,
        payload: lessonData
    }
    // var temp = [lesson]
    // return{
    //     type: REMOVE_FROM_CHECKOUT,
    //     payload: temp,
    //     index: index
    // }
}

export default function paymentsReducer( state = initialState, action){
    switch (action.type) {
        case GET_ALL_LESSONS + '_FULFILLED':
            return Object.assign({}, state, {payments: action.payload})

        case ADD_TO_CHECKOUT + '_FULFILLED':    
            return Object.assign({}, state, {payments: action.payload})
        case REMOVE_FROM_CHECKOUT + '_FULFILLED':        
            return Object.assign({}, state, {payments: action.payload})


        // case ADD_TO_CHECKOUT:
        //     return Object.assign(
        //         {}, 
        //         state, 
        //         {readyForCheckout: [...action.payload, ...state.readyForCheckout]},
        //         {unpaidPayments: [...state.unpaidPayments.slice(0, action.index),...state.unpaidPayments.slice(action.index+1)]})
        // case REMOVE_FROM_CHECKOUT:
        //     return Object.assign(
        //         {},
        //         state,
        //         {readyForCheckout: [...state.readyForCheckout.slice(0, action.index),...state.readyForCheckout.slice(action.index+1)]},
        //         {unpaidPayments: [...action.payload, ...state.unpaidPayments]}
        //     )
        default:
            return state;
    }
}