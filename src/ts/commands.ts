import { Message } from 'discord.js';

interface Command {
    callback: (msg: Message) => void
}
let commands: { [name: string]: Command } = {}

export function addCommand(name: string, callback: (msg: Message) => void) {
    commands[name] = { callback: callback } as Command;
}

export function performCommand(name: string, msg: Message) {
    commands[name].callback(msg);
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