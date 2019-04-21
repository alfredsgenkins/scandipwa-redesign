export const SHOW_OVERLAY = 'SHOW_OVERLAY';
export const HIDE_ACTIVE_OVERLAY = 'HIDE_ACTIVE_OVERLAY';

export const showOverlayByKey = overlayKey => ({
    type: SHOW_OVERLAY,
    overlayKey
});

export const hideActiveOverlay = () => ({
    type: HIDE_ACTIVE_OVERLAY
});
