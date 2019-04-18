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

import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'Component/Draggable';
import CSS from 'Util/CSS';
import './Slider.style';

/**
 * Slider component
 * @class Slider
 */
class Slider extends Component {
    constructor(props) {
        super(props);

        this.prevPosition = 0;
        this.draggableRef = React.createRef();
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
    }

    getFullSliderWidth() {
        const sliderWidth = this.draggableRef.current.offsetWidth;
        const fullSliderWidth = this.draggableRef.current.scrollWidth;
        return fullSliderWidth - sliderWidth;
    }

    calculateNextSlide({ translateX, lastTranslateX }) {
        const sliderWidth = this.draggableRef.current.offsetWidth;
        const fullSliderWidth = this.getFullSliderWidth();
        const activeSlidePosition = translateX / sliderWidth;
        const activeSlidePercent = Math.abs(activeSlidePosition % 1);
        const isSlideBack = translateX > lastTranslateX;

        if (translateX > 0) {
            return Math.floor(activeSlidePosition);
        }

        if (translateX < -fullSliderWidth) {
            return Math.ceil(activeSlidePosition);
        }

        if (isSlideBack && activeSlidePercent < 0.90) {
            return Math.ceil(activeSlidePosition);
        }

        if (!isSlideBack && activeSlidePercent > 0.10) {
            return Math.floor(activeSlidePosition);
        }

        return Math.round(activeSlidePosition);
    }

    handleDragStart() {
        CSS.setVariable(this.draggableRef, 'animation-speed', '0');
    }

    handleDrag(state) {
        const { translateY, translateX } = state;
        const fullSliderWidth = this.getFullSliderWidth();

        if (translateX < 0 && translateX > -fullSliderWidth) {
            CSS.setVariable(this.draggableRef, 'translateX', `${translateX}px`);
        }
    }

    handleDragEnd(state, callback) {
        const { translateX, translateY } = state;
        const activeSlide = this.calculateNextSlide(state);
        const sliderWidth = this.draggableRef.current.offsetWidth;
        const newTranslateX = activeSlide * sliderWidth;

        CSS.setVariable(this.draggableRef, 'animation-speed', '300ms');
        CSS.setVariable(this.draggableRef, 'translateX', `${newTranslateX}px`);

        callback({
            originalX: newTranslateX,
            originalY: translateY,
            lastTranslateX: newTranslateX,
            lastTranslateY: translateY
        });
    }

    renderSlide(slide) {
        // console.log(slide);

        return slide;
    }

    renderSlides() {
        const { children } = this.props;
        return Children.map(children, child => this.renderSlide(child));
    }

    render() {
        return (
            <div block="Slider">
                <Draggable
                  mix={ { block: 'Slider', elem: 'Wrapper' } }
                  draggableRef={ this.draggableRef }
                  onDragStart={ this.handleDragStart }
                  onDragEnd={ this.handleDragEnd }
                  onDrag={ this.handleDrag }
                >
                    { this.renderSlides() }
                </Draggable>
            </div>
        );
    }
}

Slider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
};

Slider.defaultProps = {
    
};

export default Slider;
