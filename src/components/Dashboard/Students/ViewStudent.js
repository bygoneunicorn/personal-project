import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getStudent, deleteStudent} from '../../../ducks/students';
import {getLessonsByStudent} from '../../../ducks/lessons';
import {Link} from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import Moment from 'react-moment';

class ViewStudent extends Component{
    componentDidMount(){
        const {getStudent, getLessonsByStudent} = this.props
        const {student_id} = this.props.match.params
        getStudent(student_id)
        getLessonsByStudent(student_id)
    }
    
    render(){
        console.log(this.props)
        const { student_id, first_name, last_name, birthday} = this.props.currentStudent
        const { user_id } = this.props.match.params;

        let age = <Moment fromNow ago>{birthday}</Moment>

        let lessonsList = this.props.currentStudentLessons.map(( lesson => {
            let lessonDate = <Moment format="MM/DD/YYYY" date={lesson.date_of_lesson} ></Moment>
            let lessonTime = <Moment format=" hh:mm a" date={lesson.time_of_lesson} ></Moment>
            return(
                <div key={lesson.lesson_id}>
                    <Link to={`/dashboard/${user_id}/lesson/${lesson.lesson_id}`}> 
                        <h4>{lessonDate} {lessonTime} Price: ${lesson.price}</h4>
                    </Link>
                </div>
            )
        }))

        return(
            <div>
                        <div>
                            <h2>{first_name} {last_name}</h2>
                            <p>{age} old</p>
                            <Link to={`/dashboard/${user_id}/student/edit/${student_id}`}><RaisedButton>Edit</RaisedButton></Link>
                            <Link to={`/dashboard/${user_id}/students`}><RaisedButton onClick={() => deleteStudent(student_id)}>Delete</RaisedButton></Link>
                        </div>
                        <div>
                            <h3>Lessons:</h3>
                            {lessonsList}
                            <Link to={`/dashboard/${user_id}/lessons/add`}><div>Add a Lesson</div></Link>
                            
                        </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        currentStudent: state.students.currentStudent,
        currentStudentLessons: state.lessons.currentStudentLessons
    }
}

export default connect(mapStateToProps, {getStudent, getLessonsByStudent, deleteStudent})(ViewStudent)