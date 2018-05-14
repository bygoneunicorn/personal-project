import React, {Component} from 'react';
import { connect } from 'react-redux';

class User extends Component{
    render(){
        return(
            <div className='user-main'>                            
                <h2>Welcome to your Yazzie Music Dashboard, {this.props.user.display_name}!</h2>
                <p>Get started by selecting the Students Tab and adding a student!</p>
                <p>For each student, you can add and manage lessons and make payments.</p>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user.user
    }
}

export default connect(mapStateToProps)(User)