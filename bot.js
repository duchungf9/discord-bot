const Discord = require('discord.js');

const client = new Discord.Client();



client.on('ready', () => {

    console.log('I am ready!');

});



client.on('message', message => {

    if (message.content === 'ping') {

    message.reply('pong');

}

});



// THIS  MUST  BE  THIS  WAY

client.login("NTMwNDI4NzYxNzY2NjI1Mjkw.Dw_P9A.jFByNxDtqSCN1lIXEi3P-oqpvdA");//BOT_TOKEN is the Client Secret