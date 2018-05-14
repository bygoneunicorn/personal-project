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

import {Link} from 'react-router-dom';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import Moment from 'react-moment';

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
        const tempDisplayDate = <Moment format="MMM D YYYY">{this.props.studentBeingUpdated.birthday}</Moment>
        console.log(tempDisplayDate)
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
                    <h3 style={{
                                color: 'black'
                                }}>
                                Updating Student
                                </h3>
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
                            openToYearSelection={true} 
                            onChange={updateBirthday}
                            hideCalendarDate={false}
                            floatingLabelText={tempDisplayDate}
                            value={studentBeingUpdated.birthday}
                            
                            />
                    <br />
                    <TextField
                            id="update-history"
                            defaultValue={currentStudent.history}
                            floatingLabelText='Student History'
                            onChange={(e) => updateHistory(e.target.value)} 
                            multiLine={true}
                            rows={2}
                            rowsMax={5}
                            floatingLabelStyle={{
                                left: '0px',
                            }}
                    />
                    <br />
                    <SelectField
                        floatingLabelText="Student Gender"
                        value={studentBeingUpdated.gender}
                        onChange={(e, i, value) => updateGender(value)}
                        style={{
                            textAlign: 'left'
                        }}
                        >                
                        <MenuItem value={1} primaryText="Female" />
                        <MenuItem value={2} primaryText="Male" />
                    </SelectField>
                    <br />
                    <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'  
                    }}>
                        <Link to={`/dashboard/${this.props.match.params.user_id}/student/${currentStudent.student_id}`}>
                            <RaisedButton onClick={() => {saveStudentChanges(studentBeingUpdated.student_id ,studentBeingUpdated)}}>
                                Save Changes
                            </RaisedButton>
                        </Link>
                        <Link to={`/dashboard/${this.props.match.params.user_id}/student/${currentStudent.student_id}`}>
                            <RaisedButton>Cancel</RaisedButton>
                        </Link>
                    </div>
                </div>
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