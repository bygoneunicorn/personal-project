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