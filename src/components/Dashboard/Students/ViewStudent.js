import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getStudent, deleteStudent} from '../../../ducks/students';
import {getLessonsByStudent} from '../../../ducks/lessons';
import {Link} from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';

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
        let lessonsList = this.props.currentStudentLessons.map(( lesson => {
            return(
                <div key={lesson.lesson_id}>
                    <Link to={`/dashboard/${user_id}/lesson/${lesson.lesson_id}`}> 
                        <h4>{lesson.date_of_lesson} {lesson.time_of_lesson} Price: ${lesson.price}</h4>
                    </Link>
                </div>
            )
        }))

        return(
            <div>
                        <div>
                            <h3>{first_name} {last_name}</h3>
                            <p>{birthday}</p>
                            <Link to={`/dashboard/${user_id}/student/edit/${student_id}`}><RaisedButton>Edit</RaisedButton></Link>
                            <Link to={`/dashboard/${user_id}/students`}><RaisedButton onClick={() => deleteStudent(student_id)}>Delete</RaisedButton></Link>
                        </div>
                        <div>
                            <h3>Lessons Display here</h3>
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