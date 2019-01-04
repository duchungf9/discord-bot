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
        .setTitle('Em là Minh béo')
        .setURL('https://discord.js.org/')
        .setAuthor('Minh béo', 'http://sohanews.sohacdn.com/thumb_w/660/2017/photo1499416230355-1499416230506-0-0-262-421-crop-1499416275290.jpg', 'https://xvideos.com')
        .setDescription('Gâu gâu gâu!')
        .setThumbnail('http://sohanews.sohacdn.com/thumb_w/660/2017/photo1499416230355-1499416230506-0-0-262-421-crop-1499416275290.jpg')

        .setImage('http://lifecompass.vn/wp-content/uploads/2015/03/cho-sua.jpg')
        .setTimestamp();

    message.channel.send({embed:exampleEmbed});


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