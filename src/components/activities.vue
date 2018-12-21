<template>
  <div class="activities">
    <login v-if="landing"/>
    <div class="act-item" v-on:click="checklogin(activity.activityID)" v-for = "activity in activityList" :key="activity.id">
      <div class="act-time">{{activity.datetime}}</div>
      <div class="act-event">{{activity.event}}</div>
    </div>
    <div class="act-none" v-if="!rowsNum">没有更多内容</div>
    <div class="add-act" v-on:click="add" >+</div>
  </div>
</template>

<script>
import Login from '@/components/login.vue'
import cookie from "../cookie";

export default {
  name: 'Activities',
  props: {
    page: String,
  },
  components: {
    Login
  },
  data(){
    return{
      activityList: [],
      hasNext: false,
      pageMax: 1,
      pageNum: 1,
      rowsNum: 0,
      token: cookie.getCookie('token'),
      landing: cookie.getCookie('landing') == 'true',
      login: cookie.getCookie('login') == 'true'
    }
  },
  mounted() {
    if(this.page == 0){ //所有可以pick
      this.fetchPickable();
    } else if (this.page == 1){//我发起的activity
      if(!this.login){
        this.landing = true;
      }else{
        this.fetchPost();
      }
    }
  },
  methods:{
    checklogin(id){
      if(!this.login){
        this.landing = true;
      } else {
        this.$router.push({
          name: 'actionDetail',
          params:{
            aid: id
          }
        });
      }
    },
    fetchPickable(){
      fetch(`/api/v1.0/activity/pickable/list/?page=${this.pageNum}`, {
        method: 'GET',
        headers: {
          "Content-Type":"application/json"
        }
      }).then(res => {
        if (res.ok){
          return res.json()
        }
      }).then(res => {
        this.activityList = res.activityList;
        this.hasNext = res.hasNext;
        this.pageMax = res.pageMax;
        this.pageNum = res.pageNum;
        this.rowsNum = res.rowsNum;
      })
    },
    fetchPost(){
      const stuNum = cookie.getCookie('stunum');
      fetch(`/api/v1.0/user/${stuNum}/post-activities/list/?page=${this.pageNum}`, {
        method: 'GET',
        headers: {
          "Content-Type":"application/json",
          token: this.token
        }
      }).then(res => {
        if (res.ok){
          return res.json()
        }
      }).then(res => {
        this.activityList = res.activityList;
        this.hasNext = res.hasNext;
        this.pageMax = res.pageMax;
        this.pageNum = res.pageNum;
        this.rowsNum = res.rowsNum;
      })
    },
    add(){
      this.$router.push('/new')
    }
  },
  watch: {
    '$route': function(){
      this.landing = cookie.getCookie('landing') == 'true'; //更新landing状态
      //重新获取数据
      if(this.page == 0){ //所有可以pick
        this.fetchPickable();
      } else if (this.page == 1){//我发起的activity
        if(!this.login){
          this.landing = true;
        }else{
          this.fetchPost();
        }
      }
    },
    'landing': function(){
      cookie.setCookie('landing',this.landing);
    }
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.activities{
  padding-top: 18px ;
  height: calc(100vh - 56px);
  overflow-y: scroll;
  box-sizing: border-box;
}
.act-item{
  background: #FFFFFF;
  width:288px;
  height:72px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 3px;
  margin-bottom: 16px;
}
.act-time{
  font-size:14px;
  color:rgba(0,0,0,0.6);
  line-height:20px;
}
.act-event{
  font-size:16px;
  line-height:22px;
  color: #4A4A4A;
  margin-top: 3px;
}
.act-none{
  text-align: center;
  color: #FFFFFFcc;
  font-size: 20px;
}
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
