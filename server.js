const http = require('http');
const express = require('express');
const app = express();


app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

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
const server2 = require("./server-two.js")
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
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.dbltoken, { webhookAuth: 'Xeno', webhookServer: server });
dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', vote => {
  let embed = new Discord.RichEmbed()
      .setColor('#3498db')
      .setTitle("Some one just voted!")
      .addField("User ID:", `${client.users.get(vote.user).id} just voted!`)
      .setTimestamp();
  console.log(`User with ID ${vote.user} just voted!`);
  client.channels.get('549530774483894274').send(embed)
});
dbl.on('posted', () => {
  console.log('Server count posted!');
})
dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})
server.listen(5000, () => {
  console.log('Listening');
});
const cooldown = new Set();



client.on("ready", () => {
  

  console.log(`Logged in as ${client.user.username}!`);
  
  const statuses = [
    { type: 'PLAYING', name: `x!help | ${client.guilds.size} servers` },
    { type: 'PLAYING', name: `x!help | For help` },
    { type: 'WATCHING', name: `Xenō on ${client.guilds.size} servers!` },
    { type: 'PLAYING', name: `x!invite | Invite me to your server!` },
    { type: 'PLAYING', name: `x!support | Join our Support Server!` }
    
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
  
/*  setInterval(() => {
  
  try{
    const avater = avaters[Math.floor(Math.random() * statuses.length)];
    
      client.user.setAvatar(avater.image);
  } catch (err) {
    console.log(err)
  }
    
  
}, 8.64e+7);*/
  
  setInterval(() => {
        dbl.postStats(client.guilds.size, client.shards.Id, client.shards.total);
    }, 1800000);
  
  
});


client.on('guildMemberAdd', member => {
  try {
    let embed = new RichEmbed()
   .setTitle("Member Joined!")
   .addField("Name:", member.user)
   .addField("User ID:", member.id)
   .addField("Member Count:", member.guild.memberCount)
   .setFooter(`Welcome to ${member.guild.name}!!`)
   .setColor("#3498db");

  member.guild.channels.get('543032654388264960').send(embed); 
    
    let role = member.guild.roles.find(`name`, "Xenō Members");
  member.addRole(role);
    
  } catch (err) {
    console.log(err)
  }
});

client.on("guildMemberRemove", member => {
  try {
  let embed = new RichEmbed()
   .setTitle("Member Left")
   .addField("Name:", member.user)
   .addField("User ID:", member.id)
   .addField("Member Count:", member.guild.memberCount)
   .setFooter(`Goodbye, we hope you had a nice time in ${member.guild.name}.`)
   .setColor("#ff0000");

  member.guild.channels.get('543032654388264960').send(embed);
    
  } catch (err) {
    console.log(err)
  }
});






client.afk = new Map();
client.on("message", async message => { 
  
  let keym = message.guild.id
  
  prefixdb.ensure(keym, {
    
    p: "x!"
    
    
  })
  
const prefix = `${prefixdb.get(keym, "p")}`
console.log(prefix)
if(!message.content.startsWith(prefix)) return;

const args = message.content.slice(prefix.length).trim().split(/\s+/g);

const command = args.shift().toLowerCase();

let sender = message.author;
	
if(message.author.bot) return;
  
  
  
  if (client.user.id === message.author.id) { return }
  
  
  
  
  
  
  
  
  
	

  
if(['h', 'hlp', 'help'].includes(command)) {   
  
  let embed = new RichEmbed()
    .setTitle("Xeno Commands")
    .setDescription(`Need help with my commands? No problem here they are:`)
    .addField("Commands", `**${prefix}poll** - Does a poll in your server. Please put \`\`*\`\` to separate the title and the question. Permission Require: View Audit Log.\n**${prefix}purge** \`\`OR\`\` **${prefix}clear** - Deletes messages in your server which channel you are in. Maximum 100 messages.\nPermission Require: Manage Message.\n**${prefix}meme** - Shows you a meme.\n**${prefix}serverinfo** - Shows the server information.\n**${prefix}mute** - Mutes a member from chatting in your server.\nPermission Require: Mute Members.\n**${prefix}unmute** - Unmutes the member so he can again chat with the server.\nPermission Require: Mute Members.\n**${prefix}lock** - Locks down a channel so members can't send messages.\n**${prefix}unlock** - Unlocks a channel so members can send messages again.\n**${prefix}lock <time>** - Locks down a channel until the time runs out.\n**${prefix}unlock <time>** - Unlocks the channel until the time runs out.\nPermission Require: Manage Channels.\n**${prefix}avatar** - Shows you the mentioned user's avatar or your's avatar.`)
    .addField("Setting up", `**${prefix}setprefix <prefix>** - Set's the prefix for the server!\nPermission Require: Admininistrator\n**Coming Soon**`)
    .addField("Support Commands", `**${prefix}support** - Sends you my support server's link! Join now!!\n**${prefix}invite** - Sends you the link to invite me in your server!\n**${prefix}vote** - Sends you the link to vote me!! (Rewards Coming Soon!)`)
    .addField("Music", `\n\nIf you need help with the music commands, then do\n**${prefix}help music**\n\nCreated By`)
    .setColor("#3498db")
    .setFooter("RanTDR#8283", "https://cdn.discordapp.com/avatars/461071232985464832/1bc498f18b68310cdcd18870d0a7ddc9.png?size=256")
  
  try{
    
    await message.channel.send("Please check your DM.")
    await message.author.send(embed);
    
  } catch (err){
    
    await message.channel.send("Sorry but I couldn't send the message in your DM so here it is.")
    await message.channel.send(embed);
    
  }
}
  
  if(['h-music', 'hlp-music', 'help-music', 'h-m', 'hlp-m', 'help-m'].includes(command)) {   
    
    
  let embed = new RichEmbed()
    .setTitle("Xeno Music Commands")
    .setDescription("Need help with my music commands? No problem here they are:")
    .addField("Music Commands", `**${prefix}play** - Plays the video that you want. You can also put URL or a playlist URL or put the title of the video.\n**${prefix}stop** - Stops the video.\n**${prefix}np** - Shows what is currently pkaying.\n**${prefix}volume** - Sets the volume of the video default is 5. If you do this command without a number then it shows what's the current video volume.\n**${prefix}skip** - Skips to the next video if you have multiple videos.\n**${prefix}queue** - Shows the queue and what's playing currently.\n**${prefix}pause** - Pauses the video.\n**${prefix}resume** - Resumes the video.\n\n Created by`)
    .setColor("#3498db")
    .setFooter("RanTDR#8283", "https://cdn.discordapp.com/avatars/461071232985464832/1bc498f18b68310cdcd18870d0a7ddc9.png?size=256")
    
    try{
    
    await message.channel.send("Please check your DM.")
    await message.author.send(embed);
    
  } catch (err){
    
    await message.channel.send("Sorry but I couldn't send the message in your DM so here it is.")
    await message.channel.send(embed);
    
  }
    
  }
  
  
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
  
  if(command === 'poll') {

    if(!message.member.hasPermission("VIEW_AUDIT_LOG")) return message.reply("You don't have enough permissions to do that.");
    
let title = message.content.split(' ').slice(1).join(' ')

let question = message.content.split('*').slice(1).join(' ')

    
  if (!args[0] || args[0 === "help"]) return message.reply(`**Invalid Format:** \`${prefix}poll <Title> * <Question>\``)
    if (!args[1] || args[1 === "help"]) return message.reply(`**Invalid Format:** \`${prefix}poll <Title> * <Question>\``)

  const embed = new RichEmbed()
  .setColor("RANDOM")
  .setTitle(`${title.split('*')[0]}`)
  .setDescription(`${question}`)
  .setFooter(`Poll Started By: ${message.author.username} - React to vote.`, `${message.author.avatarURL}`)

  let msg = await message.channel.send(embed)
 
   await msg.react('✅')
   await msg.react('❎')
   await msg.react('🤷')
  

} 
  
   if(['clear', 'purge'].includes(command)) {
     
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have enough permissions to do that.");
     
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
     
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
     await message.channel.send(`Cleared ${deleteCount} messages!`).then(msg => msg.delete(1000));
  }
  
  if(['e', 'ev', 'eval'].includes(command)) {
  
    
  owners_id.forEach(async function(owners_id) {
    if (message.author.id !== owners_id) return;
  
      try {
        let codein = args.join(" ");
        let code = eval(codein);
        
        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        
        let embed = new Discord.RichEmbed()
        .setAuthor('Evaluate')
        .setColor('#2A99EE  ')
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
        
        message.channel.send(embed)
    } catch(e) {
        let eer = new Discord.RichEmbed()
        .setTitle(`Eval Error :x:`)
        .setColor("#F20909")
        .addField(`Error`,`\`\`\`js\n${e}\n\`\`\``)
        message.channel.send(eer);
    }
  });
    
        function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/'/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
          return text;
    }
    
    let code;
}
  
  
  /*if(command === 'neweval') {
    
   if(!args[0]) return message.channel.send("Provide me a code to eval!!");

		function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/'/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
          return text;
    }


		let evaled;
		try {
      let evalcode = args.join(' ');
      
			evaled = eval(args.join(' ')); // eslint-disable-line no-eval

			if (evaled instanceof Promise || (Boolean(evaled) && typeof evaled.then === "function" && typeof evaled.catch === "function")) evaled = await evaled;


			let response = '';
			let channelresponse = "";
			response += ` **•Output:**\`\`\`js\n${clean(inspect(evaled, { depth: 0, maxArrayLength: null }), client.token)}\n\`\`\``;
			channelresponse += `\n **• Type:** \`\`\`asciidoc\n${typeof evaled}\`\`\``;
      
      let embed = new Discord.RichEmbed()
        .setAuthor('Evaluate')
        .setColor('#2A99EE  ')
        .addField(':inbox_tray: Input', `\`\`\`js\n${evalcode}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\n${clean(inspect(evaled), process.env.token)}\n\`\`\``)
        .addField('Type', `\`\`\`asciidoc\n${typeof evaled}\`\`\``)


			if (response.length < 1950) {
				await message.channel.send(embed)
			}

		} catch (err) {
      
      
      if (evaled instanceof Promise || (Boolean(evaled) && typeof evaled.then === "function" && typeof evaled.catch === "function")) evaled = await evaled;
       
      let error = new Discord.RichEmbed()
      .setTitle(`Evaluate :x:`)
        .setColor('')
        .addField(':x: ERROR', `\`\`\`xl\n${clean(err, client.token)}\n\`\`\``)
        .addField('Type', `\`\`\`asciidoc\n${typeof evaled}\`\`\``)
      message.channel.send(error)
		}
} 
    */
  
  
  
  
  
  
  if(command === 'meme') {
  
    let {body} = await superagent
    
    .get('https://api-to.get-a.life/meme')
    
    const embed = new RichEmbed()
    
    .setColor('RANDOM')
    
    .setTitle(body.text)
    
    .setImage(body.url)
    
    
    await message.channel.send(embed)
    
    
  }
  
  if(command === 'sayembed') {
    
    let title = message.content.split(' ').slice(1).join(' ')

   let description = message.content.split('*').slice(1).join(' ')
   
   let color = message.content.split('!').slice(1).join(' ')
    
   let embed = new Discord.RichEmbed()
   .setTitle(`${title.split('*')[0]}`)
   .setDescription(`${description}`)
   .setColor("RANDOM")
    
   message.channel.send(embed)
    
  }
  
  
  
  
  if(command === 'serverinfo') {
    
   function checkBots(guild) {
    let botCount = 0;
    guild.members.forEach(member => {
      if(member.user.bot) botCount++;
    });
    return botCount;
  }

  function checkMembers(guild) {
    let memberCount = 0;
    guild.members.forEach(member => {
      if(!member.user.bot) memberCount++;
    });
    return memberCount;
  }
  let icon = message.guild.iconURL;
    
    let serverName;
if(message.guild.name.length > 10) serverName = message.guild.name
    
  let embed = new RichEmbed()
    .setAuthor(`${message.guild.name} - Informations`, icon)
    .setThumbnail(icon)
    .setColor('RANDOM')
    .addField('Server', serverName, true)
    .addField('Server ID', message.guild.id, true)
    .addField('Server Owner', message.guild.owner, true)
    .addField('Server Region', message.guild.region, true)
    .addField('Channels', message.guild.channels.size, true)
    .addField('Roles', message.guild.roles.size, true)
    .addField('Users', checkMembers(message.guild), true)
    .addField('Bots', checkBots(message.guild), true)
    .addField('Total Member Count', message.guild.memberCount, true)
    .addField('Verification level', message.guild.verificationLevel, true)
    .addField('You joined at', message.member.joinedAt, true)
    .setFooter('Guild created at')
    .setTimestamp(message.guild.createdAt);

    return message.channel.send(embed);
}

    
  
  if(command ==='mute') {
    
    
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("You don't have enough permissions to do that."); 
    if (!args[0] || args[0 === "help"]) return message.reply(`**Invalid Format:** \`${prefix}mute <User>\``)
    
     let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MUTE_MEMBERS")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "Muted");
  let defaultrole = message.guild.roles.find(`name`, "Members");
  let defaultrole2 = message.guild.roles.find(`name`, "Member");
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
       .then(r => r.setPosition(message.guild.roles.size - 20))
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
 try{
  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted`);
  tomute.removeRoles(tomute.roles);
 }catch (err){
  message.channel.send("Sorry but in order to mute them I need to remove their roles but their roles are higher then mine please put my role higher then them")
 }

}
  
  
  if(command ==='unmute') {
    
    
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("You don't have enough permissions to do that."); 
    if (!args[0] || args[0 === "help"]) return message.reply(`**Invalid Format:** \`${prefix}unmute <User>\``)
    
     let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MUTE_MEMBERS")) return message.reply("Can't unmute them!");
  let muterole = message.guild.roles.find(`name`, "Muted");
  let defaultrole = message.guild.roles.find(`name`, "Members");
  let defaultrole2 = message.guild.roles.find(`name`, "Member");
 try{
  await(tomute.removeRole(muterole.id));
  message.reply(`<@${tomute.id}> has been unmuted`);
  tomute.addRole(defaultrole.id);
 }catch (err){
  tomute.addRole(defaultrole2.id);
 }

}
  
if(command === 'setprefix') {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You don't have enough permissions to do that."); 
  
  let key = `${message.guild.id}`
  
  prefixdb.ensure(key, {
    
    p: "x!"
    
  })
  
  if(!args[0] || args[0 === "help"]) return message.channel.send(`This server prefix is: ${prefixdb.get(key, "p")}`)
  
  const newprefix = message.content.split(" ").slice(1);
  
  prefixdb.setProp(key, "p", newprefix)
   
  message.channel.send(`Prefix set to ${prefixdb.get(key, "p")}`)
  
}
  
    if(command === 'lock') {
    
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You don't have the permissions to do that.");
    message.channel.send("Channel locked, you can use ``x!unlock`` to unlock the channel again.")
    
    
   if (!client.lockit) client.lockit = [];
    let time = args.join(' ');
    let validUnlocks = ['release', 'unlock'];
    if (!time);

    if (validUnlocks.includes()) {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: true
        }).then(() => {
            message.channel.sendMessage('');
            clearTimeout(client.lockit[message.channel.id]);
            delete client.lockit[message.channel.id];
        }).catch(error => {
        }); return;
    } else {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() => {
            message.channel.send(`**Channel locked** for ${ms(ms(time), { long:true })}.`).then(() => {

                client.lockit[message.channel.id] = setTimeout(() => {
                    message.channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: true
                    }).then(message.channel.send('**Lockdown lifted.**'));
                    delete client.lockit[message.channel.id];
                }, ms(time));

            })
        });
      
    }
    
  }
  
  
  if(command === 'unlock') {
    
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You don't have the permissions to do that.");
    message.channel.send("Channel unlocked, you can use ``x!lock`` to lock the channel again.")
    
    
    if (!client.lockit) client.lockit = [];
    let time = args.join(' ');
    let validUnlocks = ['release', 'unlock'];
    if (!time);

    if (validUnlocks.includes()) {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: true
        }).then(() => {
            message.channel.sendMessage('');
            clearTimeout(client.lockit[message.channel.id]);
            delete client.lockit[message.channel.id];
        }).catch(error => {
        }); return;
    } else {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: true
        }).then(() => {
            message.channel.send(`**Channel unlocked** for ${ms(ms(time), { long:true })}.`).then(() => {

                client.lockit[message.channel.id] = setTimeout(() => {
                    message.channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: false
                    }).then(message.channel.send('**Lockdown lifted.**'));
                    delete client.lockit[message.channel.id];
                }, ms(time));

            })
        });
    }
    
  }

  if(command === 'invite'){
  
  let embed = new RichEmbed()
    .addField('Invite Xeno to your server!', `Hey want me in your server? No problem invite me from the link below.\n\nInvite: https://discordapp.com/oauth2/authorize?client_id=535097899638456330&scope=bot&permissions=2146958847\n`)
    .setColor("#3498db")
    .setFooter("Created By RanTDR#8283", "https://cdn.discordapp.com/avatars/461071232985464832/1bc498f18b68310cdcd18870d0a7ddc9.png?size=256")
    
    message.channel.send("Please check your DM.")
    await message.author.send(embed);
  
  }
  
  
  if(command === 'guilds') {
    
    const guildNames = client.guilds.map(g => g.name).join("\n")
  
    let guilds = client.guilds.size 
    
  owners_id.forEach(async function(owners_id) {
    if (message.author.id !== owners_id) return;

    let embed = new RichEmbed()
    .setTitle(`I'm on ${guilds} servers.`)
    .setDescription(guildNames)
    .setColor("#3498db")
  
    
    message.channel.send(embed)
    
  });
    
    
}
  
  
  if(command === 'avatar') {
    
  let member = message.mentions.users.first() || message.author;
    

        let embed = new RichEmbed()

        .setImage(member.displayAvatarURL)
        .setColor("#3498db")
        .setTitle(`${member.username}'s Avatar`)
        .setDescription(`[${member.username}'s Avatar URL Link](`+member.displayAvatarURL+")");

        message.channel.send(embed)

    
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
  
  
  if(['money', 'balance', 'mon', 'm', 'bal', 'b'].includes(command)) {
    
     var output = await eco.FetchBalance(message.author.id)
    
    let embed = new RichEmbed()
    
    .setTitle("Bank")
    .addField(`Name`, message.author.username, true)
    .addField(`Balance`, `$${output.balance}`, true)
    .setColor("#3498db")
    
    message.channel.send(embed)
    
    
    
  }
  
  
  if(['d', 'daily'].includes(command)) {
    
    
    let embed = new RichEmbed()
    
    .addField(`Daily Reward`, `You got $100 added to your account!`)
    .setColor("#3498db")
    
    var output = await eco.Daily(message.author.id)
    
    if (output.updated) {
 
      var profile = await eco.AddToBalance(message.author.id, 100)
    
     message.channel.send(embed)
      
    } else {
     
      let rmbed = new RichEmbed()
      
      .addField(`Daily Reward`, `You already collected your daily reward! You can again collect your daily reward ` + moment().endOf('day').fromNow() + '.')
      .setColor("#3498db")
      
      message.channel.send(rmbed)
    }
    
  }
  
  
  if (command === 'leaderboard') {
 
    if (message.mentions.users.first()) {
 
      var output = await eco.Leaderboard({
        filter: x => x.balance > 50,
        search: message.mentions.users.first().id
      })
      message.channel.send(`The user ${message.mentions.users.first().tag} is number ${output} on the leaderboard!`);
 
    } else {
 
      eco.Leaderboard({
        limit: 3, 
        filter: x => x.balance > 50 
      }).then(async users => {
 
        if (users[0]) var firstplace = await client.fetchUser(users[0].userid)
        if (users[1]) var secondplace = await client.fetchUser(users[1].userid)
        if (users[2]) var thirdplace = await client.fetchUser(users[2].userid) 
 
        
        let embed = new RichEmbed()
        
        .setTitle("Leaderboard")
        .addField("First", `${firstplace && firstplace.tag || 'Nobody Yet'} : ${users[0] && users[0].balance || 'None'}`)
        .addField("Second", `${secondplace && secondplace.tag || 'Nobody Yet'} : ${users[1] && users[1].balance || 'None'}`)
        .addField("Third", `${thirdplace && thirdplace.tag || 'Nobody Yet'} : ${users[2] && users[2].balance || 'None'}`)
        .setColor("#3498db")
        
        message.channel.send(embed)
 
 
      })
 
    }
  }
  
  
  if (command === 'transfer') {
 
    var user = message.mentions.users.first()
    var amount = args[1]
 
    if (!user) return message.reply('Please mention the user you want to pay!')
    if (!amount) return message.reply('Please specify the amount you want to pay!')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('You have less dollars than the amount you want to transfer!')
 
    var transfer = await eco.Transfer(message.author.id, user.id, amount)
    
    let embed = new RichEmbed()
    
    .setTitle("Transfer Successful")
    .addField(`${message.author.username}'s Balance`, `${transfer.FromUser}$`)
    .addField(`${user.tag}'s Balance`, `${transfer.ToUser}`)
    .setColor("#3498db")
    
    message.channel.send(embed)
    
  }
  
  
  if (command === 'coinflip') {
 
    var flip = args[0]
    var amount = args[1] 
 
    if (!flip || !['heads', 'tails'].includes(flip)) return message.reply('Please specify the flip, either heads or tails!')
    if (!amount) return message.reply('Specify the amount you want to gamble!')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('You have less dollars than the amount you want to gamble!')
 
    var gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error)
    
    let embed = new RichEmbed()
    .addField(`Coin Flip`, `You $${gamble.output}!`)
    .addField(`New Balance`, `$${gamble.newbalance}`)
    .setColor("#3498db")
    
    message.channel.send(embed)
 
  }
  
  if(command === 'work') {
    
    if (cooldown.has(message.author.id)) {
    message.channel.send("Please wait 1 hour before doing this command again.");
    message.delete();
    return;
  }

  cooldown.add(message.author.id);
  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, 3600000);
    
  var output = await eco.Work(message.author.id, {
      failurerate: 55,
      money: Math.floor(Math.random() * 500),
      jobs: ['cashier', 'shopkeeper']
    })
    if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!')
 
    let success = new RichEmbed()
    .setTitle(`${message.author.username}`)
    .addField(`You worked as a ${output.job}`, `And earned 💸 $${output.earned}. You now own 💸 $${output.balance}`)
    .setColor("#3498db");
    
    message.channel.send(success);
 
    
  }
  
  if(command === 'buy') {
    
    let categories = [];
    
   if (!args.join(" ")) {
    
     for (var i in items) {
       
       if (!categories.includes(items[i].type)) {
         
        categories.push(items[i].type)
        
       }
       
     }
     
     const embed = new Discord.RichEmbed()
     .setDescription(`Avaliable Items`)
     .setColor("#3498db")
     
     for (var i = 0; i < categories.length; i++) {
       
       var tempDesc = '';
       
       for (var c in items) {
         
         if (categories[i] === items[c].type) {
           
          tempDesc += `Name: ${items[c].name}\nPrice: $${items[c].price}\nDescription: ${items[c].desc}\n` 
           
         }
         
       }
       
       embed.addField(categories[i], tempDesc);
       
     }
     
     return message.channel.send(embed);
     
   }
    
    let itemName = '';
    let itemPrice = 0;
    let itemDesc = '';
    
    for (var i in items) {
      
     if (args.join(" ").trim().toUpperCase() === items[i].name.toUpperCase()) {
      itemName = items[i].name;
      itemPrice = items[i].price;
      itemDesc = items[i].desc;
       
     }
     
    }
    
    if (itemName === ''){
      
     return message.channel.send(`**Item ${args.join(" ").trim()} not found.**`)
     
    }
    
    eco.FetchBalance(message.author.id).then((i) => {
      
      if (i.money < itemPrice) { 
       return message.channel.send(`**You don't have enough money for this item.**`); 
      }
      
      eco.AddToBalance(message.author.id, parseInt(`-${itemPrice}`)).then((i) => {
        
        message.channel.send('**You bought ' + itemName + '!**')
        
      })
      
      
    })
    
    
  }
  
  
  if(command === 'kick') {
    
    let key = message.guild.id;
    
    channeldb.ensure(key, {
      
      channel: "null"
      
    })
    
    let channel = channeldb.get(key).channel;
    
    const c = message.guild.channels.get(channeldb.get(key).channel)
    
if(!client.channels.get(channel)) return message.reply("Invalid channel or no channel is set for mod-log. **Please setup it first using:** `x!setup <#channel>`")
    
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You don't have the permissions to do that.");
    
   const user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    if(user.hasPermission("KICK_MEMBERS")) return message.reply("❎ Can't kick them!");
    
    
    if (user) {
      
      const member = message.guild.member(user);
      
      if (member) {
        
        let embed = new RichEmbed()
    .setTitle(`You have been kicked from ${message.guild.name}`, true)
    .addField(`By`, `${message.author.tag}`, true)
    .addField(`Reason`, `${reason}`, true)
    .setColor("#3498db")
    .setTimestamp()
    
    let lembed = new RichEmbed()
    .setTitle(`${member.user.tag} was kicked from the server.`, true)
    .addField(`By`, `${message.author.tag}`, true)
    .addField(`Reason`, `${reason}`, true)
    .setColor("#3498db")
    .setTimestamp()
    
    try {
    await member.send(embed)
    } catch (err) {
     await c.send(lembed)
     await member.ban(reason)
      
      message.channel.send(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
      
      return;
    }
    await c.send(lembed)
       await member.kick(reason).then(() => {
          
          message.channel.send(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
        }).catch(err => {
          
          message.reply('I was unable to kick the member.');
          
          console.error(err);
        });
      } else {
        
        message.reply('The member isn\'t in this server!');
      }
      
    } else {
      message.reply('Please mention a member!');
    } 
    
  }
  
  
  if(command === "ban") {
    
    
    let key = message.guild.id;
    
    channeldb.ensure(key, {
      
      channel: "null"
      
    })
    
    let channel = channeldb.get(key).channel;
    
    const c = message.guild.channels.get(channeldb.get(key).channel)
    
if(!client.channels.get(channel)) return message.reply("Invalid channel or no channel is set for mod-log. **Please setup it first using:** `x!setup <#channel>`")

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You don't have the permissions to do that.");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
    if(member.hasPermission("BAN_MEMBERS")) return message.reply("Can't ban them!");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    let embed = new RichEmbed()
    .setTitle(`You have been banned from ${message.guild.name}`, true)
    .addField(`By`, `${message.author.tag}`, true)
    .addField(`Reason`, `${reason}`, true)
    .setColor("#3498db")
    .setTimestamp()
    
    let lembed = new RichEmbed()
    .setTitle(`${member.user.tag} was banned from the server.`, true)
    .addField(`By`, `${message.author.tag}`, true)
    .addField(`Reason`, `${reason}`, true)
    .setColor("#3498db")
    .setTimestamp()
    try {
    await member.send(embed)
    } catch (err) {
     await c.send(lembed)
     await member.ban(reason)
      
      message.channel.send(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
      
      return;
    }
    await c.send(lembed)
    await member.ban(reason)
      .catch(error => message.channel.send(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.channel.send(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  
  
  
  if(command === 'support') {
    
   const embed = new RichEmbed()
   .setTitle("Xeno Support Server")
   .setDescription("Join Xeno Support Server and get help!! We do awesome giveaways!")
   .addField("Join Now!", "[Click me to join!](https://discord.gg/S9mzp6M)")
   .setColor("#3498db")
   
   message.channel.send("📨 Check your DM.")
    await message.author.send(embed);
    
  }
  
  if(command === 'EOEROJOSFSNFSOFJSGLKDG') {
    
    client.on("messages", async message => { 
    
   let bad_words = [
  "fuck",
  "boobs",
  "mc",
  "bc",
  "chutiya",
  "Maderchod",
  "Mother fucker",
  "Bhen chod",
  "Bitch",
  "Sister fucker"
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
}
  
  
  if(command === 'vote') {
    
    
   let embed = new RichEmbed()
   
   .setTitle(`Vote me on DBL!`)
   .setDescription("[Click me to Vote!](https://discordbots.org/bot/535097899638456330/vote)")
   .setColor("#3498db");
    
    message.channel.send(embed)
    
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

  
  
  
  if(command === 'setup') {
    
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You don't have the permissions to do that.");
    
 let key = message.guild.id;
    
 channeldb.ensure(key, {
   
   channel: "null"
   
 })
    
 let channel = args[0];

channel = message.mentions.channels.first(); // this looks for channel mentions.

if(!channel) return message.channel.send(`No channel mentioned or invalid channel. **Please setup using:** \`\${prefix}setupchannel <#channel>\``) // Send this if the channel is incorrect or nothing mentioned.

const c = channel.id;
    
const getChannel = message.guild.channels.get(c)

await getChannel.send("Ok this channel has been set for mod logs!") 
    

channeldb.setProp(key, "channel", c)
    
    
    
  }
    
  
  if(command === 'test') {
    
    const toSend = message.content.split(" ").slice(1).join(" ");
    
    let key = message.guild.id;
  
    channeldb.ensure(key, {
      
      channel: "null"
      
    })
    
    
   const c = message.guild.channels.get(channeldb.get(key).channel)
   
   await c.send(toSend)
    
    
  }
  
  
  
  
              
  
  
  
  
  
  
   
});



client.on('message', async msg => {
 
  let keym = msg.guild.id
  
  prefixdb.ensure(keym, {
    
    p: "x!"
    
  })
  
  let prefix = `${prefixdb.get(keym, "p")}`
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

	if (command === 'play') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					
					const rEmbed = new RichEmbed()

    .setTitle(`Search Results:`)

	.setColor('RANDOM')

    .setDescription(`Please provide a value to select one of the search results ranging from 1-10.`)
   
	.addField(`Song Selection:`, `${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
	.setFooter(`It will be cancelled in 10 seconds or if no or invalid value entered.`)
					
					msg.channel.send(rEmbed);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
    msg.channel.send(`Okay I skipped it for you.`)
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} else if (command === 'stop') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
    msg.channel.send(`Okay all songs removed and stopped. I left.`)
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (command === 'volume') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`I set the volume to: **${args[1]}**`);
	} else if (command === 'np') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
	} else if (command === 'queue') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');

		const rEmbed = new RichEmbed()
	
		.setColor('RANDOM')
	   
		.addField(`Queue:`, `${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`)
		.addField(`Now Playing:`, `${serverQueue.songs[0].title}`)
						
						msg.channel.send(rEmbed);

	} else if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Paused the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	
		

	} else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ Resumed the music for you!');
		}
		return msg.channel.send('There is nothing paused or not playing.');
	}

	return undefined; 
  
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Started playing: **${song.title}**`);
}






client.login(process.env.token);