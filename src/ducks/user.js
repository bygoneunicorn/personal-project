import axios from 'axios';

const initialState = {
    user: {}
}

const GET_USER_INFO = 'GET_USER_INFO';

export function getUser(){
    let userData = axios.get('/auth/me').then( response => {
        return response.data
    })
    return{
        type: GET_USER_INFO,
        payload: userData
    }
}

export default function userReducer( state = initialState, action){
    switch(action.type){
        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})
        default: 
            return state;
    }
}