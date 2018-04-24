import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './ducks/user';
import studentsReducer from './ducks/students';

const reducers = combineReducers({
    user: userReducer,
    students: studentsReducer
})

export default createStore(reducers, applyMiddleware(promiseMiddleware()))
