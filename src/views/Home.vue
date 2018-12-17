<template>
  <div class="home">
    <!-- <Login /> -->
    <Activities page="0" />
    <div class="add-act">+</div>
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
// @ is an alias to /src
// import Login from '@/components/login.vue'
import Activities from '@/components/activities.vue'

export default {
  name: 'home',
  components: {
    Activities
  },
  data(){
    return{
    }
  },
  mounted(){
    if(!localStorage.login){
      localStorage.setItem('login', false);
    }
  }
}
</script>
<style scoped>
.add-act{
  width:56px;
  height:56px;
  border-radius: 50%;
  background: #6200EE;
  color: #FFFFFF;
  position: absolute;
  right: 24px;
  bottom: 70px;
  font-size:36px;
  line-height: 56px;
  text-align: center;

}
</style>

