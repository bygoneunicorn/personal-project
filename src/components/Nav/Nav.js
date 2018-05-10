import React, {Component} from 'react';
import axios from 'axios';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logOut} from '../../ducks/user';
import './Nav.css';

class Nav extends Component{
    constructor(props){
        super(props)

        this.state = {
            open: false
        }
    }
    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});
    render(){
        return(
            <div className='main-nav'>
                <div className='menu-button-container'> 
                    <FlatButton
                        label="Menu"
                        onClick={this.handleToggle}
                    />
                    <Drawer
                        docked={false}
                        width={250}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                        overlayClassName='drawer-overlay'
                        className='drawer-root'
                        containerClassName='drawer-container'
                    >
                            {
                               (this.props.user.user_id) ? 
                               (
                                <MenuItem 
                                    onClick={this.handleClose}
                                    primaryText="Dashboard" 
                                    containerElement={<Link to={`/dashboard/${this.props.user.user_id}`}
                                ></Link>}/>
                               ):
                               null
                            }
                            <MenuItem onClick={this.handleClose} primaryText="Home" containerElement={<Link to="/"></Link>}/>
                            <MenuItem onClick={this.handleClose} primaryText="Contact" containerElement={<Link to="/contact"></Link>}/>
                            <MenuItem onClick={this.handleClose} primaryText="About" containerElement={<Link to="/about"></Link>}/>
                            <MenuItem onClick={this.handleClose} primaryText="Resources" containerElement={<Link to="/resources"></Link>}/>
                    </Drawer>
                </div>
                    <div className='logo-container'>
                        <img src='http://via.placeholder.com/450x100' alt='Logo' className='logo'/>
                    </div>
                        {
                            (this.props.user.user_id) ? 
                        (
                        <div className='login-button'>
                            <FlatButton 
                                label="Logout"
                                // onClick={() => axios.get('/logout').then( res => {
                                //     console.log('Logged Out')
                                // })} 
                                href={process.env.REACT_APP_LOGOUT}                       
                            />
                        </div>
                        ):
                        <div className='login-button'>
                            <FlatButton 
                                label="Login/Signup"
                                // onClick={()=> axios.get('/auth').then( res => {
                                //     console.log('Logged In')
                                // })}
                                href={process.env.REACT_APP_LOGIN}
                            />
                        </div>
                        }
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user.user
    }
}

export default connect(mapStateToProps, {logOut})(Nav)

