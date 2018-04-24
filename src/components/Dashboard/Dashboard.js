import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import User from './User/User';
import Students from './Students/Students';
import AddStudents from './Students/AddStudent';
import ViewStudents from './Students/ViewStudent';
import Lessons from './Lessons/Lessons';
import Payments from './Payments/Payments';

export default class Dashboard extends Component{
    render(){
        return(
            <div>
                <h1>Dashboard component here</h1>
                <nav>
                    <Link to='/dashboard'><button>User</button></Link>
                    <Link to='/dashboard/students'><button>Students</button></Link>
                    <Link to='/dashboard/lessons'><button>Lessons</button></Link>
                    <Link to='/dashboard/payments'><button>Payments</button></Link>
                </nav>
                <Switch>
                    <Route path='/dashboard/students/add' component={AddStudents}/>
                    <Route path='/dashboard/students/:student_id' component={ViewStudents} />
                    <Route path='/dashboard/students' component={Students}/>
                    <Route path='/dashboard/lessons' component={Lessons} />
                    <Route path='/dashboard/payments' component={Payments} />
                    <Route path='/dashboard' component={User} />
                </Switch>
            </div>
        )
    }
}