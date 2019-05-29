import * as fs from 'fs';
import * as readline from "readline-sync";
import { google } from "googleapis";
import { OAuth2Client } from 'googleapis-common';
import { Play } from './Play';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

// initialize the google apis
export async function initGoogleApis(credsFilePath: string) : Promise<OAuth2Client>  {
    try {
        var content = fs.readFileSync(credsFilePath);
    } catch(err) {
        console.log(err.message);
        throw err;
    }
    return await authorize(JSON.parse(content.toString()));
}

// authorize the API with given credentials
async function authorize(credentials) : Promise<OAuth2Client> {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    
    // if the token already exists, use that instead.
    try {
        var token = fs.readFileSync(TOKEN_PATH);
    } catch(err) {
        return getNewToken(oAuth2Client);
    }

    oAuth2Client.setCredentials(JSON.parse(token.toString()));
    return oAuth2Client;
}

// creates a new token from the OAuth2Client object.
async function getNewToken(oAuth2Client: OAuth2Client) : Promise<OAuth2Client> {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app using the url:', authUrl);
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    var code = rl.question("Enter the code from that page here: ");
    rl.close();

    return new Promise(resolve => {
        oAuth2Client.getToken(code, (err, token) => {
            if(err) return console.error(err.message);
            oAuth2Client.setCredentials(token);
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if(err) return console.error(err.message);
                console.log('Token stored.')
            });
            resolve(oAuth2Client);
        })
    });
}

// get a list of all plays
export async function getPlays(auth: OAuth2Client, sheetId, range) : Promise<Play[]> {
    const sheets = google.sheets({version: "v4", auth});
    return new Promise((resolve, reject) => { 
        sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: range
        }, (err, res) => {
            if(err) reject(err.message);
            resolve(res.data.values.map((v) => Play.fromRow(v)));
        })
    });
}