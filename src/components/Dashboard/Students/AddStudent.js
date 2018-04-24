import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleFirstName, handleLastName, handleBirthday, handleHistory, handleGender} from '../../../ducks/students';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AddStudent extends Component{
    render(){
        console.log(this.props);
        
        const {handleFirstName, 
               handleLastName,
               handleBirthday,
               handleHistory,
               handleGender,
               newStudentFirstName, 
               newStudentLastName,
               newStudentBirthday,
               newStudentHistory,
               newStudentGender
            } = this.props
        return(
            <div>
                <h1>Add a student here!</h1>
                <MuiThemeProvider>
                <TextField
                        id="input-first-name"
                        hintText="First Name"
                        value={newStudentFirstName}
                        onChange={(e) => handleFirstName(e.target.value)}
                    />
                </MuiThemeProvider>
                <br/>
                <MuiThemeProvider>
                <TextField
                        id="input-last-name"
                        hintText="Last Name"
                        value={newStudentLastName}
                        onChange={(e) => handleLastName(e.target.value)}
                    />
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <DatePicker 
                        hintText="Pick Birthday" 
                        openToYearSelection={true} 
                        value={newStudentBirthday}
                        onChange={handleBirthday}
                        hideCalendarDate={false}
                    />
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <TextField
                            id="input-history"
                            hintText="Enter a brief history of student experience"
                            value={newStudentHistory}
                            onChange={(e) => handleHistory(e.target.value)}
                            multiLine={true}
                            rows={2}
                            rowsMax={5}
                        />
                </MuiThemeProvider>
                <br />
                <MuiThemeProvider>
                    <SelectField
                        floatingLabelText="Student Gender"
                        value={newStudentGender}
                        onChange={(e, i, value) => handleGender(value)}
                    >
                        <MenuItem value={1} primaryText="Female" />
                        <MenuItem value={2} primaryText="Male" />
                    </SelectField>
                </MuiThemeProvider>
                <br />
                <MuiThemeProvider>
                    <RaisedButton label="Submit"/>
                </MuiThemeProvider>

            </div>
        )
    }
}

function mapStateToProps( state ){
    return{
        newStudentFirstName: state.students.newStudentFirstName,
        newStudentLastName: state.students.newStudentLastName,
        newStudentBirthday: state.students.newStudentBirthday,
        newStudentHistory: state.students.newStudentHistory,
        newStudentGender: state.students.newStudentGender
    }
}

export default connect(mapStateToProps, {handleFirstName, handleLastName, handleBirthday, handleHistory, handleGender})(AddStudent)