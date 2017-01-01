import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { SelectField } from 'redux-form-material-ui';
import '../styles/Create.css';


class CreatePlacement extends Component {

    static propTypes = {
        placementProvider: PropTypes.object.isRequired,
        advertProvider: PropTypes.object.isRequired,
        adverts: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { modalShown: false };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    showModal() {
        this.setState({ modalShown: true });
        this.props.advertProvider.getList();
    }

    hideModal() {
        this.setState({ modalShown: false });
    }

    onSubmit(values) {
        const { placementProvider } = this.props;
        return placementProvider.create(values)
            .then(() => placementProvider.getList())
            .then(() => this.hideModal())
            .catch(errors => {
                throw new SubmissionError(errors)
            });
    }

    render() {
        const { handleSubmit, adverts } = this.props;

        return (
            <div>
                <RaisedButton label="Place advert" primary={true} onClick={this.showModal} className="create-btn" />
                {
                    this.state.modalShown && (
                        <Dialog title="Create new placement" open={this.state.modalShown} modal={true} actions={[
                            <RaisedButton className="create-action-btn"
                                          label="Place advert"
                                          primary={true}
                                          onClick={handleSubmit(this.onSubmit)} />,
                            <RaisedButton className="create-action-btn"
                                          label="Cancel"
                                          onClick={this.hideModal} />
                        ]}>
                            <Field name="order_id" component={SelectField} hintText="Advert order" className="form-field select-field">
                                {
                                    adverts.map(adv => <MenuItem key={adv.id} value={adv.id} primaryText={adv.follow_url_link} />)
                                }
                            </Field>
                        </Dialog>
                    )
                }
            </div>
        );
    }

}


export default reduxForm({
    form: 'place-advert-order'
})(CreatePlacement);
