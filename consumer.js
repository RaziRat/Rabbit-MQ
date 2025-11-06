const amqp = require("amqplib");
 async function recvMail() {
    try{

        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel()

        await channel.assertQueue("sub_users_mail_queue",{durable: false});   
        channel.consume("sub_users_mail_queue", (message1) => {
            if( message1 != null)
                console.log("Sub Message Received", JSON.parse(message1.content));
            channel.ack(message1);
        })
    }
    catch(error){
        console.log(error);
    }
 }
 recvMail();