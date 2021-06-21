<template>
<div>
   <v-dialog v-model="photo.active" :max-width="photo.maxWidth">
      <v-card v-if="photo.model">
         <core-close-icon-button @close="showPhoto(null)" />
         <v-card-text>
            <div class="text-center" style="padding-top:36px;">
               <v-img class="img-center" :src="photo.model.id | photoIdUrl"
                  :max-width="photo.model.width"
               />
               <span v-if="photo.model.title" style="font-size: 16px; display: inline-block;" class="mt-3" v-text="photo.model.title"></span>
            </div>
         </v-card-text>
      </v-card>
   </v-dialog>
   
</div>      
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { SHOW_PHOTO } from '@/store/actions.type';
import { DIALOG_MAX_WIDTH } from '@/config';
import { onError } from '@/utils';

export default {
   name: 'LayoutShow',
   data() {
      return {
         photo: {
				active: false,
				model: null,
				maxWidth: DIALOG_MAX_WIDTH
         }
      };
   },
   computed: {
		...mapGetters(['responsive','contentMaxWidth'])
	},
   created() {
      Bus.$on(SHOW_PHOTO, this.showPhoto);
	},
	mounted() {
		
	},
	beforeDestroy() {
		
   },
   methods: {
      showPhoto(photo) {
         if(photo) {
            this.photo.model = photo;
				this.photo.active = true;
			}else {
				this.photo.model = null;
				this.photo.active = false;
			}
      }
   }
}
</script>