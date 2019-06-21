require('./assets/golbal');

const https = require('https');

const API = APIs.saveSchedule;
exports.saveSchedule = function (user,saveScheduleDate) {
    const data = API.data(user,saveScheduleDate);
    const req = https.request({
        hostname: RequestInfo.hostname,
        port: RequestInfo.port,
        path: API.path,
        method: API.method,
        headers: SetHeaders(user)
    }, (res) => {
        var resData = '';
        res.on('data', function (data) {
            resData += data;
        });
        res.on('end', function () {
            var status = 'pedding';
            if (JSON.parse(resData).id) {
                flag = false;
                status='success'
            }
            LOG.write(API.LOGPATH,'result-'+COUNTER+':'+resData);
            
            console.log(status,'appointment-time:',data.starting_point,data.scheduled_end_time,data.scheduled_end_time);
            console.log('RESPONSE********END');

        });

    });
    LOG.write(API.LOGPATH,'reqData-'+COUNTER+':'+JSON.stringify(data));
    req.write(JSON.stringify(data));
    req.end();
}

