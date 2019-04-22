import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const RADIO_TYPE = 'radio';
export const CHECKBOX_TYPE = 'checkbox';

class SelectableInput extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onChange(event) {
        const { onChange } = this.props;

        if (onChange) onChange(event);
    }

    onFocus(event) {
        const { onFocus } = this.props;

        if (onFocus) onFocus(event);
    }

    onClick(event) {
        const { onClick } = this.props;

        if (onClick) onClick(event);
    }

    onKeyPress(event) {
        const { onKeyPress } = this.props;

        if (onKeyPress) onKeyPress(event);
    }

    renderCheckboxInput() {
        const {
            id, name, value, formRef, checked, disabled, label
        } = this.props;

        return (
            <>
                <input
                  ref={ formRef }
                  type="checkbox"
                  checked={ checked }
                  disabled={ disabled }
                  name={ name }
                  value={ value }
                  onChange={ this.onChange }
                  onFocus={ this.onFocus }
                  onClick={ this.onClick }
                  onKeyPress={ this.onKeyPress }
                  id={ id }
                />
                <label htmlFor={ id }>{ label }</label>
            </>
        );
    }

    renderRadioButtons() {
        const {
            formRef, radioOptions
        } = this.props;

        return (
            <fieldset onChange={ this.onChange }>
                { radioOptions.map((radio) => {
                    const {
                        id, name, value, disabled, checked, label
                    } = radio;

                    return (
                        <React.Fragment key={ id }>
                            <input
                              ref={ formRef }
                              type="radio"
                              id={ id }
                              name={ name }
                              value={ value }
                              disabled={ disabled }
                              checked={ checked }
                              onFocus={ this.onFocus }
                              onClick={ this.onClick }
                              onKeyPress={ this.onKeyPress }
                            />
                            <label htmlFor={ id }>{ label }</label>
                        </React.Fragment>
                    );
                }) }
            </fieldset>
        );
    }

    /* eslint-disable consistent-return */
    renderSelectableInputOfType(type) {
        switch (type) {
        case RADIO_TYPE:
            return this.renderRadioButtons();
        case CHECKBOX_TYPE:
            return this.renderCheckboxInput();
        default:
            break;
        }
    }

    render() {
        const { type } = this.props;

        return (
            <div block="SelectableInput" mods={ { type } }>
                { this.renderSelectableInputOfType(type) }
            </div>
        );
    }
}

SelectableInput.propTypes = {
    id: PropTypes.string,
    type: PropTypes.oneOf([
        RADIO_TYPE,
        CHECKBOX_TYPE
    ]).isRequired,
    name: PropTypes.string,
    value: PropTypes.bool,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    radioOptions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            checked: PropTypes.bool,
            disabled: PropTypes.bool,
            value: PropTypes.string.isRequired,
            label: PropTypes.string
        })
    ),
    formRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyPress: PropTypes.func
};

SelectableInput.defaultProps = {
    id: '',
    name: '',
    value: false,
    checked: false,
    disabled: false,
    formRef: null,
    radioOptions: [],
    label: '',
    onChange: () => {},
    onClick: () => {},
    onFocus: () => {},
    onKeyPress: () => {}
};

export default SelectableInput;
