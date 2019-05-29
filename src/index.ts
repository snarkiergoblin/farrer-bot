import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import { initGoogleApis, getPlays } from './getplays';
import { Play } from './Play';

initGoogleApis('credentials.json')
    .then(testSheet);

async function testSheet(auth: OAuth2Client) {
    var plays = await getPlays(auth, "1eZpNToP9dqIbEykBOal6z_OaFfaWKDTtnJXfKunebsc", "Crew List!A6:R17");
    plays.forEach(element => {
        console.log(element);
    });
}