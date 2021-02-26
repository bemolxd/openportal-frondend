import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';
import { setLastOpenedTab } from '../redux/actions/userActions';
import PropTypes from 'prop-types'
import PostItem from '../Components/PostItem';
import Profile from '../Components/Profile';
import NewPost from '../Components/NewPost';
// Material-UI
import withStyles from '@material-ui/core/styles/withStyles'
import Fab from '@material-ui/core/Fab';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import PersonIcon from '@material-ui/icons/Person';
import { Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';
import GroupWorkIcon from '@material-ui/icons/GroupWork';

const styles = (theme) => ({
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
    fabLogin: {
        position: 'fixed', 
        bottom: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        justifySelf: 'center', 
        backgroundColor: 'white'
    },
    feed: {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        placeItems: 'center'
    }
})

class home extends Component {

    state = {
        activeTab: ''
    }

    componentDidMount(){
        this.props.getPosts()
        this.getLastOpenedTab()
    };

    handleTabChange = (tab) => {
        this.props.setLastOpenedTab(tab);
        this.setState({ activeTab: tab });
    };

    getLastOpenedTab = () => {
        this.setState({
            activeTab: localStorage.getItem('LastOpenedTab') ? 
            localStorage.getItem('LastOpenedTab') : 'feed'
        })
    }

    render() {

        const { classes, authenticated, data: { posts, loading } } = this.props;

        let recentPosts = !loading ? (
            posts.map((post) => <PostItem key={post.postID} post={post}/>)
        ) : ( <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop> 
            )

        let homeScreen;
        if(this.state.activeTab === 'feed') {
            homeScreen = (
                <>
                    <div className={classes.feed}>
                        {recentPosts}
                    </div> 
                    {authenticated && !loading &&
                        <NewPost/> 
                    }
                </>
            )
        } else if(this.state.activeTab === 'groups') {
            homeScreen = (
                <Typography variant="body1" color="textSecondary"><i>Grupy jeszcze niedostępne</i></Typography>
            )
        } else if(this.state.activeTab === 'profile') {
            homeScreen = (
                    <Profile />
            )
        }

        return (
            <>
                {homeScreen}
                {!loading && !authenticated &&
                    <Fade in={true} >
                        <Fab component={Link} to="/login" variant="extended" className={classes.fabLogin}>
                            Zaloguj
                            <ArrowForwardIcon style={{marginLeft: 8}}/>
                        </Fab>
                    </Fade>
                }
                <BottomNavigation
                    value={this.state.activeTab}
                    onChange={(event, newValue) => {
                        this.handleTabChange(newValue);
                    }}
                    showLabels
                    style={{width: '100%', position: 'fixed', bottom: 0, left: 0}}>
                        <BottomNavigationAction label="Nowe posty" value="feed" icon={<DynamicFeedIcon/>}/>
                        {authenticated && <BottomNavigationAction label="Grupy" value="groups" icon={
                            <GroupWorkIcon/>
                        }/>}
                        <BottomNavigationAction label="Mój profil" value="profile" icon={<PersonIcon/>}/>
                </BottomNavigation>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    data: state.data
});

home.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    getPosts: PropTypes.func.isRequired,
    setLastOpenedTab: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getPosts, setLastOpenedTab })(withStyles(styles)(home));
