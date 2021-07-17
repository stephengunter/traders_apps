<template>
   <v-data-table :headers="headers" :items="list" hide-default-footer :server-items-length="list ? list.length : 0">
      <template v-slot:[`item.count`]="{ item }">
         <a href="#" class="a-btn" @click.prevent="select(item)">
            {{ item.count }}
         </a>
      </template>
   </v-data-table>
</template>


<script>
export default {
	name: 'HistoryTable',
	props: {
      list: {
         type: Array,
         default: () => []
      }
	},
	data() {
		return {
         headers: [{
            text: 'Symbol', value: 'symbol', sortable: false
         },{
            text: 'Date', value: 'date', sortable: false
         },{
            text: 'Count', value: 'count', sortable: false
         }]
		}
   },
	methods: {
      select(item) {
         this.$emit('select', item);
      }
	}
}
</script>
