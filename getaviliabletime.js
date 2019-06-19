const https = require('https');


exports.aviliableTime =function(){
    https.request(
        {
            hostname: RequestInfo.hostname,
            port: RequestInfo.port,
            path: API.path,
            method: API.method,
            headers: setHeaders(user)
        }
    )
}