import axios from 'axios';

const initialState = {
    lessons: [],
    currentLesson: {},
    currentStudentLessons: [],
    studentIdLessonToAdd: null,
    newLessonDate: {},
    newLessonPrice: null,
    updateDate: {},
    updatePrice: null
}

const GET_ALL_LESSONS = 'GET_ALL_LESSONS';
const GET_ONE_LESSON = 'GET_ONE_LESSON';
const GET_LESSONS_BY_STUDENT = 'GET_LESSONS_BY_STUDENT';
const HANDLE_STUDENT_SELECT = 'HANDLE_STUDENT_SELECT';
const NEW_LESSON_DATE = 'NEW_LESSON_DATE';
const NEW_LESSON_PRICE = 'NEW_LESSON_PRICE';
const NEW_LESSON_ADD = 'NEW_LESSON_ADD';
const MOUNT_LESSON_UPDATE = 'MOUNT_LESSON_UPDATE';
const HANDLE_UPDATED_DATE = 'HANDLE_UPDATED_DATE';
const HANDLE_UPDATED_PRICE = 'HANDLE_UPDATED_PRICE';
const SAVE_LESSON_UPDATES = 'SAVE_LESSON_UPDATES';
const DELETE_LESSON = 'DELETE_LESSON';

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
    let lessonData = axios.get(`/lesson/${lesson_id}`).then( res =>{
        return res.data
    })
    return{
        type: GET_ONE_LESSON,
        payload: lessonData
    }
}
export function getLessonsByStudent(student_id){
    let lessonData = axios.get(`/lessons/bystudent/${student_id}`).then( res => {
        return res.data
    })
    return{
        type: GET_LESSONS_BY_STUDENT,
        payload: lessonData
    }
}
export function handleStudentSelect(student_id){
    return{
        type: HANDLE_STUDENT_SELECT,
        payload: student_id
    }
}
export function handleNewLessonDate(date){
    return{
        type: NEW_LESSON_DATE,
        payload: date._d
    }
}
export function handleNewLessonPrice(price){
    return{
        type: NEW_LESSON_PRICE,
        payload: price
    }
}
export function addLesson(studentIdLessonToAdd, newLessonDate, newLessonPrice){
    axios.post('/lesson/add', {
        studentIdLessonToAdd,         
        newLessonDate, 
        newLessonPrice,
    })
    .then(res =>{
        return null
    })
    return{
        type: NEW_LESSON_ADD,
    }
}
export function mountLessonUpdate(date_of_lesson, price){
    return{
        type: MOUNT_LESSON_UPDATE,
        datePayload: date_of_lesson,
        pricePayload: price
    }
}
export function handleUpdatedDate(date_of_lesson){
    return{
        type: HANDLE_UPDATED_DATE,
        payload: date_of_lesson._d
    }
}
export function handleUpdatedPrice(price){
    return{
        type: HANDLE_UPDATED_PRICE,
        payload: price
    }
}
export function saveLessonUpdates(updateDate, updatePrice, lesson_id){
    axios.put('/lesson/update', {updateDate, updatePrice, lesson_id}).then( res => {
        console.log('successful')
    })
    return{
        type: SAVE_LESSON_UPDATES
    }
}
export function deleteLesson(lesson_id){
    axios.delete(`/lesson/${lesson_id}`)
        .then( res => {
            return null
        })
        return{
            type: DELETE_LESSON
        }
}


export default function lessonsReducer( state = initialState, action){
    switch(action.type){
        case GET_ALL_LESSONS + '_FULFILLED':
            return Object.assign({}, state, {lessons: [...action.payload]})
        case GET_ONE_LESSON + '_FULFILLED':
            return Object.assign({}, state, {currentLesson: action.payload[0]})
        case GET_LESSONS_BY_STUDENT + '_FULFILLED':
            return Object.assign({}, state, {currentStudentLessons: action.payload})
        case HANDLE_STUDENT_SELECT:
            return Object.assign({}, state, {studentIdLessonToAdd: action.payload})
        case NEW_LESSON_DATE:
            return Object.assign({}, state, {newLessonDate: action.payload})
        case NEW_LESSON_PRICE:
            return Object.assign({}, state, {newLessonPrice: action.payload})
        case NEW_LESSON_ADD: 
            return Object.assign({}, state, {
                studentIdLessonToAdd: null,
                newLessonDate: {},
                newLessonPrice: null,
            })
        case MOUNT_LESSON_UPDATE:  
            return Object.assign({}, state, {updateDate: action.datePayload}, {updatePrice:action.pricePayload})
        case HANDLE_UPDATED_DATE:
            return Object.assign({}, state, {updateDate: action.payload})
        case HANDLE_UPDATED_PRICE:
            return Object.assign({}, state, {updatePrice: action.payload})
        case SAVE_LESSON_UPDATES + 'FULFILLED': 
             return Object.assign({}, state)
        case DELETE_LESSON:
            return Object.assign({}, state, {currentLesson: {}})
        default:
            return state;
    }
}