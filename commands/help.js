const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const commands = `connect\`\` - join the voice channel you are in
   disconnect\`\` - leave the voice channel you are in
   play <Song Name or url>\`\` - play songs from youtube
   pause\`\` - pause currently playing songs in the server
   resume\`\` - resume paused songs in the server
   queue\`\` - shows the song queue of the server
   skip\`\` - skips to next song in the queue
   skipto <Target number>\`\` - Multiple skips until target
   stop\`\` - stops the song and clears the queue
   volume <volume count or none>\`\` - see or adjust volume of songs
   np\`\` - see now playing song
   lyrics\`\` - get lyrics of current song
   shuffle\`\` - shuffle and randomize the queue
   invite\`\` - get invite link for the bot
   loop\`\` - enable / disable loop for the currently playing song
   remove <Target number>\`\` - remove a song from the queue
   help\`\` - to see this command`;

  const revised = commands
    .split("\n")
    .map((x) => "• " + "``" + client.config.prefix + x.trim())
    .join("\n");

  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "MusicBot Commands Help",
        "https://img.icons8.com/color/2x/services--v2.gif"
      )
      .setColor("FFFBFB")
      .setTimestamp()
      .setDescription(revised)
  );
};
