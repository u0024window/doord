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
        aviliableTime(user, function (resData) {
            if (!resData || resData.length < 1) return;
            ScheduleTime_RES.forEach(function (item) {
                // var start = item.start.substring(0, 2)*1 + item.start.substring(3, 5) * 1/60;
                // var end = item.end.substring(0, 2) * 1 + item.end.substring(3, 5) * 1/60;
                // if (end - start < 1 || start < 21 || end > 8) {
                //     return;
                // }
                saveSchedule(user,{
                    appointmentTime:{
                        DATE: item.date,
                        START: item.start,
                        END: item.end
                    },
                    location:item.point.id,
                   
                });
            })
        });


    }

}, user.FPS * 1000);


