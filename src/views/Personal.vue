<template>
  <div class="personal">
    <Activities page="1" />
    <Tab />
  </div>
</template>
<script>

import Activities from '@/components/activities.vue'
import Tab from '@/components/tab.vue'

export default {
  name: 'personal',
  components: {
    Activities,
    Tab
  }
}
</script>
<style scoped>

</style>
