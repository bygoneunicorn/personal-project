import axios from 'axios';

const initialState = {
    students: [],
    currentStudent: {},
    newStudentFirstName: '',
    newStudentLastName: '',
    newStudentBirthday: null,
    newStudentHistory: '',
    newStudentGender: null
}

const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const HANDLE_FIRST_NAME = 'HANDLE_FIRST_NAME';
const HANDLE_LAST_NAME = 'HANDLE_LAST_NAME';
const HANDLE_BIRTHDAY = 'HANDLE_BIRTHDAY';
const HANDLE_HISTORY = 'HANDLE_HISTORY';
const HANDLE_GENDER = 'HANDLE_GENDER';
const ADD_STUDENT = 'ADD_STUDENT';


export function getStudents(){
    let studentData = axios.get('/students/1').then( res =>{
        return res.data
    })
    return{
        type: GET_ALL_STUDENTS,
        payload: studentData
    }
}
export function getStudent(student_id){
    let studentData = axios.get(`/student/${student_id}`).then( res => {

        return res.data
    })
    return{
        type: GET_STUDENT,
        payload: studentData
    }
}
export function handleFirstName(first_name){
    return{
        type: HANDLE_FIRST_NAME,
        payload: first_name
    }
}
export function handleLastName(last_name){
    return{
        type: HANDLE_LAST_NAME,
        payload: last_name
    }
}
export function handleBirthday(event, date){
    return{
        type: HANDLE_BIRTHDAY,
        payload: date
    }
}
export function handleHistory(history){
    return{
        type: HANDLE_HISTORY,
        payload: history
    }
}
export function handleGender(gender){
    return{
        type: HANDLE_GENDER,
        payload: gender
    }
}
export function addStudent(){
    
}

export default function studentsReducer( state = initialState, action){
    switch(action.type){
        case GET_ALL_STUDENTS + '_FULFILLED':
            return Object.assign({}, state, {students: [...action.payload]});
        case GET_STUDENT + '_FULFILLED':
            return Object.assign({}, state, {currentStudent: action.payload});
        case HANDLE_FIRST_NAME:
            return Object.assign({}, state, {newStudentFirstName: action.payload})
        case HANDLE_LAST_NAME:
            return Object.assign({}, state, {newStudentLastName: action.payload})
        case HANDLE_BIRTHDAY:
            return Object.assign({}, state, {newStudentBirthday: action.payload})
        case HANDLE_HISTORY:
            return Object.assign({}, state, {newStudentHistory: action.payload})
        case HANDLE_GENDER:
            return Object.assign({}, state, {newStudentGender: action.payload})    
        default: 
            return state;
    }
}