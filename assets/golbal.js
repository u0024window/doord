const fs = require('fs');
const os = require('os');

global.FormatDate = function (dateStr,time) {
    return dateStr + 'T' + time + '-07:00';
}
global.SetHeaders = function(user){
   return {
        Host: 'api-dasher.doordash.com',
        'Content-Type': 'application/json',
        Cookie: user.cookie,
        Connection: 'keep-alive',
        'Client-Version': 'ios v2.12.0 b124.190611',
        Accept: 'application/json',
        'Accept-Language': 'zh-cn',
        Authorization: user.authorization,
        'User-Agent': 'DoordashDriver/124.190611 CFNetwork/974.2.1 Darwin/18.0.0',
    }
}

global.RequestInfo={
    hostname: 'api-dasher.doordash.com',
    port: 443,
}
global.Location = {
    ELMOUTE: '451',
    MONPARK: '452',
    GLENDALE: '110'
}

global.APIs = {
    saveSchedule: {
        method:'POST',
        path: '/v1/dashes/',
        data: function (user) {
            const appointment = user.appointmentTime;
            return {
                "expand": "starting_point",
                "dasher": user.DASHER,
                "scheduled_end_time": FormatDate(appointment.DATE,appointment.END),
                "is_impromptu_dash": false,
                "scheduled_start_time": FormatDate(appointment.DATE,appointment.START),
                "vehicle": user.VEHICLE,
                "starting_point": user.location
            }
        },
        LOGPATH: './log/saveSchedule.log',
    },

}
global.LOG = {
    successPath:'./log/success.log',
    errorPath:'./log/error.log',
    format:function(data){
        return new Date().toISOString() + os.EOL + data + os.EOL;
    },
    write:function(path,data){
        var _this = this;
        fs.appendFile(path, this.format(data), function (err) { if(err){console.log(_this.format(err))} });
    }
}

