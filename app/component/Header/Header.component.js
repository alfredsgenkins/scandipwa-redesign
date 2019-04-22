import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuOverlay from 'Component/MenuOverlay';
import SearchOverlay from 'Component/SearchOverlay';
import './Header.style';

export const PDP = 'pdp';
export const CATEGORY = 'category';
export const CUSTOMER_ACCOUNT = 'customer_account';
export const HOME_PAGE = 'home';
export const MENU = 'menu';
export const MENU_SUBCATEGORY = 'menu_subcategory';
export const SEARCH = 'search';

export const NAVIGATION_BACK = 'back';
export const NAVIGATION_CLOSE = 'close';
export const NAVIGATION_BOTH = 'both';
export const NAVIGATION_NONE = 'none';

class Header extends Component {
    constructor(props) {
        super(props);

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
            },
            [SEARCH]: {
                back: true,
                search: true
            }
        };

        this.onBackButtonClick = this.onBackButtonClick.bind(this);
        this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
        this.renderHeaderState = this.renderHeaderState.bind(this);
        this.onSearchBarClick = this.onSearchBarClick.bind(this);
        this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
    }

    onBackButtonClick() {
        const { goToPreviousHeaderState } = this.props;
        const { headerState: { onBackClick } } = this.props;

        if (onBackClick) onBackClick();
        goToPreviousHeaderState();
    }

    onCloseButtonClick() {
        const { goToPreviousHeaderState, hideActiveOverlay } = this.props;
        const { headerState: { onCloseClick } } = this.props;

        if (onCloseClick) onCloseClick();
        goToPreviousHeaderState();
        hideActiveOverlay();
    }

    onSearchBarClick() {
        const {
            setHeaderState,
            showOverlay,
            headerState: { name }
        } = this.props;

        if (name !== SEARCH) {
            showOverlay(SEARCH);
            setHeaderState({
                name: SEARCH,
                onBackClick: () => showOverlay(MENU)
            });
        }
    }

    onMenuButtonClick() {
        const { showOverlay, setHeaderState } = this.props;

        showOverlay(MENU);
        setHeaderState({ name: MENU });
    }

    renderBackButton(isVisible) {
        return (
            <button
              block="Header"
              elem="Button"
              mods={ { type: 'back', isVisible } }
              onClick={ this.onBackButtonClick }
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
              onClick={ this.onCloseButtonClick }
              aria-label="Close"
            />
        );
    }

    renderMenuButton(isVisible) {
        return (
            <>
                <button
                  block="Header"
                  elem="Button"
                  mods={ { isVisible, type: 'menu' } }
                  aria-label="Go to menu and search"
                  onClick={ this.onMenuButtonClick }
                />
                <MenuOverlay />
            </>
        );
    }

    renderSearchField(isVisible) {
        return (
            <>
                <input
                  placeholder="Search"
                  aria-label="Search field"
                  block="Header"
                  elem="SearchField"
                  onClick={ this.onSearchBarClick }
                  mods={ {
                      isVisible,
                      type: 'searchField'
                  } }
                />
                <SearchOverlay />
            </>
        );
    }

    renderTitle(isVisible) {
        const { headerState: { title } } = this.props;

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
            </header>
        );
    }
}

Header.propTypes = {
    showOverlay: PropTypes.func.isRequired,
    goToPreviousHeaderState: PropTypes.func.isRequired,
    hideActiveOverlay: PropTypes.func.isRequired,
    setHeaderState: PropTypes.func.isRequired,
    headerState: PropTypes.shape({
        name: PropTypes.oneOf([
            PDP,
            CATEGORY,
            CUSTOMER_ACCOUNT,
            HOME_PAGE,
            MENU,
            MENU_SUBCATEGORY
        ]),
        title: PropTypes.string,
        onBackClick: PropTypes.func,
        onCloseClick: PropTypes.func
    }).isRequired,
    cartItemQuantity: PropTypes.number,
    navigationButtonState: PropTypes.oneOf([
        NAVIGATION_BACK,
        NAVIGATION_CLOSE,
        NAVIGATION_BOTH,
        NAVIGATION_NONE
    ])
};

Header.defaultProps = {
    cartItemQuantity: 0,
    navigationButtonState: NAVIGATION_NONE
};

export default Header;
