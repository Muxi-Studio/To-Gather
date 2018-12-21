<template>
    <div class="new">
        <img class="back" @click='prev' src="../assets/back.png" />
        <div class="content">
            <div class="new-date">
                <el-date-picker 
                    v-model="date" 
                    type="date" 
                    class="date"
                    placeholder="Date_日期" 
                    style="width: 100%;" 
                    :picker-options="pickerOptions1">
                </el-date-picker>
            </div>
            <input placeholder="Time_时间" v-modal="time" class="new-time font margin" />
            <input placeholder="Event_事件" v-model="event" class="new-event font margin" />
            <div class="newTips">*tips 以下信息仅在你二次确认之后，才将被对方接收</div>
            <input placeholder="Place_碰头地" v-model="location" class="new-place font margin" />
            <input placeholder="QQ_神奇编码" v-model="qq" class="new-qq font margin" />
            <input placeholder="Tel_电话" v-model="tel" class="new-tel font margin" />
            <input placeholder="Adds_还想说点啥" v-model="question" class="new-adds font" />
        </div>
        <div>
            <button class="no button" @click='prev'>NO:(</button>
            <button class="yes button" @click='alter'>OK:)</button>
        </div>
    </div>
</template>

<script>
import Cookie from '.././cookie.js'
export default {
    name: 'newActivity',
    data(){
        return{
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                }
            },
            date: "",
            year: 0,
            month: 0,
            day: 0,
            time: "",
            location: "",
            event:"",
            qq:"",
            tel:"",
            question:""
        }
    },
    mounted() {
        this.token = Cookie.getCookie('token')
    },
    methods:{
        prev(){
            this.$router.go(-1)
        },
        alter(){
            var strs = new Array();
            strs = this.date.split("-");
            this.year = parseInt(strs[0]);
            this.month = parseInt(strs[1]);
            this.day = parseInt(strs[2]);
            let message = {
                year: this.year,
                month: this.month,
                day: this.day,
                time: this.time,
                location: this.location,
                event: this.event,
                qq: this.qq,
                tel: this.tel,
                question: this.question
            }
            fetch("/api/v1.0/activity/post/",{
                method: "POST",
                headers:{
                    "token": this.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(message),
            })
        }
    },
}
</script>

<style scoped>
.new{
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
.content{
    margin-left: 19px;
}
.font{
    font-size: 14px;
    color:#878787;
    width: 90%;
}
.margin{
    margin-top: 10px;
}
.new-adds{
    margin-top: 30px;
}
input{
    height: 30px;
    outline:none;
    border: none;
    border-bottom: 2px solid #878787;
    margin-left: 5px;
}
input:focus {
    border-bottom: 2px solid #6200EE;
}
.newTips{
    color: #6200EE;
    font-size: 10px;
    margin-top: 38px;
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
</style>


