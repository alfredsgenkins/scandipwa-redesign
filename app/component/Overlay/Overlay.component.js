import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Overlay.style';

class Overlay extends Component {
    showOverlay(key) {
        const { showOverlay } = this.props;
        showOverlay(key);
    }

    render() {
        const {
            children,
            mix,
            activeOverlay,
            id
        } = this.props;

        const isVisible = id === activeOverlay;
        const mixProp = { ...mix, mods: { ...mix.mods, isVisible } };

        return (
            <div block="Overlay" mods={ { isVisible } } mix={ mixProp }>
                { children }
            </div>
        );
    }
}

Overlay.propTypes = {
    mix: PropTypes.objectOf(PropTypes.string),
    id: PropTypes.string.isRequired,
    activeOverlay: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

Overlay.defaultProps = {
    mix: {}
};

export default Overlay;
