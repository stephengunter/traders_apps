import SymbolsService from '@/services/symbols.service';
import { resolveErrorData } from '@/utils';
import { FETCH_SYMBOLS, CREATE_SYMBOL, STORE_SYMBOL, EDIT_SYMBOL, 
   UPDATE_SYMBOL, OFF_SYMBOL, REMOVE_SYMBOL } from '@/store/actions.type';

import { SET_SYMBOLS, SET_LOADING } from '@/store/mutations.type';

const initialState = {
   list: []
};

export const state = { ...initialState };
 
const getters = {
   symbols(state) {
      return state.list;
   }
};


const actions = {
   [FETCH_SYMBOLS](context, params) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         SymbolsService.fetch(params)
            .then(list => {
               context.commit(SET_SYMBOLS, list);
               resolve(list);
            })
            .catch(error => {
               reject(error);
            })
            .finally(() => { 
               context.commit(SET_LOADING, false);
            });
      });
   },
   [CREATE_SYMBOL](context) {
      return new Promise((resolve, reject) => {
         SymbolsService.create()
            .then(model => {
               resolve(model);
            })
            .catch(error => {
               reject(error);      
            })
            .finally(() => { 
               context.commit(SET_LOADING, false);
            });
      });
   },
   [STORE_SYMBOL](context, model) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         SymbolsService.store(model)
         .then(data => {
            resolve(data);
         })
         .catch(error => {
            reject(resolveErrorData(error));
         })
         .finally(() => { 
            context.commit(SET_LOADING, false);
         });
      });
   },
   [EDIT_SYMBOL](context, id) {
      return new Promise((resolve, reject) => {
         SymbolsService.edit(id)
            .then(model => {
               resolve(model);
            })
            .catch(error => {
               reject(error);        
            })
            .finally(() => { 
               context.commit(SET_LOADING, false);
            });
      });
   },
   [UPDATE_SYMBOL](context, model) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         SymbolsService.update(model.id, model)
            .then(data => {
               resolve(data);
            })
            .catch(error => {
               reject(resolveErrorData(error)); 
            })
            .finally(() => { 
               context.commit(SET_LOADING, false);
            });
      });
   },
   [OFF_SYMBOL](context, id) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         SymbolsService.off(id)
         .then(() => {
            resolve(true);
         })
         .catch(error => {
            reject(error);
         })
         .finally(() => { 
            context.commit(SET_LOADING, false);
         });
      });
   },
   [REMOVE_SYMBOL](context, id) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         SymbolsService.remove(id)
            .then(() => {
               resolve(true);
            })
            .catch(error => {
               reject(resolveErrorData(error));
            })
            .finally(() => { 
               context.commit(SET_LOADING, false);
            });
      });
   },
};


const mutations = {
   [SET_SYMBOLS](state, list) {
      state.list = list;
   }
};

export default {
   state,
   actions,
   mutations,
   getters
};
 