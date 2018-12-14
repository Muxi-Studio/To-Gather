<template>
  <div id="app">
    <keep-alive>
    <router-view/>
    </keep-alive>
    <div class="tab">
      <router-link to="/" class="tab-item">
        <img class="tab-icon" src="./assets/icon_tab_1_32px@3x.png" />
        <div class="tab-text">Universe</div>
      </router-link>
      <router-link to="/personal" class="tab-item">
        <img class="tab-icon" src="./assets/icon_tab_2_32px@3x.png" />
        <div class="tab-text">U&Me</div>
      </router-link>
    </div>
  </div>
</template>

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
  width: 100%;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: black;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

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
