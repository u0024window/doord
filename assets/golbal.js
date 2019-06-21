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
    GLENDALE: '110',
    ANAHEIM:'2236'
}

global.APIs = {
    saveSchedule: {
        method:'POST',
        path: '/v1/dashes/',
        data: function (user,option) {
            const appointment =Object.assign({},option?option.appointmentTime:user.appointmentTime);
            const location = option?option.location:user.location;


            if(appointment.START.substring(0,2))
            return {
                "expand": "starting_point",
                "dasher": user.DASHER,
                "scheduled_end_time": FormatDate(appointment.DATE,appointment.END),
                "is_impromptu_dash": false,
                "scheduled_start_time": FormatDate(appointment.DATE,appointment.START),
                "vehicle": user.VEHICLE,
                "starting_point": location
            }
        },
        LOGPATH: './log/saveSchedule.log',
    },
    aviliableSchedule:{
        START:'2019-06-21T00:00:00-07:00',
        END:'2019-06-22T00:00:00-07:00',
        location:[Location.MONPARKf,Location.ELMOUTE],
        method:'GET',
        path:  function(){
            var locations = this.location.map(function(item){return 'starting_points='+item}).join('&');
            var path = '/v1/dasher_time_slots/?dasher=me&end_time='+this.END+'&expand=starting_point&impromptu_dash=0&include_recommended_dashes=0&start_time='+this.START+'&'+locations+'&vehicle_type=1';
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
global.TimeManage = {
    aviliableTime_3:function(start,end,wantHours){
        var START = start.substring(0, 2)*1 + start.substring(3, 5) * 1/60;
        var END = end.substring(0, 2) * 1 + end.substring(3, 5) * 1/60;
                if (END - START < wantHours) {
                    return false;
                }else{
                    return true;
                }
    },
    wantTime:function(start,end){
        var newS=start,newD=end;
        var oldTime = end.substring(0, 2)*1-start.substring(0, 2)*1;
        if(start.substring(0, 2)*1<8){
            newS = start.replace(/^\d{2}/,'08')
        }
        if(end.substring(0, 2)*1<8){
            newD = end.replace(/^\d{2}/,'23')
        }
        var newTime = newD.substring(0, 2)*1-newS.substring(0, 2)*1;
        if(newTime>oldTime){
            return null;
        }else{
            return [newS,newD];
        }
    
    },
    timeDistrictChange:function(time){
        var locTime = new Date(new Date(time).toLocaleString());
        var year = locTime.getFullYear();
        var month = locTime.getMonth()+1;
        var day = locTime.getDate();
        month = month<10?'0'+month:month;
        day = day<10?'0'+day:day;
        return {
            date:year+'-'+month+'-'+day,
            time:locTime.toTimeString().substring(0,8)
        }

    }
}


global.COUNTER = 0;