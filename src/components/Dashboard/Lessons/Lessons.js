import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {getLessons} from '../../../ducks/lessons';

import RaisedButton from 'material-ui/RaisedButton';
import Moment from 'react-moment';

import './Lesson.css';

class Lessons extends Component{
    componentDidMount(){
        this.props.getLessons(this.props.match.params.user_id)
    }
    render(){
        console.log(this.props)
        const{user_id} = this.props.match.params
        const {lessons} = this.props
        let lessonList = lessons.map( lesson =>{
            return(
                <div key={lesson.lesson_id} className='lesson-item'>
                    <Link to={`/dashboard/${user_id}/lesson/${lesson.lesson_id}`}>
                        <h4>{lesson.first_name} {lesson.last_name}</h4>
                        <p><Moment format="MMM D YYYY" date={lesson.date_of_lesson} /> <Moment  format="hh:mm a" date={lesson.date_of_lesson} /></p>
                    </Link>
                </div>
            )
        })
        return(
            <div>
                <div className='lesson-list'>
                    {lessonList}
                </div>
                <Link to={`/dashboard/${user_id}/lessons/add`}>
                    <RaisedButton>Schedule a Lesson</RaisedButton>
                </Link>
            </div>
        )
    }
}

function mapStateToProps( state ){
    return{
        lessons: state.lessons.lessons
    }
}

export default connect(mapStateToProps, {getLessons})(Lessons)