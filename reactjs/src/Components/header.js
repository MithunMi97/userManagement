import React from 'react';
import {AppBar,Toolbar,Typography} from '@material-ui/core'
import {Link} from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MenuIcon from '@material-ui/icons/Menu';

const Header = ()  => {
    return(
            <AppBar position="static" className="main-header">
            <Toolbar>
              <MenuIcon/>
              <Typography variant="h6" className="">
              User Management
              </Typography>
              <div style={{margin:'0 auto'}} className="head-link">
                <Link to="/" className="m-4">Task</Link>
                <Link to="/Users" className="m-4">Users</Link>
                <Link to="/" className="m-4">Activity</Link>
                <Link to="/" className="m-4">Members</Link>
              </div>
              <div className="d-flex">
                <AccountCircleIcon />
               <h6 className="ml-4 mr-4">security</h6> 
               <ChatBubbleOutlineIcon />  
              </div>
            </Toolbar>
        </AppBar>
        
    )
}

export default Header;