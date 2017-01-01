import React, { Component, PropTypes } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { reduxForm, Field } from 'redux-form';
import { SelectField } from 'redux-form-material-ui';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';
import '../styles/AnalyticsView.css';


class AnalyticsView extends Component {

    static propTypes = {
        heading: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
        methodsMapping: PropTypes.object.isRequired,
        provider: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { period: 'year', ranges: props.provider.getRanges() };
        this.recalculateData = this.recalculateData.bind(this);
        this.recalculateTimeRanges = this.recalculateTimeRanges.bind(this);
    }

    componentDidMount() {
        const { id, methodsMapping } = this.props;
        methodsMapping[this.state.period](id);
    }

    recalculateData(values) {
        const { id } = this.props;
        this.props.methodsMapping[this.state.period](id, values.year, values.month, values.day);
    }

    recalculateTimeRanges(values) {
        const { provider } = this.props;
        this.setState({ ...this.state, ranges: provider.getRanges(values.year, values.month) });
    }

    render() {
        const { handleSubmit, data, heading } = this.props;
        const { period, ranges } = this.state;

        return (
            <div className="analytics-view">
                <h3>{heading}</h3>

                <div className="analytics-view-radios">
                    <RadioButtonGroup onChange={(event, value) => this.setState({...this.state, period: value})} name="period" defaultSelected="year">
                        <RadioButton className="period-radio" value="year" label="year" />
                        <RadioButton className="period-radio" value="month" label="month" />
                        <RadioButton className="period-radio" value="day" label="day" />
                    </RadioButtonGroup>
                </div>

                <div className="analytics-view-selects">
                    <Field name="year"
                           component={SelectField}
                           onChange={handleSubmit(this.recalculateTimeRanges)}
                           hintText="Year"
                           className="form-field select-field period-select">
                    {
                        ranges.year.map((y, i) => <MenuItem key={i} value={y} primaryText={y} />)
                    }
                    </Field>
                    <Field disabled={period === 'year'}
                           name="month"
                           component={SelectField}
                           onChange={handleSubmit(this.recalculateTimeRanges)}
                           hintText="Month"
                           className="form-field select-field period-select">
                    {
                        ranges.month.map((m, i) => <MenuItem key={i} value={m} primaryText={m} />)
                    }
                    </Field>
                    <Field disabled={period === 'year' || period === 'month'}
                           name="day"
                           component={SelectField}
                           onChange={handleSubmit(this.recalculateTimeRanges)}
                           hintText="Day"
                           className="form-field select-field period-select">
                    {
                        ranges.day.map((d, i) => <MenuItem key={i} value={d} primaryText={d} />)
                    }
                    </Field>
                </div>

                <RaisedButton onClick={handleSubmit(this.recalculateData)} primary={true} label="Recalculate" className="recalc-btn" />

                <BarChart width={700} height={300} data={data}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip label="tooltip" />
                    <Legend />
                    <Bar dataKey="value" />
                </BarChart>
            </div>
        );
    }

}


export default reduxForm({})(AnalyticsView);
