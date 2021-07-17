<template>
	<v-row v-if="responsive">
		<v-col cols="8">
			<v-select label="Symbol" @change="submit"
			:items="symbol_options" v-model="params.symbol"
			/>
		</v-col>
		<v-col cols="4" class="text-right">
			<core-upload-button color="info" class="ma-3"
			:multiple="false" :is_media="false" :disabled="!can_import"
			:allow_types="importing.types"
			@file-added="onFileAdded"
			>
			匯入<v-icon right dark>mdi-upload</v-icon>
			</core-upload-button>
			<core-error-list />
		</v-col>
		<v-col cols="12">
			<v-menu full-width max-width="290"
			v-model="date.active"
			:close-on-content-click="false"
			>
				<template v-slot:activator="{ on }">
					<v-text-field clearable label="Date" readonly
					:value="date.val" v-on="on"
					@click:clear="onDateClear" 
					/>
				</template>

				<v-date-picker locale="zh-cn"
				v-model="date.val"
				@input="onDateChanged" 
				/>
			</v-menu>
		</v-col>
	</v-row>
	<v-row v-else>
		<v-col cols="4">
			<v-select label="Symbol" @change="submit"
			:items="symbol_options" v-model="params.symbol"
			/>
		</v-col>
		<v-col cols="4">
			<v-menu full-width max-width="290"
			v-model="date.active"
			:close-on-content-click="false"
			>
				<template v-slot:activator="{ on }">
					<v-text-field clearable label="Date" readonly
					:value="date.val" v-on="on"
					@click:clear="onDateClear" 
					/>
				</template>

				<v-date-picker locale="zh-cn"
				v-model="date.val"
				@input="onDateChanged" 
				/>
			</v-menu>
		</v-col>
		<v-col cols="4" class="text-right">
			<core-upload-button color="info" class="ma-3"
			:multiple="false" :is_media="false" :disabled="!can_import"
			:allow_types="importing.types"
			@file-added="onFileAdded"
			>
			匯入<v-icon right dark>mdi-upload</v-icon>
			</core-upload-button>
			<core-error-list />
		</v-col>
	</v-row>
</template>

<script>

export default {
	name: 'HistoryHeader',
	props: {
		responsive: {
			type: Boolean,
			default: false
		},
		can_import: {
			type: Boolean,
			default: false
		},
		params: {
			type: Object,
			default: null
		},
		symbol_options: {
         type: Array,
         default: () => []
		}
   },
	data () {
		return {
			date: {
				active: false,
				val: ''
			},
			importing: {
				types: ['.csv']
			}
		}
	},
	beforeMount() {
		this.init();
   },
   methods: {
		init() {
			this.date.val = this.params.date;
		},
		onDateChanged() {
			this.date.active = false;
			this.submit();
		},
		onDateClear() {
			this.date.val = '';
			this.submit();
		},
		submit() {
			this.params.date = this.date.val;
			this.$emit('submit');
		},
		onImport() {
			console.log('import');
		},
		onFileAdded(files) {
         this.$emit('import', files[0]);
      }
   }
}
</script>

<style>

</style>