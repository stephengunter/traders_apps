import HistotiesService from '@/services/histoties.service';
import { resolveErrorData } from '@/utils';
import { FETCH_HISTORIES, HISTORY_DETAILS, IMPORT_HISTORY_QUOTES } from '@/store/actions.type';

import { SET_LOADING } from '@/store/mutations.type';

const initialState = {
   
};

export const state = { ...initialState };
 
const getters = {
   
};


const actions = {
   [FETCH_HISTORIES](context, params) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         HistotiesService.fetch(params)
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
   [HISTORY_DETAILS](context, params) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         HistotiesService.details(params)
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
   [IMPORT_HISTORY_QUOTES](context, { symbol, date, file }) {
      let form = new FormData();
      form.append('symbol', symbol);
      form.append('date', date);
      form.append('file', file);
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         HistotiesService.importing(form)
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
   
};

export default {
   state,
   actions,
   mutations,
   getters
};
 