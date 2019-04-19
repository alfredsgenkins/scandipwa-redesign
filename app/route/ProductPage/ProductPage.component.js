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
import Header from 'Component/Header';
import './ProductPage.style';

class ProductPage extends Component {
    render() {
        return (
            <main block="ProductPage">
                <Header />
                <Slider>
                    { Array(5).fill().map((_, i) => (
                        <img
                          key={ i }
                          alt={ i }
                          src={ `/public/img/${i}.jpg` }
                        />
                    )) }
                </Slider>
            </main>
        );
    }
}

export default ProductPage;
