import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import PlacementProvider from '../providers/placement-provider';
import AnalyticsView from '../components/AnalyticsView';


class PlacementObject extends Component {

    static propTypes = {
        placementProvider: PropTypes.object.isRequired,
        placement: PropTypes.object,
        clicks: PropTypes.array.isRequired,
        views: PropTypes.array.isRequired
    };

    componentDidMount() {
        const { params, placementProvider } = this.props;
        placementProvider.getObject(params.id);
    }

    render() {
        const { placement, clicks, views, placementProvider, params } = this.props;

        return placement ? (
            <div className="object">
                <h3>{`Placement #${placement.id} details`}</h3>
                <p>
                    {`
                        Below is the main info about placement whose id is ${placement.id}.
                        Its analytics and general data is presented below.
                    `}
                </p>
                <div>
                    <Link to="/placer/placements"><RaisedButton primary={true} label="Back to placements list" /></Link>
                </div>
                <div className="data">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Order ID</TableHeaderColumn>
                                <TableHeaderColumn>Placement time</TableHeaderColumn>
                                <TableHeaderColumn>Views</TableHeaderColumn>
                                <TableHeaderColumn>Clicks</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableRowColumn>{placement.id}</TableRowColumn>
                                <TableRowColumn>{placement.order_id}</TableRowColumn>
                                <TableRowColumn>{placement.placed_at}</TableRowColumn>
                                <TableRowColumn>{placement.views}</TableRowColumn>
                                <TableRowColumn>{placement.clicks}</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <AnalyticsView form="a"
                               heading="Clicks data"
                               id={params.id}
                               data={clicks}
                               methodsMapping={placementProvider.clicksMapping}
                               provider={placementProvider} />
                <AnalyticsView form="b"
                               heading="Views data"
                               id={params.id}
                               data={views}
                               methodsMapping={placementProvider.viewsMapping}
                               provider={placementProvider} />
            </div>
        ) : null;
    }
    
}


export default connect(
    state => ({
        placement: state.placements.object,
        views: state.placements.analyticsViews,
        clicks: state.placements.analyticsClicks
    }),
    dispatch => ({
        placementProvider: new PlacementProvider(dispatch)
    })
)(PlacementObject);
