import {
    SET_ROADS,
    SET_ROAD_INFO,
} from '~/constants/RoadsConstants'

const initialState = {
    roads: undefined,
};

export default function road(state = initialState, action) {
    switch (action.type) {
        case SET_ROADS:
            return {
                roads: action.roads.filter(el=>el.line_path)
            };
        case SET_ROAD_INFO:
            const replacedElement = state.roads.indexOf(state.roads.find(element=>element.id===action.id));
            let newState =  {...state};
            newState.roads[replacedElement] = {
                ...newState.roads[replacedElement],
                roadFullInfo: action.payload
            }
            newState.selectedRoad = newState.roads[replacedElement]
            return newState;
        default:
            return state;
    }
}
