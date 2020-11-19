import Action from '../../actions';
var initialState = {
    currentCategory: '',
    currentSubcategory: '',
    currentProvince: '',
    currentPriceRange: ''
}

function SideBarReducer(state = initialState, action) {
    switch (action.type) {
        case Action.UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.payload
            };

        case Action.UPDATE_CURRENT_SUBCATEGORY:
            return {
                ...state,
                currentSubcategory: action.payload
            };

        case Action.UPDATE_CURRENT_PRICE_RANGE:
            return {
                ...state,
                currentPriceRange: action.payload
            };

        case Action.UPDATE_CURRENT_PROVINCE:
            return {
                ...state,
                currentProvince: action.payload
            }

        default:
            return state;
    }
}
export default SideBarReducer;