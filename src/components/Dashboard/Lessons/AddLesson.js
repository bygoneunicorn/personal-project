import React, {Component} from 'react';
import {connect} from 'react-redux';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {getStudents} from '../../../ducks/students';
import {handleStudentSelect, handleNewLessonDate, handleNewLessonPrice, addLesson} from '../../../ducks/lessons';
// import areIntlLocalesSupported from 'intl-locales-supported';

// let DateTimeFormat;

// if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
//   DateTimeFormat = global.Intl.DateTimeFormat;
// } else {
//   const IntlPolyfill = require('intl');
//   DateTimeFormat = IntlPolyfill.DateTimeFormat;
//   require('intl/locale-data/jsonp/fr');
//   require('intl/locale-data/jsonp/fa-IR');
// }

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
            newLessonPrice,
            handleStudentSelect,
            handleNewLessonDate,        
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
                {/* <DatePicker 
                    hintText="Schedule a day" 
                    mode="landscape" 
                    value={newLessonDate}
                    formatDate={new DateTimeFormat('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }).format}                
                    onChange={handleNewLessonDate}
                /> */}
                <DateTimePicker
                    hintText="Schedule a day and time"
                    clearIcon={null}
                    onChange={(dateTime) => handleNewLessonDate(dateTime)}
                    DatePicker={DatePickerDialog}
                    datePickerMode='landscape'
                    TimePicker={TimePickerDialog}
                    returnMomentDate={true}
                    firstDayOfWeek={0}
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
        newLessonPrice: state.lessons.newLessonPrice,
        studentIdLessonToAdd: state.lessons.studentIdLessonToAdd,
        students: state.students.students,
    }
}

export default connect(mapStateToProps, {getStudents, handleStudentSelect, handleNewLessonDate, handleNewLessonPrice, addLesson})(AddLesson)