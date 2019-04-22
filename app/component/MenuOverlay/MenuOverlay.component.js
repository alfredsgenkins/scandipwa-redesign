import React, { Component } from 'react';
import Overlay from 'Component/Overlay';
import Store from 'Store';
import { toggleOverlayByKey } from 'Store/Overlay';
import { changeHeaderState } from 'Store/Header';
import './MenuOverlay.style';

class MenuOverlay extends Component {
    showSubCategory() {
        Store.dispatch(changeHeaderState({ name: 'menu_subcategory' }));
    }

    render() {
        return (
            <Overlay id="menu" mix={ { block: 'MenuOverlay' } }>
                <ul>
                    <li onClick={ () => this.showSubCategory() }>New in</li>
                    <li>Man</li>
                    <li>Woman</li>
                    <li>Accessories</li>
                </ul>
            </Overlay>
        );
    }
}

export default MenuOverlay;
