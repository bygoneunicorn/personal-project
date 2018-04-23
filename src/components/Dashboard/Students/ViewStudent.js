import React, {Component} from 'react';

export default class ViewStudent extends Component{
    render(){
        return(
            <div>
                <p>this student's first name</p>
                <p>this student's last name</p>
                <p>this student's birthdate</p>
                <p>this student's grade</p>
                <p>this student's history</p>
                <p>this student's gender</p>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        )
    }
}