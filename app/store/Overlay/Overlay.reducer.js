import {
    SHOW_OVERLAY,
    HIDE_ACTIVE_OVERLAY
} from './Overlay.action';

const initialState = {
    activeOverlay: null
};

const OverlayReducer = (state = initialState, action) => {
    switch (action.type) {
    case SHOW_OVERLAY:
        const { overlayKey } = action;

        return {
            ...state,
            activeOverlay: overlayKey
        };

    case HIDE_ACTIVE_OVERLAY:
        return {
            ...state,
            activeOverlay: null
        };

    default:
        return state;
    }
};

export default OverlayReducer;
