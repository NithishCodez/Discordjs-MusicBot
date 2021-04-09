const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

exports.run = async (client, message, args) => {
  const queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel
      .send("There is nothing playing.")
      .catch(console.error);

  let lyrics = null;

  try {
    lyrics = await lyricsFinder(queue.queue[0].name, "");
    if (!lyrics) lyrics = `No lyrics found for ${queue.queue[0].name} :x:`;
  } catch (error) {
    lyrics = `No lyrics found for ${queue.queue[0].name} :x:`;
  }

  let lyricsEmbed = new MessageEmbed()
    .setAuthor(
      `Lyrics For ${queue.queue[0].name}`,
      "https://img.icons8.com/color/2x/task--v2.gif"
    )
    .setDescription(lyrics)
    .setColor("BLUE")
    .setTimestamp();

  if (lyricsEmbed.description.length >= 2048)
    lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
  return message.channel.send(lyricsEmbed).catch(console.error);
};
