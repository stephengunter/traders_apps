<template>
   <core-container>
      <v-row>
         <v-col cols="12">
            
			</v-col>
         <v-col cols="12">
            <trade-session-edit ref="sessionsEditor"
            :symbol_id="symbolId" :init_models="models"
            @submit="onSessionSubmit"
            />
			</v-col>
         <v-col cols="12">
            <v-btn @click.prevent="onSubmit">
					Save
				</v-btn>
			</v-col>
      </v-row>
   </core-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { RESPONSIVE } from '@/store/getters.type';
import { DIALOG_MAX_WIDTH } from '@/config';
import { onError, getErrorMsg, toTimeNumber, toTimeString } from '@/utils';

export default {
   name: 'DashboardView',
   data () {
      return {
         open: {
				val: null,
				active: false
			},
         symbolId: 1,
         models: [],
         references: {}
      }
   },
   computed: {
      sessionsEditor() {
			if(this.$refs.sessionsEditor) return this.$refs.sessionsEditor;
			else if (this.references.sessionsEditor) return this.references.sessionsEditor;
			return null;
		},
	},
   beforeMount() {
      let open = 83000;
      let close = 163000;

      console.log(toTimeString(open));
   console.log(toTimeString(close));
   },
   mounted() {
		this.references = { ...this.$refs };
	},
   methods: {
      test() {
         console.log('test');
      },
      onOpenCanceled () {
         //this.open.active = false;
         this.open.val = '';
                  console.log('onOpenCanceled', this.open);
      },
      onOpenPicked() {
         this.$nextTick(() => {
            this.open.active = false;
         })
         console.log('onOpenPicked', this.open);
      },
      onSubmit() {
			this.sessionsEditor.submit();     
		},
      onSessionSubmit() {
         console.log('onSessionSubmit');
      }
   }
}
</script>

<style>

</style>