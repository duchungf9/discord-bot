const Discord = require('discord.js');
const money = require('discord-money');
const client = new Discord.Client();

console.log('địt');
console.log(process.env.BOT_TOKEN);
console.log('-------');

client.on('ready', () => {

    console.log('I am ready!');

});
client.on('message', message => {
    if (message.content === 'sủa đi minh') {
    const exampleEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('Some title')
        .setURL('https://discord.js.org/')
        .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
        .setDescription('Some description here')
        .setThumbnail('https://i.imgur.com/wSTFkRM.png')
        .addField('Regular field title', 'Some value here')
        .addBlankField()
        .addField('Inline field title', 'Some value here', true)
        .addField('Inline field title', 'Some value here', true)
        .addField('Inline field title', 'Some value here', true)
        .setImage('https://i.imgur.com/wSTFkRM.png')
        .setTimestamp()
        .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
    channel.send(exampleEmbed);


}
    if (message.content.toUpperCase() === `.$`) {
        money.fetchBal(message.author.id).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
            message.channel.send(`bạn đang có `+i.money+" Sò");
    })



}
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'general');
// Do nothing if the channel wasn't found on this server
if (!channel) return;
// Send the message, mentioning the member
channel.send(`Chào bé đến với SBTC nhaaa, ${member}, mãi yêu!`);
});



// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);