import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
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

class AddStudent extends Component{
    render(){
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
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}>
                <div style={{
                    backgroundColor: '#ffffff94',
                    padding: '30px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                }}>
                <h2
                style={{
                    color: 'black'
                }}>Add a student here!
                    <IconButton 
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
                        firstDayOfWeek={0}
                        formatDate={new DateTimeFormat('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        }).format} 
                        />

                    <TextField
                            id="input-history"
                            hintText="Brief history of student experience"
                            value={newStudentHistory}
                            onChange={(e) => handleHistory(e.target.value)} 
                            multiLine={true}
                            rows={2}
                            rowsMax={5}
                            />
                <br />

                    <SelectField
                        floatingLabelText="Gender"
                        value={newStudentGender}
                        onChange={(e, i, value) => handleGender(value)}
                        style={{
                            textAlign: 'left'
                        }}
                        >
                        <MenuItem value={1} primaryText="Female" />
                        <MenuItem value={2} primaryText="Male" />
                    </SelectField>
                <br />
                <Link to={`/dashboard/${user_id}/students`}>
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
                </Link>
                    <br />
                </div>
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