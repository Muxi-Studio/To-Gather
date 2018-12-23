<template>
  <div id="app">
      <router-view v-if="isRouterAlive"/>
    <Tab />
  </div>
</template>
<script>
import Tab from './components/tab.vue'
export default {
  components: {
    Tab
  },
  data(){
    return {
      isRouterAlive: true
    }
  },
  provide(){
    return {
      reload: this.reload
    }
  },
  methods: {
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  }

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
