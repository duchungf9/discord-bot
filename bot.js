const Discord = require('discord.js');

const client = new Discord.Client();



client.on('ready', () => {

    console.log('I am ready!');

});



client.on('message', message => {
    if (message.content === 'sủa đi minh') {

    message.reply('gâu gâu');

}

});



// THIS  MUST  BE  THIS  WAY

client.login("NTMwNDI4NzYxNzY2NjI1Mjkw.Dw_gCw.0u313TXOoN55yGNrWHNLHE9Hx3g");//dBOT_TOKEN is the Client Secret