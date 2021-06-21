<template>
   <v-data-table :headers="headers" :items="list" hide-default-footer :server-items-length="list ? list.length : 0">
     
      <template v-slot:[`item.action`]="{ item }">
         <v-tooltip v-if="item.active" top>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on"
               @click.prevent="off(item.id)"
               >
						<v-icon>mdi-arrow-down-bold-circle-outline</v-icon>
					</v-btn>
				</template>
				<span>下架</span>
			</v-tooltip>
         <v-btn v-else @click.prevent="edit(item.id)" icon color="success">
            <v-icon small>mdi-pencil</v-icon>
         </v-btn>
      </template>
      <template v-slot:[`item.status`]="{ item }">
         <v-chip small v-if="item.active" color="success" text-color="white">{{ item.statusText }}</v-chip>
         <v-chip small v-else>{{ item.statusText }}</v-chip>
      </template>
      <template v-slot:[`item.code`]="{ item }">
         <p v-html="item.code"></p>
      </template>
      <template v-slot:[`item.title`]="{ item }">
         <p v-text="item.title"></p>
      </template>
      <template v-slot:[`item.type`]="{ item }">
         <v-chip small
         :color="typeColor(item.type)" text-color="white"
         >
         {{ item.type }}
         </v-chip>
      </template>
   </v-data-table>
</template>


<script>
import { getSymbolTypeColor } from '@/utils';
export default {
	name: 'SymbolTable',
	props: {
      list: {
         type: Array,
         default: () => []
      }
	},
	data () {
		return {
         headers: [{
            text: '', value: 'action', sortable: false, width: '30px'
         },{
            text: '狀態', value: 'status', sortable: false, width: '90px'
         },{
            text: 'Code', value: 'code', sortable: false
         },{
            text: 'Title', value: 'title', sortable: false
         },{
            text: 'Type', value: 'type', sortable: false
         }]
		}
   },
	methods: {
      edit(id){
         this.$emit('edit', id);
      },
      off(id) {
         this.$emit('off', id)
      },
      typeColor(type) {
         return getSymbolTypeColor(type);
      }
	}
}
</script>
