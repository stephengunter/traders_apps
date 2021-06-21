import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app.module';
import auth from './modules/auth.module';
import exceptions from './modules/exceptions.module';
import users from './modules/users.module';
import symbols from './modules/symbols.module';
import db from './modules/db.module';

Vue.use(Vuex);

export default new Vuex.Store({
   modules: {
      app,
      auth,
      exceptions,
      users,
      symbols,
      db
   }
});
