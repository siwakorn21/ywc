import { combineReducers } from 'redux';
import SideBarReducer from './SideBarReducer/SideBarReducer';

export default combineReducers({
    sidebarState: SideBarReducer
});