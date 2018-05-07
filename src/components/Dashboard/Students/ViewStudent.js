import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getStudent, deleteStudent} from '../../../ducks/students';
import {getLessonsByStudent} from '../../../ducks/lessons';
import {Link} from 'react-router-dom';

class ViewStudent extends Component{
    componentDidMount(){
        const {getStudent, getLessonsByStudent} = this.props
        const {student_id} = this.props.match.params
        getStudent(student_id)
        getLessonsByStudent(student_id)
    }
    
    render(){
        console.log(this.props)
        const { student_id, first_name, last_name, birthday, grade, history, gender } = this.props.currentStudent
        const { user_id } = this.props.match.params;
        let lessonsList = this.props.currentStudentLessons.map(( lesson => {
            return(
                <div key={lesson.lesson_id}>
                    <h4>{lesson.date_of_lesson} {lesson.time_of_lesson} Price: ${lesson.price}</h4>
                </div>
            )
        }))

        return(
            <div>
                        <div>
                            <p>{first_name} {last_name}</p>
                            <p>{birthday}</p>
                            <p>{grade}</p>
                            <p>{history}</p>
                            <p>{gender}</p>
                            <Link to={`/dashboard/${user_id}/student/edit/${student_id}`}><button>Edit</button></Link>
                            <Link to={`/dashboard/${user_id}/students`}><button onClick={() => deleteStudent(student_id)}>Delete</button></Link>
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