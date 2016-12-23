import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AdvertProvider from '../providers/advert-provider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import '../styles/AdvertList.css';


class AdvertList extends Component {

    static propTypes = {
        advertProvider: PropTypes.object.isRequired,
        adverts: PropTypes.array.isRequired
    };

    componentDidMount() {
        this.props.advertProvider.getList();
    }

    render() {
        const { adverts } = this.props;

        return (
            <div className="advert-list">
                <h3>Your advert orders</h3>
                <p>A brief info about all the advert orders you've placed is displayed below.</p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Follow URL link</TableHeaderColumn>
                            <TableHeaderColumn>Description</TableHeaderColumn>
                            <TableHeaderColumn>Clicks</TableHeaderColumn>
                            <TableHeaderColumn>Views</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            adverts.map(ad => (
                                <TableRow key={ad.id}>
                                    <TableRowColumn><Link to={`/provider/adverts/${ad.id}`}>{ad.id}</Link></TableRowColumn>
                                    <TableRowColumn>{ad.follow_url_link}</TableRowColumn>
                                    <TableRowColumn>{ad.description}</TableRowColumn>
                                    <TableRowColumn>{ad.clicks}</TableRowColumn>
                                    <TableRowColumn>{ad.views}</TableRowColumn>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        );
    }

}


export default connect(
    state => ({
        adverts: state.adverts.list
    }),
    dispatch => ({
        advertProvider: new AdvertProvider(dispatch)
    })
)(AdvertList);
