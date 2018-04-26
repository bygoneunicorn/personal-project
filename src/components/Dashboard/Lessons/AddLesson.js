import React, {Component} from 'react';
import {connect} from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class AddLesson extends Component{
    render(){
        console.log(this.props)
        let studentSelection = this.props.students.map( student => {
            return(
                <MenuItem value={student.student_id} primaryText={student.first_name}/>
            )
        })
        return(
            <div>
                <SelectField
                    floatingLabelText="Select a student"
                >
                    {studentSelection}
                </SelectField>
                <DatePicker 
                    hintText="Schedule a day" 
                    mode="landscape" 
                />
                <TimePicker
                    hintText="Schedule a time"
                />
                <SelectField
                    floatingLabelText="Frequency"
                >
                    <MenuItem value={1} primaryText="Never" />
                    <MenuItem value={2} primaryText="Every Night" />
                    <MenuItem value={3} primaryText="Weeknights" />
                    <MenuItem value={4} primaryText="Weekends" />
                    <MenuItem value={5} primaryText="Weekly" />
                </SelectField>



            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        newLessonDate: state.lessons.newLessonDate,
        newLessonTime: state.lessons.newLessonTime,
        newLessonPrice: state.lessons.newLessonPrice,
        newLessonGroup: state.lessons.newLessonGroup,
        students: state.students.students
    }
}

export default connect(mapStateToProps)(AddLesson)