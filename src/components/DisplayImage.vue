
<template>

  <div>
      <div v-if="geo != 'national'">
        <img v-bind:src="`${gitUrl}${geo}/${code}.png`" v-bind:width="`${widthImage}`" />
      </div>
  </div>
  
</template>

<script>
import store from '@/store'

export default {
  name: 'DisplayImage',
  store,
  data(){
    return {
    }
  },
  props: {
      gitUrl: String,
      widthImage: String
  },
  computed: {
    geo: function() {
      return store.state.user.selectedGeoLevel;
    },
    code: function() {
      return store.state.user.selectedGeoCode;
    }
  },
  methods: {
  },
  watch:{
  },
}
</script>
