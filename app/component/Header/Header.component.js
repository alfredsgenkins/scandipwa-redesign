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
                visible: navigationButton === 'close'
            };

            backMods = {
                visible: navigationButton === 'back'
            };
        }

        return (
            <>
                <button
                  block="Header"
                  elem="NavigationClose"
                  mods={ { ...closeMods } }
                  aria-label="Close"
                >
                    X
                </button>
                <button
                  block="Header"
                  elem="NavigationBack"
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
              elem="SearchButton"
              mods={ { visible } }
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
              elem="AccountButton"
              mods={ { visible } }
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
              elem="MinicartButton"
              mods={ { visible } }
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
                <div block="Header" elem="LeftSide">
                    { this.renderNavigationButton(navigation) }
                    { this.renderSearchButton(search) }
                </div>
                <div block="Header" elem="Middle">
                    { this.renderTitle('Hello world') }
                </div>
                <div block="Header" elem="RightSide">
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
