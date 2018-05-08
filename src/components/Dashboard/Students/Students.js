import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getStudents} from '../../../ducks/students';

import RaisedButton from 'material-ui/RaisedButton';

import './Student.css';


class Students extends Component{
    componentDidMount(){
        const user_id = this.props.user.user_id
        this.props.getStudents(user_id)
    }
    render(){
        console.log(this.props)
        const {user_id} = this.props.user
        let studentList = this.props.students.students.map(student => {
            return(
                <div key={student.student_id} className='student-item'>
                    <Link to={`/dashboard/${user_id}/student/${student.student_id}`}>
                        <h4>{student.first_name} {student.last_name}</h4>
                    </Link>
                    {/* <Link to='#'><button>Open Lesson Manager for {student.first_name}</button></Link> */}
                    
                </div>
            )
        })
        return(
            <div>
                <h2>Students Component here</h2>
                {/* <Link to='/dashboard/students/1'><button>View Student 1</button></Link>
                <Link to='/dashboard/students/2'><button>View Student 2</button></Link>
                This component will render a list of students according to how many students there on for the given user on the db. they're not gonna be hard coded in like they are now */}
                <div className='student-list'>
                    {studentList}
                </div>
                <br/>
                <Link to={`/dashboard/${user_id}/students/add`}><RaisedButton>Add Student</RaisedButton></Link>
            </div>
        )
    }
}

function mapStateToProps( state ){
    return{
        students: state.students,
        user: state.user.user
    }
}

export default connect(mapStateToProps, {getStudents})(Students)