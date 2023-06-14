const socket = require('socket.io');

module.exports.socket = (httpServer:any) => {

    const whiteList:Array<string | undefined> = [process.env.CLIENT_URL, undefined];

    const io = socket(httpServer, {
        cors: {
            origin: function (origin:any, callback:any) {
                if (whiteList.indexOf(origin) !== -1) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            },
            methods: ["GET", "POST"]
        },
    });

    io.on("connection", (socket:any) => {

    });
 

}