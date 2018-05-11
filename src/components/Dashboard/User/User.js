import React, {Component} from 'react';
import { connect } from 'react-redux';

class User extends Component{
    render(){
        return(
            <div className='user-main'>                            
                <h2>Welcome to Yazzie Music, {this.props.user.display_name}!</h2>
                <p>Get started by selecting the Students Tab and adding a student!</p>
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