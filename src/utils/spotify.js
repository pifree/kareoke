const fetch = require('node-fetch');

async function getKey(clientId, clientSecret) {
    const response = await fetch('https://accounts.spotify.com/api/token?grant_type=client_credentials', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    if (!response.ok) {
        return response.status
    } else {
        const data = await response.json()
        return data
    }
}

async function getTrack(id, key) {
    const headers = { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' }

    const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        headers,
        method: 'get'
    })
    if (response.ok) {
        const data = await response.json()
        return FormatTrack(data)
    } else {
        return response.status
    }
}

function FormatTrack(track) {
    return {
        id: track.id,
        uri: track.uri,
        url: track.external_urls.spotify,
        title: track.name,
        image: track.album.images[0].url,
        length: track.duration_ms,
        artists: track.artists.map(formatArtist)
    }

    function formatArtist(artist) {
        return {
            id: artist.id,
            uri: artist.uri,
            url: artist.external_urls.spotify,
            name: artist.name
        }
    }
}

module.exports = {
    getTrack,
    getKey
}