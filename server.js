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


const { Client, RichEmbed, Attachment } = require("discord.js");
const Enmap = require('enmap');
const client = new Client({disableEveryone: true});
const superagent = require('superagent'); 
const { Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube("AIzaSyDXtnV7yR6-dBdCSvoJSGvplpkczBYyUbQ");
const queue = new Map();
const ms = require('ms');
const prefixdb = new Enmap({ name: "prefixdb"})
const { post } = require('node-superfetch');
const { owners_id } = require("./config.json");
const Discord = require('discord.js');

client.on("ready", () => {

  console.log(`Logged in as ${client.user.username}!`);

  client.user.setActivity("x!help", { type: "PLAYING" })

});

client.on('guildMemberAdd', member => {
  
  var role = member.guild.roles.find('name', 'Members');
  var role2 = member.guild.roles.find('name', 'Member');
  
  try {
    
  member.addRole(role);
  } catch (err) {
    
   member.addRole(role2);
    
  }
});



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
  
	
if(message.author.bot) return;
	

  
if(['h', 'hlp', 'help'].includes(command)) {   
  
  let embed = new RichEmbed()
    .setTitle("Xeno Commands")
    .setDescription("Need help with my commands? No problem here they are:")
    .addField("Commands", `**${prefix}poll** - Does a poll in your server. Please put \`\`*\`\` to separate the title and the question. Permission Require: View Audit Log.\n**${prefix}purge** - Deletes messages in your server which channel you are in. Maximum 100 messages.\nPermission Require: Manage Message.\n**${prefix}meme** - Shows you a meme.\n**${prefix}serverinfo** - Shows the server information.\n**${prefix}mute** - Mutes a member from chatting in your server.\nPermission Require: Mute Members.\n**${prefix}unmute** - Unmutes the member so he can again chat with the server.\nPermission Require: Mute Members.\n**${prefix}lock** - Locks down a channel so members can't send messages.\n**${prefix}unlock** - Unlocks a channel so members can send messages again.\n**${prefix}lock <time>** - Locks down a channel until the time runs out.\n**${prefix}unlock <time>** - Unlocks the channel until the time runs out.\nPermission Require: Manage Channels.\n**${prefix}invite** - Invite me to your server!\n**${prefix}setprefix** - Set your own prefix for our bot for your server!\nPermission Require: Administrator.`)
    .addField("Music", `\n\nIf you need help with the music commands, then do\n**${prefix}help-music**\n\nCreated By`)
    .setColor("#3498db")
    .setFooter("RanTDR#8283", "https://cdn.discordapp.com/avatars/461071232985464832/1bc498f18b68310cdcd18870d0a7ddc9.png?size=256")
  
  try{
    
    message.channel.send("Please check your DM.")
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
    
    message.channel.send("Please check your DM.")
    await message.author.send(embed);
    
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
  
  
 if(command === "purge") {
   
   let args = message.content.split(" ");

let toClear = args.slice(1);

toClear = Number(toClear);

 if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have enough permissions to do that.");
  
if(!args[0]) {
  let a = new RichEmbed()
  .setDescription("Please specify the number of messages")
  .setThumbnail(client.user.displayAvatarURL)
  .setColor("RANDOM");

  return message.channel.send(a);


  }

   await message.channel.bulkDelete(toClear)
    
   await message.channel.send(`Cleared ${toClear} messages!`).then(msg => msg.delete(1000));
  
   
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
}
  
  
  
  
  
  
  if(command === 'meme') {
  
    let {body} = await superagent
    
    .get('https://api-to.get-a.life/meme')
    
    const embed = new RichEmbed()
    
    .setColor('RANDOM')
    
    .setTitle(body.text)
    
    .setImage(body.url)
    
    
    await message.channel.send(embed)
    
    
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
  tomute.removeRole(defaultrole.id);
 }catch (err){
  tomute.removeRole(defaultrole2.id);
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
  
    let guilds = client.guilds.size 
    
  owners_id.forEach(async function(owners_id) {
    if (message.author.id !== owners_id) return;

    let embed = new RichEmbed()
    .setTitle(`I'm on ${guilds} servers.`)
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
        .setDescription(`[${member.username}'s Avatar Link](`+member.displayAvatarURL+")");

        message.channel.send(embed)

    
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






client.login(process.env.token);;