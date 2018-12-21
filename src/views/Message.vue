<template>
<div class="message">
    <div class="wrongPage" v-if="success">
        <p class="wrongMessage">{{wrongMessage}}</p>
    </div>
    <div class="datilCard" v-if="!success">
        <img class="last" @click='last' src="../assets/back.png" />
        <img class="next" @click='next' src="../assets/next.png" />
        <div class="actionTime aciton-detail">
            <span>Time/</span>
            <span>{{datetime}}</span>
            <span>{{time}}</span>
        </div>
        <div class="actionLocation aciton-detail">
            <span>Location/</span>
            <span>{{location}}</span>
        </div>
        <div class="event aciton-detail">
            <span>Event/</span>
            <span>{{event}}</span>
        </div>
        <div class="message-adds">
            <span>Adds/</span>
            <span>{{question}}</span>
        </div>
        <div class="message-reply">
            <span>Reply/</span>
            <span>{{answer}}</span>
        </div>
        <button class="no button" >NO:(</button>
        <button class="yes button" @click='pass'>OK:)</button>
    </div>
</div>
</template>

<script>
    import Cookie from '.././cookie.js'
    export default {
        name: 'messageReply',
        data(){
            return{
                WrongMessage: "",
                success: false,
                token:"",
                unum: "",
                aid: 0,
                position:0,
                MessageData:{
                    datetime: "",
                    location: "",
                    event: "",
                    question: "",
                    answer: "",
                    time: "",
                    readed: false
                },
                messageCount: 0,
                messageList: []
            }
        },
        mounted() {
            this.token = Cookie.getCookie('token'),
            this.unum = Cookie.getCookie('unum'),
            this.aid = this.$route.params,
            this.getReplyList()
        },
        methods:{
            last(){
                if(this.position === 0){
                    this.$router.push({path:'/personal'})
                }
                else{
                    this.position = this.position - 1;
                    this.getReplyDetail(this.messageList[this.position].mid);
                }
            },
            next(){
                if(this.position === this.messageCount -1);
                else{
                    this.position = this.position + 1;
                    this.etReplyDetail(this.messageList[this.position].mid);
                }
            },
            getReplyList(){
                fetch("api/user/"+ this.unum +"/activity/" + this.aid +"/message/list/",{
                    method:"GET",
                    path:{
                        "type": "all"
                    },
                    headers:{
                        "token": this.token,
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.messageCount = res.messageCount,
                        this.messageList = res.messageList,
                        this.getReplyDetail(this.messageList[this.position].mid)
                    }
                    else if(res.status === 401){
                        this.$router.push({path:'/'})
                    }
                    else if(res.status === 406){
                        this.success = true,
                        this.WrongMessage = "该用户不存在"
                    }
                    else if(res.status === 407){
                        this.success = true,
                        this.WrongMessage = "请检查你自己的消息"
                    }
                })
            },
            getReplyDetail(mid){
                fetch("api/user/" + this.unum + "/message/" + mid +"/",{
                    method:"GET",
                    headers:{
                        "token": this.token,
                        "Content-Type": "application/json"
                    }
                }).then(res=>{
                    if (res.status === 200) {
                        this.MessageData = res
                    }
                    else if(res.status === 401){
                        this.$router.push({path:'/'})
                    }
                    else if(res.status === 406){
                        this.success = true,
                        this.WrongMessage = "消息不见啦"
                    }
                    else if(res.status === 407){
                        this.success = true,
                        this.WrongMessage = "请检查你自己的消息"
                    }
                })
            },
            pass(){
                fetch("api/activity/" + this.aid + "/",{
                    method:"PUT",
                    headers:{
                        "token": this.token,
                        "Content-Type": "application/json"
                    },
                    body:{
                        "pickerID": this.messageList[this.position].mid,//我不确定，这个OK是用哪个api
                        "atti": true
                    }
                }).then(res=>{
                    if(res.status === 200){
                        this.$router.push({path:'/personal'})
                    }
                })
            }
        }
    }
</script>

<style>
.datilCard{
    width:87%;
    padding: 16px 7px;
    min-height: calc(100vh - 120px);
    border:1px solid rgba(0,0,0,0.12);
    border-radius: 3px;
    margin: 0 auto;
    top: 18px;
    position: relative;
    height: 100px;
    background-color: white;
    border: 2px; 
}
.last{
    width: 34px;
    height: 36px;
}
.next{
    width: 34px;
    height: 36px;
    float: right;
}
.aciton-detail{
    font-size: 14px;
    margin-top: 19px;
    margin-left: 19px;
    max-width: 278px;
}
.personalMessage{
    margin-top: 19px;
    margin-left: 19px;
}
.wrong{
    width: 95%
}
.tips{
    font-size: 10px;
    color: #6200EE;
    margin-top: 26px;
    margin-left: 19px;
}
.message-adds{
    margin-left: 19px;
    margin-top: 31px;
    color: #6200EE;
    font-size: 14px;
    font-weight: bold;
}
.message-reply{
    margin-left: 19px;
    margin-top: 18px;
    color: #6200EE;
    font-size: 14px;
    font-weight: bold;
}
.button{
    width: 96px;
    height: 36px;
    text-align: center;
    position: absolute;
    bottom: 18px;
    font-size: 14px;
    border:1px solid rgba(0,0,0,0.12);
    border-radius: 5px;
}
.no{
    left: 42px;
    background-color: #7286FA;
    color:white;
}
.yes{
    right: 42px;
    background-color: #E8E0FB;
    color: #3B00DD;
}
.wrongPage{
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
</style>

