import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


class AdPlacerSignup extends Component {

    render() {
        const { invalid, submitting } = this.props;

        return (
            <form className="form">
                <Field name="email" component={TextField} floatingLabelText="Email" className="form-field" />
                <Field name="password" component={TextField} floatingLabelText="Password" type="password" className="form-field" />
                <Field name="website" component={TextField} floatingLabelText="Website" className="form-field" />
                <Field name="visitors_per_day_count" component={TextField} floatingLabelText="Visitors per day count" type="number" className="form-field" />
                <div className="form-btn-container">
                    <RaisedButton label="Sing Up"
                                  type="submit"
                                  primary={true}
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
    form: 'ad-placer-signup'
})(AdPlacerSignup);
