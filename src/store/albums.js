import { combineReducers } from 'redux';
import { fetchAllAlbumsApi } from '../api';
import { normalize, itunesAlbumToStandart, spotifyAlbumToStandart } from '../utils/normalize';
import { createAction } from '../utils/reduxUtils';

export const types = {
    FETCH_ALBUMS_PENDING: 'FETCH_ALBUMS_PENDING',
    FETCH_ALBUMS_REJECTED: 'FETCH_ALBUMS_REJECTED',
    FETCH_ALBUMS_FULFILLED: 'FETCH_ITUNES_FULFILLED'
}

export const actions = {
    fetchSuccess: createAction(types.FETCH_ALBUMS_FULFILLED),
    fetchRejected: createAction(types.FETCH_ALBUMS_REJECTED),
    fetchPending: createAction(types.FETCH_ALBUMS_PENDING),
    fetchAllAlbums: (query) => (dispatch) => {
        dispatch(actions.fetchPending());
        return fetchAllAlbumsApi(query).then(([sp, it]) => {
            const normalizedIt = normalize(it.results, itunesAlbumToStandart, 'it_')
            const normalizedSp = normalize(sp.data.albums.items, spotifyAlbumToStandart, 'sp_');
            return { ...normalizedIt, ...normalizedSp }
        })
            .then(res => dispatch(actions.fetchSuccess(res)))
            .catch(err => dispatch(actions.fetchRejected(err, true)))
    }
}


const AlbumsInitialState = {}
export const AlbumsListReducer = (state = AlbumsInitialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case types.FETCH_ALBUMS_FULFILLED:
            return payload;
        default:
            return state
    }
}

export const AlbumsInfoReducer = (state = AlbumsInitialState, action) => {
    switch (action.type) {
        case types.FETCH_ALBUMS_PENDING:
            return { loading: true }
        case types.FETCH_ALBUMS_REJECTED:
            return { loading: false, error: true };
        case types.FETCH_ALBUMS_FULFILLED:
            return { loading: false }
        default:
            return state
    }
}


export const AlbumsReducer = combineReducers({
    albumsList: AlbumsListReducer,
    albumsInfo: AlbumsInfoReducer
})