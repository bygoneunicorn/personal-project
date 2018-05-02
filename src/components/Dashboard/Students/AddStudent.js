import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    handleFirstName, 
    handleLastName, 
    handleBirthday, 
    handleHistory, 
    handleGender, 
    addStudent
} from '../../../ducks/students';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';


class AddStudent extends Component{
    render(){
        console.log(this.props)        
        const {handleFirstName, 
               handleLastName,
               handleBirthday,
               handleHistory,
               handleGender,
               addStudent,
               user_id,
               newStudentFirstName, 
               newStudentLastName,
               newStudentBirthday,
               newStudentHistory,
               newStudentGender
            } = this.props
        return(
            <div>
                <h2>Add a student here!
                    <IconButton 
                        tooltip="Back to Students"
                        tooltipPosition="bottom-center"
                        touch={true}
                        href={`/#/dashboard/${user_id}/students`}
                    >
                        <NavigationArrowBack  />
                    </IconButton>

                </h2>

                <TextField
                        id="input-first-name"
                        hintText="First Name"
                        value={newStudentFirstName}
                        onChange={(e) => handleFirstName(e.target.value)}
                        errorText="This field is required."

                    />
                <br/>

                <TextField
                        id="input-last-name"
                        hintText="Last Name"
                        value={newStudentLastName}
                        onChange={(e) => handleLastName(e.target.value)}
                    />

                    <DatePicker 
                        hintText="Select Birthday" 
                        openToYearSelection={true} 
                        value={newStudentBirthday}
                        onChange={handleBirthday}
                        hideCalendarDate={false}
                    />

                    <TextField
                            id="input-history"
                            hintText="Enter a brief history of student experience"
                            value={newStudentHistory}
                            onChange={(e) => handleHistory(e.target.value)} 
                            multiLine={true}
                            rows={2}
                            rowsMax={5}
                        />
                <br />

                    <SelectField
                        floatingLabelText="Student Gender"
                        value={newStudentGender}
                        onChange={(e, i, value) => handleGender(value)}
                    >
                        <MenuItem value={1} primaryText="Female" />
                        <MenuItem value={2} primaryText="Male" />
                    </SelectField>
                <br />

                    <RaisedButton 
                    label="Submit"
                    onClick={() => {addStudent(
                        user_id,
                        newStudentFirstName, 
                        newStudentLastName, 
                        newStudentBirthday,
                        newStudentHistory,
                        newStudentGender
                    )}
                    }
                    />

            </div>
        )
    }
}

function mapStateToProps( state ){
    return{
        user_id: state.user.user.user_id,
        newStudentFirstName: state.students.newStudentFirstName,
        newStudentLastName: state.students.newStudentLastName,
        newStudentBirthday: state.students.newStudentBirthday,
        newStudentHistory: state.students.newStudentHistory,
        newStudentGender: state.students.newStudentGender
    }
}

export default connect(mapStateToProps, {handleFirstName, handleLastName, handleBirthday, handleHistory, handleGender, addStudent})(AddStudent)