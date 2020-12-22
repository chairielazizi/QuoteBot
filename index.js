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
})

client.login(config.token);
client.login(process.env.token);