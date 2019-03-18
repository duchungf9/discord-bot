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
    console.log('I am ready!');
});
const talkedRecently = new Set();

client.on('message', message => {
    const swearWords = ["thật tuyệt", "tuyệt", "tuyệt hay"];
    const chuiBay = ["dmm","Dmm","dcmm","Dcmm","dit me may","Dit me may","dit con em may"];
    const spamContent = ["https://cdn.discordapp.com/attachments/531764733074735104/550627791146713088/received_360307941085850.gif","rnM8XsuKi0M"];
    $userName = message.author;
    var soCurrency = "kimcuong";
    var currencyIcon = client.emojis.find(emoji=>emoji.name==soCurrency);
    if( swearWords.some(word => message.content.includes(word)) ) {
        message.channel.send({embed: {
                color: 3447003,
                description: "dạ, là tuyệt vời ông mặt trời ạ!, ư ư!",
            }});
    }
    if(chuiBay.some(word => message.content.includes(word))){
        //https://i.imgur.com/EB6rf21.png
        var arrayImage = [
            "https://i.imgur.com/EB6rf21.png",
            "https://i.imgur.com/2jUrUAb.png",
            "https://cdn.discordapp.com/attachments/530448778982064128/534299862280175616/unknown.png"
        ];
        var index = Math.floor(Math.random() * arrayImage.length);

        var txtEmbed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setImage(arrayImage[index])
            .setTimestamp();

        message.channel.send({embed:txtEmbed});
    }
    if(spamContent.some(word => message.content.includes(word))){
        message.delete(0);
    }
    if (message.content === 'sủa đi minh') {
        minhbeosua(message);
    }
    if (message.content.toUpperCase() === `.$`) {
        checkSip(message,currencyIcon);
    }

    if(message.content === '.kqxs'){
        getXS(message);
    }

    if(message.content.startsWith(".dt")){
        doiten(message,currencyIcon);
    }
    if(message.content.startsWith(".bet")){
        bet(message,currencyIcon);
    }
    randomSip(message,currencyIcon);

    if(message.content === ".pick"){
        if(currentDropCoin!=0){
            var usersRef = ref.child("users/"+$userName.id);
            var _user = usersRef.once('value',function(snapshot){
                if(snapshot.exists()){
                    var siphientai = snapshot.val().sip;
                    siphientai = siphientai+currentDropCoin;
                    usersRef.update({
                        sip:siphientai
                    });

                }else{
                    usersRef.set({sip :currentDropCoin})
                    siphientai = currentDropCoin;
                }
                message.channel.send({embed: {
                        color: 3447003,
                        description: "Hiện "+message.author+" đang có: "+siphientai+" kim cương."+currencyIcon
                    }});
                currentDropCoin = 0;

            });
        }
        message.delete(5000);
        cleanBot(message);
    }
    if(message.content === ".timely"){
        console.log('timely');
        if (talkedRecently.has(message.author.id)){
            console.log(message.author.id+'timely1');
            // talkedRecently.delete(message.author.id);
            message.channel.send({embed: {
                color: 3447003,
                description: "hmm.. đợi tiếp đi bé!",
            }});
            return;
        }else{
            console.log(message.author.id+'timely');
            var usersRef = ref.child("users/"+message.author.id);
            var _user = usersRef.once('value',function(snapshot){
                if(snapshot.exists()){
                    var siphientai = snapshot.val().sip;
                    siphientai = siphientai+10;
                    usersRef.update({
                        sip:siphientai
                    });

                }else{
                    usersRef.set({sip :10})
                    siphientai = 10;
                }
                message.channel.send({embed: {
                    color: 3447003,
                    description: "Hiện "+message.author+" đang có: "+siphientai+" kim cương."+currencyIcon
                }});

            });
            talkedRecently.add(message.author.id);
            setTimeout(() => {
                // Removes the user from the set after 2.5 seconds
                talkedRecently.delete(message.author.id);
            }, 1000*1800);
        }
        message.delete(2500);
    }
    if(message.content === "mưa kim cương"){
        muaSip(message,currencyIcon,client);
    }
    if(message.content.startsWith(".km")){
        khoamom(message,currencyIcon);
    }
    if(message.content.startsWith(".give")){
        var stringContent = message.content;
        var arrayExplodedBySpace = stringContent.split(" ");
        console.log(arrayExplodedBySpace);
        if(arrayExplodedBySpace.length == 3 && (message.author.username == 'loandet' || message.author.username =='duchungf9')){
            tangSip(message,currencyIcon,arrayExplodedBySpace[1]);
        }
    }
    if(message.content.startsWith(".cheanh")){
        var stringContent = message.content;

        var firstvariable = "aa ";
        var secondvariable = " bb";
        var regExString = new RegExp("(?:"+firstvariable+")(.*?)(?:"+secondvariable+")", "ig"); //set ig flag for global search and case insensitive

        var testRE = regExString.exec(stringContent);
        if (testRE && testRE.length > 1) //RegEx has found something and has more than one entry.
        {
            console.log(testRE[1]); //is the matched group if found
            var img = new Image();
            img.src = 'fun.jpg';
            var canvas = Canvas.createCanvas(img.width, img.height);
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, img.width, img.height);
            ctx.drawImage(img, 0, 0, img.width, img.height);

            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.font = '50px Arial';
            ctx.fillText(testRE[1],img.width/2, img.height-(img.height/10));
            var dataURL = canvas.toDataURL();
            request.post({url:'https://socvui.com/Sticker', formData:{imgBase64:dataURL}}, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error('upload failed:', err);
                }
                console.log('Upload successful!  Server responded with:', JSON.parse(body).imgSrc);
                message.channel.send(`=))`, { file: JSON.parse(body).imgSrc });
            });

            return;
        }
    }
    if(message.content ===".shelter"){
        idleShelter(message);
    }
    if(message.content ==="?"){
        message.channel.send(`??? thái độ clmm, ${message.author}!`);
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

function minhbeosua(message){
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
function getCurrentCurrency(usersRef) {
    return _user = usersRef.once('value', function (snapshot) {
            var siphientai = 0;
            if (snapshot.exists()) {
                siphientai = snapshot.val().sip;
            } else {
                usersRef.set({
                    sip: 0
                })
            }

    }).then(function(data){
        return data.val().sip;
    });
}
function checkSip(message,currencyIcon){
    var usersRef = ref.child("users/"+message.author.id);
        siphientai = getCurrentCurrency(usersRef).then(function(sip){
            message.channel.send({embed: {
                    color: 3447003,
                    description: "Hiện "+message.author+" đang có: "+sip+" kim cương."+currencyIcon
                }});
            currentDropCoin = 0;
            message.delete(5000);
        });
}

function randomSip(message,currencyIcon){
    var random  = Math.floor(Math.random() * 50);
    var So = Math.floor((Math.random() * 10)+1);
    var quoteRandom = [
        message.author+" đã nhặt được "+So+currencyIcon+" kim cương!!!",
    ];

    // console.log(random);
    if(random==7){
        currentDropCoin = So;
        var usersRef = ref.child("users/"+message.author.id);
        var currentCurrency = getCurrentCurrency(usersRef).then(function(data){
            var newCurrency =  parseInt(data, 10)+parseInt(So, 10);
            updateCurrency(parseInt(newCurrency, 10),usersRef);
        });
        message.channel.send({embed: {
            color: 3447003,
            description: quoteRandom[Math.floor(Math.random() * quoteRandom.length)],
        }});
}
}

function muaSip(message,currencyIcon,client){
    if(message.author.username == 'loandet' || message.author.username =='duchungf9'){
        currentDropCoin = 100;
        //https://i.imgur.com/EB6rf21.png
        var index = Math.floor(Math.random() * 2);

        var txtEmbed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle('ư ư ư, mưa kim cương tới rồi!!')
            .setAuthor('Thầy hiệu trưởng', 'http://mickael.bessierre.free.fr/Images/mangas/personnages/gto/sous_dirlo.jpg', 'https://xvideos.com')
            .setDescription('sau tiếng hô, Thầy hiệu trưởng bèn thả 100 chiếc kim cương '+currencyIcon+' từ tầng thượng!!, nhặt mau các trò')
            .setImage("http://mickael.bessierre.free.fr/Images/mangas/personnages/gto/sous_dirlo.jpg")
            .setTimestamp();

        message.channel.send({embed:txtEmbed});
        message.delete(2000);
    }

}

function cleanBot(message){
    message.channel.fetchMessages().then(messages => {
        const botMessages = messages.filter(msg => msg.author.bot);
        message.channel.bulkDelete(botMessages);
        // messagesDeleted = botMessages.array().length; // number of messages deleted
        // Logging the number of messages deleted on both the channel and console.
        // message.channel.send("Chị lao công chạy vội ra dọn sạch rác của thầy hiệu trưởng. Đã dọn được số rác là: " + messagesDeleted);
        // console.log('Deletion of messages successful. Total messages deleted: ' + messagesDeleted)
    }).catch(err => {
        console.log('Error while doing Bulk Delete');
        console.log(err);
    });
}

function leaderBoardSip(){

}

function getXS(message){
    request('https://xosodaiphat.com/xsmb-xo-so-mien-bac.html', function (err, res, body)
    {
        var $ = cheerio.load(body);
        var giaidacbiet = $($(".special-prize-lg")[0]).text();
        message.channel.send({embed: {
                color: 3447003,
                description: "Giải đặc biệt :"+giaidacbiet
            }});
    });
}


function khoamom(message,currencyIcon){

    var usersRef = ref.child("users/"+message.author.id);
    var _user = usersRef.once('value',function(snapshot){
        if(snapshot.exists()){
            var siphientai = snapshot.val().sip;
            if(siphientai>=50){
                siphientai = siphientai-50;
                usersRef.update({
                    sip:siphientai
                });

                const userToMute =  message.mentions.members.first();

                // find the name of a role called Muted in the guild that the message
                // was sent from
                const muteRole = message.guild.roles.find("name", "Muted");
                // add that role to the user that should be muted
                userToMute.addRole(muteRole);

                // the time it takes for the mute to be removed
                // in miliseconds
                const MUTE_TIME = 10 * 1000;

                // wait MUTE_TIME miliseconds and then remove the role
                setTimeout(() => {
                    userToMute.removeRole(muteRole);
                }, MUTE_TIME);
                arrayImage = ["https://i.ytimg.com/vi/B6VR6JiYMxE/maxresdefault.jpg","https://cdn.discordapp.com/attachments/530448778982064128/534679789987037184/Screenshot_7.png",
                "https://cdn.discordapp.com/attachments/530448778982064128/534680790022356992/Screenshot_9.png",
                "https://cdn.discordapp.com/attachments/530448778982064128/534680786981617664/Screenshot_8.png"];
                var index = Math.floor(Math.random() * arrayImage.length);

                message.channel.send(`*${message.author} đã nhét 50 kim cương vào mõm ${userToMute.user},và ${userToMute.user}  đã bị khóa mõm trong  10 giây*`, { file: arrayImage[index] });
                return;

            }else{
                message.channel.send({embed: {
                        color: 3447003,
                        description: " Cần ít nhất 50 kim cương."+currencyIcon+" để khóa mõm bạn khác con ơi!"
                    }});

            }

        }else{
            message.channel.send({embed: {
                color: 3447003,
                description: "K có kim cương thì đừng đú con ơi !"
            }});
        }

        currentDropCoin = 0;

    });
}

function doiten(message,currencyIcon){
    var usersRef = ref.child("users/"+message.author.id);
    var _user = usersRef.once('value',function(snapshot){
        if(snapshot.exists()){
            var siphientai = snapshot.val().sip;
            if(siphientai>=500){
                siphientai = siphientai-500;
                usersRef.update({
                    sip:siphientai
                });

                const userToChange =  message.mentions.members.first();
                var stringContent = message.content;
                var arrayExplodedBySpace = stringContent.split(" ");
                var newName = arrayExplodedBySpace[1];
                newName = newName.replace("-"," ");
                userToChange.setNickname(newName);
                message.channel.send(`*${message.author} dùng 500 kim cương để đổi tên ${userToChange.user} thành ${newName}`);
                return;

            }else{
                message.channel.send({embed: {
                        color: 3447003,
                        description: " Cần ít nhất 500 kim cương."+currencyIcon+" để đổi tên bạn khác con ơi!"
                    }});

            }

        }else{
            message.channel.send({embed: {
                    color: 3447003,
                    description: "K có kim cương thì đừng đú con ơi !"
                }});
        }

        currentDropCoin = 0;

    });
}

function tangSip(message,currencyIcon,amount){
    var userNhanTien =  message.mentions.members.first();
    var usersRef = ref.child("users/"+userNhanTien.user.id);
    var currentCurrency = getCurrentCurrency(usersRef).then(function(data){
        console.log(data);
        var newCurrency =  parseInt(data, 10)+parseInt(amount, 10);
        updateCurrency(parseInt(newCurrency, 10),usersRef);
        message.channel.send({embed: {
                color: 3447003,
                description: message.author+" đã ban cho "+userNhanTien.user+" "+amount+currencyIcon
        }});
    });
}

function updateCurrency(amount,userRef){
    userRef.update({
        sip:amount
    });

}
function idleShelter(message){
    message.channel.send(`*${message.author} https://playidleheroes.com/events/#Shelter`, { file: "https://media.discordapp.net/attachments/530448778982064128/538183280281911327/unknown.png" });
}
function bet(message,currencyIcon){
    var stringContent = message.content;
    var arrayExplodedBySpace = stringContent.split(" ");
    console.log(arrayExplodedBySpace);
    if(typeof parseInt(arrayExplodedBySpace[1], 10) =='number'){
        var value = parseInt(arrayExplodedBySpace[1], 10);
        var result =   Math.floor(Math.random() * 2) + 1;
        var usersRef = ref.child("users/"+message.author.id);
        if(result==1){
            var currentCurrency = getCurrentCurrency(usersRef).then(function(data){
                if(value>parseInt(data, 10)){
                    message.channel.send({embed: {
                            color: 3447003,
                            description: message.author+" không đủ kim cương!!!",
                        }});
                    return false;
                }else{
                    console.log(value);
                    console.log(parseInt(data, 10));
                    var newCurrency =  parseInt(data, 10)+parseInt(value, 10);
                    updateCurrency(parseInt(newCurrency, 10),usersRef);
                    message.channel.send({embed: {
                            color: 3447003,
                            description: message.author+" đã kiếm được "+value+currencyIcon+" kim cương!!!",
                        }});
                }
            });

        }else{
            console.log("lose"+value);

            var currentCurrency = getCurrentCurrency(usersRef).then(function(data){
                if(value>parseInt(data, 10)){
                    message.channel.send({embed: {
                            color: 3447003,
                            description: message.author+" không đủ kim cương!!!",
                        }});
                    return false;
                }else{
                    console.log(value);
                    console.log(parseInt(data, 10));
                    var newCurrency =  parseInt(data, 10)-parseInt(value, 10);
                    updateCurrency(parseInt(newCurrency, 10),usersRef);
                    message.channel.send({embed: {
                            color: 3447003,
                            description: message.author+" đã mất "+value+currencyIcon+" kim cương!!!",
                        }});
                }

            });
        }
    }else{
        console.log(typeof arrayExplodedBySpace[1]);
        console.log(arrayExplodedBySpace[1]);
    }

}

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}
client.login(process.env.BOT_TOKEN);
app.listen(process.env.PORT || 5000);

