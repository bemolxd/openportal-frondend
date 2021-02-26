import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newPost, clearErrors } from '../redux/actions/dataActions';
 // Material_UI
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    textField: {
        margin: '10px 0px 10px auto',
    },
    backdrop: {
        zIndex: 1,
        color: '#fff',
    },
    fab: {
        position: 'fixed', 
        bottom: 80, 
        left: 'auto', 
        backgroundColor: 'white',
        [theme.breakpoints.down('sm')]: {
            right: 20,
        },
        [theme.breakpoints.up('md')]: {
            right: '25%',
        }
    },
    fabSubmit: {
        marginTop: 20,
        marginBottom: 12,
        position: 'relative',
        left: '50%',
        backgroundColor: 'white',
        transform: 'translate(-50%)'
    }
});

class NewPost extends Component {

    state = {
        open: false,
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                body: '', 
                open: false, 
                errors: {}
            })
        }
    }

    handleOpen = () => {
        this.setState({ open: true})
    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.newPost({ content: this.state.body })
    }

    render() {

        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;

        return (
            <Fragment>
                <Fab onClick={this.handleOpen} className={classes.fab}><CreateIcon/></Fab>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <DialogTitle>Opublikuj nowy post</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                lagel="Treść posta"
                                multiline
                                rows="3"
                                placeholder="Co Ci chodzi po głowie?"
                                error={errors.content ? true : false}
                                helperText={errors.content}
                                className={classes.textfield}
                                onChange={this.handleChange}
                                fullWidth/>
                            <Fab 
                                className={classes.fabSubmit} 
                                size="medium" 
                                type="submit"
                                disabled={loading}>
                                    {!loading && <SendIcon/>}
                                    {loading && <CircularProgress size={30}/>}
                            </Fab>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

NewPost.propTypes = {
    newPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { newPost, clearErrors })(withStyles(styles)(NewPost));
