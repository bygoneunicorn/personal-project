import React, {Component} from 'react';
import { getUser } from '../../../ducks/user';
import { connect } from 'react-redux';

class User extends Component{
    componentDidMount(){
        this.props.getUser()
    }
    render(){
        return(
            <div>                
            {
                this.props.user.display_name ? 
                (
                    <div>                            
                        <p>Account Holder: {this.props.user.display_name}</p>
                        <p>Email: {this.props.user.email}</p>
                        <img src={this.props.user.img} alt='Profile'/>
                    </div>
                ) :
                <p>Please Log In</p>
            }
                <h2>All the individual's user information stored in this component</h2>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user.user
    }
}

export default connect(mapStateToProps, {getUser})(User)