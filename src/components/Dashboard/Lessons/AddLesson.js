import React, {Component} from 'react';
import {connect} from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {getStudents} from '../../../ducks/students';
import {handleStudentSelect, handleNewLessonDate, handleNewLessonTime, handleNewLessonPrice, addLesson} from '../../../ducks/lessons';
import areIntlLocalesSupported from 'intl-locales-supported';


let DateTimeFormat;

if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/fr');
  require('intl/locale-data/jsonp/fa-IR');
}

class AddLesson extends Component{
    componentDidMount(){
        const user_id = this.props.match.params.user_id
        this.props.getStudents(user_id)
    }
    render(){
        console.log(this.props)
        const {
            studentIdLessonToAdd,
            newLessonDate, 
            newLessonTime,
            newLessonPrice,
            handleStudentSelect,
            handleNewLessonDate,
            handleNewLessonTime,
            handleNewLessonPrice,
            addLesson
        } = this.props
        let studentSelection = this.props.students.map( student => {
            return(
                <MenuItem key={student.student_id} value={student.student_id} primaryText={student.first_name} label={student.first_name}/>
            )
        })
        return(
            <div>
                <SelectField
                    floatingLabelText="Select a student"
                    value={studentIdLessonToAdd}
                    onChange={(e, i, value) => handleStudentSelect(value)}
                >
                    {studentSelection}
                </SelectField>
                <DatePicker 
                    hintText="Schedule a day" 
                    mode="landscape" 
                    value={newLessonDate}
                    formatDate={new DateTimeFormat('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }).format}                
                    onChange={handleNewLessonDate}
                />
                <TimePicker
                    hintText="Schedule a time"
                    value={newLessonTime}
                    onChange={handleNewLessonTime}
                    minutesStep={15}
                />
                <SelectField
                    floatingLabelText="Length of lesson"
                    value={newLessonPrice}
                    onChange={(e, i, value) => handleNewLessonPrice(value)}
                >
                    <MenuItem label={'30 minutes'} value={30} primaryText={'30 minutes'}/>
                    <MenuItem label={'45 minutes'} value={45} primaryText={'45 minutes'}/>
                    <MenuItem label={'1 hour'} value={60} primaryText={'1 hour'}/>                      
                </SelectField>
                <br />
                <RaisedButton
                label="Submit"
                onClick={() => {addLesson(
                    studentIdLessonToAdd,         
                    newLessonDate, 
                    newLessonTime,
                    newLessonPrice,
                )}}
                
                />
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        newLessonDate: state.lessons.newLessonDate,
        newLessonTime: state.lessons.newLessonTime,
        newLessonPrice: state.lessons.newLessonPrice,
        studentIdLessonToAdd: state.lessons.studentIdLessonToAdd,
        students: state.students.students,
    }
}

export default connect(mapStateToProps, {getStudents, handleStudentSelect, handleNewLessonDate, handleNewLessonTime, handleNewLessonPrice, addLesson})(AddLesson)