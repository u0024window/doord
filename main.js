const saveSchedule = require('./saveSchedule').saveSchedule;
require('./assets/userInfo');

const user = UserInfo.wjt;

var overTime = false;
var counter = 0;
var scheduleTimer = setInterval(function () {
    if ( user.status=='success' || overTime) {
        clearInterval(scheduleTimer);
    }else{
        saveSchedule(user);
        counter++;
        overTime = user.FPS*counter/3600>user.RUN_HOURS?true:false;
    }
}, user.FPS * 1000);