import React, { Component } from 'react';
import Notifications from './Notifications';
// Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Brightness2Icon from '@material-ui/icons/Brightness2';

class Navbar extends Component {
    render() {
        return (
            <AppBar color="inherit">
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', placeItems: 'center'}}>
                        <img src="/images/connect.png" style={{width: 40, height: 40}} />
                        <Typography variant="h6" style={{padding: 12}}>OpenPortal</Typography>
                    </div>
                    <div>
                        <Notifications />
                        <IconButton>
                            <Brightness2Icon color="primary"/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar
