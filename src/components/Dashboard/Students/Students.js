import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Students extends Component{
    render(){
        return(
            <div>
                <h2>Students Component here</h2>
                <Link to='/dashboard/students/1'><button>View Student 1</button></Link>
                <Link to='/dashboard/students/2'><button>View Student 2</button></Link>
                This component will render a list of students according to how many students there on for the given user on the db. they're not gonna be hard coded in like they are now
                <br/>
                <Link to='/dashboard/students/add'><button>Add Student</button></Link>
            </div>
        )
    }
}