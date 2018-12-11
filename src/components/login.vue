<template>
  <div class="login">
    <div class="login-container">
      <div class="login-title">身份信息核验</div>
      <input class="login-inp" placeholder="Name_姓名"/>
      <input class="login-inp" placeholder="ID_学号" />
      <div class="login-tip">*tips 信息仅用于Check-in，不会以任何方式泄露至宇宙中</div>
      <div class="login-but">Done</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    name: String,
    id: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  color: #878787;
}
.login-container{
  width:328px;
  height:252px;
  background: #FFFFFF;
  margin: 0 auto;
  border:1px solid rgba(0,0,0,0.12);
  border-radius: 3px;
  padding: 16px;
  box-sizing: border-box;
}
.login-title{
  font-size:18px;
}
.login-inp{
  width:288px;
  height:30px;
  font-size:16px;
  line-height:30px; 
  margin-top: 20px;
  border: none;
  border-bottom: 2px solid #878787;
  outline: none;
}
.login-tip{
  font-size:10px;
  line-height:1.4em;
  margin-top: 20px;
}
.login-but{
  width:96px;
  height:36px;
  background:rgba(232,224,251,1);
  border-radius:4px;
  line-height: 36px;
  text-align: center;
  margin: 0 auto;
  color: #9013FE;
}
</style>
