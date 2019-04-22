import React, { Component } from 'react';
import Overlay from 'Component/Overlay';
import Store from 'Store';
import { changeHeaderState } from 'Store/Header';
import './MenuOverlay.style';

class MenuOverlay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSubcategory: null
        };
    }

    showSubCategory(activeSubcategory) {
        this.setState({ activeSubcategory });
        Store.dispatch(changeHeaderState({
            name: 'menu_subcategory',
            title: activeSubcategory,
            onBackClick: () => this.setState({ activeSubcategory: null })
        }));
    }

    render() {
        const { activeSubcategory } = this.state;

        console.log(activeSubcategory);
        return (
            <Overlay
              id="menu"
              mix={ { block: 'MenuOverlay' } }
            >
                <nav block="MenuOverlay" elem="Wrapper" mods={ { isSubCategoryVisible: !!activeSubcategory } }>
                    <ul block="MenuOverlay" elem="Menu">
                        <li>
                            <button onClick={ () => this.showSubCategory('new category') }>
                                New in
                            </button>
                        </li>
                        <li>Man</li>
                        <li>Woman</li>
                        <li>Accessories</li>
                    </ul>
                    <ul
                      block="MenuOverlay"
                      elem="Menu"
                      mods={ {
                          isVisible: !!activeSubcategory,
                          isSubCategory: true
                      } }
                    >
                        <li>Test</li>
                        <li>Test 1</li>
                        <li>Test 2</li>
                    </ul>
                </nav>
            </Overlay>
        );
    }
}

export default MenuOverlay;
