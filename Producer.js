const amqp = require("amqplib");

async function sendMail() {
    try{
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel()
        const exchange = "mail_exchange";
        const routingKey1 = "send_Mail_to_sub_users";
        const routingKey2 = "send_Mail_to_users";

        const message1 = {
            to: "subUsers@gmail.com",
            from: "abidisahib719@gmail.com",
            subject: "Greets",
            body: "Hello Subscribers reedeem your Gift"
        }
        const message2 = {
            to: "Users@gmail.com",
            from: "abidisahib719@gmail.com",
            subject: "Greets",
            body: "Hey Users Subscribe to get Gift"
        }
        await channel.assertExchange(exchange, "direct", {durable: false});
        await channel.assertQueue("sub_users_mail_queue", {durable: false});
        await channel.bindQueue("sub_users_mail_queue", exchange, routingKey1)

        await channel.assertQueue("users_mail_queue", {durable: false});
        await channel.bindQueue("users_mail_queue", exchange, routingKey2)

        channel.publish(exchange, routingKey1, Buffer.from(JSON.stringify(message1)));
        console.log("Mail sent to Sub_users", message1);

        channel.publish(exchange, routingKey2, Buffer.from(JSON.stringify(message2)));
        console.log("Mail sent to users", message2);

        setTimeout(() =>{
            connection.close();
        },500)

    }
    catch (error){
    console.log(error);
    }
    
}
sendMail();