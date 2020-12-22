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

    command(client,'servers',message=>{
        client.guilds.cache.forEach((guild) => {
            console.log(guild);
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`);
        })
    })
})

client.login(config.token);
client.login(process.env.token);