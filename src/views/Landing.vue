<template>
  <div>
    <div class="landing" >
      <img src="../assets/icon_loading_64px@6x.png" />
      <div class="landing-text">正在尝试登陆</div>
      <div class="landing-text">99%</div>
    </div>
  </div>
</template>
<script>
import cookie from "../cookie";

export default {
  name: 'landing',
  data(){
    return{
    }
  },
  mounted(){
    var data = {
      "std_num": cookie.getCookie('stunum'),
      "password": cookie.getCookie('password'),
      "username": cookie.getCookie('username')
    }
    fetch(`/api/v1.0/auth/login/`, {
        method: 'POST',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(data),
      }).then(res => {
        if (res.ok){
          return res.json()
        }
      }).then(res => {
        // localStorage.setItem('token', res.token);
        // localStorage.login = true;
        cookie.setCookie('token', res.token);
        cookie.setCookie('login', true);
        cookie.setCookie('landing', false);
        const path = this.$route.params.path === '/' ? '/': this.$route.params.path;
        this.$router.push(path);
      })
  }
}
</script>

<style scoped>
img{
  width: 64px;
  margin-top: 50%;
}
.landing{
  background: center / cover no-repeat url("../assets/bg.png");
  height: 100vh;
  text-align: center;
}

.landing-text{
  font-size: 18px;
  color: #FFFFFF;
}

</style>
