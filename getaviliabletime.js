require('./assets/golbal');
require('./assets/userInfo');
const https = require('https');

const API = APIs.aviliableSchedule;

exports.aviliableTime = function(user,callback){
    var req = https.request(
        {
            hostname: RequestInfo.hostname,
            port: RequestInfo.port,
            path: API.path(),
            method: API.method,
            headers: SetHeaders(user)
        },function(res){
            console.log("RESPONSE**********************start")
            var resData = '';
            res.on('data',function(chuck){
                resData+=chuck;
            });

            res.on('end',function(){
                var data= JSON.parse(resData);
            
                global.ScheduleTime_RES = data.map(function(item){
                    return {
                        point:Object.assign({},item.starting_point),
                        date:item.start_time.split(/T|Z/)[0],
                        start:item.start_time.split(/T|Z/)[1],
                        end:item.end_time.split(/T|Z/)[1]
                    }
                });
                if(callback){
                    callback(data);
                }
                var D = data.map(function(item){
                    return {
                        start:item.start_time,
                        end:item.end_time,
                        point:item.starting_point.id
                    }
                })
                if(D.length>0){
                    LOG.write(API.LOGPATH,'result-'+COUNTER+JSON.stringify(D));
                }
            });

            // var appointmentTime = user.appointmentTime;
            // console.log(user.status,'appointment-time:',user.location,appointmentTime.DATE,appointmentTime.START,appointmentTime.END);
            console.log('RESPONSE********END');
        }
    )
    req.end();

}


/************************************************
[{
	"is_recommended_dash": false,
	"starting_point": {
		"id": 110,
		"name": "LA: Glendale"
	},
	"start_time": "2019-06-20T05:00:00Z",
	"vehicle_type": 1,
	"end_time": "2019-06-20T08:30:00Z"
}]
************************************************/