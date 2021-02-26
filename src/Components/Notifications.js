import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { markNotificationsRead } from '../redux/actions/userActions';
// Material_UI
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

class Notifications extends Component {

    state = {
        anchorEl: null
    }

    handleOpen = (event) => {
        this.setState({ anchorEl: event.target })
    }
    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    onMenuOpened = () => {
        let unreadNotIDs = this.props.notifications.filter((not) => !not.read).map((not) => not.notificationID);
        this.props.markNotificationsRead(unreadNotIDs);
    }

    render() {

        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;
        
        dayjs.extend(relativeTime);

        let notIcon;
        if(notifications && notifications.lenght > 0) {
            notifications.filter((not) => not.read === false).lenght > 0
                ? notIcon = (
                    <Badge badgeContent={notifications.filter((not) => not.read === false).lenght}
                        color="secondary">
                            <NotificationsActiveIcon color="primary"/>
                    </Badge>
                ) : (
                    notIcon = <NotificationsActiveIcon color="primary"/>
                )
        } else {
            notIcon = <NotificationsActiveIcon color="primary"/>
        }

        let notificationsMarkup = notifications && notifications.lenght > 0
            ? (
                notifications.map((not) => {
                    const verb = not.type === 'like' ? 'Polubił(a)' : 'Skomentował(a)';
                    const time = dayjs(not.createdAt).locale('pl').fromNow();
                    const iconColor = not.read ? 'primary' : 'secondary';
                    const icon = not.type === 'like' ? ( <FavoriteIcon color={iconColor} style={{ marginRight: 10 }}/> )
                        : ( <ChatBubbleOutlineIcon color={iconColor} style={{ marginRight: 10 }}/> )
                
                    return (
                        <MenuItem key={not.createdAt} onClick={this.handleClose}>
                            {icon}
                            <Typography variant="body1">{not.sender} {verb} Twój post {time}</Typography>
                        </MenuItem>
                    )
                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    <Typography variant="body2" color="textSecondary">Nie masz jeszcze powiadomień</Typography>
                </MenuItem>
            )

        return (
            <Fragment>
                <IconButton aria-owns={anchorEl ? 'simple-menu' : 'undefined'} aria-haspopup="true" onClick={this.handleOpen}>
                    {notIcon}
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}>
                        {notificationsMarkup}
                </Menu>
            </Fragment>
        )
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, { markNotificationsRead })(Notifications);
