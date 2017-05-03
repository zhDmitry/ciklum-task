export const normalize = (data, transform, prefix = '') => {
    console.log(data);
    if (!data) {
        throw new Error('value should be null');
    }
    if (!Array.isArray(data)) {
        throw new Error('data should be an array');
    }
    return data.reduce((acc, el) => {
        if (transform && typeof transform === "function") {
            el = transform(el);
        }
        acc[prefix + el.id] = el;
        return acc;
    }, {});
}

export const itunesAlbumToStandart = (data) => {
    return {
        id: data.collectionId,
        albumName: data.collectionName,
        artistName: data.artistName,
        artwork: data.artworkUrl100,
        url: data.collectionViewUrl,
        resource: 'itunes'
    };
}
export const spotifyAlbumToStandart = (data) => {
    return {
        id: data.id,
        albumName: data.name,
        artistName: data.artists[0] && data.artists[0].name,
        artwork: data.images[0] && data.images[0].url,
        url: data.external_urls[0] && data.external_urls[0].spotify,
        resource: 'spotify'
    };
}