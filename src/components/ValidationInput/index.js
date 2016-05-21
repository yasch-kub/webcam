import React, { PropTypes } from 'react'

import validator from 'validator'
import { TextField } from 'material-ui'

export default class ValidationInput extends React.Component {

    state = {
        errors: []
    };

    static propTypes = {
        onValid: PropTypes.func,
        onChange: PropTypes.func,
        min: PropTypes.number,
        max: PropTypes.number,
        isRequired: PropTypes.bool,
        isEmail: PropTypes.bool
    };

    validateInput(e) {
        let errors = this.validate(e.target.value);
        if (this.props.onValid && errors.length === 0)
            this.props.onValid();
        this.setState({
            errors
        });
    }

    validate(value) {
        let errors = [], {
            isEmail = null,
            isRequired = null,
            min = null,
            max = null
        } = this.props;

        console.log(validator.isNull(value));
        if (isRequired && validator.isNull(value))
            errors.push('Field is required');

        if (isEmail && !validator.isEmail(value))
            errors.push('Not valid email');

        if (min && !validator.isLength(value, {min, max: undefined}))
            errors.push(`Too short. Min length is ${min}`);

        if (max && !validator.isLength(value, {max, min: undefined}))
            errors.push(`Too large. Max length is ${max}`);

        return errors;
    }

    render() {
        let errors = this.state.errors.map((error, i) => <div key = {i}> {error} <br /> </div> );
        if (errors.length === 0) errors = null;

        return (
            <TextField
                {...this.props}
                onBlur = {::this.validateInput}
                errorText = {errors}
            />
        );
    }
}