export function buildSignedUrl(url, playbackAccessToken) {
    const {signature, value: token} = playbackAccessToken;
    return `${url}?sig=${signature}&token=${encodeURIComponent(token)}`;
}