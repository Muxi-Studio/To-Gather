<template>
  <div class="login">
    <div class="login-container">
      <div class="login-title">身份信息核验</div>
      <div class="inp-container" v-bind:class="{focus: focusName}">
        <input class="login-inp" placeholder="Name_姓名" @focus="handleFocus(0)" @blur="handleNotFocus(0)"/>
        <img class="login-icon" v-bind:src="[focusName ? nameIconfocus: nameIcon]" />
      </div>
      <div class="inp-container" v-bind:class="{focus: focusId}" >
        <input class="login-inp" placeholder="ID_学号" @focus="handleFocus(1)" @blur="handleNotFocus(1)" />
        <img class="login-icon" v-bind:src="[focusId ? idIconfocus: idIcon]" />
      </div>
      <div class="login-tip">*tips 信息仅用于Check-in，不会以任何方式泄露至宇宙中</div>
      <div class="login-but">Done</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return{
      nameIcon: require('../assets/icon_login_name1@3x.png'),
      nameIconfocus: require('../assets/icon_login_name@3x.png'),
      idIcon: require("../assets/icon_login_num1@3x.png"),
      idIconfocus: require('../assets/icon_login_num@3x.png'),
      focusName: false,
      focusId:false,
    }
  },
  props: {
    name: String,
    id: Number
  },
  methods:{
    handleFocus(value){
      if(value){
        this.focusId = true;
      } else {
        this.focusName = true;
      }
    },
    handleNotFocus(value){
      if(value){
        this.focusId = false;
      } else {
        this.focusName = false;
      }
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  color: #878787;
  height: calc(100vh - 56px)
}
.login-container{
  width:328px;
  min-height:252px;
  background: #FFFFFF;
  margin: 0 auto;
  border:1px solid rgba(0,0,0,0.12);
  border-radius: 3px;
  padding: 16px;
  box-sizing: border-box;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.login-title{
  font-size:18px;
}
.login-inp{
  width:264px;
  height:30px;
  font-size:16px;
  line-height:30px; 
  margin-top: 20px;
  border: none;
  outline: none;
}
.inp-container{
  width:288px;
  border-bottom: 2px solid #878787;
}
.focus{
  border-bottom: 2px solid #9013FE;
}
.login-icon{
  width: 24px;
  vertical-align: middle;
  
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
