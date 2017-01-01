import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { TextField } from 'redux-form-material-ui';
import '../styles/Create.css';


class CreateAdvert extends Component {

    static propTypes = {
        advertProvider: PropTypes.object.isRequired
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
    }

    hideModal() {
        this.setState({ modalShown: false });
    }

    onSubmit(values) {
        const { advertProvider } = this.props;
        return advertProvider.create(values)
            .then(() => advertProvider.getList())
            .then(() => this.hideModal())
            .catch(errors => {
                throw new SubmissionError(errors);
            });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
          <div>
              <RaisedButton label="Post new advert" primary={true} onClick={this.showModal} className="create-btn" />
              {
                  this.state.modalShown && (
                      <Dialog title="Create new advert" open={this.state.modalShown} modal={true} actions={[
                          <RaisedButton className="create-action-btn"
                                        label="Create ad"
                                        primary={true}
                                        onClick={handleSubmit(this.onSubmit)} />,
                          <RaisedButton className="create-action-btn"
                                        label="Cancel"
                                        onClick={this.hideModal} />
                      ]}>
                          <Field name="follow_url_link"
                                 component={TextField}
                                 floatingLabelText="Follow url link"
                                 className="form-field" />
                          <Field name="heading_picture"
                                 component={TextField}
                                 floatingLabelText="Heading picture"
                                 className="form-field" />
                          <Field name="description"
                                 component={TextField}
                                 floatingLabelText="Description"
                                 className="form-field" />
                      </Dialog>
                  )
              }
          </div>
        );
    }

}


export default reduxForm({ form: 'create-advert' })(CreateAdvert);
