exports.run = async(client, message) => {
    const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('You should join a voice channel before using this command!');
    let queue = message.client.queue.get(message.guild.id)
    if(!queue){ return message.channel.send({
        embed: {
            description: 'There is nothing in the queue right now! add using `+play <songName>`',
            color: 'BLACK'
        }
    })
}
    if(queue.songs.length !== 0) {
        message.react('✅')
        queue.connection.dispatcher.end('Okie skipped!')
    }
}