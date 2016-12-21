import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import PublicIcon from 'material-ui/svg-icons/social/public';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import { TextField, SelectField } from 'redux-form-material-ui';
import { UserTypes } from '../config';
import { check, required, email, password } from '../utils/validation';
import '../styles/Form.css';


const validate = values => {
    const errors = {};

    errors.email = check(values.email, required, email);
    errors.password = check(values.password, required, password);
    errors.user_type = check(values.user_type, required);

    return errors;
};


class Login extends Component {

    static propTypes = {
        authProvider: PropTypes.object.isRequired
    };

    onSubmit(values) {
        return this.props.authProvider.login(values).catch(errors => {
            throw new SubmissionError(errors);
        });
    }

    render() {
        const { handleSubmit, invalid, submitting } = this.props;

        return (
            <div>
                <AppBar iconElementLeft={<IconButton><PublicIcon /></IconButton>} title="Login" />
                <form className="form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="email" component={TextField} floatingLabelText="Email" className="form-field" />
                    <Field name="password" component={TextField} floatingLabelText="Password" type="password" className="form-field" />
                    <Field name="user_type" component={SelectField} hintText="Account type" className="form-field select-field">
                        <MenuItem value={UserTypes.PROVIDER} primaryText="Advert provider" />
                        <MenuItem value={UserTypes.PLACER} primaryText="Advert placer" />
                    </Field>
                    <div className="form-btn-container">
                        <RaisedButton label="Login"
                                      type="submit"
                                      primary={true}
                                      disabled={invalid || submitting}
                                      className="form-btn" />
                        <Link to="/anon/signup">
                            <FlatButton label="Don't have an account?" className="form-btn form-btn-muted" />
                        </Link>
                    </div>
                </form>
            </div>
        );
    }

}


export default reduxForm({
    form: 'login',
    validate
})(Login);
