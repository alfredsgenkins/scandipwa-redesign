import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isSignedIn } from 'Util/Auth';
import './MyAccountOverlay.style';
import Overlay from 'Component/Overlay';
import Form from 'Component/Form';
import Field from 'Component/Field';
import { CUSTOMER_ACCOUNT } from '../Header/Header.component';

const STATE_SIGN_IN = 'signIn';
const STATE_FORGOT_PASSWORD = 'forgotPassword';
const STATE_CREATE_ACCOUNT = 'createAccount';
const STATE_LOGGED_IN = 'loggedIn';

class MyAccountOverlay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            state: isSignedIn() ? STATE_LOGGED_IN : STATE_SIGN_IN
        };

        this.renderMap = {
            [STATE_SIGN_IN]: () => this.renderSignIn(),
            [STATE_FORGOT_PASSWORD]: () => this.renderForgotPassword(),
            [STATE_CREATE_ACCOUNT]: () => this.renderCreateAccount(),
            [STATE_LOGGED_IN]: () => this.renderAccountActions()
        };

        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.handleCreateAccount = this.handleCreateAccount.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.logout = this.logout.bind(this);
    }
    /* eslint-disable-next-line */
    componentDidUpdate() {
        const { isOverlayVisible, setHeaderState } = this.props;
        const { state } = this.state;

        if (isOverlayVisible) {
            switch (state) {
            case STATE_SIGN_IN:
                return setHeaderState({ name: CUSTOMER_ACCOUNT, title: 'Sign in to your account' });
            case STATE_CREATE_ACCOUNT:
                return setHeaderState({ name: CUSTOMER_ACCOUNT, title: 'Create new account' });
            case STATE_FORGOT_PASSWORD:
                return setHeaderState({ name: CUSTOMER_ACCOUNT, title: 'Get password link' });
            case STATE_LOGGED_IN:
                return setHeaderState({ name: CUSTOMER_ACCOUNT });
            default:
                break;
            }
        }
    }

    handleForgotPassword() {
        return;
    }

    handleSignIn() {
        return;
    }

    handleCreateAccount() {
        return;
    }

    logout() {
        return;
    }

    renderMyAccount() {
        const { isOverlayVisible: isVisible } = this.props;
        const { state } = this.state;
        const renderFunction = this.renderMap[state];

        return (
            <div block="MyAccountOverlay" mods={ { isVisible } }>
                <div block="MyAccountOverlay" elem="Action">
                    {renderFunction()}
                </div>
            </div>
        );
    }

    renderAccountActions() {
        const { logout } = this.props;

        const linkTo = {
            pathname: '/my-account',
            state: 'accountOverview'
        };

        return (
            <nav block="MyAccountOverlay" elem="Navigation">
                <ul>
                    <li><Link to={ linkTo }>My Account</Link></li>
                    <li>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ () => logout() }
                        >
                            My Orders
                        </button>
                    </li>
                    <li>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ () => logout() }
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }

    renderForgotPassword() {
        return (
            <>
                <Form
                  key="forgot-password"
                  onSubmit={ () => this.onForgotPasswordAttempt() }
                  onSubmitSuccess={ fields => this.onForgotPasswordSuccess(fields) }
                  onSubmitError={ () => this.onFormError() }
                >
                    <h3>Get password reset link</h3>
                    <Field type="text" label="Email" id="email" validation={['notEmpty', 'email']} />
                    <div block="MyAccountOverlay" elem="Buttons">
                        <button type="submit">Send reset link</button>
                    </div>
                </Form>
                <article block="MyAccountOverlay" elem="Additional">
                    <section aria-labelledby="forgot-password-labe">
                        <h4 id="forgot-password-label">Already have an account?</h4>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ this.handleSignIn }
                        >
                            Sign in here
                        </button>
                    </section>
                    <section aria-labelledby="create-account-label">
                        <h4 id="create-account-label">Don&apos;t have an account?</h4>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ this.handleCreateAccount }
                        >
                            Create an account
                        </button>
                    </section>
                </article>
            </>
        );
    }

    renderCreateAccount() {
        return (
            <>
                <Form
                  key="create-account"
                  onSubmit={ () => this.onCreateAccountAttempt() }
                  onSubmitSuccess={ fields => this.onCreateAccountSuccess(fields) }
                  onSubmitError={ (fields, invalidFields) => this.onCreateAccountAttempt(fields, invalidFields) }
                >
                    <h3>Create your account</h3>
                    <fieldset block="MyAccountOverlay" elem="Legend">
                        <legend>Personal Information</legend>
                        <Field type="text" label="First name" id="firstname" validation={ ['notEmpty'] } />
                        <Field type="text" label="Last name" id="lastname" validation={ ['notEmpty'] } />
                        <Field
                          block="MyAccountOverlay"
                          elem="Checkbox"
                          type="checkbox"
                          label="Subscribe to ScandiPWA newsletter"
                          id="is_subscribed"
                        />
                    </fieldset>
                    <fieldset block="MyAccountOverlay" elem="Legend">
                        <legend>Sign-Up Information</legend>
                        <Field type="text" label="Email" id="email" validation={ ['notEmpty', 'email'] } />
                        <Field
                          type="password"
                          label="Password"
                          id="password"
                          validation={ ['notEmpty', 'password'] }
                        />
                        <Field
                          type="password"
                          label="Confirm password"
                          id="confirm_password"
                          validation={ ['notEmpty', 'password'] }
                        />
                    </fieldset>
                    <div block="MyAccountOverlay" elem="Buttons">
                        <button type="submit">Sign up</button>
                    </div>
                </Form>
                <article block="MyAccountOverlay" elem="Additional">
                    <section aria-labelledby="create-account-label">
                        <h4 id="create-account-label">Already have an account?</h4>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ this.handleSignIn }
                        >
                            Sign in here
                        </button>
                    </section>
                </article>
            </>
        );
    }

    renderSignIn() {
        return (
            <>
                <Form
                  key="sign-in"
                  onSubmit={ () => this.onSignInAttempt() }
                  onSubmitSuccess={ fields => this.onSignInSuccess(fields) }
                  onSubmitError={ () => this.onFormError() }
                >
                    <h3>Sign in to your account</h3>
                    <Field
                      type="text"
                      label="Login or Email"
                      id="email"
                      validation={ ['notEmpty', 'email'] }
                    />
                    <Field
                      type="password"
                      label="Password"
                      id="password"
                      validation={ ['notEmpty', 'password'] }
                    />
                    <div block="MyAccountOverlay" elem="Buttons">
                        <button>Sign in</button>
                    </div>
                </Form>
                <article block="MyAccountOverlay" elem="Additional">
                    <section aria-labelledby="forgot-password-labe">
                        <h4 id="forgot-password-label">Forgot password?</h4>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ this.handleForgotPassword }
                        >
                            Get a password reset link
                        </button>
                    </section>
                    <section aria-labelledby="create-account-label">
                        <h4 id="create-account-label">Don&apos;t have an account?</h4>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ this.handleCreateAccount }
                        >
                            Create an account
                        </button>
                    </section>
                </article>
            </>
        );
    }

    render() {
        return (
            <Overlay
              id="customer_account"
              mix={ { block: 'MyAccountOverlay' } }
            >
                { this.renderMyAccount() }
            </Overlay>
        );
    }
}

export default MyAccountOverlay;
