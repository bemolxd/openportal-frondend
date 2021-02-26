import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import PostItem from '../Components/PostItem';
import Profile from '../Components/Profile';

import { connect } from 'react-redux';
import { getSpecifiedUserData } from '../redux/actions/dataActions';

export class user extends Component {

    state = {
        profile: null
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        this.props.getSpecifiedUserData(username);
        axios.get(`/user/${username}`).get()
            .then((res) => {
                this.setState({ profile: res.data.user })
            }).catch((err) => console.error(err))
    }

    render() {

        const { posts, data: { loading } } = this.props.data;

        return (
            <div>
                <Profile />
                {/*userPosts*/}
            </div>
        )
    }
}

user.propTypes = {
    getSpecifiedUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, { getSpecifiedUserData })(user);
