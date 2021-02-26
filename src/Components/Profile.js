import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import EditDetails from './EditDetails';

import { logoutUser } from '../redux/actions/userActions';

// Material-UI
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LinkIcon from '@material-ui/icons/Link';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    profile: {
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center'
    },
    card: {
        background: '#fff',
        borderRadius: 10,
        display: 'inline-block',
        margin: '0.6rem',
        position: 'relative',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: 330
        },
        [theme.breakpoints.up('md')]: {
            width: 600
        }
    },
    avatar: {
        margin: 24,
        width: 124,
        height: 124
    },
    spacingTop: {
        marginTop: 12
    },
    spacingBottom: {
        marginBottom: 12
    },
    noUser: {
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
        padding: 12
    },
    root: {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        placeItems: 'center'
    }
});

class profile extends Component {

    handleLogout = () => {
        this.props.logoutUser()
    }

    render() {

        const { classes, user: { credentials: { username, createdAt, profilePic, bio, website, location }, loading, authenticated } } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <div className={classes.profile}>
                <div className={classes.card}>
                    <Avatar className={classes.avatar} src={profilePic}/>
                    <Typography variant="h5" color="textPrimary">@{username}</Typography>
                    <Typography className={classes.spacingBottom} variant="body2" color="textSecondary">Dołączył(a): {dayjs(createdAt).format('DD/MM/YYYY')}</Typography>
                    {location && <Typography variant="body2" color="textSecondary">Pochodzi z: {location}</Typography>}
                    {bio &&
                        <Fragment>
                            <Typography className={classes.spacingTop} variant="body2" color="textSecondary">Coś o mnie:</Typography>
                            <Typography variant="body1" color="textPrimary">{bio}</Typography>
                        </Fragment>}
                    {website &&
                        <Fragment>
                            <div className={classes.spacingTop} style={{display: 'flex'}}>
                                <LinkIcon style={{marginRight: 8}}/>
                                <Typography variant="body1" color="primary">{website}</Typography>
                            </div>
                        </Fragment>}
                    <div style={{display: 'flex'}}>
                        <IconButton onClick={this.handleLogout}>
                            <ExitToAppIcon/>
                        </IconButton>
                        <EditDetails />
                    </div>
                </div>
            </div>
        ) : (
            <div className={classes.root}>
                <div className={classes.noUser}>
                    <Typography variant="body1">Wygląda na to, że nie jesteś zalogowany(a)!</Typography>
                    <Typography variant="body1">Wybierz jedną z poniższych opcji:</Typography>
                    <ButtonGroup className={classes.spacingTop} variant="text" color="primary" aria-label="text primary button group">
                        <Button component={Link} to="/login">Zaloguj</Button>
                        <Button component={Link} to="/signup">Zarejestruj</Button>
                    </ButtonGroup>
                </div>
            </div>
        )) : (
            <p>Ładuję...</p>
        )

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProp = { logoutUser };

profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProp)(withStyles(styles)(profile));