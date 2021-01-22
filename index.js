// require('dotenv').config();
// export const token = process.env[token];
const Discord = require('discord.js');
const client = new Discord.Client();

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest()

function getQuote(){
    var quote;
    request.open('GET','https://zenquotes.io/api/random',true)
    request.onload = function(){
        // begin acessing JSON data here
        var data = JSON.parse(this.responseText);
        quote = data[0]['q'] + " -" + data[0]['a']
        
    }
    request.send()
    return quote;
}


const config = require("./config.json");
const command = require('./command');
const firstMessage = require("./first-message")
const privateMessage = require("./private-message");

client.on('ready',() => {
    console.log("The client is ready");

    command(client,['q','quote'], message => {
        quote = getQuote()
        message.channel.send(quote);
    })

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
                // for (const result of results){
                //     message.result.delete()
                // }
                // message.channel.bulkDelete(results);
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


    // firstMessage(client,'791078758572490763','halu',['😍','😁','🐱‍🐉','🎉'])
    // firstMessage(client,'782247082915921944','hohoho',['😍','😁','🐱‍🐉','🎉'])

    privateMessage(client,"ping","pong");
    client.users.fetch('464470476391972874').then(user => {
        user.send('Ahoy World!');
    })

})

client.login(config.token);
// client.login(process.env.token);