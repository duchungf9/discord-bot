const Discord = require('discord.js');

const client = new Discord.Client();



client.on('ready', () => {

    console.log('I am ready!');

});



client.on('message', message => {

    if (message.content === 'ping') {
        message.reply('pong');
    }
    if(message.content === "sủa"){
        message.reply("gâu gâu, chị Vũ chỉ mới dạy em sủa thôi!");
    }

});



// THIS  MUST  BE  THIS  WAY

client.login("gqmGk7WjSHAeJ9nyMSfhIrIFe-BAxVUK");//dBOT_TOKEN is the Client Secret