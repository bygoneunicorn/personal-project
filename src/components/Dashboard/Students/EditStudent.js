import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    getStudent,
    mountCurrentToBeUpdated, 
    updateFirst, 
    updateLast, 
    updateBirthday, 
    updateHistory,
    updateGender,
    saveStudentChanges
} from '../../../ducks/students';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class EditStudent extends Component{
    constructor(props){
        super(props)

        this.state =  {}
    }
    componentDidMount(){
        this.props.mountCurrentToBeUpdated(this.props.currentStudent)
    }
    render(){
        console.log(this.props)
        const {
            currentStudent,
            studentBeingUpdated,
            updateFirst,
            updateLast,
            updateBirthday,
            updateHistory,
            updateGender,
            saveStudentChanges
        } = this.props
        return(
            <div>
                <TextField
                        id="update-first-name"
                        defaultValue={currentStudent.first_name}
                        onChange={(e) => updateFirst(e.target.value)}
                        floatingLabelText='First Name'
                />
                <br />
                <TextField
                        id="update-last-name"
                        defaultValue={currentStudent.last_name}
                        onChange={(e) => updateLast(e.target.value)}
                        floatingLabelText='Last Name'
                />
                <DatePicker 
                        hintText={currentStudent.birthday} 
                        openToYearSelection={true} 
                        value={studentBeingUpdated.birthday}
                        onChange={updateBirthday}
                        hideCalendarDate={false}
                        floatingLabelText='Birthday'

                />
                <br />
                <TextField
                        id="update-history"
                        defaultValue={currentStudent.history}
                        // value={newStudentHistory}
                        onChange={(e) => updateHistory(e.target.value)} 
                        multiLine={true}
                        rows={2}
                        rowsMax={5}
                        floatingLabelText='Student history and experience'
                />
                <br />
                <SelectField
                    floatingLabelText="Student Gender"
                    value={studentBeingUpdated.gender}
                    onChange={(e, i, value) => updateGender(value)}
                >                
                    <MenuItem value={1} primaryText="Female" />
                    <MenuItem value={2} primaryText="Male" />
                </SelectField>
                <br />
                <RaisedButton 
                    label="Save Changes"
                    onClick={() => {saveStudentChanges(studentBeingUpdated.student_id ,studentBeingUpdated)}}
                />
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        currentStudent: state.students.currentStudent,
        studentBeingUpdated: state.students.studentBeingUpdated,
        updateStudentFirstName: state.students.updateStudentFirstName,
        updateStudentLastName: state.students.updateStudentLastName,
        updateStudentBirthday: state.students.updateStudentBirthday,
        updateStudentHistory: state.students.updateStudentHistory,
        updateStudentGender: state.students.updateStudentGender
    }
}

export default connect(mapStateToProps, {getStudent, mountCurrentToBeUpdated, updateFirst, updateLast, updateBirthday, updateHistory, updateGender, saveStudentChanges})(EditStudent)