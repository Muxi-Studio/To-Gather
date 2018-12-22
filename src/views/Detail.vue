<template>
<div class="detail">
    <div :class="changeclass(OK)">
        <div class="wrongPage" v-if="success">
            {{WrongMessage}}
        </div>
        <div class="detailCard" v-if="!success">
            <img class="back" @click='prev' src="../assets/back.png" />
            <div class="actionTime aciton-detail">
                <span>Time/</span>
                <span class="left">{{date}}</span>
                <span class="left">{{time}}</span>
            </div>
            <div class="actionLocation aciton-detail">
                <span>Location/</span>
                <span class="left">{{location}}</span>
            </div>
            <div class="event aciton-detail">
                <span>Event/</span>
                <span class="left">{{event}}</span>
            </div>
            <div class="personalMessage" v-if="!pass">
                <img class="wrong" src="../assets/error.gif" />
                <p class="tip">*error 信息受损 具体联系方式待双方确认后显示</p>
            </div>
            <div v-if="pass">
                <p class="tips">*tips 请妥善保管以下信息 with Love&Peace</p>
                <div class="place aciton-detail">
                    <span>Place/</span>
                    <span class="left">{{location}}</span>
                </div>
                <div class="qq aciton-detail">
                    <span>QQ/</span>
                    <span class="left">{{qq}}</span>
                </div>
                <div class="tel aciton-detail">
                    <span>Tel/</span>
                    <span class="left">{{tel}}</span>
                </div>
            </div>
            <div class="adds">
                <span>Adds/</span>
                <span class="left">{{question}}</span>
            </div>
            <div>
                <button class="no button" @click='prev'>NO:(</button>
                <button class="yes button" @click='alter'>OK:)</button>
            </div>
        </div>
    </div>
    <div class="reply" v-if="OK">
        <img src='../assets/close.png' class="close" @click='close'/>
        <div class="wait">等待对方验证</div>
        <div class="replyOther">
            <input v-model="answer" class="inputReply" placeholder="Reply_回复对方" />
        </div>
        <div class="reply-tips">*tips 请合理展示亲切友好大方活泼可爱磨人的你</div>
        <button class="reply-button" @click='sendReply'>Done</button>
    </div>
</div>
</template>

<script>
    import Cookie from '.././cookie.js'
    export default {
        name: 'actionDetail',
        data(){
            return{
                WrongMessage: "",
                success: false,
                token:"",
                aid: 0,
                OK: false,
                pass: false,
                answer:"",
                date: "",
                time: "",                
                location: "",
                event: "",
                qq: "",
                tel: "",
                question: "",
                posterName: "",
                posterNum: "",
                status: [{
                    pickable: true,
                    close: true
                }]
            }
        },
        mounted() {
            if(Cookie.getCookie('token')){
                this.token = Cookie.getCookie('token');
            }else{
                this.$router.push({path:'/'})
            }
            this.aid = this.$route.params.aid;
            this.getDetail(this.aid);
        },
        methods:{
            prev(){
                this.$router.go(-1)
            },
            alter(){
                if(this.pass){
                    this.$router.go(-1)
                }
                else{
                    this.OK = true;
                }
            },
            close(){
                this.OK = false;
            },
            changeclass(OK){
                return OK ? 'detail dark': 'detail'
            },
            sendReply(){
                var answer = {
                    "answer": this.answer
                }
                fetch(`/api/v1.0/activity/${this.aid}/`,{
                    method:'POST',
                    headers:{
                        token: this.token,
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify(answer)
                }).then(res => {
                    if (res.status === 200) {
                        this.OK= false;
                    }
                    else if(res.status === 401){
                        this.$router.push({path:'/'})
                    }
                    else if(res.status === 402){
                        this.success = true,
                        this.OK = false,
                        this.WrongMessage = "你已经pick过这个活动哟，请耐心等待"
                    }
                    else if(res.status === 403){
                        this.success = true,
                        this.OK = false,
                        this.WrongMessage = "活动已过期"
                    }
                    else if(res.status === 406){
                        this.success = true,
                        this.OK = false,
                        this.WrongMessage = "活动已删除"
                    }
                    else if(res.status === 410){
                        this.success = true,
                        this.OK = false,
                        this.WrongMessage = "不可以pick你自己哟"
                    }
                })
            },
            getDetail(aid){
                fetch(`/api/v1.0/activity/${aid}/`, {
                method: 'GET',
                headers: {
                    token: this.token,
                    "Content-Type": "application/json"
                }
                }).then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else if(res.status === 401){
                    this.$router.push({path:'/'})
                }
                else if(res.status === 403){
                    this.success = true
                    this.WrongMessage = "活动已过期"
                }
                else if(res.status === 406){
                    this.success = true,
                    this.WrongMessage = "活动已删除"
                }
                }).then(res => {
                    this.date = res.date,
                    this.time = res.time,              
                    this.location = res.location,
                    this.event = res.event,
                    this.qq = res.qq,
                    this.tel = res.tel,
                    this.question = res.question,
                    this.posterName = res.posterName,
                    this.posterNum = res.posterNum,
                    this.status = res.status
                })
            },
        }
    }
</script>

<style scoped>
.detail{
    height: 100vh;
}
.detailCard{
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
.back{
    width: 34px;
    height: 36px;
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
.tip{
    font-size: 10px;
    color: #878787;
    margin-top: 9px;
}
.tips{
    font-size: 10px;
    color: #6200EE;
    margin-top: 26px;
    margin-left: 19px;
}
.adds{
    margin-left: 19px;
    margin-top: 26px;
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
.left{
    margin-left: 5px;
}
.yes{
    right: 42px;
    background-color: #E8E0FB;
    color: #3B00DD;
}
.dark{
    opacity: 0.4;
}
.reply{
    width:91%;
    min-height:252px;
    background: #FFFFFF;
    border:1px solid rgba(0,0,0,0.12);
    border-radius: 5px;
    padding: 16px;
    box-sizing: border-box;
    position: absolute;
    top:25%;
    left: 4.5%;
}
.wait{
    margin-top: 5px;
    color: #878787;
    font-size:18px;
}
.replyOther{
    color: #6200EE;
    font-size: 16px;
    margin-top: 23px;
}
.inputReply{
    width:98%;
    height:30px;
    font-size:16px;
    line-height:30px; 
    border: none;
    outline: none;
    border-bottom: 2px solid #6200EE;
}
.reply-tips{
    font-size: 10px;
    margin-top: 19px;
    color: #878787;
}
.reply-button{
    width: 96px;
    height: 36px;
    margin-top: 39px;
    margin-left: 33%;
    text-align: center;
    bottom: 18px;
    font-size: 14px;
    border:1px solid rgba(0,0,0,0.12);
    border-radius: 5px;
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
    padding: 120px 0;
    text-align: center;
    box-sizing: border-box;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    color: #6200EE;
}
.close{
    width: 18px;
    height: 20px;
    margin-left: 90%;
}
</style>

