import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getLesson, deleteLesson, mountLessonUpdate, handleUpdatedDate, handleUpdatedPrice, saveLessonUpdates } from '../../../ducks/lessons';
import RaisedButton from 'material-ui/RaisedButton';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {Link} from 'react-router-dom';

import Moment from 'react-moment';
import 'moment-timezone';

class ViewLesson extends Component{
    constructor(){
        super()

        this.state = {
            editable: false
        }
        this.handleEditChange = this.handleEditChange.bind( this )
        this.handleRescheduleFn = this.handleRescheduleFn.bind( this )
    }
    componentDidMount(){
        this.props.getLesson(this.props.match.params.lesson_id)
    }
    handleEditChange(){
        this.setState(prevState => ({
            editable: !prevState.editable
          }));
    }
    handleRescheduleFn(date_of_lesson, price){
        this.handleEditChange();
        this.props.mountLessonUpdate(date_of_lesson, price)

    }
    render(){
        const {user_id} = this.props.match.params
        const {first_name, last_name, date_of_lesson, price, lesson_id} = this.props.currentLesson
        const {updateDate, updatePrice, handleUpdatedDate, handleUpdatedPrice} = this.props
        const tempDisplayDate = <Moment format="MMM D YYYY, HH:mm a">{updateDate}</Moment>

        return(
            !this.state.editable ? 
            (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}>
                <div style={{
                    backgroundColor: '#20202094',
                    padding: '30px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    minWidth: '300px'
                }}>
                <h2>{first_name} {last_name}</h2>
                <Moment format="MMM DD YYYY" date={date_of_lesson} />
                <br />
                <Moment format="hh:mm a" date={date_of_lesson} />
                <p>Length: {price - '00'} minutes</p>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'  
                    }}>
                    <RaisedButton onClick={()=> this.handleRescheduleFn(date_of_lesson, price)}>Reschedule</RaisedButton>
                    <Link to={`/dashboard/${user_id}/lessons`}><RaisedButton onClick={() => deleteLesson(lesson_id)}>Delete</RaisedButton></Link>
                </div>
            
                </div>
            </div>
            )
            :
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}>
                <div style={{
                    backgroundColor: '#ffffff3d',
                    padding: '30px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                }}>
                    <h2 style={{
                    color: 'black'
                }}>{first_name} {last_name}</h2>
                    <DateTimePicker
                        clearIcon={null}
                        onChange={(dateTime) => handleUpdatedDate(dateTime)}
                        DatePicker={DatePickerDialog}
                        datePickerMode='landscape'
                        TimePicker={TimePickerDialog}
                        returnMomentDate={true}
                        firstDayOfWeek={0}
                        minutesStep={15}
                        textFieldStyle={{
                            color: '#233237'
                        }}
                        floatingLabelText={tempDisplayDate}
                    />
                    <SelectField
                        floatingLabelText="Length of lesson"
                        value={+updatePrice}
                        style={{
                            textAlign: 'left'
                        }}
                        onChange={(e, i, value) => handleUpdatedPrice(value)}
                        >
                        <MenuItem label={'30 minutes'} value={30} primaryText={'30 minutes'}/>
                        <MenuItem label={'45 minutes'} value={45} primaryText={'45 minutes'}/>
                        <MenuItem label={'1 hour'} value={60} primaryText={'1 hour'}/>                      
                    </SelectField>
                    <br />
                    <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'  
                    }}>
                        <Link to={`/dashboard/${user_id}/lessons`}>
                            <RaisedButton onClick={()=> saveLessonUpdates(updateDate, updatePrice, lesson_id)}>Submit</RaisedButton>
                        </Link>
                        <RaisedButton onClick={()=> this.handleEditChange()}>Cancel</RaisedButton>
                    </div>
                </div>
            </div>
            
        )
    }
}

function mapStateToProps( state ){
    return{
        currentLesson: state.lessons.currentLesson,
        updateDate: state.lessons.updateDate,
        updatePrice: state.lessons.updatePrice
    }
}

export default connect(mapStateToProps, {getLesson, deleteLesson, mountLessonUpdate, handleUpdatedDate, handleUpdatedPrice, saveLessonUpdates })(ViewLesson)