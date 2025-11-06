const amqp = require("amqplib");
 async function recvMail() {
    try{

        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel()

        await channel.assertQueue("users_mail_queue",{durable: false});   
        channel.consume("users_mail_queue", (message2) => {
            if( message2 != null)
                console.log("User Message Received", JSON.parse(message2.content));
            channel.ack(message2);
        })
    }
    catch(error){
        console.log(error);
    }
 }
 recvMail();