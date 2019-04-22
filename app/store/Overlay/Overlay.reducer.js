import {
    TOGGLE_OVERLAY,
    HIDE_ACTIVE_OVERLAY
} from './Overlay.action';

const initialState = {
    activeOverlay: ''
};

const OverlayReducer = (state = initialState, action) => {
    switch (action.type) {
    case TOGGLE_OVERLAY:
        const { overlayKey } = action;
        const { activeOverlay: prevActiveOverlay } = state;
        const activeOverlay = prevActiveOverlay === overlayKey ? '' : overlayKey;

        return {
            ...state,
            activeOverlay
        };

    case HIDE_ACTIVE_OVERLAY:
        return {
            ...state,
            activeOverlay: ''
        };

    default:
        return state;
    }
};

export default OverlayReducer;
