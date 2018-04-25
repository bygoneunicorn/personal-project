import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './ducks/user';
import studentsReducer from './ducks/students';
import lessonsReducer from './ducks/lessons';

const reducers = combineReducers({
    user: userReducer,
    students: studentsReducer,
    lessons: lessonsReducer
})

export default createStore(reducers, applyMiddleware(promiseMiddleware()))
