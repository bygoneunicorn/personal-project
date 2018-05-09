import React, {Component} from 'react';
import { connect } from 'react-redux';

class User extends Component{
    render(){
        return(
            <div className='user-main'>                            
                {/* <p>Account Holder: {this.props.user.display_name}</p>
                <p>Email: {this.props.user.email}</p>
                <img src={this.props.user.img} alt='Profile'/> */}
                <h2>Welcome to Yazzie Music {this.props.user.display_name}!</h2>
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