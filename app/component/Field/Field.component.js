/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

/* eslint-disable react/require-default-props */
// Due complexity of propTypes, TODO: rearrange

/* eslint jsx-a11y/label-has-associated-control: 0 */
// Disabled due bug in `renderCheckboxInput` function

// todo fix text type

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Field.style';

const TEXT_TYPE = 'text';
const NUMBER_TYPE = 'number';
const RADIO_TYPE = 'radio';
const CHECKBOX_TYPE = 'checkbox';
const TEXTAREA_TYPE = 'textarea';
const PASSWORD_TYPE = 'password';

/**
 * Input fields component
 * @class Field
 */
class Field extends Component {
    constructor(props) {
        super(props);

        const {
            type,
            min,
            value: propsValue
        } = this.props;

        let value = propsValue;

        if (!propsValue) {
            switch (type) {
            case NUMBER_TYPE:
                if (value < min) value = min;
                value = 0;
                break;
            default:
                value = '';
                break;
            }
        }

        this.state = { value };

        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    /**
     * This allows to sync values if the component is controlled outside of the parent
     * For e.g. when we have two controlable fields on the screen which both share same prop value
     * @return {Object} state
     */
    static getDerivedStateFromProps(props, state) {
        const { value } = props;
        const { value: stateValue } = state;

        if (value !== stateValue) {
            return { value };
        }

        return null;
    }

    onChange(event) {
        this.handleChange(event.target.value);
    }

    onFocus(event) {
        const { onFocus } = this.props;

        if (onFocus) onFocus(event);
    }

    onKeyPress(event) {
        const { onKeyPress } = this.props;

        if (onKeyPress) onKeyPress(event);
    }

    onClick(event) {
        const { onClick } = this.props;

        if (onClick) onClick(event);
    }

    handleChange(value) {
        const {
            onChange,
            type,
            min
        } = this.props;

        switch (type) {
        case NUMBER_TYPE:
            const isValueNaN = Number.isNaN(parseInt(value, 10));
            if ((value < min || isValueNaN)) return;
            if (onChange) onChange(value);
            this.setState({ value });
            break;
        default:
            if (onChange) onChange(value);
            this.setState({ value });
        }
    }

    renderTextarea() {
        const {
            id,
            rows,
            isAutocompleteAllowed,
            formRef
        } = this.props;
        const { value } = this.state;

        return (
            <textarea
              ref={ formRef }
              id={ id }
              rows={ rows }
              value={ value }
              onChange={ this.onChange }
              onFocus={ this.onFocus }
              onClick={ this.onClick }
              autoComplete={ !isAutocompleteAllowed ? 'off' : undefined }
            />
        );
    }

    /**
     * Render Type Text, default value is passed from parent
     * handleToUpdate used to pass child data to parent
     */
    renderTypeText() {
        const {
            placeholder,
            id,
            isAutocompleteAllowed,
            formRef
        } = this.props;
        const { value } = this.state;

        return (
            <input
              ref={ formRef }
              type="text"
              id={ id }
              value={ value }
              onChange={ (this.onChange) }
              onFocus={ this.onFocus }
              onClick={ this.onClick }
              placeholder={ placeholder }
              autoComplete={ !isAutocompleteAllowed ? 'off' : undefined }
            />
        );
    }

    renderTypePassword() {
        const { placeholder, id, formRef } = this.props;
        const { value } = this.state;

        return (
            <input
              ref={ formRef }
              type="password"
              id={ id }
              value={ value }
              onChange={ this.onChange }
              onFocus={ this.onFocus }
              onClick={ this.onClick }
              placeholder={ placeholder }
            />
        );
    }

    renderTypeNumber() {
        const { id, formRef } = this.props;
        const { value } = this.state;

        return (
            <>
                <input
                  ref={ formRef }
                  type="number"
                  id={ id }
                  value={ value }
                  onChange={ this.onChange }
                  onKeyPress={ this.onKeyPress }
                  onFocus={ this.onFocus }
                  onClick={ this.onClick }
                />
                <button onClick={ () => this.handleChange(parseFloat(value) + 1) }>
                    <span>+</span>
                </button>
                <button onClick={ () => this.handleChange(parseFloat(value) - 1) }>
                    <span>–</span>
                </button>
            </>
        );
    }

    renderCheckbox() {
        const {
            id, formRef, value, checked, disabled, name
        } = this.props;

        return (
            <>
                <input
                  ref={ formRef }
                  id={ id }
                  type="checkbox"
                  checked={ checked }
                  disabled={ disabled }
                  name={ name }
                  value={ value }
                  onChange={ this.onChange }
                  onFocus={ this.onFocus }
                  onClick={ this.onClick }
                  onKeyPress={ this.onKeyPress }
                />
                <label htmlFor={ id } />
            </>
        );
    }

    renderRadioButtons() {
        const { formRef, radioOptions, id } = this.props;

        return (
            <fieldset onChange={ this.onChange } id={ id }>
                { radioOptions.map((radio) => {
                    const {
                        id: radioId, name, value, disabled, checked, label
                    } = radio;

                    return (
                        <React.Fragment key={ radioId }>
                            <label htmlFor={ radioId }>
                                <input
                                  ref={ formRef }
                                  type="radio"
                                  id={ radioId }
                                  name={ name }
                                  value={ value }
                                  disabled={ disabled }
                                  checked={ checked }
                                  onFocus={ this.onFocus }
                                  onClick={ this.onClick }
                                  onKeyPress={ this.onKeyPress }
                                />
                                <label htmlFor={ radioId } />
                                { label }
                            </label>
                        </React.Fragment>
                    );
                }) }
            </fieldset>
        );
    }

    renderInputOfType(type) {
        switch (type) {
        case CHECKBOX_TYPE:
            return this.renderCheckbox();
        case RADIO_TYPE:
            return this.renderRadioButtons();
        case NUMBER_TYPE:
            return this.renderTypeNumber();
        case TEXTAREA_TYPE:
            return this.renderTextarea();
        case PASSWORD_TYPE:
            return this.renderTypePassword();
        default:
            return this.renderTypeText();
        }
    }

    render() {
        const {
            id, type, label, note, message, state, block, elem
        } = this.props;

        const mix = (block && elem) ? { block, elem } : undefined;
        const mods = {
            type,
            hasError: !!message,
            ...(state ? { [state]: true } : {})
        };

        return (
            <div block="Field" mods={ mods } mix={ mix }>
                { label && <label htmlFor={ id }>{ label }</label> }
                { this.renderInputOfType(type) }
                { message && <p block="Field" elem="Message">{ message }</p> }
                { note && <p block="Field" elem="Note">{ note }</p> }
            </div>
        );
    }
}

Field.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        TEXT_TYPE,
        NUMBER_TYPE,
        TEXTAREA_TYPE,
        PASSWORD_TYPE,
        RADIO_TYPE,
        CHECKBOX_TYPE
    ]).isRequired,
    label: PropTypes.string,
    note: PropTypes.string,
    message: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ]),
    state: PropTypes.string,
    rows: PropTypes.number,
    name: PropTypes.string,
    checked: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),
    disabled: PropTypes.bool,
    radioOptions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            checked: PropTypes.bool,
            disabled: PropTypes.bool,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
            label: PropTypes.string
        })
    ),
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onClick: PropTypes.func,
    onKeyPress: PropTypes.func,
    min: PropTypes.number,
    block: PropTypes.string,
    elem: PropTypes.string,
    formRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    isAutocompleteAllowed: PropTypes.bool
};

Field.defaultProps = {
    rows: 4,
    min: 0,
    block: null,
    elem: null,
    disabled: false
};

export default Field;
