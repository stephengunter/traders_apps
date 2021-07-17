<template>
	<core-container>
      <symbol-header :params="params" :can_create="canCreate"
		:active_options="activeOptions"
		@submit="onParamsChanged" @create="onCreate"
		/>
		<v-row>
         <v-col cols="12">
            <symbol-table :list="list" @off="onOff" @edit="onEdit"
				/>
         </v-col>
      </v-row>


		<v-dialog v-model="editor.active" persistent :max-width="editor.maxWidth">
			<div v-if="editor.model">
				<symbol-edit :model="editor.model" :version="editor.version"
				:type_options="typeOptions" :timezone_options="timezoneOptions"
				:active_options="activeOptions"
				@saved="onSaved" @cancel="cancelEdit"
				/>
			</div>
		</v-dialog>
	</core-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { CONTENT_MAX_WIDTH } from '@/store/getters.type';
import { CLEAR_ERROR, SET_ERROR } from '@/store/mutations.type';
import { FETCH_SYMBOLS, CREATE_SYMBOL, EDIT_SYMBOL, OFF_SYMBOL,
SUCCESS } from '@/store/actions.type';
import { SYMBOL_TYPES, TIMEZONES } from '@/consts';
import { onError, isTrue } from '@/utils';
import { DIALOG_MAX_WIDTH } from '@/config';

export default {
	name: 'SymbolsView',
   data() {
		return {
			params: {
				active: 1
			},
			typeOptions: [],
			timezoneOptions: [],
			activeOptions: [{
				value: 1,
				text: '上架中'
			},{
				value: 0,
				text: '已下架'
			}],

			editor: {
				active: false,
				maxWidth: DIALOG_MAX_WIDTH,
				model: null,
				version: 0
			},

			references: {}
			
		}
	},
   computed: {
		...mapGetters([CONTENT_MAX_WIDTH]),
		...mapState({
			list: state => state.symbols.list
		}),
		canCreate(){
			if(this.params.active) return false;
			return !this.editor.active;
		},
	},
	beforeMount() {
		this.fetchData();
		for (const [key, value] of Object.entries(TIMEZONES)) {
			this.timezoneOptions.push({ value: value, text: value });
      }
		for (const [key, value] of Object.entries(SYMBOL_TYPES)) {
			this.typeOptions.push({ value: value, text: value });
      }
	},
	mounted() {
		this.references = { ...this.$refs };
	},
   methods: {
		onParamsChanged() {
			this.fetchData();
		},
		fetchData() {
			this.$store.dispatch(FETCH_SYMBOLS, this.params)
			.catch(error => {
				onError(error);
			});
		},
		setEditModel(model) {
			if(model) {
				this.editor.model = model;
				this.editor.maxWidth = this[CONTENT_MAX_WIDTH] ? this[CONTENT_MAX_WIDTH] : DIALOG_MAX_WIDTH;
				this.editor.active = true;
				this.editor.version += 1;
			}else {
				this.editor.model = null;
				this.editor.active = false;
			}
		},
		onOff(id) {
			this.$store.commit(CLEAR_ERROR);
			this.$store.dispatch(OFF_SYMBOL, id)
			.then(() => {
				this.fetchData();
			})
			.catch(error => {
				onError(error);
			})
		},
		cancelEdit() {
			this.setEditModel(null);
		},
		onEdit(id) {	
			this.$store.commit(CLEAR_ERROR);
			this.$store.dispatch(EDIT_SYMBOL, id)
			.then(model => {
				this.setEditModel(model);
			})
			.catch(error => {
				onError(error);
			})
		},
		cancelEdit() {
			this.setEditModel(null);
		},
		onCreate() {
			if(!this.canCreate) return;
			
			this.$store.commit(CLEAR_ERROR);
			this.$store.dispatch(CREATE_SYMBOL)
			.then(model => {
				this.setEditModel(model);
			})
			.catch(error => {
				onError(error);
			})
		},
		onSaved(model) {
			Bus.$emit(SUCCESS);
			this.fetchData();
			this.setEditModel(null);
		}
		
	}
}
</script>

<style>

</style>