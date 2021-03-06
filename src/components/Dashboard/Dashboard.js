import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import User from './User/User';
import Students from './Students/Students';
import AddStudents from './Students/AddStudent';
import ViewStudent from './Students/ViewStudent';
import EditStudent from './Students/EditStudent';
import Lessons from './Lessons/Lessons';
import ViewLesson from './Lessons/ViewLesson';
import AddLesson from './Lessons/AddLesson';
import Payments from './Payments/Payments';
import PaymentHistory from './Payments/PaymentHistory';
import {getUser} from '../../ducks/user';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';

import './Dashboard.css';

class Dashboard extends Component{
    componentDidMount(){
        this.props.getUser()
    }
    render(){
        const {user_id} = this.props.user
        return(
            user_id ? 
            (
            <div className='dashboard-main'>
                <nav className='dashboard-nav'>
                    <FlatButton fullwidth='true' className='dashboard-route-button'><Link to={`/dashboard/${user_id}`} style={{display: 'block', height: '100%'}}>User</Link></FlatButton>
                    <FlatButton fullwidth='true' className='dashboard-route-button'><Link to={`/dashboard/${user_id}/students`} style={{display: 'block', height: '100%'}}>Students</Link></FlatButton>
                    <FlatButton fullwidth='true' className='dashboard-route-button'><Link to={`/dashboard/${user_id}/lessons`} style={{display: 'block', height: '100%'}}>Lessons</Link></FlatButton>
                    <FlatButton fullwidth='true' className='dashboard-route-button'><Link to={`/dashboard/${user_id}/payments`} style={{display: 'block', height: '100%'}}>Payments</Link></FlatButton>
                </nav>
                <Switch>
                    <Route path={`/dashboard/:user_id/student/edit/:student_id`} component={EditStudent}/>
                    <Route path={`/dashboard/:user_id/student/:student_id`} component={ViewStudent} />
                    <Route path={`/dashboard/:user_id/students/add`} component={AddStudents}/>
                    <Route path={`/dashboard/:user_id/students`} component={Students}/>
                    <Route path={`/dashboard/:user_id/lesson/:lesson_id`} component={ViewLesson} />
                    <Route path={`/dashboard/:user_id/lessons/add`} component={AddLesson} />
                    <Route path={`/dashboard/:user_id/lessons`} component={Lessons} />
                    <Route path={`/dashboard/:user_id/payment-history`} component={PaymentHistory} />
                    <Route path={`/dashboard/:user_id/payments`} component={Payments} />
                    <Route path='/dashboard' component={User} />
                </Switch>
            </div>
            ) :
            <h3>Please Log In</h3>
        )
    }
}
function mapStateToProps(state){
    return{
        user: state.user.user
    }
}

export default connect(mapStateToProps, {getUser})(Dashboard)