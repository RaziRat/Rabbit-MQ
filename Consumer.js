const amqp = require("amqplib");
async function consumeMessages(message) {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queueName = "lazy_queue";
     await channel.assertQueue(queueName, {
        durable: true,
        arguments: {
            "x-queue-mode": "lazy",
        },
    });

    console.log(`Waiting for messages in a ${queueName}`);

    channel.consume(queueName,  (msg) => {
        if (msg != null){
            console.log(`Recieved messages: ${msg.content.toString()} `);
            channel.ack(msg);

        }
    });


};
consumeMessages();