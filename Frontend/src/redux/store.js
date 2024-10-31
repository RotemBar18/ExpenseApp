
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import userReducer from './reducers/userReducer';
import preferencesReducer from './reducers/preferencesReducer';
import reportsReducer from './reducers/reportsReducer';
import boardReducer from './reducers/boardReducer';
import expenseReducer from './reducers/expenseReducer';
import collaboratorReducer from './reducers/collaboratorsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  preferences: preferencesReducer,
  reports: reportsReducer,
  board: boardReducer,
  expenses: expenseReducer,
  collaborators: collaboratorReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
