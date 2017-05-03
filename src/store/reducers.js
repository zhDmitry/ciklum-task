import { combineReducers } from 'redux'
import { locationReducer } from './location'
import { AlbumsReducer } from './albums';

const reducers = {
    albums: AlbumsReducer,
    location: locationReducer,
}

export const makeRootReducer = (asyncReducers) =>
    combineReducers({
        ...reducers,
        ...asyncReducers
    })

export default makeRootReducer