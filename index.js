const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log(`logged on as ${client.user.tag}.`)
})

client.on('message', msg => {
    if(msg.content[0] === '!') {
        command = msg.content.slice(1)
        switch(command) {
            case 'help': msg.channel.send('no u'); break;
            case 'crewlist': msg.channel.send('https://docs.google.com/spreadsheets/d/1eZpNToP9dqIbEykBOal6z_OaFfaWKDTtnJXfKunebsc/edit?usp=sharing'); break;
            case 'tea': msg.channel.send('T I M E F O R T E A'); break;
            case 'gucc': msg.channel.send(`Gooch has no beginning. Gooch has no end. Gooch is infinite. Millions of years after our civilization has been eradicated and forgotten, Gooch will endure.
Gooch is eternal. The pinnacle of evolution and existence.
We are but rudimentary creatures of blood and flesh. We touch the mind of Gooch, fumbling in ignorance, incapable of understanding.
Organic life is nothing but a genetic mutation, an accident. Our lives are measured in years and decades. We wither and die. Gooch is eternal. Before it, we are nothing.
Gooch imposes order on the chaos of organic life. We exist because Gooch allows it, and we will end because Gooch demands it.
Gooch transcends our very understanding. We cannot grasp the nature of the existence of Gooch")
`); break;
        }
    }
})

client.login(process.env["discord_key"])
