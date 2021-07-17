<template>
   <core-container>
      <history-header :responsive="responsive"
      :params="params" :can_import="canImport"
		:symbol_options="symbolOptions"
		@submit="onParamsChanged" @import="onImport"
		/>
      <v-row>
         <v-col cols="12">
            <history-table :list="list"
            @select="onDetails"
				/>
         </v-col>
      </v-row>
      <v-dialog v-model="details.active" persistent :max-width="details.maxWidth">
			<div v-if="details.model">
				<history-details :model="details.model"
            @cancel="cancelDetails"
				/>
			</div>
		</v-dialog>
   </core-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { CONTENT_MAX_WIDTH } from '@/store/getters.type';
import { FETCH_HISTORIES, IMPORT_HISTORY_QUOTES, ERRORS } from '@/store/actions.type';
import { CLEAR_ERROR, SET_ERROR } from '@/store/mutations.type';
import { onError, scrollToTop } from '@/utils';
import { DIALOG_MAX_WIDTH } from '@/config';

export default {
   name: 'HistotiesView',
   data() {
      return {
         params: {
            symbol: '',
            date: '',
            page: -1,
            pageSize: 10
         },
         symbolOptions : [],
         pagedList: null,
         details: {
            active: false,
				maxWidth: DIALOG_MAX_WIDTH,
            model: null
         }

      }
   },
   computed: {
      ...mapGetters([CONTENT_MAX_WIDTH, 'responsive']),
      firstLoad() {
			return this.params.page < 0;
		},
      list() {
			if(this.pagedList) {
				return this.pagedList.viewList;
			} return [];
		},
      canImport() {
         if(!this.params.symbol) return false;
         if(!this.params.date) return false;
         return true;
      }
	},
   beforeMount() {
      this.fetchData();
   },
   mounted() {
		
	},
   methods: {
      onParamsChanged() {
         if(this.params.date || this.params.symbol) this.fetchData();
		},
      fetchData() {
         this.$store.dispatch(FETCH_HISTORIES, this.params)
         .then(model => {
				if(this.firstLoad) {
               this.symbolOptions = model.symbolOptions.slice(0);
               this.params.page = 1;
            }else {
               this.pagedList = model.pagedList;
            } 
			})
			.catch(error => {
				onError(error);
         });
      },
      onDetails(item) {
         this.setDetailsModel(item);
      },
      setDetailsModel(model) {
			if(model) {
				this.details.model = model;
				this.details.maxWidth = this[CONTENT_MAX_WIDTH] ? this[CONTENT_MAX_WIDTH] : DIALOG_MAX_WIDTH;
				this.details.active = true;
			}else {
				this.details.model = null;
				this.details.active = false;
			}
		},
      cancelDetails() {
			this.setDetailsModel(null);
		},
      onImport(file) {
         let model = {
            symbol: this.params.symbol,
            date: this.params.date,
            file
         };
         this.$store.commit(CLEAR_ERROR);
         this.$store.dispatch(IMPORT_HISTORY_QUOTES, model)
         .then(() => {
            this.fetchData();
         })
         .catch(error => {
            if(!error)  Bus.$emit(ERRORS);
            else this.$store.commit(SET_ERROR, error);
         })
      }
   }
}
</script>

<style>

</style>