import chatModel from "../../models/chat.model";

const socket = require('socket.io');

interface INewChat {
    owner: String,
    users:Array<string>,
    name: String
}

interface INewMessage
{
    chatId:string,
    senderId:string,
    content:string
}

interface IMessage
{
    id: string,
    sender: string,
    content:string,
}

interface IChat
{
    id: string,
    owner: string,
    users: [string],
    name: string,
    messages: [IMessage]
}

module.exports.socket = (httpServer:any) => {

    const whiteList:Array<string | undefined> = ["http://localhost:5053", undefined];

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
        io.on('get-chat', (chatId:any) => {
            socket.join(chatId);
        });


        socket.on('new-chat', (data:INewChat) => {
            chatModel.create({
                owner: data.owner,
                users: data.users,
                name: data.name
            }).then((res) => {
                io.emit('new-chat-created', res);
            });
        });

        socket.on('new-message', (data:INewMessage) => {
            chatModel.findByIdAndUpdate(data.chatId, {
                $push: {
                    messages: {
                        sender: data.senderId,
                        content: data.content
                    }
                }
            }).then((res) => {
                io.emit('new-message-emit', res);
            });
        });

        socket.on('get-chat', async (data:IChat) => {
            const chat = await chatModel.findById(data.id);
            io.emit('send-chat', chat)
        })

    });
 

}