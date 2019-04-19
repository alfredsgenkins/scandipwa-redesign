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
import Slider from 'Component/Slider';
import './ProductPage.style';

class ProductPage extends Component {
    render() {
        return (
            <main block="ProductPage">
                <Slider showCrumbs>
                    <img alt="0" src="/public/img/0.jpg" />
                    <img alt="1" src="/public/img/1.jpg" />
                    <img alt="2" src="/public/img/2.jpg" />
                    <img alt="3" src="/public/img/3.jpg" />
                    <img alt="5" src="/public/img/5.jpg" />
                </Slider>
                <p>n the below example I have a grid container of 500 pixels by 500 pixels. I have defined 3 row and column tracks each of 100 pixels with a 10 pixel gutter. This means that there is space inside the grid container both in the block and inline directions.</p>
                <p>n the below example I have a grid container of 500 pixels by 500 pixels. I have defined 3 row and column tracks each of 100 pixels with a 10 pixel gutter. This means that there is space inside the grid container both in the block and inline directions.</p>
                <p>n the below example I have a grid container of 500 pixels by 500 pixels. I have defined 3 row and column tracks each of 100 pixels with a 10 pixel gutter. This means that there is space inside the grid container both in the block and inline directions.</p>
                <Slider isVertical showCrumbs>
                    <img alt="0" src="/public/img/0.jpg" />
                    <img alt="1" src="/public/img/1.jpg" />
                    <img alt="2" src="/public/img/2.jpg" />
                    <img alt="3" src="/public/img/3.jpg" />
                    <img alt="5" src="/public/img/5.jpg" />
                </Slider>
                <p>n the below example I have a grid container of 500 pixels by 500 pixels. I have defined 3 row and column tracks each of 100 pixels with a 10 pixel gutter. This means that there is space inside the grid container both in the block and inline directions.</p>
                <p>n the below example I have a grid container of 500 pixels by 500 pixels. I have defined 3 row and column tracks each of 100 pixels with a 10 pixel gutter. This means that there is space inside the grid container both in the block and inline directions.</p>
            </main>
        );
    }
}

export default ProductPage;
