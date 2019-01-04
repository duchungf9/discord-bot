const {RichEmbed,Discord} = require('discord.js');
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
        const embed = new RichEmbed()
        // Set the title of the field
            .setTitle('một chú chó tên Minh béo bèn xuất hiện')
            // Set the color of the embed
            .setColor(0xFF0000)
            // Set the main content of the embed
            .setDescription('Gâu gâu gâu!');
        // Send the embed to the same channel as the message
    console.log(embed);
        message.channel.send(embed);
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