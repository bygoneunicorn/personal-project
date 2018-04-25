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
import {getUser} from '../../ducks/user';
import { connect } from 'react-redux';

class Dashboard extends Component{
    render(){
        console.log(this.props)
        const {user_id} = this.props.user
        return(
            <div>
                <h1>Dashboard component here</h1>
                <nav>
                    <Link to={`/dashboard/${user_id}`}><button>User</button></Link>
                    <Link to={`/dashboard/${user_id}/students`}><button>Students</button></Link>
                    <Link to={`/dashboard/${user_id}/lessons`}><button>Lessons</button></Link>
                    <Link to={`/dashboard/${user_id}/payments`}><button>Payments</button></Link>
                </nav>
                <Switch>
                    <Route path={`/dashboard/:user_id/student/edit/:student_id`} component={EditStudent}/>
                    <Route path={`/dashboard/:user_id/student/:student_id`} component={ViewStudent} />
                    <Route path={`/dashboard/:user_id/students/add`} component={AddStudents}/>
                    <Route path={`/dashboard/:user_id/students`} component={Students}/>
                    <Route path={`/dashboard/:user_id/lesson/:lesson_id`} component={ViewLesson} />
                    <Route path={`/dashboard/:user_id/lessons/add`} component={AddLesson} />
                    <Route path={`/dashboard/:user_id/lessons`} component={Lessons} />
                    <Route path='/dashboard/payments' component={Payments} />
                    <Route path='/dashboard' component={User} />
                </Switch>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        user: state.user.user
    }
}

export default connect(mapStateToProps, {getUser})(Dashboard)