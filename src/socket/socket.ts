import messageModel from "../../models/message.model";

const socket = require('socket.io');

interface IData {
    message:String,
    users:Array<string>,
    sender:string
}

module.exports.socket = (httpServer:any) => {

    const whiteList:Array<string | undefined> = ["http://localhost:5053", undefined];

    const io = socket(httpServer, {
        cors: {
            origin: function (origin:any, callback:any) {
                console.log(origin)
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

        socket.on('new-message', (data:IData) => {
            messageModel.create({
                message:data.message,
                users:data.users,
                sender:data.sender
            }).then((res) => {
                io.emit('new-message-recived', res);
            });
        });

    });
 

}