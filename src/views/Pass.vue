<template>
<div class="detail">
    <div class="detailCard">
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
        <div class="adds">
            <span>Adds/</span>
            <span class="left">{{question}}</span>
        </div>
        <div>
            <button class="yes button" @click='prev'>OK:)</button>
        </div>
    </div>
</div>
</template>

<script>
    import Cookie from '.././cookie.js'
    export default {
        name: 'passDetail',
        data(){
            return{
                token:"",
                aid: 0,
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
            this.token = Cookie.getCookie('token');
            this.aid = this.$route.params.aid;
            this.getDetail(this.aid);
        },
        methods:{
            prev(){
                this.$router.go(-1)
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
.back{
    width: 34px;
    height: 36px;
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
    left: 3%;
    font-size: 14px;
    border:1px solid rgba(0,0,0,0.12);
    border-radius: 5px;
}
.left{
    margin-left: 5px;
}
.yes{
    background-color: #E8E0FB;
    color: #3B00DD;
}
.wait{
    margin-top: 5px;
    color: #878787;
    font-size:18px;
}
</style>

