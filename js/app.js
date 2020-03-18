const Discord = require("discord.js");
const bot = new Discord.Client();

/* ---------------------------- CONSTANTS ---------------------------- */

const prefix = "!";
const embedColor = 0x00ff00;

/* ------------------------------ DATA ------------------------------ */

const data = require("./data.js");

/* --------------------------- SUBROUTINES --------------------------- */

function makeBlockText(msg)
{
    return "```" + msg + "```";
}

function getCommand(msg)
{
    if(msg.substring(0, 1) === prefix)
    {
        return msg.substring(1, msg.length);
    } else
    {
        return false;
    }
}

function getInstructions()
{
    let instructions = "";

    data.instructions.forEach(pair => {
        let command = pair[0],
            description = pair[1];

        instructions += "\n" + command;
        instructions += " - " + description;
    });

    return makeBlockText(instructions);
}

function getGuildInfo(guild)
{
    let info =
        "\nServer name: " + guild.name +
        "\nRegion: " + guild.region +
        "\nNo. of members: " + guild.memberCount;

    return makeBlockText(info);
}

/* ---------------------------- MAIN CODE ---------------------------- */

bot.on("ready", _ => {
    console.log("Hello world! Bot is online.");
});

bot.on("message", msg => {
    let command = getCommand(msg.content);

    if(!msg.guild) return; //Ignore messages that aren't in a server, for example, DMs
    if(!command) return; //Ignore messages that aren't a command

    if(command === "ping")
    {
        msg.reply("Pong!")
            .then(() => {
                let ping = new Date().getTime() - msg.createdTimestamp;
                msg.channel.send("Latency: " + ping + "ms");
            });
    }

    if(command === "server")
    {
        let reply = getGuildInfo(msg.channel.guild);
        msg.reply(reply);
    }

    if(command === "avatar")
    {
        msg.reply(msg.author.displayAvatarURL());
    }

    if(command === "info")
    {
        msg.author.send(getInstructions());
        msg.reply("Check your DMs.")
    }

    if(command === "test")
    {
        let user = msg.author;
        if(user.id === data.creatorId)
        {
            let embed = new Discord.MessageEmbed()
                .setTitle("Title")
                .setColor(embedColor)
                .setDescription("Lorem ipsum dolor sit amet");

            msg.channel.send(embed);
        }
    }

    //FF
    if(command === "joke")
    {
        msg.channel.send("Giorgio is 20% kekW");
    }
});

bot.login(data.token);