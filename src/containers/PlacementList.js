import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import PlacementProvider from '../providers/placement-provider';
import AdvertProvider from '../providers/advert-provider';
import CreatePlacement from '../components/CreatePlacement';


class PlacementList extends Component {

    static propTypes = {
        placements: PropTypes.array.isRequired,
        placementProvider: PropTypes.object.isRequired,
        adverts: PropTypes.array.isRequired,
        advertProvider: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.placementProvider.getList();
    }

    render() {
        const { placements, placementProvider, adverts, advertProvider } = this.props;

        return (
            <div className="list">
                <h3>Your placements</h3>
                <p>A brief info about all the placements you've done is displayed below.</p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>ID of the order</TableHeaderColumn>
                            <TableHeaderColumn>Placement time</TableHeaderColumn>
                            <TableHeaderColumn>Views count</TableHeaderColumn>
                            <TableHeaderColumn>Clicks count</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            placements.map(placement => (
                                <TableRow key={placement.id}>
                                    <TableRowColumn><Link to={`/placer/placements/${placement.id}`}>{placement.id}</Link></TableRowColumn>
                                    <TableRowColumn>{placement.order_id}</TableRowColumn>
                                    <TableRowColumn>{placement.placed_at}</TableRowColumn>
                                    <TableRowColumn>{placement.views}</TableRowColumn>
                                    <TableRowColumn>{placement.clicks}</TableRowColumn>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <CreatePlacement placementProvider={placementProvider}
                                 advertProvider={advertProvider}
                                 adverts={adverts} />
            </div>
        );
    }

}


export default connect(
    state => ({
        placements: state.placements.list,
        adverts: state.adverts.list
    }),
    dispatch => ({
        placementProvider: new PlacementProvider(dispatch),
        advertProvider: new AdvertProvider(dispatch)
    })
)(PlacementList);
