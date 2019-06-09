import * as Discord from 'discord.js';
const client = new Discord.Client()

import { addCommand, performCommand } from './commands'

client.on('ready', () => {
    console.log(`logged on as ${client.user.tag}.`)
})

client.on('message', msg => {
    if (msg.member.roles.some(role => role.name == 'Jeff')) return
    if (msg.member.roles.some(role => role.name == 'Oob')) return

    if(msg.author.bot) return;
    if(msg.content[0] === '~') {
        var command = (msg.content as String).split(" ")[0].slice(1)
        performCommand(command, msg)
    }
    /*
    if(msg.content.toLowerCase().match(/\bfuck/g) || msg.content.toLowerCase().match(/\bhell\\b/g) || msg.content.toLowerCase().match(/\bshit/g)) {
        msg.channel.send(msg.content
            .replace(new RegExp(/\b[fF][uU][cC][kK]/g), 'frick')
            .replace(new RegExp(/\b[hH][eE][lL][lL]\\b/g), 'heck')
            .replace(new RegExp(/\b[sS][hH][iI][tT]/g), 'poop')
            +"*")
    }
    */
    if(msg.content.includes('r/')) {
        console.log(msg.content.match("r/[_\\w]+"))
        msg.channel.send("http://reddit.com/"+msg.content.match("r/[_\\w]+"))
    }
    if(msg.content.toLowerCase().includes('surely')) {
        msg.channel.send("don't call me shirley")
    }
    if(msg.content.toLowerCase().includes('shirley')) {
        msg.channel.send("don't call me surely")
    }
    
})

if(!process.env["discord_key"]) console.log("no key found")
client.login(process.env["discord_key"])
