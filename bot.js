const Discord = require('discord.js');

const client = new Discord.Client();


client.on('ready', () = > {

    console.log('I am ready!');

})
;


client.on('message', message = > {
    if (message.content === 'sủa đi minh'
)
{

    message.reply('gâu gâu');

}
client.on('guildMemberAdd', member = > {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch = > ch.name === 'general'
)
;
// Do nothing if the channel wasn't found on this server
if (!channel) return;
// Send the message, mentioning the member
channel.send(`Chào bé đến với SBTC nhaaa, ${member}, mãi yêu!`);
})
;
})
;


// THIS  MUST  BE  THIS  WAY

client.login("NTMwNDI4NzYxNzY2NjI1Mjkw.Dw_gCw.0u313TXOoN55yGNrWHNLHE9Hx3g");//dBOT_TOKEN is the Client Secret