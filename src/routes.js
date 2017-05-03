import { Home } from './containers/Home/Home';

export default function createRoutes(store) {
    return [
        {
            path: '/',
            name: 'home',
            component: Home
        }, {
            path: '*',
            name: 'fallback',
            component: Home
        }
    ];
}