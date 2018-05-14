import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logOut} from '../../ducks/user';
import './Nav.css';
import logo from './logo2.png';

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
        const drawerWidth = 
            window.screen.availWidth < 650 ? 
            '100%' :
            250
        return(
            <div className='main-nav'>
                <div className='menu-button-container'> 
                    <FlatButton
                        label="Menu"
                        onClick={this.handleToggle}
                        labelStyle={{
                            color: 'white'
                        }} 
                    />
                    <Drawer
                        docked={false}
                        width={drawerWidth}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                        containerStyle={{
                            backgroundColor: '#ffffffd4'
                        }}
                        overlayStyle={{
                            backgroundColor: '#00000080'
                        }}
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
                        <img src={logo} alt='Logo' className='logo'/>
                    </div>
                        {
                            (this.props.user.user_id) ? 
                        (
                        <div className='login-button'>
                            <FlatButton 
                                label="Logout"
                                href={process.env.REACT_APP_LOGOUT}  
                                labelStyle={{
                                    color: 'white'
                                }}                     
                            />
                        </div>
                        ):
                        <div className='login-button'>
                            <FlatButton 
                                label="Login/Signup"
                                href={process.env.REACT_APP_LOGIN}
                                labelStyle={{
                                    color: 'white'
                                }}
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

