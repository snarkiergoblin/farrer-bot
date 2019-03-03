import { Message, User } from 'discord.js';
import * as request from 'request'

interface Command {
    callback: (msg: Message) => void
}
let commands: { [name: string]: Command } = {}

export function addCommand(name: string, callback: (msg: Message) => void) {
    commands[name] = { callback: callback } as Command;
}

export function performCommand(name: string, msg: Message) {
    if(Object.keys(commands).includes(name.toLowerCase())) {
        commands[name.toLowerCase()].callback(msg);
    } else {
        msg.reply("No such command found.")
    }
}

addCommand('help', (msg) => { msg.channel.send('no u') });
addCommand('crewlist', (msg) => { msg.channel.send('https://docs.google.com/spreadsheets/d/1eZpNToP9dqIbEykBOal6z_OaFfaWKDTtnJXfKunebsc/edit?usp=sharing') });
addCommand('tea', (msg) => { msg.channel.send('T I M E F O R T E A') });
addCommand('gucc', (msg) => { msg.channel.send(
`Gooch has no beginning. Gooch has no end. Gooch is infinite. Millions of years after our civilization has been eradicated and forgotten, Gooch will endure.
Gooch is eternal. The pinnacle of evolution and existence.
We are but rudimentary creatures of blood and flesh. We touch the mind of Gooch, fumbling in ignorance, incapable of understanding.
Organic life is nothing but a genetic mutation, an accident. Our lives are measured in years and decades. We wither and die. Gooch is eternal. Before it, we are nothing.
Gooch imposes order on the chaos of organic life. We exist because Gooch allows it, and we will end because Gooch demands it.
Gooch transcends our very understanding. We cannot grasp the nature of the existence of Gooch.
`
)})
addCommand('nevans', (msg) => { msg.channel.send(
`NEVANS CAR
    ______
   /|_||_\`.__
  (   _    _ _)
  ='-(_)--(_)-'
NEVANS CAR`
, { code: true }) })
addCommand('badboy', (msg) => { msg.channel.send(
`I consider my maturity as above average for my age groups
my eloquence is unmatched among my peers`
) })
addCommand('kill', (msg) => {
    msg.mentions.users.forEach((user: User) => {
        user.send("", { embed: {
            image: { url: "http://scp-wiki.wdfiles.com/local--resized-images/scp-001/fractal001/medium.jpg" }
        }})
    })
})
addCommand('thog', (msg) => { msg.channel.send("thog don't caaare") })

let rules = [
    "1) Don't spam (obviously).",
    "2) Use the right channels.",
    "3) Post your full name to #names-to-usernames so we know who you are.",
    "4) Respect the admins.",
    "5) Nothing that isn't safe for the school (NSFW or offensive content) is allowed, even as a joke.",
    "6) No rants in french",
    "7) No bot spam outside of #bot-testing",
    "8) Stay in your own departmental channels.",
    "9) Have fun!",
    "10) Don't pirate games."
]
addCommand('rules', (msg) => {
    if(!msg.member.roles.find(val => val.name === "Senior Tech")) return;
    if(msg.content.split(" ").length == 1) {
        msg.channel.send(rules.reduce((prev, curr) => prev + "\n" + curr), { code: true });
    } else if (Number.parseInt(msg.content.split(" ")[1])) {
        msg.channel.send(rules[Number.parseInt(msg.content.split(" ")[1])-1], {code: true})
    }
})
addCommand('server', (msg) => {
    msg.channel.send("Checking server status...").then((message: Message) => {
        request('https://api.mcsrvstat.us/1/farrerbois.aternos.me', (error, response, body) => {
            if(error) console.log('error: ', error);
            var data = JSON.parse(body);
            if(data["version"] === "Offline") {
                message.edit("Server is offline.")
            } else {
                message.edit(`Server is online!\nPlayers: ${data["players"]["online"]} / ${data["players"]["max"]}\n${data["players"]["list"].reduce((prev, curr) => prev + "\n    " + curr)}\nMOTD: ${data["motd"]["clean"]}`, { code: true })
            }
        })
    })
})