import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from 'redux';
import sessionReducer from './session';
import spotsReducer from './spots';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
