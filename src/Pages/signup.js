import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from '../images/connect.png';
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';
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

class signup extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
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
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            username: this.state.username
        }
        this.props.signupUser(newUserData, this.props.history);
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
                        Zarejestruj się
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
                        <TextField 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            label="Powtórz hasło" 
                            className={classes.textField} 
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth 
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false} />
                        <TextField 
                            id="username" 
                            name="username" 
                            type="text" 
                            label="Nazwa użytkownika" 
                            className={classes.textField} 
                            value={this.state.username}
                            onChange={this.handleChange}
                            fullWidth 
                            helperText={errors.username}
                            error={errors.username ? true : false} />
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
                        <small>Masz już konto? Zaloguj się <Link to="/login">tutaj</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));   
