import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import AdvertProvider from '../providers/advert-provider';
import AnalyticsView from '../components/AnalyticsView';
import '../styles/AdvertObject.css';


class AdvertObject extends Component {

    static propTypes = {
        advertProvider: PropTypes.object.isRequired,
        advert: PropTypes.object.isRequired,
        clicks: PropTypes.array.isRequired,
        views: PropTypes.array.isRequired
    };

    componentDidMount() {
        const { params, advertProvider } = this.props;
        advertProvider.getObject(params.id);
    }

    render() {
        const { advert, clicks, views, advertProvider, params } = this.props;
        const ranges = advertProvider.getRanges();

        return advert ? (
            <div className="advert-object">
                <h3>{`Advert #${advert.id} details`}</h3>
                <p>
                    {`
                        Below is the main info about advert whose id is ${advert.id}.
                        Its analytics and general data is presented below.
                    `}
                </p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Description</TableHeaderColumn>
                            <TableHeaderColumn>Follow url link</TableHeaderColumn>
                            <TableHeaderColumn>Heading picture</TableHeaderColumn>
                            <TableHeaderColumn>Views</TableHeaderColumn>
                            <TableHeaderColumn>Clicks</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableRowColumn>{advert.id}</TableRowColumn>
                            <TableRowColumn>{advert.description}</TableRowColumn>
                            <TableRowColumn>{advert.follow_url_link}</TableRowColumn>
                            <TableRowColumn>{advert.heading_picture}</TableRowColumn>
                            <TableRowColumn>{advert.views}</TableRowColumn>
                            <TableRowColumn>{advert.clicks}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>

                <AnalyticsView id={params.id} data={clicks} methodsMapping={advertProvider.clicksMapping} ranges={ranges} />
            </div>
        ) : null;
    }

}


export default connect(
    state => ({
        advert: state.adverts.object,
        clicks: state.adverts.analyticsClicks,
        views: state.adverts.analyticsViews
    }),
    dispatch => ({
        advertProvider: new AdvertProvider(dispatch)
    })
)(AdvertObject);
