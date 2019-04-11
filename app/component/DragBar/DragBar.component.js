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

import React, { Component } from 'react';
import './DragBar.style';
import Draggable from '../Draggable/Draggable.component';
import CSS from '../../util/CSS/CSS';

class DragBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            areDetailsOpen: false
        };

        this.dragBarRef = React.createRef();
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDrag = this.onDrag.bind(this);
    }

    componentDidMount() {
        this._setWindowHeight();
    }

    onDrag({ translateY }) {
        const { areDetailsOpen } = this.state;
        const windowHeight = window.innerHeight - 240;

        // Update window heigh according to elements on the screen
        this._setWindowHeight();

        if (!areDetailsOpen && translateY < 0) {
            CSS.setVariable(this.dragBarRef, 'draggable-y', `${-translateY}px`);
        } else if (areDetailsOpen && translateY > 150) {
            CSS.setVariable(this.dragBarRef, 'draggable-y', `${ windowHeight - translateY }px`);
        }
    }

    onDragEnd(state, callback) {
        const screenSize = document.getElementsByTagName('main')[0].clientHeight;
        const { areDetailsOpen } = this.state;
        const { translateY } = state;

        // Update window heigh according to elements on the screen
        this._setWindowHeight();

        if (!areDetailsOpen) {
            if (translateY > -150) {
                // details are close and drag is higher than -150px => we close it back
                callback({
                    originalY: 0,
                    lastTranslateY: 0
                });

                CSS.setVariable(this.dragBarRef, 'open-bounce-speed', '500ms');
                CSS.setVariable(this.dragBarRef, 'draggable-y', '0');
            } else {
                // details are closed, but drag is lower than -150px => we open it completely
                callback({
                    originalY: 0,
                    lastTranslateY: screenSize
                });

                this.setState({ areDetailsOpen: true });

                CSS.setVariable(this.dragBarRef, 'open-bounce-speed', '0');
                CSS.setVariable(this.dragBarRef, 'draggable-y', `${window.innerHeight - 240}px`);
            }
        } else if (translateY > 150) {
            // details are open and drag is higher than 150px => we close it
            callback({
                originalY: 0,
                lastTranslateY: 0
            });

            this.setState({ areDetailsOpen: false });

            CSS.setVariable(this.dragBarRef, 'open-bounce-speed', '500ms');
            CSS.setVariable(this.dragBarRef, 'draggable-y', '0');
        } else {
            // details are open and drag is lower than 150px => we open it back
            callback({
                originalY: 0,
                lastTranslateY: screenSize
            });

            CSS.setVariable(this.dragBarRef, 'open-bounce-speed', '0');
            CSS.setVariable(this.dragBarRef, 'draggable-y', `${window.innerHeight - 240}px`);
        }
    }

    _setWindowHeight() {
        CSS.setVariable(this.dragBarRef, 'window-height', `${window.innerHeight - 240}px`);
    }

    render() {
        return (
            <article block="DragBar">
                <Draggable
                  onDrag={ this.onDrag }
                  onDragEnd={ this.onDragEnd }
                  draggableRef={ this.dragBarRef }
                  mix={ {
                      block: 'DragBar',
                      elem: 'Draggable'
                  } }
                >
                    <header block="DragBar" elem="Header">
                        <h1 block="DragBar" elem="Heading">TEXTURED WEAVE BERMUDA SHORTS</h1>
                        <span aria-label="Product price" block="DragBar" elem="Price">29.95 EUR</span>
                        <button block="DragBar" elem="CTA" onClick={ () => alert('added to cart') }>Add to cart</button>
                    </header>
                    <div block="DragBar" elem="Details">
                        <p>We are wrapping the children with a simple Div (styled-components) that gets from the state the x and y translation. We are also passing an indication for dragging and adding a mouse event that will let us do the magic.</p>
                        <p>We are wrapping the children with a simple Div (styled-components) that gets from the state the x and y translation. We are also passing an indication for dragging and adding a mouse event that will let us do the magic.</p>
                        <p>We are wrapping the children with a simple Div (styled-components) that gets from the state the x and y translation. We are also passing an indication for dragging and adding a mouse event that will let us do the magic.</p>
                        <p>We are wrapping the children with a simple Div (styled-components) that gets from the state the x and y translation. We are also passing an indication for dragging and adding a mouse event that will let us do the magic.</p>
                    </div>
                </Draggable>
            </article>
        );
    }
}

export default DragBar;
