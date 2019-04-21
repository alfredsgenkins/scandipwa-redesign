import { connect } from 'react-redux';
import OverlayComponent from './Overlay.component';

const mapStateToProps = state => ({
    activeOverlay: state.OverlayReducer.activeOverlay
});

export default connect(mapStateToProps)(OverlayComponent);
