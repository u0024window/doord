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
        data: function (user,option) {
            const appointment =Object.assign({},option?option.appointmentTime:user.appointmentTime);
            const location = option?option.location:user.location;
            return {
                "expand": "starting_point",
                "dasher": user.DASHER,
                "scheduled_end_time": FormatDate(appointment.DATE,appointment.END),
                "is_impromptu_dash": false,
                "scheduled_start_time": FormatDate(appointment.DATE,appointment.START),
                "vehicle": user.VEHICLE,
                "starting_point": location+''
            }
        },
        LOGPATH: './log/saveSchedule.log',
    },
    aviliableSchedule:{
        START:'2019-06-23T00:00:00-07:00',
        END:'2019-06-24T00:00:00-07:00',
        location:[Location.MONPARK,Location.ELMOUTE],
        method:'GET',
        path:  function(){
            var locations = this.location.map(function(item){return 'starting_points='+item}).join('&');
            var path = '/v1/dasher_time_slots/?dasher=me&end_time='+this.END+'&expand=starting_point&impromptu_dash=0&include_recommended_dashes=0&start_time='+this.START+'&'+locations+'&vehicle_type=1';
            console.log("path:",path);
            return path;
        },
        LOGPATH: './log/aviliableSchedule.log',
    }

}
global.LOG = {
    successPath:'./log/success.log',
    errorPath:'./log/error.log',
    format:function(data){
        var timestr = new Date().toISOString();
        if(+new Date()%60000!=0){
            timestr = '';
        }
        return  timestr+ os.EOL + data;
    },
    write:function(path,data){
        var _this = this;
        fs.appendFile(path, this.format(data), function (err) { if(err){console.log(_this.format(err))} });
    }
}

global.COUNTER = 0;