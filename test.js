

const https = require('https');
    const req = https.request({
        hostname: 'api-dasher.doordash.com',
        port: 443,
        path:  '/v1/dasher_time_slots/?dasher=me&end_time=2019-06-22T04:00:00-07:00&expand=starting_point&impromptu_dash=0&include_recommended_dashes=0&start_time=2019-06-21T00:00:00-07:00&starting_points=451&starting_points=452&vehicle_type=1',
        method: 'GET',
        headers: {
            Host: 'api-dasher.doordash.com',
            'Content-Type': 'application/json',
            Cookie: 'dd_device_id=dx_060b0027866d4c37bcb18940315dbabc; dd_session_id=sx_1adec427702046818069eb21effb6e35; doordash_attempt_canary=0; dd_login_id=lx_148b3aa2fa774f47b0009cbca633d076',
            Connection: 'keep-alive',
            'Client-Version': 'ios v2.12.0 b124.190611',
            Accept: 'application/json',
            'Accept-Language': 'zh-cn',
            Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmlnX2lhdCI6MTU2MTEzMDU1MCwidXNlciI6eyJhdXRoX3ZlcnNpb24iOjIsImlzX3N0YWZmIjpmYWxzZSwiaWQiOjExNDUyNDc2OCwiZW1haWwiOiJtaW5nMzkyMjU5QDE2My5jb20ifSwiZXhwIjoxNTYxMzg5NzUwfQ.5zwEU-wiGGLuX9Yz9fTIvrMd_GwY-aEOzU5dWlZMpS4',
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
    req.end();

