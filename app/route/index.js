import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProductPage from 'Route/ProductPage';
import Header from 'Component/Header';

class AppRouter extends Component {
    render() {
        return (
            <>
                <Router>
                    <>
                        <Header />
                        <Switch>
                            <Route path="/" exact component={ ProductPage } />
                        </Switch>
                    </>
                </Router>
            </>
        );
    }
}

export default AppRouter;
