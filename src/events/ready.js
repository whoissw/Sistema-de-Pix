const colors = require('colors')

module.exports = (client, message, guild) => {

    console.log(colors.red("=== BOT ==="))
    console.log(`${colors.green("-> ")} ${colors.cyan("BOT STARTADO COM SUCESSO.")}`);

    let activities = [
        `BY ❤️ Fall Development`,
        client.user.username,
        `GERANDO QRCODES`
    ],
        i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING"
    }), 5000);

    client.user.setStatus("dnd");
}