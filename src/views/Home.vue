<template>
  <div class="home">
    <!-- <Login /> -->
    <Activities page="0" />
    <div class="add-act">+</div>

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
  },
  data(){
    return{
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

