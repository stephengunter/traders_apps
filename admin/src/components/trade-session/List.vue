<template>
   <ul class="sessions">
      <li v-for="(session,index) in sessions" :key="session.id" :class="{ 'session-display': index > 0, 'default-session': session.default }" >

         <div style="display:inline;"> 
            <v-icon v-if="session.default" color="success" style="vertical-align: baseline;">
            mdi-check-circle
            </v-icon>
            
            {{ getOpen(session) }} ~ {{ getClose(session) }}
         </div>
         
      </li>
   </ul>
</template>

<script>
import { toTimeString } from '@/utils';

export default {
   name: 'TradeSessionList',
   props: {
      sessions: {
         type: Array,
         default: () => []
		}
   },
   methods: {
      getOpen(session) {
			return toTimeString(session.open);
		},
      getClose(session) {
			return toTimeString(session.close);
		}
	},
}
</script>

<style scoped>
.sessions {
   padding-left : 0px;
   list-style-type : none;
}
.session-display {
   padding-top: 0.2em;
}
.default-session {
   color:#1867c0;
   font-size : 1.2em; 
}
</style>