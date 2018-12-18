<template>
  <div class="home">
    <Activities page="0" />
    <div class="add-act">+</div>
    <Tab />
  </div>
</template>

<script>
// @ is an alias to /src

import Activities from '@/components/activities.vue';
import Tab from '@/components/tab.vue';

export default {
  name: 'home',
  components: {
    Activities,
    Tab,
  },
  data(){
    return{
    }
  },
  mounted(){
    if(!localStorage.login){
      localStorage.setItem('login', false);
      console.log('?');
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

