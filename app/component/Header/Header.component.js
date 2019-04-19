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

    renderNavigationButton() {
        return (
            <>
                {/* <button block="Header" elem="NavigationClose" />
                <button block="Header" elem="NavigationBack" /> */}
                <span block="Header" elem="Icon">B</span>
                <span block="Header" elem="Icon">C</span>
            </>
        );
    }

    renderSearchButton() {
        return (
            <>
                <span block="Header" elem="Icon">S</span>
            </>
        );
    }

    renderTitle(title) {
        // const { title } = this.props REDUX
        return (
            <>
                <span block="Header" elem="Title">{ title }</span>
            </>
        );
    }

    renderAccountButton() {
        return (
            <>
                <span block="Header" elem="Icon">A</span>
            </>
        );
    }

    renderMinicartButton() {
        return (
            <>
                <span block="Header" elem="Icon">2 C</span>
            </>
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
                    { navigation && this.renderNavigationButton() }
                    { search && this.renderSearchButton() }
                </div>
                <div block="Header" elem="Middle">
                    { title && this.renderTitle('Hello world') }
                </div>
                <div block="Header" elem="RightSide">
                    { account && this.renderAccountButton() }
                    { minicart && this.renderMinicartButton() }
                </div>
            </>
        );
    }

    render() {
        return (
            <header block="Header">
                <div block="Header" elem="Wrapper">
                    { this.renderHeaderState('home') }
                </div>
            </header>
        );
    }
}

export default Header;
