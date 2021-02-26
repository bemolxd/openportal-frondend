import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = (theme) => ({
    textField: {
        margin: '10px 0px 10px auto',
    },
})

class EditDetails extends Component {

    state = {
        bio: '',
        website: '',
        loaction: '',
        open: false
    }

    componentDidMount(){
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }
    
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        })
    }

    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials)
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {

        const { classes } = this.props;

        return (
            <Fragment>
                <IconButton onClick={this.handleOpen}>
                    <SettingsIcon/>
                </IconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <DialogTitle>Edytuj profil</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField 
                                name="bio"
                                type="text"
                                label="Coś o Tobie"
                                multiline
                                rows="3"
                                placeholder="Krótka informacja, kim jesteś"
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth />
                            <TextField 
                                name="website"
                                type="text"
                                label="Strona internetowa"
                                placeholder="np. website.com"
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth />
                            <TextField 
                                name="location"
                                type="text"
                                label="Loalizacja"
                                placeholder="np. Warszawa, PL"
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSubmit} color="primary">Zapisz</Button>
                        <Button onClick={this.handleClose} color="primary">Anuluj</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

editUserDetails.proptypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
