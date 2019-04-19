import React, { Component } from 'react';
import './Header.style';

const PDP = 'pdp';

class Header extends Component {
    constructor(props) {
        super(props);

        this.stateMap = {
            [PDP]: {
                navigation: true,
                title: true,
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
                <span>B</span>
                <span>C</span>
            </>
        );
    }

    renderTitle(title) {
        return (
            <>
                <h1 block="Header" elem="Title">{ title }</h1>
            </>
        );
    }

    renderMinicartButton() {
        return (
            <>
                <span block="Header" elem="MinicartButton">C</span>
            </>
        );
    }

    renderHeaderState(state) {
        const {
            navigation,
            title,
            minicart
        } = this.stateMap[state];

        return (
            <>
                <div block="Header" elem="LeftSide">
                    { navigation && this.renderNavigationButton() }
                </div>
                <div block="Header" elem="Middle">
                    { title && this.renderTitle('Hello world') }
                </div>
                <div block="Header" elem="RightSide">
                    { minicart && this.renderMinicartButton() }
                </div>
            </>
        );
    }

    render() {
        return (
            <header block="Header">
                <div block="Header" elem="Wrapper">
                    { this.renderHeaderState('pdp') }
                </div>
            </header>
        );
    }
}

export default Header;
