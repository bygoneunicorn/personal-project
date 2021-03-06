import axios from 'axios';

const initialState = {
    students: [],
    currentStudent: {},
    studentBeingUpdated: {},
    newStudentFirstName: '',
    newStudentLastName: '',
    newStudentBirthday: null,
    newStudentHistory: '',
    newStudentGender: null,
    updateStudentFirstName: '',
    updateStudentLastName: '',
    updateStudentBirthday: null,
    updateStudentHistory: '',
    updateStudentGender: null
}

const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const HANDLE_FIRST_NAME = 'HANDLE_FIRST_NAME';
const HANDLE_LAST_NAME = 'HANDLE_LAST_NAME';
const HANDLE_BIRTHDAY = 'HANDLE_BIRTHDAY';
const HANDLE_HISTORY = 'HANDLE_HISTORY';
const HANDLE_GENDER = 'HANDLE_GENDER';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT'
const MOUNT_UPDATE_STUDENT = 'UPDATE_STUDENT';
const UPDATE_STUDENT_FIRST = 'UPDATE_STUDENT_FIRST';
const UPDATE_STUDENT_LAST = 'UPDATE_STUDENT_LAST';
const UPDATE_STUDENT_BIRTHDAY = 'UPDATE_STUDENT_BIRTHDAY';
const UPDATE_STUDENT_HISTORY = 'UPDATE_STUDENT_HISTORY';
const UPDATE_STUDENT_GENDER = 'UPDATE_STUDENT_GENDER';
const SAVE_STUDENT_CHANGES = 'SAVE_STUDENT_CHANGES'


export function getStudents(user_id){
    let studentData = axios.get(`/students/${user_id}`).then( res =>{
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
export function addStudent(
    user_id,
    newStudentFirstName, 
    newStudentLastName, 
    newStudentBirthday,
    newStudentHistory,
    newStudentGender
){
    axios.post('/student/add', 
    {
        user_id,
        newStudentFirstName, 
        newStudentLastName, 
        newStudentBirthday,
        newStudentHistory,
        newStudentGender
    })
        .then( res =>{
            console.log('it worked maybe!')
        })
        return{
            type: ADD_STUDENT
        }
}
export function deleteStudent(student_id){
    axios.delete(`/student/${student_id}`)
        .then( res =>{
            return null
        })
        return{
            type: DELETE_STUDENT
        }
}
export function updateFirst(first_name){
    return{
        type: UPDATE_STUDENT_FIRST,
        payload: first_name 
    }
}
export function updateLast(last_name){
    return{
        type: UPDATE_STUDENT_LAST,
        payload: last_name
    }
}
export function updateBirthday(event, date){
    return{
        type: UPDATE_STUDENT_BIRTHDAY,
        payload: date
    }
}
export function updateHistory(history){
    return{
        type: UPDATE_STUDENT_HISTORY,
        payload: history
    }
}
export function updateGender(gender){
    return{
        type: UPDATE_STUDENT_GENDER,
        payload: gender
    }
}
export function mountCurrentToBeUpdated(currentStudent){
    console.log('hit')
    return{
        type: MOUNT_UPDATE_STUDENT,
        payload: currentStudent,
    }
}
export function saveStudentChanges(student_id, studentBeingUpdated){
    axios.put(`/student/${student_id}`, studentBeingUpdated).then( res =>{
        console.log('Updated')
    })
    return{
        type: SAVE_STUDENT_CHANGES
    }
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
        case ADD_STUDENT:
            return Object.assign({}, state, {
                newStudentFirstName: '',
                newStudentLastName: '',
                newStudentBirthday: null,
                newStudentHistory: '',
                newStudentGender: null
            })
        case DELETE_STUDENT: 
            return Object.assign({}, state, {currentStudent: {}})
        case MOUNT_UPDATE_STUDENT:
            console.log('reducer hit')
            return Object.assign({}, state, {studentBeingUpdated: action.payload})
        case UPDATE_STUDENT_FIRST:
            return Object.assign({}, state, {studentBeingUpdated: {...state.studentBeingUpdated, first_name: action.payload}})
        case UPDATE_STUDENT_LAST:
            return Object.assign({}, state, {studentBeingUpdated: {...state.studentBeingUpdated, last_name: action.payload}})
        case UPDATE_STUDENT_BIRTHDAY:
            return Object.assign({}, state, {studentBeingUpdated: {...state.studentBeingUpdated, birthday: action.payload}})
        case UPDATE_STUDENT_HISTORY:
            return Object.assign({}, state, {studentBeingUpdated: {...state.studentBeingUpdated, history: action.payload}})
        case UPDATE_STUDENT_GENDER:
            return Object.assign({}, state, {studentBeingUpdated: {...state.studentBeingUpdated, gender: action.payload}})
        case SAVE_STUDENT_CHANGES:
            return Object.assign({}, state)
        default: 
            return state;
    }
}