require('./assets/golbal');
require('./assets/userInfo');
const https = require('https');

const API = APIs.aviliableTime;
const user = UserInfo;
exports.aviliableTime = function(){
    https.request(
        {
            hostname: RequestInfo.hostname,
            port: RequestInfo.port,
            path: API.path,
            method: API.method,
            headers: SetHeaders(user)
        }
    )
}