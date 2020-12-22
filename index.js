// require('dotenv').config();
// export const token = process.env[token];
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const command = require('./command');

client.on('ready',() => {
    console.log("The client is ready");

    command(client, ['ping','test'], (message) => {
        message.channel.send('Pongo!');
    })

    // list the members of the server
    command(client,'servers',message=>{
        client.guilds.cache.forEach((guild) => {
            console.log(guild);
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`);
        })
    })

    // delete recent messages on the channel
    command(client,['cc','clear'],(message) => {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                console.log(results); // get all the messages
                message.channel.bulkDelete(results);
            })
        }
    })

    // set the status of the bot
    command(client,'status',message => {
        const content = message.content.replace('!status','');

        // "!status hello world" -> "hello world"
        client.user.setPresence({
            activity:{
                name: content,
                type: 0,
            },
        })
    })
})

client.login(config.token);
client.login(process.env.token);