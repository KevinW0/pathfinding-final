const startCoordAction = 'ts/start';
const targetCoordAction = 'ts/target';
const resetAction = 'ts/reset'

const initialState = { isStartSelected: false, isTargetSelected: false, startCoords: { x: -1, y: -1 }, targetCoords: { x: -1, y: -1 }}
export const targetStartReducer = (
    state = initialState,
    action = { payload: { x: undefined, y: undefined } }
) => {
    const updatedCoordinates = { x: action.payload?.x, y: action.payload?.y };
    switch (action.type) {
        case startCoordAction:
            return { ...state, isStartSelected: !state.isStartSelected, startCoords: updatedCoordinates };
        case targetCoordAction:
            return { ...state, isTargetSelected: !state.isTargetSelected, targetCoords: updatedCoordinates };
        case resetAction:
            return initialState;
        default:
            return state;
    }
};

const selectStartCoords = (state) => state.startCoords;
const selectTargetCoords = (state) => state.targetCoords;
const selectStartBoolean = (state) => state.isStartSelected;
const selectTargetBoolean = (state) => state.isTargetSelected;

export const selectors = {
    selectStartCoords,
    selectTargetCoords,
    selectStartBoolean,
    selectTargetBoolean,
};

export const actions = {
    startCoordAction,
    targetCoordAction,
    resetAction,
};
