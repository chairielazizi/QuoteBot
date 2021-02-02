// require('dotenv').config();
// export const token = process.env[token];
const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");

// does not manage to fetch the data using the XMLHttpRequest
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var request = new XMLHttpRequest();

// function getQuote() {
//   var quote;
//   request.open("GET", "https://zenquotes.io/api/random", true);
//   request.responseType = "json";
//   request.onload = function () {
//     // begin acessing JSON data here
//     var status = request.status;
//     if (status == 200) {
//       console.log(request.response);
//     } else {
//       console.log(error);
//     }
//     var data = JSON.parse(this.responseText);
//     // var data = request.response;
//     console.log(data);
//     quote = data[0].q + data[0].a;
//     // quote = JSONStringify(data.q) + " -" + JSONStringify(data.a)
//     request.send();
//   };

//   return quote;
// }

fetch("https://zenquotes.io/api/random")
  .then((res) => res.json())
  .then((data) => {
    // data = res[0].q + res[0].a;
    // data = JSON.parse(this.response);
    console.log(data);
  })
  .catch((err) => console.log(err));

// start to fetch the api from zenquote
const url = "https://zenquotes.io/api/random";
async function get(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  // console.log(data);
  var output = data[0].q + " -" + data[0].a + "-";
  console.log(output);
  return output;
}

const config = require("./config.json");
const command = require("./command");
// const firstMessage = require("./first-message");
const privateMessage = require("./private-message");

client.on("ready", async () => {
  console.log("The client is ready");

  command(client, ["q", "quote"], async (message) => {
    // quote = getQuote();
    quote = await get(url);
    // await console.log(quote);
    await message.channel.send(quote);
  });

  setInterval(async () => {
    var channel = client.channels.cache.get("806020201682042921");
    quote = await get(url);
    channel.send(quote);
  }, "28800000");

  command(client, ["ping", "test"], (message) => {
    message.channel.send("Pongo!");
  });

  // list the members of the server
  command(client, "servers", (message) => {
    client.guilds.cache.forEach((guild) => {
      console.log(guild);
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      );
    });
  });

  // delete recent messages on the channel
  command(client, ["cc", "clear"], (message) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      message.channel.messages.fetch().then((results) => {
        console.log(results); // get all the messages
        // for (const result of results){
        //     message.result.delete()
        // }
        message.channel.bulkDelete(results);
      });
    }
  });

  // set the status of the bot
  command(client, "status", (message) => {
    const content = message.content.replace("!status", "");

    // "!status hello world" -> "hello world"
    client.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    });
  });

  // firstMessage(client,'791078758572490763','halu',['😍','😁','🐱‍🐉','🎉'])
  // firstMessage(client,'782247082915921944','hohoho',['😍','😁','🐱‍🐉','🎉'])

  privateMessage(client, "ping", "pong");
  client.users.fetch("464470476391972874").then((user) => {
    user.send("Ahoy World!");
  });
});

client.login(config.token);
// client.login(process.env.token);
