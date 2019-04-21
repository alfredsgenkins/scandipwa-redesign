import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Overlay.style';

class Overlay extends Component {
    render() {
        const { children, mods, activeOverlay, key } = this.props;
        const isVisible = key === activeOverlay;

        return (
            <article block="Overlay" mods={ { isVisible: false, ...mods } }>
                { children }
            </article>
        );
    }
}

Overlay.propTypes = {
    mods: PropTypes.objectOf(PropTypes.string),
    key: PropTypes.string.isRequired,
    activeOverlay: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

Overlay.defaultProps = {
    mods: {}
};

export default Overlay;
