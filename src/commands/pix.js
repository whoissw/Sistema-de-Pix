const Discord = require('discord.js')
const QrCodePix = require('qrcode-pix')
const config = require('../../config.json')
const sleep = require('../utils/sleep')

module.exports = {
    name: "pix",
    run: async (client, message, args) => {
        message.delete()

        const price = args[0]

        const retorno = new Discord.MessageEmbed()

            .setDescription('🤑 *Você deve informar um **VALOR** para eu gerar um **QRCODE***')
            .setColor("#2f3136")

        if (!price) return message.channel.send({ embeds: [retorno] }).then(async message => {
            await sleep(5000)
            try {
                await message.delete()
            } catch (e) { }
        })

        const Response = QrCodePix.QrCodePix({
            version: '01',
            key: config.pix.chave, //CHAVE DO PIX
            name: config.pix.nome, // SEU NOME
            city: config.pix.cidade, // CIDADE
            transactionId: '***',
            message: '', // MENSAGEM
            cep: config.pix.cep, // CEP DA PESSOA
            value: parseInt(price)
        })

        const dataR = (await Response.base64()).split(',')[1];
        const buf = Buffer.from(dataR, 'base64');
        const attachment = new Discord.MessageAttachment(buf, 'qrcode.jpeg');

        const pix = new Discord.MessageEmbed()

            .setAuthor({ name: 'Pagamento Pix', iconURL: 'https://media.discordapp.net/attachments/970045333893685298/974737797766340638/pix.png', url: 'https://discord.gg/falldevs' })
            .setDescription(`<a:dinheiro:898349188704763964> Para realizar o pagamento aponte a câmera do seu celular para o **QRCODE** ou copie o código a seguir: \n\n \`\`\`${Response.payload()}\`\`\`\n\n <a:seta:904588428342083604> ***Nome da Conta: ${config.pix.nome}***`)
            .setImage('attachment://qrcode.jpeg')
            .setColor("#2f3136")
            .setFooter({ text: 'BY ❤️ Fall Development', iconURL: 'https://media.discordapp.net/attachments/938563616330903563/950476588049383464/fall.gif' })
            .setTimestamp()

        message.channel.send({
            files: [attachment],
            embeds: [pix]
        })
    }
}