import { connect } from 'react-redux';
import { showOverlayByKey } from 'Store/Overlay';
import HeaderComponent from './Header.component';

const mapStateToProps = state => ({
    headerStateName: state.HeaderReducer.headerStateName
});

const mapDispatchToProps = dispatch => ({
    showOverlay: overlayKey => dispatch(showOverlayByKey(overlayKey))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
