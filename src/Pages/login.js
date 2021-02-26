import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from '../images/connect.png';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        width: 100,
        margin: '20px 0 20px auto'
    },
    loginTitle: {
        margin: '10px 0 10px auto'
    },
    textField: {
        margin: '10px 0px 10px auto',
    },
    button: {
        margin: 40,
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    backdrop: {
        zIndex: 1,
        color: '#fff',
    },
};

class login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={Logo} className={classes.image} alt="OpenPortal logo"/>
                    <Typography variant="h2" className={classes.loginTitle}>
                        Zaloguj
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField} 
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                            helperText={errors.email}
                            error={errors.email ? true : false} />
                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Hasło" 
                            className={classes.textField} 
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth 
                            helperText={errors.password}
                            error={errors.password ? true : false} />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                        )}
                        <Fab type="submit" color="primary" disabled={loading} className={classes.button}>
                            <ArrowForwardIcon/>
                            {loading && (
                                <Backdrop className={classes.backdrop} open={true}>
                                    <CircularProgress color="inherit" />
                                </Backdrop>)}
                        </Fab>
                        <br />
                        <small>Nie masz jeszcze konta? Przejdź <Link to="/signup">tutaj</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStatesToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStatesToProps, mapActionsToProps)(withStyles(styles)(login))
