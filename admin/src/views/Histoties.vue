<template>
   <core-container>
      <v-row>
         <v-col cols="12">
            Histoties xx
			</v-col>
      </v-row>
   </core-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { FETCH_SYMBOLS } from '@/store/actions.type';
import { SET_TERMS } from '@/store/mutations.type';
import { DIALOG_MAX_WIDTH } from '@/config';
import { onError, findSubject } from '@/utils';

export default {
   name: 'HistotiesView',
   data () {
      return {
         
      }
   },
   computed: {
      ...mapGetters(['symbols']),
	},
   beforeMount() {
      if(this.symbols.length) {

      }else {
         
      }
      console.log('symbols', this.symbols);
   },
   mounted() {
		
	},
   methods: {
      
   }
}
</script>

<style>

</style>