import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getStudent} from '../../../ducks/students';
import {Link} from 'react-router-dom';

class ViewStudent extends Component{
    componentDidMount(){
        this.props.getStudent(this.props.match.params.student_id)
    }
    
    render(){
        console.log(this.props)
        const { student_id, first_name, last_name, birthday, grade, history, gender } = this.props.currentStudent

        return(
            <div>
                {
                    this.props.currentStudent ?
                    (
                        <div>
                            <p>{first_name} {last_name}</p>
                            <p>{birthday}</p>
                            <p>{grade}</p>
                            <p>{history}</p>
                            <p>{gender}</p>
                            <Link to={`/dashboard/student/edit/${student_id}`}><button>Edit</button></Link>
                            <button>Delete</button>
                        </div>
                    ):
                    null
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return{
        currentStudent: state.students.currentStudent
    }
}

export default connect(mapStateToProps, {getStudent})(ViewStudent)