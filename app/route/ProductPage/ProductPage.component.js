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
import Header, {
    PDP,
    CATEGORY,
    CUSTOMER_ACCOUNT,
    HOME_PAGE
} from 'Component/Header';
import './ProductPage.style';

class ProductPage extends Component {
    constructor(props) {
        super(props);

        this.states = [
            PDP, CATEGORY, CUSTOMER_ACCOUNT, HOME_PAGE
        ];
        this.state = { current: 0 };
        this.changeHeaderType = this.changeHeaderType.bind(this);
    }

    changeHeaderType() {
        const { current } = this.state;
        this.setState({ current: this.states.length - 1 <= current ? 0 : current + 1 });
    }

    render() {
        const { current } = this.state;

        return (
            <main block="ProductPage">
                <Header state={ this.states[current] } />
                <button onClick={ this.changeHeaderType }> Toggle header state </button>
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
