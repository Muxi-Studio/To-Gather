<template>
  <div class="activities">
    <login v-if="landing"/>
    <div class="act-item" v-on:click="checklogin(activity.activityID)" v-for = "activity in activityList" :key="activity.id">
      <div class="act-time">{{activity.datetime}}</div>
      <div class="act-event">{{activity.event}}</div>
    </div>
    <div class="act-none" v-if="!rowsNum">没有更多内容</div>
  </div>
</template>

<script>
import Login from '@/components/login.vue'

export default {
  name: 'Activities',
  // props: {
  //   page: Number,
  // },
  components: {
    Login
  },
  data(){
    return{
      activityList: [
        // {
        //     "activityID": 1,
        //     "datetime": "2019-01-01 20:00-21:00",
        //     "event": "学习"
        // },
        // {
        //     "activityID": 2,
        //     "datetime": "2020-12-02 20:00-21:00",
        //     "event": "学习"
        // },
        // {
        //     "activityID": 3,
        //     "datetime": "2020-02-28 20:00-21:00",
        //     "event": "一起看场电影吧一起看场电影吧一起看场电影吧一起看场电影吧一起看最多36字"
        // },
        // {
        //     "activityID": 4,
        //     "datetime": "2025-12-12 14:00-23:00",
        //     "event": "最多36字最多36字"
        // },
        // {
        //     "activityID": 5,
        //     "datetime": "2025-12-25 14:00-23:00",
        //     "event": "啦啦啦啦啦绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿"
        // },
        // {
        //     "activityID": 6,
        //     "datetime": "2021-04-26 00:00-23:00",
        //     "event": "真真真真真真"
        // },
        // {
        //     "activityID": 7,
        //     "datetime": "2021-04-26 00:00-23:00",
        //     "event": "xixixixi"
        // }
      ],
      hasNext: false,
      pageMax: 1,
      pageNum: 1,
      rowsNum: 0,
      stuNum: localStorage.stuNum,
      token: localStorage.token,
      landing: false
    }
  },
  mounted() {
    if(this.page == 0){ //所有可以pick
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
    } else if (this.page == 1){//我发起的activity
      if(!localStorage.login ||localStorage.login == "false"){
        this.landing = true;
      }else{
        fetch(`/api/v1.0/user/${this.stuNum}/post-activities/list/?page=${this.pageNum}`, {
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
      }
    }
  },
  updated(){
    if(localStorage.login == 'true'){
      this.landing = false;
    }
  },
  methods:{
    checklogin(id){
      console.log(id);
      if(!localStorage.login ||localStorage.login == "false"){
        this.landing = true;
      }
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
</style>
