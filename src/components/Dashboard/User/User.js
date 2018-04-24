import React, {Component} from 'react';
import { getUser } from '../../../ducks/user';
import { connect } from 'react-redux';

class User extends Component{
    componentDidMount(){
        this.props.getUser()
    }
    render(){
        console.log(this.props.user)
        console.log(this.props.user.user.display_name)
        return(
            <div>                
            {
                this.props.user.user ? 
                (
                    <div>                            
                        <p>Account Holder: {this.props.user.user.display_name}</p>
                        <p>Email: {this.props.user.user.email}</p>
                        <img src={this.props.user.user.img} alt='Profile'/>
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
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser})(User)