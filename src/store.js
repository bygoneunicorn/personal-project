import {createStore,} from 'redux';
import reducer from './ducks/user';

export default createStore(reducer)
