import React, {Component} from 'react';
import {connect} from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class AddLesson extends Component{
    render(){
        return(
            <div>Add a Lesson here</div>
        )
    }
}

function mapStateToProps(state){
    return null
}

export default connect(mapStateToProps)(AddLesson)