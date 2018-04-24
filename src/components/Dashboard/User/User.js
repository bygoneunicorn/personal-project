import React, {Component} from 'react';
import { getUser } from '../../../ducks/user';
import { connect } from 'react-redux';

class User extends Component{
    componentDidMount(){
        this.props.getUser()
    }
    render(){
        console.log(this.props)
        return(
            <div>                
            {
                this.props.user.display_name ? 
                (
                    <div>                            
                        <p>Account Holder: {this.props.user.display_name}</p>
                    </div>
                ) :
                <p>Please Log In</p>
            }
                <h2>All the individual's user information store in this component</h2>
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