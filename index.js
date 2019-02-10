const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log(`logged on as ${client.user.tag}.`)
})

client.on('message', msg => {
    if(msg.content[0] === '!') {
        command = msg.content.slice(1)
        switch(command) {
            case 'help': msg.channel.send('No, I will not help you.'); break;
            case 'crewlist': msg.channel.send('https://docs.google.com/spreadsheets/d/1eZpNToP9dqIbEykBOal6z_OaFfaWKDTtnJXfKunebsc/edit?usp=sharing')
        }
    }
})

client.login(process.env["discord_key"])