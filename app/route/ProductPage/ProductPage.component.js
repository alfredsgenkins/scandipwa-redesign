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
import DragBar from 'Component/DragBar/DragBar.component';
import Form from 'Component/Form';
import Field from 'Component/Field';
import './ProductPage.style';

class ProductPage extends Component {
    render() {
        return (
            <main block="ProductPage">
                <DragBar />
                <Form>
                    <Field
                      type="radio"
                      id="1"
                      label="hello"
                      radioOptions={ [
                          {
                              id: '2',
                              name: 'r',
                              value: 'xd',
                              label: 'xd'
                          }
                      ] }
                    />
                    <Field
                      type="checkbox"
                      id="2"
                    />
                </Form>
            </main>
        );
    }
}

export default ProductPage;
