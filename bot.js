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
    var soCurrency = "2ST4m28";
    var soIcon = client.emojis.find(emoji=>emoji.name==soCurrency);
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
            "https://i.imgur.com/2jUrUAb.png"
        ];
        var index = Math.floor(Math.random() * 2);

        var txtEmbed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setAuthor('feeder.tap.choi', 'http://www.elleman.vn/wp-content/uploads/2016/10/25/bi-quyet-luyen-tap-de-co-bap-tay-to-elleman-2.jpg', 'https://xvideos.com')
            .setImage(arrayImage[index])
            .setTimestamp();

        message.channel.send({embed:txtEmbed});
    }
    if (message.content === 'sủa đi minh') {
        minhbeosua(message);
    }
    if (message.content.toUpperCase() === `.$`) {
        checkSip(message,soIcon);
    }
    randomSip(message,soIcon);

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
                        description: "Hiện "+message.author.username+" đang có: "+siphientai+" sịp."+soIcon
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
                    description: "Hiện "+message.author.username+" đang có: "+siphientai+" sịp."+soIcon
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
    if(message.content === "mưa sịp"){
        muaSip(message,soIcon,client);
    }
    if(message.content.startsWith(".km")){
        khoamom(message,soIcon);
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

function checkSip(message,soIcon){
    var usersRef = ref.child("users/"+message.author.username);
    var _user = usersRef.once('value',function(snapshot){
        var siphientai = 0;
        if(snapshot.exists()){
            siphientai = snapshot.val().sip;
        }else{
            usersRef.set({
                sip:0
            })
        }
        message.channel.send({embed: {
            color: 3447003,
            description: "Hiện "+message.author.username+" đang có: "+siphientai+" sịp."+soIcon
        }});
        currentDropCoin = 0;
    });
    message.delete(5000);
}

function randomSip(message,soIcon){
    var random  = Math.floor(Math.random() * 100);
    var So = Math.floor(Math.random() * 20);
    var quoteRandom = [
        "Ôi vãi cả lìn thằng "+message.author.username+" nó làm rơi "+So+soIcon+" sịp này!!!",
        "Một tiếng rên nhẹ phát ra từ cửa sổ phòng cô hiệu phó, và "+So+soIcon+" chiếc quần xì bay xuống."
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

function muaSip(message,soIcon,client){
    if(message.author.username == 'loandet' || message.author.username =='duchungf9'){
        currentDropCoin = 100;
        //https://i.imgur.com/EB6rf21.png
        var index = Math.floor(Math.random() * 2);

        var txtEmbed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle('ư ư ư, mưa sịp tới rồi!!')
            .setAuthor('Thầy hiệu trưởng', 'http://mickael.bessierre.free.fr/Images/mangas/personnages/gto/sous_dirlo.jpg', 'https://xvideos.com')
            .setDescription('sau tiếng hô, Thầy hiệu trưởng bèn thả 100 chiếc quần xì '+soIcon+' từ tầng thượng!!, nhặt mau các trò')
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

function khoamom(message,soIcon){

    var usersRef = ref.child("users/"+message.author.username);
    var _user = usersRef.once('value',function(snapshot){
        if(snapshot.exists()){
            var siphientai = snapshot.val().sip;
            if(siphientai>=100){
                siphientai = siphientai-100;
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
                const MUTE_TIME = 60 * 1000;

                // wait MUTE_TIME miliseconds and then remove the role
                setTimeout(() => {
                    userToMute.removeRole(muteRole);
                }, MUTE_TIME);

                message.channel.send(`*${message.author.username} đã nhét 100 chiếc quần xì vào mõm ${userToMute.user.username},${userToMute.user.username}  đã bị khóa mõm trong ${MUTE_TIME / 60} giây*`, { file: 'https://i.ytimg.com/vi/B6VR6JiYMxE/maxresdefault.jpg' });
                return;

            }

        }else{
            message.channel.send({embed: {
                color: 3447003,
                description: "Cần ít nhất 100 sịp."+soIcon+" để khóa mõm bạn khác con ơi!"
            }});
        }

        currentDropCoin = 0;

    });
    // message.delete(5000);
    // cleanBot(message);

}

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);