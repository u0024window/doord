const saveSchedule = require('./saveSchedule').saveSchedule;
var aviliableTime = require('./getaviliabletime').aviliableTime;
require('./assets/userInfo');
require('./assets/golbal');
const user = UserInfo.wjt;

var scheduleTimer = null;
var overTime = user.RUN_HOURS * 3600 + new Date();

setInterval(function () {
    COUNTER++
    var flag = +new Date() > overTime ? true : false;
    if (user.status == 'success' || flag) {
        clearInterval(scheduleTimer);
    } else {

        // saveSchedule(user);
        aviliableTime(user, function () {
            if (!ScheduleTime_RES || ScheduleTime_RES.length < 1) return;
            ScheduleTime_RES.forEach(function (item) {
                if(!TimeManage.aviliableTime_3(item.start,item.end,user.WANTHOURS)){
                    return;
                }
                var time=TimeManage.wantTime(item.start,item.end);
                if(!time){
                    return;
                }
                saveSchedule(user,{
                    appointmentTime:{
                        DATE: item.date,
                        START: time[0],
                        END: time[1]
                    },
                    location:item.point.id,
                   
                });
            })
        });


    }

}, user.FPS * 1000);


