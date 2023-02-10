import { google } from 'googleapis';

const DISCOVERY_URL =
    'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

// Will attempt to call the endpoint two times
export default async function analyzeMessage(message) {
    const client = await google.discoverAPI(DISCOVERY_URL);

    const { data } = await client.comments.analyze({
        key: process.env.PERSPECTIVE_API_KEY,
        resource: {
            comment: {
                text: message,
            },
			languages: ["en"],
            requestedAttributes: {
                SEVERE_TOXICITY: {},
                IDENTITY_ATTACK: {},
                INSULT: {},
                THREAT: {},
                SEXUALLY_EXPLICIT: {},
            },
        },
    });

    return {
        attack: data.attributeScores.IDENTITY_ATTACK.summaryScore.value,
        threat: data.attributeScores.THREAT.summaryScore.value,
        insult: data.attributeScores.INSULT.summaryScore.value,
        sexuallyExplicit:
            data.attributeScores.SEXUALLY_EXPLICIT.summaryScore.value,
        toxicity: data.attributeScores.SEVERE_TOXICITY.summaryScore.value,
    };
}
