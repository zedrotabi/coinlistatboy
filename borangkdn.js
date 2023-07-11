const { Client, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const { readdir, readdirSync } = require("fs");
const config = require("./config.json");
const moment = require('moment');
const ms = require("ms");
require("moment-duration-format");
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();
client.ranks = [
    { role: "957319513462964244", coin: 16000 },
    { role: "957319506139693136", coin: 18000 },
    { role: "957319537383071845", coin: 21000 },
    { role: "957319420395520031", coin: 25000 },
    { role: "957319412694790185", coin: 30000 },
    { role: "957319436593938502", coin: 42000 },
    { role: "957319530005295176", coin: 60000 },
    { role: "957319566294388766", coin: 70000 },
    { role: "957319522367451196", coin: 100000 },
]

const disbut = require("discord-buttons")(client)

require("./src/helpers/mongoHandler");

readdirSync('./src/commands', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./src/commands/${files}`);
    console.log(`[BORANGKDN-COMMAND] ${command.name} adlı komut yüklendi!`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

readdir("./src/events", (err, files) => {
    if (err) return console.error(err);
    files.filter((file) => file.endsWith(".js")).forEach((file) => {
        let prop = require(`./src/events/${file}`);
        if (!prop.conf) return;
        client.on(prop.conf.name, prop)
        console.log(`[BORANGKDN-EVENT] ${prop.conf.name} adlı event yüklendi!`);
    });
});

    client.on("ready", async () => {
        client.user.setPresence({ activity: { name: "BoranGkdn was here ❤️" }, status: "dnd" });
        })    

        client.on("ready", () => {
            client.channels.cache.get("SES_KANALI_ID").join();
            });

client.login(config.bot.token).then(x => console.log(`Bot ${client.user.username} olarak giriş yaptı!`)).catch(err => console.log(`Bot Giriş yapamadı sebep: ${err}`));