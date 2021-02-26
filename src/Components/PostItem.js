import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pl';

import PostDialog from '../Components/PostDialog';

import { connect } from 'react-redux';
import { likePost, unlikePost, deletePost } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';

// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/Button';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Dialog from '@material-ui/core/Dialog';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    card: {
        background: '#fff',
        borderRadius: 10,
        margin: '0.6rem',
        position: 'relative',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            width: 330
        },
        [theme.breakpoints.up('md')]: {
            width: 600
        }
    },
    avatar: {
        margin: 12,
        width: 52,
        height: 52
    }
});

class PostItem extends Component {

    state = {
        open: false
    }
    
    likedPost = () => {
        if(this.props.user.likes && this.props.user.likes.find((like) => like.postID === this.props.post.postID)){
            return true;
        } else return false;
    }

    likePost = () => {
        this.props.likePost(this.props.post.postID)
    }

    unlikePost = () => {
        this.props.unlikePost(this.props.post.postID)
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleDeletePost = () => {
        this.props.deletePost(this.props.post.postID);
        console.log(`usuwam post: ${this.props.post.postID}`)
        this.setState({ open: false })
    }

    render() {

        dayjs.extend(relativeTime);

        const { classes, 
            user: { authenticated, credentials }, 
            post: { content, createdAt, profilePic, username, postID, likeCount, commentCount, comments } } = this.props;
        
        const likeButton = !authenticated ? (
            <div style={{display: 'flex', placeItems: 'center'}}>
                <IconButton component={Link} to={'/login'}><FavoriteBorderIcon color="inherit"/></IconButton>
                <Typography variant="body2">{likeCount} Polub post</Typography></div>
        ) : (
            this.likedPost() ? (
                <div style={{display: 'flex', placeItems: 'center'}}>
                    <IconButton onClick={this.unlikePost}><FavoriteIcon color="primary"/></IconButton>
                    <Typography variant="body2" color="primary">{likeCount} Lubię!</Typography></div>
            ) : (
                <div style={{display: 'flex', placeItems: 'center'}}>
                    <IconButton onClick={this.likePost}><FavoriteBorderIcon color="primary"/></IconButton>
                    <Typography variant="body2">{likeCount} Polub post</Typography></div>
            )
        );

        return (
            <div className={classes.card}>
                <div className="header" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex'}}>
                        <div>
                            <Avatar className={classes.avatar} src={profilePic} component={Link} to={`/users/${username}`}/>
                        </div>
                        <div style={{paddingTop: 10}}>
                            <Typography variant="h6" component={Link} to={`/users/${username}`} color="textPrimary">{username}</Typography>
                            <Typography variant="body2" color="textSecondary">{dayjs(createdAt).locale('pl').fromNow()}</Typography>
                        </div>
                    </div>
                    {authenticated && credentials.username === username &&
                    <>
                    <IconButton onClick={this.handleOpen}>
                        <DeleteIcon color="primary"/>
                    </IconButton>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        fullWidth
                        maxWidth="sm">
                        <DialogTitle>Usuń post</DialogTitle>
                        <DialogContent>Czy na pewno chcesz usunąć swój post?</DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">Anuluj</Button>
                            <Button onClick={this.handleDeletePost} color="primary">Usuń</Button>
                        </DialogActions>
                    </Dialog>
                    </>
                    }
                </div>
                <div>
                    <Typography variant="body1" style={{padding: 12}}>{content}</Typography>
                </div>
                <Divider style={{width: '90%', placeSelf: 'center'}}/>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    {likeButton}
                    <div style={{display: 'flex', placeItems: 'center'}}>
                        <Typography variant="body2">{`Komentarze: ${commentCount}`}</Typography>
                        <PostDialog comments={comments} postID={postID}/>
                        {console.log(this.props.post.comments)}
                    </div>
                </div>
            </div>
        )
    }
}

PostItem.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likePost,
    unlikePost,
    deletePost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostItem));
