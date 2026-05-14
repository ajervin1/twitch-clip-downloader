const TWITCH_CLIENT_ID = 'kd1unb4b3q4t58fwlpcbzcbnm76a8fp'; // Your Twitch Client ID
import {buildSignedUrl} from "./buildSignedUrl.js";

/** Fetches the latest clips for a given channel using the Twitch GQL API. */
export async function getUserClips(channelLogin = "stpeach", filter = "LAST_WEEK", limit = 100, cursor = null) {
    // Filter options: ALL_TIME, LAST_DAY, LAST_WEEK, LAST_MONTH
    const query = `
    query ($login: String!, $after: Cursor, $filter: ClipsFilter, $limit: Int!) {
      user(login: $login) {
        clips(first: $limit, criteria: { filter: $filter }, after: $after) {
          pageInfo {
           hasNextPage
           endCursor
         }
          edges {
            node {
              id
              title
              createdAt
              durationSeconds
              videoQualities { quality sourceURL }
              playbackAccessToken(params: {platform: "web", playerType: "site"}) { signature value }
            }
          }
        }
      }
    }`;

    const response = await fetch('https://gql.twitch.tv/gql', {
        method: 'POST',
        headers: {
            'Client-ID': TWITCH_CLIENT_ID, // Uses configured constant
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: {
                login: channelLogin,
                after: cursor,
                filter: filter,
                limit: limit
            }
        }),
    });
    const data = await response.json();

    // Map the complex GraphQL response into a simple array of clip objects
    const clips = data.data.user.clips.edges.map((edge) => {
        const clip = edge.node;
        const sourceUrl = clip.videoQualities[0].sourceURL;
        const mp4Url = buildSignedUrl(sourceUrl, clip.playbackAccessToken);
        return {...clip, mp4Url};
    });
    const pageInfo = data.data.user.clips.pageInfo;
    return {clips, pageInfo}
}


export async function getAllUserClips(channelLogin = "stpeach", filter = "LAST_WEEK", limit = 3) {
    let hasNextPage = false;
    let allClips = [];
    let cursor = null;
    do {
        const {clips, pageInfo} = await getUserClips(channelLogin, filter, limit, cursor);
        hasNextPage = pageInfo.hasNextPage;
        cursor = pageInfo.endCursor;
        allClips.push(...clips);

    } while (hasNextPage)
    return allClips
}


