export const CHANGE_HEADER_STATE = 'CHANGE_HEADER_STATE';

export const changeHeaderState = headerStateName => ({
    type: CHANGE_HEADER_STATE,
    headerStateName
});
