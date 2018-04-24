import axios from 'axios';

const initialState = {
    students: [],
    currentStudent: {}
}

const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';

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

export default function studentsReducer( state = initialState, action){
    switch(action.type){
        case GET_ALL_STUDENTS + '_FULFILLED':
            return Object.assign({}, state, {students: [...action.payload]});
        case GET_STUDENT + '_FULFILLED':
        console.log(action.payload)
            return Object.assign({}, state, {currentStudent: action.payload})
        default: 
            return state;
    }
}