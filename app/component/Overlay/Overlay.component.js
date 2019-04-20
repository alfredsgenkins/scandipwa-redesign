import React, { Component } from 'react';
import './Overlay.style';

class Overlay extends Component {
    render() {
        const { children } = this.props;

        return (
            <article block="Overlay" mods={ {  } }>
                { children }
            </article>
        );
    }
}

export default Overlay;
