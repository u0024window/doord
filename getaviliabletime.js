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
                global.ScheduleTime_RES = JSON.parse(resData).map(function(item){
                    var startDate = TimeManage.timeDistrictChange(item.start_time);
                    var endDate = TimeManage.timeDistrictChange(item.end_time)
                    return {
                        point:Object.assign({},item.starting_point),
                        date:startDate.date,
                        start:startDate.time,
                        end:endDate.time
                    }
                });
                if(callback){
                    callback();
                }
                if(ScheduleTime_RES.length>0){
                    LOG.write(API.LOGPATH,'result-'+COUNTER+JSON.stringify(ScheduleTime_RES));
                }
            });
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