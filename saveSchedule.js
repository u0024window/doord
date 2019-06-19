require('./assets/golbal');

const https = require('https');
// const setHeaders = toolfunction.setHeaders;

var counter = 0;
const API = global.API.saveSchedule;
exports.saveSchedule = function (user) {
    counter++;
    const data = API.data(user);

    const req = https.request({
        hostname: RequestInfo.hostname,
        port: RequestInfo.port,
        path: API.path,
        method: API.method,
        headers: global.SetHeaders(user)
    }, (res) => {
        var resData = '';
        res.on('data', function (data) {
            resData += data;
        });
        res.on('end', function () {
            var status = ''
            if (JSON.parse(resData).id) {
                flag = false;
                status = 'success'
            }
            LOG.write(API.LOGPATH,'result-'+counter+':'+resData);
            
            var appointmentTime = user.appointmentTime;
            console.log('appointment-time:',appointmentTime.DATE,appointmentTime.START,appointmentTime.END);
            console.log('RESPONSE********END');

            return status;
        });

    });
    LOG.write(API.LOGPATH,'reqData-'+counter+':'+JSON.stringify(data));
    req.write(JSON.stringify(data));
    req.end();
}

