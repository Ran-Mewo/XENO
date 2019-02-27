const http = require('http');
const express = require('express');
const app = express();


app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});


const { version, Client, RichEmbed, Attachment, Collection } = require("discord.js");
const Enmap = require('enmap');
const edb = new Enmap({
name: "edb",
ensureProps: true
})
const client = new Client({disableEveryone: true});
const superagent = require('superagent'); 
const { Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube("AIzaSyDXtnV7yR6-dBdCSvoJSGvplpkczBYyUbQ");
const queue = new Collection();
const ms = require('ms');
const prefixdb = new Enmap({ name: "prefixdb"})
const channeldb = new Enmap({ name: "channeldb" })
const { post } = require('node-superfetch');
const { owners_id } = require("./config.json");
const Discord = require('discord.js');
const fs = require ('fs');
const moment = require ('moment');
const server = http.createServer(app);
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const eco = require ('discord-economy');
const { inspect } = require("util");
const cooldown = new Set();



client.on("ready", () => {
  

  console.log(`Logged in as ${client.user.username}!`);
  
  const statuses = [
    { type: 'WATCHING', name: `Xenō Support!` },
    { type: 'PLAYING', name: `Helping Xenō Members!` },
    
];
  
  /*const avaters = [
    { image: `https://media.discordapp.net/attachments/511374881569505285/545598409395142666/Xeno.jpg` },
    { image: `https://media.discordapp.net/attachments/511374881569505285/545598439681949697/Xeno3.png` }
];*/

setInterval(() => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    if (status.type === 'STREAMING') {
        client.user.setActivity(status.name, { type: status.type, url: status.url });
    } else {
        client.user.setActivity(status.name, { type: status.type });
    }
}, 10000);
  
  
  
});


client.on('message', async message => {

  let bad_words = [
  "fuck",
  "boobs",
  "mc",
  "bc",
  "chutiya",
  "chod",
  "bitch",
  "pedo",
  "porn"
  ]
  
  let fetch_words = false;
  
  for(var i in bad_words) {
  
    if(message.content.toLowerCase().includes(bad_words[i])) fetch_words = true;
    
  }
  
  if(fetch_words) {
  
    message.channel.bulkDelete(1);
    message.channel.send(`<@${message.author.id}>, Don't use bad words.`).then(m => m.delete(100000));
  
  }
});




client.afk = new Map();
client.on("message", async message => { 
  
  let prefix = "xs!";

const args = message.content.slice(prefix.length).trim().split(/\s+/g);

const command = args.shift().toLowerCase();
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;

let sender = message.author;
	
if(message.author.bot) return;
  
  
  
  if (client.user.id === message.author.id) { return }
  
  
  
  
  
  
  
  
  
	


  
  
if(command === 'ping') {

message.channel.send(`Hoold on!`).then(m => {

    m.edit(`🏓  ::  **Pong!** (Roundtrip took: **` + (m.createdTimestamp - message.createdTimestamp) + `ms.** Heartbeat: **` + Math.round(client.ping) + `ms.**)`);

    });

 }
  
  
  
 if(command === 'pong') {

message.channel.send(`Hoold on!`).then(m => {

    m.edit(`🏓  ::  **Ping!** (Roundtrip took: **` + (m.createdTimestamp - message.createdTimestamp) + `ms.** Heartbeat: **` + Math.round(client.ping) + `ms.**)`);

    });

 }
  
  
  
  if(command === 'restart') {
    
    owners_id.forEach(async function(owners_id) {
    if (message.author.id !== owners_id) return;
   
    message.channel.send(":gear: Rebooted").then(() => {

        console.log('Rebooted');

        client.destroy();

        process.exit(1)
	    
    })
  });
}
  
  if(command === 'say') {
   
    owners_id.forEach(async function(owners_id) {
    if (message.author.id !== owners_id) return;
    
    let msg = args.slice(0).join(" ");
    
    if (message.content.startsWith(`${prefix}`)) {
      message.delete();
    }

       await message.channel.send(msg);
    
    });
    
  }
  

 
  
  
  if(command === 'botinfo') {
    
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        
        const embedStats = new Discord.RichEmbed()
            .setAuthor(client.user.username)
            .setTitle(`**${client.user.username}  Status**`)
            .setColor("#3498db")
            .addField("Status-", `**${client.user.presence.status}**`)
            .addField(`• Mem Usage : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, `**Shows Memory Usage of ${client.user.username}**`, true)
            .addField(`• Uptime: ${duration}`,`**${client.user.username} Uptime**`, true)
            .addField(`• Users: ${client.users.size.toLocaleString()}`,`**${client.user.username} Users**`, true)
            .addField(`• Servers: ${client.guilds.size.toLocaleString()}`,`**${client.user.username} Servers**`, true)
            .addField(`• Channels : ${client.channels.size.toLocaleString()}`,`**${client.user.username} Channels**`, true)
            .addField(`• Discord.js: ` + `v${version}`,`**${client.user.username} Discord.js Version**`, true)
            .addField(`• Node: ${process.version}`,`**${client.user.username} Node Version**`)
            .addField(`• CPU: ${os.cpus().map(i => `${i.model}`)[0]}`, `**Shows ${client.user.username} CPU Usage**`, true)
            .addField(`• CPU usage: ${percent.toFixed(2)}%`, `**${client.user.username} Cpu Usage**`, true)
            .addField(`• Arch:  \`${os.arch()}\``,"**Comupter Arch**", true)
            .addField(`• Platform: ${os.platform()}`,`**${client.user.username} Platform**`, true)
        message.channel.send(embedStats)
    });
    
  }


   
});




client.login(process.env.token2);