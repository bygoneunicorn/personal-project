import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    getStudent, 
    updateFirst, 
    updateLast, 
    updateBirthday, 
    updateHistory,
    updateGender
} from '../../../ducks/students';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class EditStudent extends Component{
    render(){
        console.log(this.props)
        const {
            currentStudent,
            updateStudentBirthday,
            updateStudentGender,
            updateFirst,
            updateLast,
            updateBirthday,
            updateHistory,
            updateGender
        } = this.props
        return(
            <div>
                <TextField
                        id="update-first-name"
                        defaultValue={currentStudent.first_name}
                        onChange={(e) => updateFirst(e.target.value)}
                />
                <RaisedButton label="Update First Name"/>
                <br />
                <TextField
                        id="update-last-name"
                        defaultValue={currentStudent.last_name}
                        onChange={(e) => updateLast(e.target.value)}
                />
                <RaisedButton label="Update Last Name"/>
                <DatePicker 
                        hintText="Select Birthday" 
                        openToYearSelection={true} 
                        value={updateStudentBirthday}
                        onChange={updateBirthday}
                        hideCalendarDate={false}
                />
                <RaisedButton label="Update Birthday"/>
                <br />
                <TextField
                        id="update-history"
                        defaultValue={currentStudent.history}
                        // value={newStudentHistory}
                        onChange={(e) => updateHistory(e.target.value)} 
                        multiLine={true}
                        rows={2}
                        rowsMax={5}
                />
                <RaisedButton label="Update History"/>
                <br />
                <SelectField
                    floatingLabelText="Student Gender"
                    value={updateStudentGender}
                    onChange={(e, i, value) => updateGender(value)}
                >                
                    <MenuItem value={1} primaryText="Female" />
                    <MenuItem value={2} primaryText="Male" />
                </SelectField>
                <RaisedButton label="Update Gender"/>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        currentStudent: state.students.currentStudent,
        updateStudentFirstName: state.students.updateStudentFirstName,
        updateStudentLastName: state.students.updateStudentLastName,
        updateStudentBirthday: state.students.updateStudentBirthday,
        updateStudentHistory: state.students.updateStudentHistory,
        updateStudentGender: state.students.updateStudentGender
    }
}

export default connect(mapStateToProps, {getStudent, updateFirst, updateLast, updateBirthday, updateHistory, updateGender})(EditStudent)