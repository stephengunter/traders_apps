import Errors from '@/common/errors';
import { LOADING, MENUS, WINDOW_WIDTH, CONTENT_MAX_WIDTH, 
   RESPONSIVE, BREAD_ITEMS, ERROR_LIST
} from '@/store/getters.type';
import { SET_BREAD_ITEMS, SET_LOADING, SET_ERROR, CLEAR_ERROR, 
   SET_DRAWER, SET_MENUS, SET_WINDOW_WIDTH,
   SET_RESPONSIVE, TOGGLE_DRAWER 
} from '@/store/mutations.type';

const initialState = {
   breadItems: [],
   loading: false,
   sideBarWidth: 260,
   windowWidth: 991,
   responsive: false,
   drawer: null,
   menus: [],
   errorList: new Errors(),
};

export const state = { ...initialState };


const getters = {
   [BREAD_ITEMS](state) {
      return state.breadItems;
   },
   [LOADING](state) {
      return state.loading;
   },
   [MENUS](state) {
      return state.menus;
   },
   [WINDOW_WIDTH](state) {
      return state.windowWidth;
   },
   [CONTENT_MAX_WIDTH](state) {
      if(state.responsive) return state.windowWidth * 0.9;
      return (state.windowWidth - state.sideBarWidth) * 0.9;
   },
   [RESPONSIVE](state) {
      return state.responsive;
   },
   [ERROR_LIST](state) {
      return state.errorList;
   }
};



const mutations = {
   [SET_BREAD_ITEMS](state, items) {
      state.breadItems = items;
   },
   [SET_LOADING](state, loading) {
      state.loading = loading;
   },
   [SET_WINDOW_WIDTH](state, val) {
      state.windowWidth = val;
   },
   [SET_RESPONSIVE](state, val) {
      state.responsive = val;
   },
   [SET_DRAWER](state, drawer) {
      state.drawer = drawer;
   },
   [TOGGLE_DRAWER](state) {
      state.drawer = !state.drawer;
   },
   [SET_MENUS](state, menus) {
      state.menus = menus;
   },
   [SET_ERROR](state, errors) {
      state.errorList.record(errors);
   },
   [CLEAR_ERROR](state) {
      state.errorList.clear();   
   },
};

export default {
   state,
   mutations,
   getters
};
 