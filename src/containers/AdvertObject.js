import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import AdvertProvider from '../providers/advert-provider';
import '../styles/AdvertObject.css';


class AdvertObject extends Component {

    static propTypes = {
        advertProvider: PropTypes.object.isRequired,
        advert: PropTypes.object.isRequired
    };

    componentDidMount() {
        const { params, advertProvider } = this.props;
        advertProvider.getObject(params.id);
    }

    render() {
        const { advert } = this.props;
        console.log(advert);

        return (
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableRowColumn>{advert.id}</TableRowColumn>
                            <TableRowColumn>{advert.description}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }

}


export default connect(
    state => ({
        advert: state.adverts.object
    }),
    dispatch => ({
        advertProvider: new AdvertProvider(dispatch)
    })
)(AdvertObject);
