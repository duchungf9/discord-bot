const Discord = require('discord.js');
const money = require('discord-money');
const client = new Discord.Client();
const cheerio = require('cheerio');
const request = require('request');
var fs = require('fs');
var path = require('path');
var Canvas = require('canvas');
var Image = Canvas.Image;
var currentDropCoin = 0;
var express = require("express");
var app = express();
app.get('/vietlot',function(req,res){
    request('http://bongdanet.vn/xo-so-vietlott', function (err, res, body)
    {
        var $ = cheerio.load(body);
        var giaidacbiet = $($(".award-text")[0]).text();
        res.send(giaidacbiet);
    });
});
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
var ref = db.ref("/");
client.on('ready', () => {
    console.log('bot xong!!!');
});
const talkedRecently = new Set();

client.on('message', message => {
    console.log(message.content);
    message.channel.send("Địt con mẹ mày Loan");
    message.delete(2000);

    if(message.content === "mưa kim cương"){
        message.channel.send("Mưa cc");
        message.delete(2000);
    }

});

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
app.listen(process.env.PORT || 5000);

