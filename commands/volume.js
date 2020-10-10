exports.run = async(client, message, args) => {
    const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('You should join a voice channel before using this command!');

    let queue = message.client.queue.get(message.guild.id)

    if(!args[0]) return message.channel.send({
        embed: {
            description: 'The current volume is set to: ' + queue.volume
        }
    })

    if(args[0] > 10) return message.channel.send('Well lets hope we meet in heaven :grin:')

    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
    queue.volume = args[0]
    message.channel.send({
        embed: {
            description: 'Volume is set to ' + args[0]
        }
    })
}