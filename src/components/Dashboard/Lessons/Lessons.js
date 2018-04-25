import React, {Component} from 'react';
import { connect } from 'react-redux';

class Lessons extends Component{
    render(){
        console.log(this.props)
        return(
            <div>
                <h2>Lessons Component goes here</h2>
            </div>
        )
    }
}

function mapStateToProps( state ){
    return{
        lessons: state.lessons.lessons
    }
}

export default connect(mapStateToProps)(Lessons)