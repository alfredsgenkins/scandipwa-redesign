import React, { Component } from 'react';

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
                <button block="Naviagation" element="Back" />
                <button block="Navigation" element="Close" />
            </>
        );
    }

    renderTitle(title) {
        return (
            <>
                <h1>{ title }</h1>
            </>
        );
    }

    renderMinicartButton() {
        return (
            <>
                <span>C</span>
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
                { navigation && this.renderNavigationButton() }
                { title && this.renderTitle() }
                { minicart && this.renderMinicartButton() }
            </>
        );
    }

    render() {
        return (
            <header block="Header">
                <div block="Header" element="Wrapper">
                    { this.renderHeaderState('pdp') }
                </div>
            </header>
        );
    }
}

export default Header;
