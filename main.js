const saveTime = require('./savetime').saveTime;
require('./assets/userInfo');

const user = UserInfo.wjt;

var overTime = false;
var counter = 0;
var scheduleTimer = setInterval(function () {
    if ( saveTime(user)=='success' || overTime) {
        clearInterval(scheduleTimer);
    }else{
        counter++;
        overTime = user.FPS*counter/3600>user.RUN_HOURS?true:false;
    }
}, user.FPS * 1000);
