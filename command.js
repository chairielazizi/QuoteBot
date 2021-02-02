const { prefix } = require(process.env.prefix);
// const { prefix } = require("./config.json");

// ['ping','test']

// ['ping']

module.exports = (client, aliases, callback) => {
  //   const prefix = "!";
  if (typeof aliases === "string") {
    aliases = [aliases];
  }

  client.on("message", (message) => {
    const { content } = message;

    aliases.forEach((alias) => {
      const command = `${prefix}${alias}`;

      if (content.startsWith(`${command} `) || content === command) {
        console.log(`Running the command ${command}`);
        callback(message);
      }
    });
  });
};
