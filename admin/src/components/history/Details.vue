<template>
   <v-card>
      <v-card-title>
			<h3>{{ model.symbol }}</h3>
			<span class="headline ml-3">{{ model.date }}</span>
			<v-spacer />
			<v-btn @click.prevent="cancel" icon>
				<v-icon>mdi-window-close</v-icon>
			</v-btn>
		</v-card-title>
      <v-card-text>
			<v-container>
				<v-row>
					<v-col cols="12">
						<v-data-table :headers="headers" :items="list" hide-default-footer 
                  :server-items-length="list ? list.length : 0">
                  </v-data-table>
					</v-col>
				</v-row>
            <core-table-pager v-if="pagedList" v-show="list.length > 0"
            :model="pagedList" :responsive="responsive"
            @pageChanged="onPageChanged" @sizeChanged="onPageSizeChanged"
            />
			</v-container>
		</v-card-text>
   </v-card>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import { HISTORY_DETAILS } from '@/store/actions.type';
import { onError } from '@/utils';
export default {
	name: 'HistoryDetails',
	props: {
      model: {
         type: Object,
         default: null 
      }
	},
	data() {
		return {
         params: {
            symbol: '',
            date: '',
            page: 1,
            pageSize: 10
         },
         pagedList: null,
         headers: [{
            text: 'Symbol', value: 'symbol', sortable: false
         },{
            text: 'Date', value: 'date', sortable: false
         },{
            text: 'Time', value: 'time', sortable: false
         },{
            text: 'Price', value: 'price', sortable: false
         },{
            text: 'Open', value: 'open', sortable: false
         },{
            text: 'High', value: 'high', sortable: false
         },{
            text: 'Low', value: 'low', sortable: false
         },{
            text: 'Vol', value: 'vol', sortable: false
         }]
		}
   },
   computed: {
      ...mapGetters(['responsive']),
		list() {
         if(!this.pagedList) return [];
         return this.pagedList.viewList;
		}
	},
   beforeMount() {
      this.params.symbol = this.model.symbol;
      this.params.date = this.model.date;
      this.fetchData();
   },
	methods: {
      fetchData() {
			this.$store.dispatch(HISTORY_DETAILS, this.params)
			.then(model => {
				this.pagedList = model;
			})
			.catch(error => {
				onError(error);
         });
		},
      onPageChanged(page) {
			this.params.page = page;
			this.fetchData();
		},
		onPageSizeChanged(size) {
			this.params.pageSize = size;
			this.params.page = 1;
			this.fetchData();
		},
      cancel() {
         this.$emit('cancel');
      }
	}
}
</script>
