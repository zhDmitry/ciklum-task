import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from './App';
import createStore from './store/createStore';


const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);
const MOUNT_NODE = document.getElementById('root')




/*-----------------------------------------------------*/
/*----------------------------------------------------*/



let render = () => {
  const routes = require('./routes').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
}


if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    const renderApp = render
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
      }
    }
    module.hot.accept('./routes', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

render()