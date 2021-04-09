const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "You must Join a voice channel before using this command!"
    );
  const queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Master Shuffle Controller Error",
          "https://img.icons8.com/color/2x/activity.gif"
        )
        .setDescription("** :x: There are no songs in queue to shuffle**")
        .setColor("RED")
    );
  let songs = queue.queue;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
  }
  queue.queue = songs;
  message.client.queue.set(message.guild.id, queue);
  message.channel
    .send(
      new MessageEmbed()
        .setAuthor(
          "Master Shuffle Controller",
          "https://img.icons8.com/color/2x/activity.gif"
        )
        .setDescription("** :white_check_mark: Shuffled the queue**")
        .setColor("BLUE")
    )
    .catch(console.error);
};
