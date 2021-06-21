<template>
	<v-row>
		<v-col cols="8">
			<v-radio-group v-model="params.active" @change="onParamsChanged" row>
				<v-radio v-for="(item, index) in active_options" :key="index"
				:label="item.text" :value="item.value"
				/>
			</v-radio-group>
		</v-col>
		<v-col cols="4" class="text-right">
			<core-button-create class_name="mt-2" tooltip="新增" :disabled="!can_create"
			@create="create"
			/>
		</v-col>
	</v-row>
</template>

<script>

export default {
	name: 'SymbolHeader',
	props: {
		params: {
			type: Object,
			default: null
		},
		active_options: {
         type: Array,
         default: null
		},
		can_create: {
			type: Boolean,
			default: false
		}
   },
   methods: {
		onParamsChanged() {
			this.$emit('submit');
		},
		create() {
         this.$emit('create');
		}
   }
}
</script>

<style>

</style>