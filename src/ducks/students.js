import axios from 'axios';

const initialState = {
    students: []
}

const GET_STUDENT_INFO = 'GET_STUDENT_INFO';

export function getStudents(){
    let studentData = axios.get('/students/1').then( res =>{
        return res.data
    })
    return{
        type: GET_STUDENT_INFO,
        payload: studentData
    }
}

export default function studentsReducer( state = initialState, action){
    switch(action.type){
        case GET_STUDENT_INFO + '_FULFILLED':
            return Object.assign({}, state, {students: [...state.students, ...action.payload]})
        default: 
            return state;
    }
}