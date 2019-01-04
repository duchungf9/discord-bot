const Discord = require('discord.js');
const money = require('discord-money');
const client = new Discord.Client();
var currentDropCoin = 0;
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

        .setImage('https://i.ytimg.com/vi/xFHaOwmVAjY/hqdefault.jpg')
        .setTimestamp();

    message.channel.send({embed:exampleEmbed});


}
    if (message.content.toUpperCase() === `.$`) {
        money.fetchBal(message.author.id).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
            message.channel.send(`bạn đang có `+i.money+" Sò");
    })



}
    var random  = Math.floor(Math.random() * 7);
    var So = Math.floor(Math.random() * 100);
    console.log(random);
    if(random==7){
        currentDropCoin = So;
        message.channel.send("Ôi vãi cả lìn thằng "+message.author.username+" nó làm rơi "+So+" sò này!!!:sadd:");
    }
    if(message.content === ".pick"){
        if(currentDropCoin!=0){
            console.log(message.author.username);
            money.updateBal(message.author.id, currentDropCoin ).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
                message.channel.send("Hiện "+message.author.username+" đang có: "+i.money+" sò.");
                currentDropCoin = 0;
            })
        }
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