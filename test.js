

const https = require('https');
const querystring = require('querystring');
var saveSchedule = function () {

      
    const req = https.request({
        hostname: 'api-dasher.doordash.com',
        port: 443,
        path:  '/v1/dasher_time_slots/',
        method: 'GET',
        headers: {
            Host: 'api-dasher.doordash.com',
            'Content-Type': 'application/json',
            Cookie: 'dd_device_id=dx_1569b59eef854450a0035f030c1d1f2c; dd_session_id=sx_3517db71e0ce4a849806287e59ffb05a; doordash_attempt_canary=0; dd_login_id=lx_86c4bd3ee8314b1880c044918c22427d',
            Connection: 'keep-alive',
            'Client-Version': 'ios v2.12.0 b124.190611',
            Accept: 'application/json',
            'Accept-Language': 'zh-cn',
            Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmlnX2lhdCI6MTU2MDgzNjEwNiwidXNlciI6eyJhdXRoX3ZlcnNpb24iOjMsImlzX3N0YWZmIjpmYWxzZSwiaWQiOjEwNDA1NDYxOCwiZW1haWwiOiI3NTgyNjkzNEBxcS5jb20ifSwiZXhwIjoxNTYxMDk1MzA2fQ.NrPp2uNJpWjSgyqf6ve_MVXeL7N-z2MXebOfoxOoAGs',
            'User-Agent': 'DoordashDriver/124.190611 CFNetwork/974.2.1 Darwin/18.0.0',
        }
    }, (res) => {

        var resData = '';
        res.on('data', function (data) {
            resData += data;
        });
        res.on('end', function () {
            console.log(resData);
        });

    });
   
    req.write(postData);
    req.end();
}

saveSchedule();

