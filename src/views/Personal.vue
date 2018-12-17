<template>
  <div class="personal">
    <Activities page="1" />
    <div class="tab">
      <router-link to="/" class="tab-item">
        <img class="tab-icon" src="../assets/icon_tab_1_32px@3x.png" />
        <div class="tab-text">Universe</div>
      </router-link>
      <router-link to="/personal" class="tab-item">
        <img class="tab-icon" src="../assets/icon_tab_2_32px@3x.png" />
        <div class="tab-text">U&Me</div>
      </router-link>
    </div>
  </div>
</template>
<script>

import Activities from '@/components/activities.vue'

export default {
  name: 'personal',
  components: {
    Activities
  }
}
</script>
<style scoped>

</style>
