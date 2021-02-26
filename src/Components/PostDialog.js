import React, { Component, Fragment } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pl';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';
// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const styles = {

}

class PostDialog extends Component {
    state = {
        open: false,
    }
    handleOpen = () => {
        this.setState({ open: true });
        this.props.getPost(this.props.postID);
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    render() {
        
        const { classes, UI: { loading } } = this.props;

        const dialogMarkup = loading ? (
            <CircularProgress size={200}/>
        ) : (
            null
        )

        return (
            <Fragment>
                <IconButton onClick={this.handleOpen}>
                    <ChatBubbleOutlineIcon color="primary"/>
                </IconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <DialogTitle>Komentarze</DialogTitle>
                <DialogContent>
                    <Grid container>
                        
                        <Typography variant="body1" color="textSecondary"><i>Brak komentarzy</i></Typography>
                    </Grid>
                </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostDialog.propTypes = {
    comments: PropTypes.array.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    comments: state.data.post.comments,
    UI: state.UI
});

const mapActionsToProps = {
    getPost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));