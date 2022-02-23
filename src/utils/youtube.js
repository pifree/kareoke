const ytsr = require('ytsr');

async function SearchUf(query) {
    var filters = await ytsr.getFilters(query);
    filters = filters.get('Type').get('Video');
    const result = await ytsr(filters.url, { pages: 1, limit: 3 });
    return FormatVideo(result.items[0])
}

function FormatVideo(video) {
    return {
        id: video.id,
        url: video.url,
        title: video.title,
        image: video.bestThumbnail.url,
        channels: [{
            name: video.author.name,
            id: video.author.channelID
        }]
    }
}

module.exports ={ SearchUf }