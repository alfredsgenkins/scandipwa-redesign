import React, { Component } from 'react';
import './Header.style';

export const PDP = 'pdp';
export const CATEGORY = 'category';
export const CUSTOMER_ACCOUNT = 'customer_account';
export const HOME_PAGE = 'home';

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
                menu: true,
                title: true,
                minicart: true
            },
            [CUSTOMER_ACCOUNT]: {
                navigation: true,
                title: true
            },
            [HOME_PAGE]: {
                menu: true,
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
                type: 'close',
                visible: navigationButton === 'close'
            };

            backMods = {
                type: 'back',
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
                />
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

    renderMenuButton(visible) {
        return (
            <button
              block="Header"
              elem="Button"
              mods={ { visible, type: 'menu' } }
              aria-label="Go to menu and search"
            />
        );
    }

    renderTitle(visible) {
        // const { title } = this.props REDUX
        const title = 'hello, world';
        return (
            <>
                <h2 block="Header" elem="Title" mods={ { visible } }>{ title }</h2>
                <div block="Header" elem="Mock" />
            </>
        );
    }

    renderAccountButton(visible) {
        return (
            <button
              block="Header"
              elem="Button"
              mods={ { visible, type: 'account' } }
              aria-label="My account"
            />
        );
    }

    renderMinicartButton(visible) {
        const cartItemQuantity = 2; // REDUX

        return (
            <button
              block="Header"
              elem="Button"
              mods={ { visible, type: 'minicart' } }
              aria-label="Minicart"
            >
                <span>{ cartItemQuantity }</span>
            </button>
        );
    }

    renderHeaderState(state) {
        // const { state } = this.props; ROUTER
        const source = this.stateMap[state]
            ? this.stateMap[state]
            : this.stateMap[HOME_PAGE];

        const {
            navigation,
            title,
            minicart,
            account,
            menu
        } = source;

        return (
            <>
                { this.renderNavigationButton(navigation) }
                { this.renderMenuButton(menu) }
                { this.renderTitle(title) }
                { this.renderAccountButton(account) }
                { this.renderMinicartButton(minicart) }
            </>
        );
    }

    render() {
        const { state } = this.props;

        return (
            <header block="Header">
                <nav block="Header" elem="Nav">
                    { this.renderHeaderState(state) }
                </nav>
            </header>
        );
    }
}

export default Header;
