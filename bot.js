const Discord = require('discord.js');

const client = new Discord.Client();



client.on('ready', () => {

    console.log('I am ready!');

});



client.on('message', message => {

    if (message.content === 'ping') {
        message.reply('ping địt mẹ mày');
    }

});



// THIS  MUST  BE  THIS  WAY

client.login("gqmGk7WjSHAeJ9nyMSfhIrIFe-BAxVUK");//dBOT_TOKEN is the Client Secret