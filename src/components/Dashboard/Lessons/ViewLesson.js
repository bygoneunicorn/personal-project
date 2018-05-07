import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getLesson, deleteLesson } from '../../../ducks/lessons';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class ViewLesson extends Component{
    constructor(){
        super()

        this.state = {
            editable: false
        }
    }
    componentDidMount(){
        this.props.getLesson(this.props.match.params.lesson_id)
    }
    handleEditChange(){
        this.setState(prevState => ({
            editable: !prevState.editable
          }));
    }
    render(){
        const {user_id} = this.props.match.params
        const {first_name, last_name, date_of_lesson, time_of_lesson, price, lesson_id} = this.props.currentLesson
        return(
            !this.state.editable ? 
            (
            <div>
                <h2>{first_name} {last_name}</h2>
                <p>Date: {date_of_lesson}</p>
                <p>Time: {time_of_lesson}</p>
                <p>Price: {price}</p>
                <RaisedButton onClick={()=> this.handleEditChange()}>Reschedule</RaisedButton>
                <RaisedButton href={`/#/dashboard/${user_id}/lessons`} onClick={() => deleteLesson(lesson_id)}>Delete</RaisedButton>
            
            </div>
            )
            :
            <div>
                <h2>{first_name} {last_name}</h2>
                <p>Date:</p>
                <DatePicker 
                    hintText="Schedule a day" 
                    mode="landscape" 
                />
                <p>Time: </p>
                <TimePicker
                    hintText="Schedule a time"

                />
                <p>Price:</p>
                <SelectField
                    floatingLabelText="Length of lesson"
                >
                    <MenuItem label={'30 minutes'} value={30} primaryText={'30 minutes'}/>
                    <MenuItem label={'45 minutes'} value={45} primaryText={'45 minutes'}/>
                    <MenuItem label={'1 hour'} value={60} primaryText={'1 hour'}/>                      
                </SelectField>
                <RaisedButton onClick={()=> this.handleEditChange()}>Cancel</RaisedButton>
            </div>
            
        )
    }
}

function mapStateToProps( state ){
    return{
        currentLesson: state.lessons.currentLesson
    }
}

export default connect(mapStateToProps, {getLesson, deleteLesson})(ViewLesson)