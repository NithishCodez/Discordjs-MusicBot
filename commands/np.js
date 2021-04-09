const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "You must Join a voice channel before using this command!"
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setColor("RED")
        .setDescription(":x: There are no songs playing in this server")
    );
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Now Playing",
        "https://img.icons8.com/color/2x/audio-wave--v2.gif"
      )
      .setColor("BLUE")
      .setDescription(
        queue.queue[0].name +
          " Requested By: " +
          "<@" +
          queue.queue[0].requested +
          ">"
      )
      .setThumbnail(queue.queue[0].thumbnail)
      .setFooter("There are " + queue.queue.length + " songs in queue")
  );
};
