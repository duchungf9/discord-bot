const Discord = require('discord.js');
const client = new Discord.Client();
const cheerio = require('cheerio');
const request = require('request');
var fs = require('fs');
var path = require('path');
var Canvas = require('canvas');
var Image = Canvas.Image;
const yts = require( 'yt-search' )



console.log(process.env.BOT_TOKEN);
console.log('-------');
var admin = require("firebase-admin");

var serviceAccount = require("./discd-5cc3d-firebase-adminsdk-hfbcp-b2d2c0ca62.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://discd-5cc3d.firebaseio.com"
});
console.log('-------');
var db = admin.database();

client.on('ready', () => {
    console.log('đã bot xong!!!');
});


client.on('message', message => {


    if(message.content === "hát 1 bài"){
        send_message(message,`Điều anh thích là see em, đón lúc 10h PM`);
    }

});

var send_message = (message,text)=>{
    if (message.author.bot) return;
    console.log(message.content);
    message.channel.send(text);
    message.delete(2000);
    yts( 'superman theme', function ( err, r ) {
        if( err ){
            console.log(err);
        }

        var videos = r.videos;
        videos.forEach( function ( v ) {
            var views = String( v.views ).padStart( 10, ' ' )
            console.log( `${ views } | ${ v.title } (${ v.timestamp }) | ${ v.author.name }` );
        } );
    } );
};


// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'nơi-xiaolol');
// Do nothing if the channel wasn't found on this server
if (!channel) return;
// Send the message, mentioning the member
channel.send(`Chào bé đến với SBTC nhaaa, ${member}, mãi yêu!`);
});

client.login(process.env.BOT_TOKEN);
// app.listen(process.env.PORT || 5000);

