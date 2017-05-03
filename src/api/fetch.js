import jsonp from 'fetch-jsonp';
import axios from 'axios';
import { ITUNES_API, SPOTIFY_API } from '../constants';

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

const normalizeItunesQuery = (query) => {
    const { q, ...rest } = query;
    return { term: q, media: 'music', entity: 'album', ...rest };
}

export const fetchItunesAlbumsApi = (query = {}) => {
    query = normalizeItunesQuery(query);
    return jsonp(ITUNES_API + '?' + queryParams(query)).then(el => el.json()).then(el => {
        console.log(el);
        if (el.status >= 400) {
            throw el.error;
        }
        return el;
    });
}

export const fetchSpotifyAlbumsApi = (query = {}) => {
    return axios.get(SPOTIFY_API + '?' + queryParams({ ...query, type: 'album' }));
}

export const fetchAllAlbumsApi = (query = {}) => {
    return axios.all([
        fetchSpotifyAlbumsApi(query),
        fetchItunesAlbumsApi(query)
    ])
}