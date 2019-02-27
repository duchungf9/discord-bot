const Discord = require('discord.js');
const money = require('discord-money');
const client = new Discord.Client();
var currentDropCoin = 0;
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
    $userName = message.author.username;
    var soCurrency = "gem-1";
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
    if (message.content === 'sủa đi minh') {
        minhbeosua(message);
    }
    if (message.content.toUpperCase() === `.$`) {
        checkSip(message,currencyIcon);
    }
    randomSip(message,currencyIcon);

    if(message.content === ".pick"){
        if(currentDropCoin!=0){
            var usersRef = ref.child("users/"+$userName);
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
                        description: "Hiện "+message.author.username+" đang có: "+siphientai+" kim cương."+currencyIcon
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
            var usersRef = ref.child("users/"+message.author.username);
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
                    description: "Hiện "+message.author.username+" đang có: "+siphientai+" kim cương."+currencyIcon
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
        console.log(snapshot.val().sip);
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
    var usersRef = ref.child("users/"+message.author.username);
        siphientai = getCurrentCurrency(usersRef).then(function(sip){
            message.channel.send({embed: {
                    color: 3447003,
                    description: "Hiện "+message.author.username+" đang có: "+sip+" kim cương."+currencyIcon
                }});
            currentDropCoin = 0;
            message.delete(5000);
        });
}

function randomSip(message,currencyIcon){
    var random  = Math.floor(Math.random() * 100);
    var So = Math.floor(Math.random() * 20);
    var quoteRandom = [
        "Ôi vãi cả lìn thằng "+message.author.username+" nó làm rơi "+So+currencyIcon+" kim cương này!!!",
        "Một tiếng rên nhẹ phát ra từ cửa sổ phòng cô hiệu phó, và "+So+currencyIcon+" chiếc kim cương bay xuống."
    ];

    console.log(random);
    if(random==7){
        currentDropCoin = So;
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

function khoamom(message,currencyIcon){

    var usersRef = ref.child("users/"+message.author.username);
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

                message.channel.send(`*${message.author.username} đã nhét 50 kim cương vào mõm ${userToMute.user.username},và ${userToMute.user.username}  đã bị khóa mõm trong  10 giây*`, { file: arrayImage[index] });
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

function tangSip(message,currencyIcon,amount){
    var userNhanTien =  message.mentions.members.first();
    var usersRef = ref.child("users/"+userNhanTien.user.username);
    var currentCurrency = getCurrentCurrency(usersRef).then(function(data){
        console.log(data);
        var newCurrency =  parseInt(data, 10)+parseInt(amount, 10);
        updateCurrency(parseInt(newCurrency, 10),usersRef);
        message.channel.send({embed: {
                color: 3447003,
                description: message.author.username+" đã ban cho "+userNhanTien.user.username+" "+amount+currencyIcon
        }});
    });
}

function updateCurrency(amount,userRef){
    userRef.update({
        sip:amount
    });

}
function idleShelter(message){
    message.channel.send(`*${message.author.username} https://playidleheroes.com/events/#Shelter`, { file: "https://media.discordapp.net/attachments/530448778982064128/538183280281911327/unknown.png" });

}
// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);