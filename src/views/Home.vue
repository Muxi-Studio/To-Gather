<template>
  <div class="home">
    <!-- <Login /> -->
    <Activities />

    <div class="tab">
      <router-link to="/" class="tab-item">
        <img class="tab-icon" src="../assets/icon_tab_1_32px@3x.png" />
        <div class="tab-text">Universe</div>
      </router-link>
      <router-link to="/landing" class="tab-item">
        <img class="tab-icon" src="../assets/icon_tab_2_32px@3x.png" />
        <div class="tab-text">U&Me</div>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Login from '@/components/login.vue'
import Activities from '@/components/activities.vue'

export default {
  name: 'home',
  components: {
    // Login,
    Activities
  }
}
</script>
<style scoped>
.tab{
  width: 100%;
  height: 56px;
  background: #6200EE;
  font-size: 12px;
  vertical-align: middle;
  position: fixed;
  bottom: 0;
  display:table
}
.tab-item{
  display: table-cell;
  width: 50%;
  text-align: center;
  vertical-align: middle;
}
.tab-icon{
  width: 32px;
}
.tab-text{
  color: #ffffff;
  display: block;
  text-decoration: none;
}
</style>

