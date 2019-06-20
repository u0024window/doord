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
         
            if (JSON.parse(resData).id) {
                flag = false;
                user.status = 'success'
            }
            LOG.write(API.LOGPATH,'result-'+COUNTER+':'+resData);
            
            var appointmentTime = user.appointmentTime;
            console.log(user.status,'appointment-time:',user.location,appointmentTime.DATE,appointmentTime.START,appointmentTime.END);
            console.log('RESPONSE********END');

        });

    });
    LOG.write(API.LOGPATH,'reqData-'+COUNTER+':'+JSON.stringify(data));
    req.write(JSON.stringify(data));
    req.end();
}

