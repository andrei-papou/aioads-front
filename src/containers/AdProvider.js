import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


class AdProvider extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired
    };

    render() {
        return (
            <div>Ad Provider page</div>
        );
    }

}


export default connect(
    state => ({
        user: state.user
    })
)(AdProvider);
