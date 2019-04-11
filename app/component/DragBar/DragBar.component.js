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

        this.dragBarRef = React.createRef();
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDrag = this.onDrag.bind(this);
    }

    onDrag({ translateY }) {
        if (translateY < 0) {
            CSS.setVariable(this.dragBarRef, 'draggable-y', `${-translateY}px`);
        }
    }

    onDragEnd(state, callback) {
        const { translateY } = state;

        if (translateY > -150) {
            callback({
                originalY: 0,
                lastTranslateY: 0
            });

            CSS.setVariable(this.dragBarRef, 'open-bounce-speed', '500ms');
            CSS.setVariable(this.dragBarRef, 'draggable-y', '0');
        } else {
            const screenSize = document.getElementsByTagName('main')[0].clientHeight;

            callback({
                originalY: 0,
                lastTranslateY: screenSize
            });

            CSS.setVariable(this.dragBarRef, 'open-bounce-speed', '0');
            CSS.setVariable(this.dragBarRef, 'draggable-y', `${window.innerHeight - 240}px`);
        }
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
                        <button block="DragBar" elem="CTA">Add to cart</button>
                    </header>
                    <p>We are wrapping the children with a simple Div (styled-components) that gets from the state the x and y translation. We are also passing an indication for dragging and adding a mouse event that will let us do the magic.</p>
                </Draggable>
            </article>
        );
    }
}

export default DragBar;
