import axios from 'axios';

const initialState = {
    user: {}
}

const GET_USER_INFO = 'GET_USER_INFO';
const USER_LOGOUT = 'USER_LOGOUT';


export function getUser(){
    let userData = axios.get('/auth/me').then( response => {
        return response.data
    })
    return{
        type: GET_USER_INFO,
        payload: userData
    }
}
export function logOut(){
    axios.get('/logout').then(res =>{
        return null
    })
    return{
        type: USER_LOGOUT,
    }
}

export default function userReducer( state = initialState, action){
    switch(action.type){
        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})
        case USER_LOGOUT + '_FULFILLED':
            return Object.assign({})
        default: 
            return state;
    }
}