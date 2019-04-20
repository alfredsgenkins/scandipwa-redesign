import React, { Component } from 'react';
import './Header.style';

const PDP = 'pdp';
const CATEGORY = 'category';
const CUSTOMER_ACCOUNT = 'customer_account';
const HOME_PAGE = 'home';

class Header extends Component {
    constructor(props) {
        super(props);

        this.stateMap = {
            [PDP]: {
                navigation: true,
                title: true,
                minicart: true
            },
            [CATEGORY]: {
                navigation: true,
                search: true,
                title: true,
                minicart: true
            },
            [CUSTOMER_ACCOUNT]: {
                navigation: true,
                title: true
            },
            [HOME_PAGE]: {
                navigation: true,
                search: true,
                title: true,
                account: true,
                minicart: true
            }
        };

        this.renderHeaderState = this.renderHeaderState.bind(this);
    }

    renderNavigationButton(visible) {
        const navigationButton = 'close'; // REDUX
        let closeMods = {};
        let backMods = {};

        if (visible) {
            closeMods = {
                close: true,
                visible: navigationButton === 'close'
            };

            backMods = {
                back: true,
                visible: navigationButton === 'back'
            };
        }

        return (
            <>
                <button
                  block="Header"
                  elem="Button"
                  mods={ { ...closeMods } }
                  aria-label="Close"
                >
                    X
                </button>
                <button
                  block="Header"
                  elem="Button"
                  mods={ { ...backMods } }
                  aria-label="Go back"
                >
                    B
                </button>
            </>
        );
    }

    renderSearchButton(visible) {
        return (
            <button
              block="Header"
              elem="Button"
              mods={ { visible, search: true } }
              aria-label="Search"
            >
                S
            </button>
        );
    }

    renderTitle(title) {
        // const { title } = this.props REDUX
        return <h2 block="Header" elem="Title" mods={ { visible: !!title } }>{ title }</h2>;
    }

    renderAccountButton(visible) {
        return (
            <button
              block="Header"
              elem="Button"
              mods={ { visible, account: true } }
              aria-label="My account"
            >
              A
            </button>
        );
    }

    renderMinicartButton(visible) {
        const cartItemQuantity = 2; // REDUX

        return (
            <button
              block="Header"
              elem="Button"
              mods={ { visible, minicart: true } }
              aria-label="Minicart"
            >
                { cartItemQuantity }
                C
            </button>
        );
    }

    renderHeaderState(state) {
        // const { state } = this.props; ROUTER
        const {
            navigation,
            title,
            minicart,
            account,
            search
        } = this.stateMap[state];

        return (
            <>
                <div block="Header" elem="Section" mods={ { left: true } }>
                    { this.renderNavigationButton(navigation) }
                    { this.renderSearchButton(search) }
                </div>
                <div block="Header" elem="Section" mods={ { middle: true } }>
                    { this.renderTitle('Hello world') }
                </div>
                <div block="Header" elem="Section" mods={ { right: true } }>
                    { this.renderAccountButton(account) }
                    { this.renderMinicartButton(minicart) }
                </div>
            </>
        );
    }

    render() {
        return (
            <header block="Header">
                <nav block="Header" elem="Nav">
                    { this.renderHeaderState('home') }
                </nav>
            </header>
        );
    }
}

export default Header;
