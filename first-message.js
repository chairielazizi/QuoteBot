const addReactions = (message, reaction) =>{
    message.react(reactions[0])
    reactions.shift() // move the 0 index to te left
    if(reactions.length > 0){
        setTimeout(() => addReactions(message,reaction), 750) //milisecond
    }
}

module.exports = async(client,id,text,reactions = []) => {
    const channel = await client.channels.fetch(id)

    channel.messages.fetch().then((messages) => {
        if(messages.size === 0) {
            // send a new message
            channel.send(text).then(message => {
                addReactions(message,reactions)
            })
        } else{
            // edit existing message
        }
    })
}