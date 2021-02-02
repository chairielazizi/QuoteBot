const addReactions = (message, reactions) => {
  message.react(reactions[0]);
  reactions.shift(); // move the 0 index to the left
  if (reactions.length > 0) {
    setTimeout(() => addReactions(message, reactions), 750); //milisecond
  }
};

module.exports = async (client, id, text, reactions = []) => {
  const channel = await client.channels.fetch(id);

  channel.messages.fetch().then((messages) => {
    if (messages.size === 0) {
      // send a new message
      channel.send(text).then((message) => {
        addReactions(message, reactions);
      });
    } else {
      // edit existing message
      for (const message of messages) {
        console.log(message);
        // message[1].edit(text)
        // addReactions(message[1], reactions)
      }
    }
  });
};
