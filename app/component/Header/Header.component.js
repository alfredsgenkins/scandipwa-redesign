import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuOverlay from 'Component/MenuOverlay';
import './Header.style';

export const PDP = 'pdp';
export const CATEGORY = 'category';
export const CUSTOMER_ACCOUNT = 'customer_account';
export const HOME_PAGE = 'home';
export const MENU = 'menu';
export const MENU_SUBCATEGORY = 'menu_subcategory';

export const NAVIGATION_BACK = 'back';
export const NAVIGATION_CLOSE = 'close';
export const NAVIGATION_BOTH = 'both';
export const NAVIGATION_NONE = 'none';

class Header extends Component {
    constructor(props) {
        super(props);

        const { showOverlay, setHeaderState } = props;

        this.stateMap = {
            [PDP]: {
                back: true,
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
            },
            [MENU]: {
                close: true,
                search: true
            },
            [MENU_SUBCATEGORY]: {
                back: true,
                title: true
           }
        };

        this.renderHeaderState = this.renderHeaderState.bind(this);
    }

    renderBackButton(isVisible) {
        const { goToPreviousHeaderState } = this.props;

        return (
            <button
              block="Header"
              elem="Button"
              mods={ { type: 'back', isVisible } }
              onClick={ () => goToPreviousHeaderState() }
              aria-label="Go back"
            />
        );
    }

    renderCloseButton(isVisible) {
        return (
            <button
              block="Header"
              elem="Button"
              mods={ { type: 'close', isVisible } }
              aria-label="Close"
            />
        );
    }

    renderNavigationButton(isVisible) {
        const { navigationButtonState } = this.props;
        let closeMods = { type: 'close', isVisible: false };
        let backMods = { type: 'back', isVisible: false };

        if (isVisible) {
            const isCloseVisible = navigationButtonState === (NAVIGATION_CLOSE || NAVIGATION_BOTH);
            const isBackVisible = navigationButtonState === (NAVIGATION_BACK || NAVIGATION_BOTH);

            closeMods = {
                ...closeMods,
                isVisible: isCloseVisible
            };

            backMods = {
                ...backMods,
                isVisible: isBackVisible
            };
        }

        return (
            <>
                <button
                  block="Header"
                  elem="Button"
                  mods={ { type: 'close', isVisible: false } }
                  aria-label="Close"
                />
                <button
                  block="Header"
                  elem="Button"
                  mods={ { type: 'back', isVisible: false } }
                  aria-label="Go back"
                />
            </>
        );
    }

    renderMenuButton(isVisible) {
        const { showOverlay, setHeaderState } = this.props;

        return (
            <button
              block="Header"
              elem="Button"
              mods={ { isVisible, type: 'menu' } }
              aria-label="Go to menu and search"
              onClick={ () => showOverlay(MENU) && setHeaderState({ name: MENU }) }
            />
        );
    }

    renderSearchField(isVisible) {
        return (
            <input
              placeholder="Search"
              aria-label="Search field"
              block="Header"
              elem="SearchField"
              mods={ { isVisible, type: 'searchField' } }
            />
        );
    }

    renderTitle(isVisible) {
        const { title } = this.props;

        return (
            <>
                <h2 block="Header" elem="Title" mods={ { isVisible } }>{ title }</h2>
                <div block="Header" elem="Mock" />
            </>
        );
    }

    renderAccountButton(isVisible) {
        return (
            <button
              block="Header"
              elem="Button"
              mods={ { isVisible, type: 'account' } }
              aria-label="My account"
            />
        );
    }

    renderMinicartButton(isVisible) {
        const { cartItemQuantity } = this.props;

        return (
            <button
              block="Header"
              elem="Button"
              mods={ { isVisible, type: 'minicart' } }
              aria-label="Minicart"
            >
                <span>{ cartItemQuantity }</span>
            </button>
        );
    }

    renderHeaderState(state) {
        const source = this.stateMap[state]
            ? this.stateMap[state]
            : this.stateMap[HOME_PAGE];

        const {
            back,
            close,
            title,
            minicart,
            account,
            menu,
            search
        } = source;

        return (
            <>
                { this.renderBackButton(back) }
                { this.renderCloseButton(close) }
                { this.renderMenuButton(menu) }
                { this.renderSearchField(search) }
                { this.renderTitle(title) }
                { this.renderAccountButton(account) }
                { this.renderMinicartButton(minicart) }
            </>
        );
    }

    render() {
        const { headerState: { name } } = this.props;

        return (
            <header block="Header">
                <nav block="Header" elem="Nav">
                    { this.renderHeaderState(name) }
                </nav>
                <MenuOverlay />
            </header>
        );
    }
}

Header.propTypes = {
    showOverlay: PropTypes.func.isRequired,
    setHeaderState: PropTypes.func.isRequired,
    headerState: PropTypes.shape({
        name: PropTypes.oneOf([
            PDP,
            CATEGORY,
            CUSTOMER_ACCOUNT,
            HOME_PAGE,
            MENU,
            MENU_SUBCATEGORY
        ])
    }).isRequired,
    cartItemQuantity: PropTypes.number,
    title: PropTypes.string,
    navigationButtonState: PropTypes.oneOf([
        NAVIGATION_BACK,
        NAVIGATION_CLOSE,
        NAVIGATION_CLOSE,
        NAVIGATION_NONE
    ])
};

Header.defaultProps = {
    cartItemQuantity: 0,
    title: '',
    navigationButtonState: NAVIGATION_NONE
};

export default Header;
