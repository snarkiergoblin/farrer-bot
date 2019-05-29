import { User, Client, Guild, TextChannel, Message } from "discord.js";

export async function getRealName(client: Client, user: User) : Promise<string> {
    let channel: TextChannel = <TextChannel>client.guilds.get("543896343467393055")
        .channels.get("544175159448436756");
    return new Promise((resolve, reject) => {
        channel.fetchMessages().then(messages => {
            var msg = messages.find((value: Message) => {
                return value.author == user;
            });
            if(!msg) reject("name not found");
            else resolve(msg.content);
        });
    });
}

export async function getUser(client: Client, realName: string) : Promise<User> {
    let channel: TextChannel = <TextChannel>client.guilds.get("543896343467393055")
        .channels.get("544175159448436756");
    let regex = new RegExp(realName.replace(/\s*\([^)]*\)\s*/g, ''), 'gi')
    return new Promise((resolve, reject) => { 
        channel.fetchMessages().then(messages => {
            var msg = messages.find((value: Message) => {
                return regex.test(value.content);
            });
            if(!msg) reject("name not found");
            else resolve(msg.author);
        });
    });
}