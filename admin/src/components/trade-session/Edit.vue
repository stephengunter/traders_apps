<template>
   <v-row>
      <v-col cols="12">
         <span class="titleText">Trade Sessions</span>
         <core-button-create
         class_name="ml-3 mb-2" tooltip="新增"
         @create="add"
         />
      </v-col>
      <v-col cols="12">
         <validation-observer ref="validator">
            <v-data-table :items="models" :headers="headers" hide-default-header hide-default-footer>
               <template v-slot:body="{ items }">
                  <tbody>
                     <tr v-for="(item, index) in items" :key="index">
                        <td>
                           <v-checkbox label="Default" v-model="item.default" @change="onDefaultChanged(index)"
                           />
                        </td>
                        <td>
                           <validation-provider :name="getKey(index, 'open')">
                              <v-text-field readonly :value="item.open" prepend-icon="mdi-clock-time-four-outline"
                              :error-messages="getErrMsg(getKey(index, 'open'))"
                              @click="selectTime(index, 'open')"
                              />
                           </validation-provider>
                        </td>
                        <td>
                           <validation-provider :name="getKey(index, 'close')">
                              <v-text-field readonly :value="item.close" prepend-icon="mdi-clock-time-four-outline"
                              :error-messages="getErrMsg(getKey(index, 'close'))"
                              @click="selectTime(index, 'close')"
                              />
                           </validation-provider>
                        </td>
                        <td>
                           <v-btn @click.prevent="remove(index)" small icon color="error">
                              <v-icon>mdi-delete-circle</v-icon>
                           </v-btn>
                        </td>   
                     </tr>
                  </tbody>
               </template>
            </v-data-table>
         </validation-observer>
      </v-col>
      <v-dialog v-model="timePicker.active" persistent width="290px">
			<v-time-picker v-if="timePicker.active" v-model="timePicker.val" full-width
         >
            <v-spacer></v-spacer>
          <v-btn text color="default" @click="timePicker.active = false">
            Cancel
          </v-btn>
          <v-btn text color="primary" @click="onTimePicked">
            OK
          </v-btn>
        </v-time-picker>
		</v-dialog>
   </v-row>
   
</template>


<script>
import { getErrorMsg, clearErrors, toTimeNumber, toTimeString } from '@/utils';

export default {
	name: 'TradeSessionEdit',
	props: {
		symbol_id: {
         type: Number,
         default: 0
      },
      init_models: {
         type: Array,
         default: () => []
		}
	},
	data () {
		return {
         models: [],
			headers: [
            {
               width: '50px',
					sortable: false,
					text: '',
					value: ''
				},
				{
					sortable: false,
					text: '',
					value: ''
            },
            {
					sortable: false,
					text: '',
					value: ''
            },
            {
               width: '50px',
					sortable: false,
					text: '',
					value: ''
				}
         ],

         timePicker: {
            index: -1,
            active: false,
            key: '',
            val: ''
         },

         references: {},
		}
   },
   computed: {
      validator() {
			if(this.$refs.validator) return this.$refs.validator;
			else if (this.references.validator) return this.references.validator;
			return null;
		}
	},
	beforeMount() {
      this.models = this.init_models.map(item => {
         return {
            ...item,
            open: toTimeString(item.open),
            close: toTimeString(item.close)
         }
      });
   },
   mounted() {
		this.references = { ...this.$refs };
	},
	methods: {
      add() {
         let defaultItems = this.getDefaultItems();
         this.models.push({
            id: 0,
            symbolId: this.symbol_id,
            default: defaultItems.length > 0 ? false : true,
            title: '',
            open: '',
            close: ''
         });
      },
		remove(index) {
         this.models.splice(index, 1);
      },
      getDefaultItems() {
         return this.models.filter(item => item.default);
      },
      onDefaultChanged(index) {
         let defaultItems = this.getDefaultItems();
         if(defaultItems.length > 1) {
            for(let i = 0; i < this.models.length; i++) {
               if(i !== index) this.models[i].default = false;
            }
         }
      },
      getKey(index, name) {
         return `${index}_session_${name}`;
      },
      selectTime(index, key) {
         let model = this.models[index];
         this.timePicker.index = index;
         this.timePicker.key = key;
         this.timePicker.val = model[key];
         this.timePicker.active = true;
      },
      onTimePicked() {
         let key = this.timePicker.key;
         let index = this.timePicker.index
         if(key === 'open') {
            this.models[index].open = this.timePicker.val;
         }else {
            this.models[index].close = this.timePicker.val;
         }
         
         this.timePicker.index = -1;
         this.timePicker.key = '';
         this.timePicker.val = '';
         this.timePicker.active = false;
      },
      getErrMsg(key) {
         if(!this.validator) return '';
         return getErrorMsg(this.validator.errors, key);
      },
      checkContent() {
         let errors = { ...this.validator.errors };
         let keys = [];
         for(let i = 0; i < this.models.length; i++) {
            let session = this.models[i];
            let key = '';
            if(!session.open) {
               key = this.getKey(i, 'open');
               errors[key] = ['必須填寫Open'];
               keys.push(key);
            }
            if(!session.close) {
               key = this.getKey(i, 'close');
               errors[key] = ['必須填寫Close'];
               keys.push(key);
            }
         }

         if(keys.length) {
            this.validator.setErrors(errors);
            return false;
         } else return true;
      },
		clearContentError(indexes = []) {
         let keys = [];
         for(let i = 0; i < indexes.length; i++) {
            keys.push(this.getKey(i, 'open'));
            keys.push(this.getKey(i, 'close'));
         }
			let errors = clearErrors(this.validator.errors, keys);
			this.validator.setErrors(errors);
		},
      submit() {
         let indexes = this.models.map((item, index) => index);
         this.clearContentError(indexes);

         this.validator.validate().then(valid => {
            if(!valid) return;
            if(!this.checkContent()) return;

            let sessions = this.models.map(item => {
               return {
                  ...item,
                  open: toTimeNumber(item.open),
                  close: toTimeNumber(item.close)
               }
            });
            this.$emit('submit', sessions);
         });
      }
	}
}
</script>
