<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view/>
    <!-- </keep-alive> -->
    <Tab />
  </div>
</template>
<script>
import Tab from './components/tab.vue'
export default {
  components: {
    Tab
  },
}
</script>


<style>
body{
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  background-color: #081837;
  height: 100vh;
  width: 100%;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: black;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
