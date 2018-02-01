import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';


import { chatMiddleware } from './middleware/chatMiddleware';
import reducer from './reducers';
import UserPage from './UserPage';
import SignUp from './SignUp';
import ChatRoom from './chatRoom';
import history from './services/history';
import { loadState, saveState } from './services/localStorage';

const persistState = loadState();
const store = createStore(reducer, persistState, applyMiddleware(thunk, chatMiddleware));

store.subscribe(() => {
  saveState(store.getState());
})

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path='/' component={SignUp}/>
        <Route path='/user' component={UserPage}/>
        <Route path='/chat' component={ChatRoom}/>
      </div>
    </Router>
  </Provider>
), document.getElementById('root'))
registerServiceWorker();

export { store }
