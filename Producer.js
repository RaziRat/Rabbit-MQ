const amqp = require("amqplib");
const { send } = require("process");
const { buffer } = require("stream/consumers");

const annProduct = async (product) => {
try{

    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const exchange = "new_product";
    const exchangeType = "fanout";

    await channel.assertExchange(exchange, exchangeType, {durable: true});
    const message = JSON.stringify(product)

    channel.publish(exchange, "", Buffer.from(message), {persistent: true});
    console.log("Sent => ", message);
    
    setTimeout(() =>{
        connection.close();
    },500);
}
catch(error){
    console.log(error);
}
}
annProduct({ orderId: 12345 , name: "iphone 18", price: 400000});
 