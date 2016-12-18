import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


class AdPlacer extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired
    };

    render() {
        return (
            <div>Ad Placer page</div>
        );
    }

}


export default connect(
    state => ({
        user: state.user
    })
)(AdPlacer);
