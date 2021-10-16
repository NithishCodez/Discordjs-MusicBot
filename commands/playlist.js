const ytdl = require("discord-ytdl-core");
const ytpl = require('ytpl')
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    const channel = message.member.voice.channel;
    const error = (err) => message.channel.send(err);
    const setqueue = (id, obj) => message.client.queue.set(id, obj);
    const deletequeue = (id) => message.client.queue.delete(id);
    var song;

    if (!channel) return error("You must join a voice channel to play music!");

    if (!channel.permissionsFor(message.client.user).has("CONNECT"))
        return error("I don't have permission to join the voice channel");

    if (!channel.permissionsFor(message.client.user).has("SPEAK"))
        return error("I don't have permission to speak in the voice channel");

    const query = args.join(" ");

    if (!query) return error("You didn't provide a song name to play!");
    var queue = []
    const structure = {
        channel: message.channel,
        vc: channel,
        volume: 85,
        playing: true,
        queue: [],
        connection: null,
    };
    try {
        const playlist = await ytpl(query)
        var music_list = ''
        playlist.items.map(item => {
            music_list += `${item.title}
                `
            song = {
                name: item.title,
                thumbnail: item.bestThumbnail.url,
                requested: message.author,
                videoId: item.id,
                duration: item.duration.toString(),
                url: item.shortUrl,
                views: "?",
            };
            queue.push(song)
        })
        setqueue(message.guild.id, structure);
        structure.queue = queue

        try {
            const join = await channel.join();
            structure.connection = join;
            play(structure.queue[0]);
        } catch (e) {
            console.log(e);
            deletequeue(message.guild.id);
            return error("I couldn't join the voice channel, Please check console");
        }

        async function play(track) {
            try {
                const data = message.client.queue.get(message.guild.id);
                if (!track) {
                    data.channel.send("Queue is empty, Leaving voice channel");
                    message.guild.me.voice.channel.leave();
                    return deletequeue(message.guild.id);
                }
                data.connection.on("disconnect", () => deletequeue(message.guild.id));
                const source = await ytdl(track.url, {
                    filter: "audioonly",
                    quality: "highestaudio",
                    highWaterMark: 1 << 25,
                    opusEncoded: true,
                });
                const player = data.connection
                    .play(source, { type: "opus" })
                    .on("finish", () => {
                        var removed = data.queue.shift();
                        if (data.loop == true) {
                            data.queue.push(removed)
                        }
                        play(data.queue[0]);
                    });
                player.setVolumeLogarithmic(data.volume / 100);
                data.channel.send(
                    new MessageEmbed()
                        .setAuthor(
                            "Started Playing",
                            "https://img.icons8.com/color/2x/cd--v3.gif"
                        )
                        .setColor("9D5CFF")
                        .setThumbnail(track.thumbnail)
                        .addField("Song Name", track.name, false)
                        .addField("Views", track.views, false)
                        .addField("Duration", track.duration, false)
                        .addField("Requested By", track.requested, false)
                        .setFooter("Youtube Music Player")
                );
            } catch (e) {
                console.error(e);
            }
        }
        message.channel.send(
            new MessageEmbed()
                .setAuthor(
                    playlist.title
                )
                .setColor("ff0000")
                .setTimestamp()
                .setDescription(music_list)
        )
    } catch (e) {
        console.log(e);
        return error("Error occured, please check console");
    }
};
