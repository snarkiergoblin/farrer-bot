const fs = require('fs')
const readline = require('readline')
const {google} = require('googleapis')

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

// Google Sheets API setup.
if(process.env["google_info"]) {
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(process.env["google_info"]), (auth) => {
        console.log("Authorized!")
        getCrewList(auth)
    });
} else {
    console.log("Attempting to load from file.")
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.
        authorize(JSON.parse(content), (auth) => {
            console.log("Authorized!")
            getCrewList(auth)
        });
    });
}

function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

function getCrewList(auth) {
    const sheets = google.sheets({version: 'v4', auth})
    sheets.spreadsheets.values.get({
        spreadsheetId: '1eZpNToP9dqIbEykBOal6z_OaFfaWKDTtnJXfKunebsc',
        range: "'Crew List'!A6:Q17"
    }, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            result.data.values.forEach(row => {
                console.log(row)
            });
        }
    })
}

function getPlay(auth, playName) {
    const sheets = google.sheets({version: 'v4', auth})
    sheets.spreadsheets.values.get({
        spreadsheetId: '1eZpNToP9dqIbEykBOal6z_OaFfaWKDTtnJXfKunebsc',
        range: "'Crew List'!A6:Q17",
    }, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            result.data.values.forEach(row => {
                console.log(row)
            });
        }
    })
}