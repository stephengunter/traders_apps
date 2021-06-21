<template>
<validation-observer ref="validator">
	<v-card v-if="ready">
		<v-card-title>
			<h3>{{ title }}</h3>
			<span v-if="model.id" class="headline ml-3">Id : {{ model.id }}</span>
			<v-spacer />
			<v-btn @click.prevent="cancel" icon>
				<v-icon>mdi-window-close</v-icon>
			</v-btn>
		</v-card-title>
		<v-card-text>
			<v-container>
				<v-row>
					<v-col cols="12">
						<validation-provider v-slot="{ errors }" name="code" rules="required">
							<v-text-field label="Code" v-model="model.code" required
							:error-messages="errors"
							/>
						</validation-provider>
					</v-col>
					
					<v-col cols="12">
						<validation-provider v-slot="{ errors }" name="title" rules="required">
							<v-text-field label="Title" v-model="model.title" required
							:error-messages="errors"
							/>
						</validation-provider>
					</v-col>
					<v-col cols="6">
						<v-select label="Type"
						:items="type_options" v-model="model.type"
						/>
					</v-col>
					<v-col cols="6">
						<v-select label="TimeZone"
						:items="timezone_options" v-model="model.timeZone"
						/>
					</v-col>
				</v-row>

				<core-error-list />

				<v-row>
					<v-col cols="12">
						<v-radio-group v-model="params.active" row @change="onActiveChanged">
							<v-radio v-for="(item, index) in active_options" :key="index"
							:label="item.text" :value="item.value"
							/>
						</v-radio-group>
					</v-col>
				</v-row>
			</v-container>
		</v-card-text>
		<v-card-actions>
			<v-container>
				<v-row>
					<v-col cols="6">
						<v-btn @click.prevent="onSubmit" color="success">
						存檔
						</v-btn>
					</v-col>
					<v-col cols="6" class="text-right">
						<v-btn v-if="model.canRemove" @click.prevent="onRemove" color="error">
						刪除
						</v-btn>
					</v-col>
				</v-row>
				
			</v-container>
		</v-card-actions>
	</v-card>
</validation-observer>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import { STORE_SYMBOL, UPDATE_SYMBOL, REMOVE_SYMBOL,
 ERRORS, SHOW_CONFIRM } from '@/store/actions.type';
import { CLEAR_ERROR, SET_ERROR } from '@/store/mutations.type';

export default {
	name: 'SymbolEdit',
	props: {
		model: {
         type: Object,
         default: null
		},
		version: {
         type: Number,
         default: 0
		},
		type_options: {
         type: Array,
         default: () => []
		},
		timezone_options: {
         type: Array,
         default: () => []
		},
		active_options: {
         type: Array,
         default: () => []
		}
	},
	data () {
		return {
			ready: false,

			params: {
				active: 0
			},

			references: {}
		}
	},
	computed: {
		title(){
			let text = 'Symbol';

			if(this.model.id) return `Edit ${text}`;
			return `Create ${text}`;	
		},
		validator() {
			if(this.$refs.validator) return this.$refs.validator;
			else if (this.references.validator) return this.references.validator;
			return null;
		}
	},
	watch: {
      version: 'onVersionChanged'
   },
	beforeMount() {
		this.params.active = this.model.active ? 1 : 0;
		
		this.ready = true;
	},
	mounted() {
		this.references = { ...this.$refs };
	},
	methods: {
		onActiveChanged(val) {
			this.model.active = val > 0;
		},
		cancel(){
			this.validator.reset();
         this.$emit('cancel');
		},
		onSubmit() {
         this.validator.validate().then(valid => {
				if(valid) {
					let model = this.model;
					this.$store.commit(CLEAR_ERROR);
					this.$store.dispatch(model.id ? UPDATE_SYMBOL : STORE_SYMBOL, model)
					.then(symbol => {
						this.$emit('saved', symbol);	
					})
					.catch(error => {
						if(!error)  Bus.$emit(ERRORS);
						else this.$store.commit(SET_ERROR, error);
					})
				}
         });         
		},
		onRemove() {
			Bus.$emit(SHOW_CONFIRM, {
				type: 'error',
				title: '確定要刪除嗎?',
				onOk: this.submitDelete,
				onCancel: () => {}
			});
		},
		submitDelete() {
			this.$store.commit(CLEAR_ERROR);
			let id = this.model.id;
			this.$store.dispatch(REMOVE_SYMBOL, id)
			.then(() => {
				this.$emit('saved');
			})
			.catch(error => {
				Bus.$emit(ERRORS);
			})
		}
	}
}
</script>
