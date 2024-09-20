import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import userReducer from './reducers/userReducer';
import preferencesReducer from './reducers/preferencesReducer';

// Combine the user and preferences reducers
const rootReducer = combineReducers({
  user: userReducer,
  preferences: preferencesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
