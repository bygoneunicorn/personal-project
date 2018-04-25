import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getLesson } from '../../../ducks/lessons';

class ViewLesson extends Component{
    componentDidMount(){
        this.props.getLesson(this.props.match.params.lesson_id)
    }
    render(){
        return(
            <div>asdfasdf</div>
        )
    }
}

function mapStateToProps( state ){
    return{
        currentLesson: state.lessons.currentLesson
    }
}

export default connect(mapStateToProps, {getLesson})(ViewLesson)