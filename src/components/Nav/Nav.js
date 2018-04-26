import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logOut} from '../../ducks/user';
import './Nav.css';

function Nav(props){

    return(
            <AppBar
                style={{

                }}
                iconElementLeft={
                    <IconMenu
                        style={{
                            marginLeft: '-10px',
                        }}
                        menuStyle={{
                            width: '200px',
                        }}
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        // open={this.state.openMenu}

                    >
                        <MenuItem primaryText="Home" containerElement={<Link to="/"></Link>}/>
                        <MenuItem primaryText="Contact" containerElement={<Link to="/contact"></Link>}/>
                        <MenuItem primaryText="About" containerElement={<Link to="/about"></Link>}/>
                        <MenuItem primaryText="Resources" containerElement={<Link to="/resources"></Link>}/>

                    </IconMenu>
                // <div>
                //     <p>Menu</p>
                //     <ul>
                //         <li><Link to="/contact">Contact</Link></li>
                //         <li><Link to="/about">About</Link></li>
                //         <li><Link to="/resources">Resources</Link></li>
                //     </ul>
                // </div> 
                }
                titleStyle={{
                    textAlign: 'center',
                }}
                title='Yazzie Music Studios'
                iconElementRight={
                
                    (props.user.user_id) ? (
                    <div>
                        <RaisedButton 
                            label="Logout"
                            href="http://localhost:4050/logout"                        
                        />
                        {/* <a href="http://localhost:4050/logout">
                            <button>Logout</button> 
                        </a>
                        <br />
                        <Link to="/dashboard/">To Dashboard Home</Link> */}
                    </div>
                    ):
                    <div>
                        <RaisedButton 
                            label="Login/Signup"
                            href={process.env.REACT_APP_LOGIN}
                            // style={{
                            //     color: '#000000'
                            // }}
                        />
                        {/* <a href={process.env.REACT_APP_LOGIN}>Login/Signup</a> */}
                    </div>}
        />
    )
}

function mapStateToProps(state){
    return{
        user: state.user.user
    }
}

export default connect(mapStateToProps, {logOut})(Nav)

