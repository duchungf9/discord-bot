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
client.on('message', message => {
    const swearWords = ["thật tuyệt", "tuyệt", "tuyệt hay"];
    const chuiBay = ["dmm"];
    if( swearWords.some(word => message.content.includes(word)) ) {
        message.channel.send({embed: {
                color: 3447003,
                description: "dạ, là tuyệt vời ông mặt trời ạ!, ư ư!",
            }});
        // Or just do message.delete();
    }
    if(chuiBay.some(word => message.content.includes(word))){
        var txtEmbed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle('Sao, mày thích gì?')
            .setURL('https://xvideoscom/')
            .setAuthor('feeder.tap.choi', 'http://www.elleman.vn/wp-content/uploads/2016/10/25/bi-quyet-luyen-tap-de-co-bap-tay-to-elleman-2.jpg', 'https://xvideos.com')
            .setDescription('Gâu gâu gâu!')
            .setThumbnail('https://cdn.discordapp.com/attachments/370950852179132416/531044635167031331/unknown.png')
            .setImage('https://cdn.discordapp.com/attachments/370950852179132416/531044635167031331/unknown.png')
            .setTimestamp();

        message.channel.send({embed:txtEmbed});
    }
    $userName = message.author.username;

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
        var usersRef = ref.child("users/"+$userName);
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

    }
    var random  = Math.floor(Math.random() * 50);
    var So = Math.floor(Math.random() * 20);
    console.log(random);
    var soCurrency = "2ST4m28";
    var soIcon = client.emojis.find(emoji=>emoji.name==soCurrency);
    if(random==7){
        currentDropCoin = So;
        message.channel.send({embed: {
                color: 3447003,
                description: "Ôi vãi cả lìn thằng "+message.author.username+" nó làm rơi "+So+soIcon+" sịp này!!!",
            }});
    }
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
    }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'nơi-xialol');
// Do nothing if the channel wasn't found on this server
if (!channel) return;
// Send the message, mentioning the member
channel.send(`Chào bé đến với SBTC nhaaa, ${member}, mãi yêu!`);
});



// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);