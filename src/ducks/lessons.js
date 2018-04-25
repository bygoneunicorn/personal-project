import axios from 'axios';

const initialState = {
    lessons: [],
}

const GET_ALL_LESSONS = 'GET_ALL_LESSONS';

export function getLessons(user_id){
    
}

export default function lessonsReducer( state = initialState, action){
    switch(action.type){
        default:
            return state;
    }
}