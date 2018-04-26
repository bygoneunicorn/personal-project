import axios from 'axios';

const initialState = {
    lessons: [],
    currentLesson: {},
    newLessonDate: {},
    newLessonTime: {},
    newLessonPrice: null,
    newLessonGroup: false
}

const GET_ALL_LESSONS = 'GET_ALL_LESSONS';
const GET_ONE_LESSON = 'GET_ONE_LESSON';
const NEW_LESSON_DATE = 'NEW_LESSON_DATE';
const NEW_LESSON_TIME = 'NEW_LESSON_TIME';
const NEW_LESSON_PRICE = 'NEW_LESSON_PRICE';
const NEW_LESSON_GROUP = 'NEW_LESSON_GROUP';

export function getLessons(user_id){
    let lessonData = axios.get(`/lessons/${user_id}`).then( res=> {
        return res.data
    })
    return{
        type: GET_ALL_LESSONS,
        payload: lessonData
    }
}
export function getLesson(lesson_id){
    let lessonData = axios.get(`/lessons/${lesson_id}`).then( res =>{
        return res.data
    })
    return{
        type: GET_ONE_LESSON,
        payload: lessonData
    }
}


export default function lessonsReducer( state = initialState, action){
    switch(action.type){
        case GET_ALL_LESSONS + '_FULFILLED':
            return Object.assign({}, state, {lessons: [...action.payload]})
        case GET_ONE_LESSON + '_FULFILLED':
            return Object.assign({}, state, {currentLesson: action.payload})
        default:
            return state;
    }
}