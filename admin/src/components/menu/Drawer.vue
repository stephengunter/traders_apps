<template>
   <v-list-group v-if="item.subs && item.subs.length" color="white" no-action
   :prepend-icon="item.meta.icon"  append-icon="mdi-menu-down" :disabled="false"
   :value="isActive(item)" :active-class="item.active ? 'primary' : ''"
   >
      <template v-slot:activator>
         <v-list-item-content @click.prevent="linkTo(item)">
            <v-list-item-title v-text="item.meta.title" />
         </v-list-item-content>
      </template>
      <v-list-item v-for="(subItem, subIndex) in item.subs" :key="subIndex" :to="subItem.path" :class="subItem.active ? 'primary white--text' : ''">
         <v-list-item-title v-text="subItem.meta.title" />
         <v-list-item-icon>
            <v-icon v-text="subItem.meta.icon"></v-icon>
         </v-list-item-icon>
      </v-list-item>
   </v-list-group>
   <v-list-item v-else :to="item.path" active-class="primary white--text">
      <v-list-item-icon>
         <v-icon>{{ item.meta.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title  v-text="item.meta.title" />
   </v-list-item>
</template>


<script>
export default {
   name: 'MenuDrawer',
   props: {
      item: {
         type: Object,
         default: null
      },
      color: {
         type: String,
         default: 'info'
      },
   },
   methods: {
      isActive(item) {
         if(item.active) return true;

         if(item.subs && item.subs.length) {
            let subActive = item.subs.find(subItem => subItem.active);
            if(subActive) return true;
            return false;
         }else return false;
      },
      linkTo(item) {
         this.$router.push({ path: item.path});
      },
   }
}
</script>