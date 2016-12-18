import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


class AdProviderSignup extends Component {

    static propTypes = {
        authProvider: PropTypes.object.isRequired
    }

    onSubmit(values) {
        this.props.authProvider.signupAdProvider(values);
    }

    render() {
        const { invalid, submitting, handleSubmit } = this.props;

        return (
            <form className="form">
                <Field name="email" component={TextField} floatingLabelText="Email" className="form-field" />
                <Field name="password" component={TextField} floatingLabelText="Password" type="password" className="form-field" />
                <Field name="first_name" component={TextField} floatingLabelText="First name" className="form-field" />
                <Field name="last_name" component={TextField} floatingLabelText="Last name" className="form-field" />
                <div className="form-btn-container">
                    <RaisedButton label="Sign Up"
                                  type="submit"
                                  primary={true}
                                  onClick={handleSubmit(this.onSubmit.bind(this))}
                                  disabled={invalid || submitting}
                                  className="form-btn" />
                    <Link to="/anon/login">
                        <FlatButton label="Already have an account?" className="form-btn form-btn-muted" />
                    </Link>
                </div>
            </form>
        );
    }

}


export default reduxForm({
    form: 'ad-provider-signup'
})(AdProviderSignup);
