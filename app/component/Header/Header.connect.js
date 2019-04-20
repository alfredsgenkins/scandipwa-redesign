import { connect } from 'react-redux';
import Header from './Header.component';

const mapStateToProps = state => ({
    headerStateName: state.HeaderReducer.headerStateName
});

export default connect(mapStateToProps)(Header);
