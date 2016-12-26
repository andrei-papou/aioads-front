import React, { Component, PropTypes } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { reduxForm, Field } from 'redux-form';
import { SelectField } from 'redux-form-material-ui';


class AnalyticsView extends Component {

    static propTypes = {
        methodsMapping: PropTypes.object.isRequired,
        ranges: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { period: 'year' };
        this.recalculateData = this.recalculateData.bind(this);
    }

    recalculateData(values) {
        this.props.methodsMapping[this.periods.value](
            values.year,
            values.month,
            values.day
        );
    }

    render() {
        const { ranges, handleSubmit } = this.props;
        const { period } = this.state;

        return (
            <div>
                <div>
                    <RadioButtonGroup ref={el => this.periods = el} name="period" defaultSelected="year">
                        <RadioButton value="year" label="year" />
                        <RadioButton value="month" label="month" />
                        <RadioButton value="day" label="day" />
                    </RadioButtonGroup>
                </div>
                <div>
                    <Field name="year" onChange={handleSubmit(this.recalculateData)} component={SelectField} hintText="Year" className="form-field select-field">
                    {
                        ranges.year.map((y, i) => <MenuItem key={i} value={y} primaryText={y} />)
                    }
                    </Field>
                    <Field disabled={period === 'year'} name="month" component={SelectField} hintText="Month" className="form-field select-field">
                    {
                        ranges.month.map((m, i) => <MenuItem key={i} value={m} primaryText={m} />)
                    }
                    </Field>
                    <Field disabled={period === 'year' || period === 'month'} name="day" component={SelectField} hintText="Day" className="form-field select-field">
                    {
                        ranges.days.map((d, i) => <MenuItem key={i} value={d} primaryText={d} />)
                    }
                    </Field>
                </div>
            </div>
        );
    }

}


export default reduxForm({
    form: 'analyticsView'
})(AnalyticsView);
