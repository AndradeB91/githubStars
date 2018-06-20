import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import createSagaMiddleware from 'redux-saga';
import { asImmutable, getHistory } from '../utils';
import { routerMiddleware } from 'react-router-redux';
import * as modules from './modules';

const getReducersFromModules = modules =>
  Object.keys(modules).reduce((acc, curr) => {
    const module = modules[curr];
    if (module.reducers && module.reducers.reducer) {
      acc[module.constants.default] = module.reducers.reducer;
    }
    return acc;
  }, {});

const getSagasFromModules = modules =>
  Object.keys(modules).reduce((acc, curr) => {
    const module = modules[curr];
    if (module.sagas && module.sagas.default) {
      acc[module.constants.default] = module.sagas.default;
    }
    return acc;
  }, {});

const buildStore = (initialState, enhancers) => {
  const enhancer = compose(...enhancers);
  return createStore(
    combineReducers(getReducersFromModules(modules)),
    initialState,
    enhancer,
  );
};

export const createReduxStore = () => {
  const initialState = asImmutable({});
  const middlewares = [];
  const enhancers = [];
  const sagaMiddleware = createSagaMiddleware();
  const routersMiddleware = routerMiddleware(getHistory());

  middlewares.push(sagaMiddleware);
  middlewares.push(routersMiddleware);

  enhancers.push(applyMiddleware(...middlewares));

  const store = buildStore(initialState, enhancers);

  const allSagas = getSagasFromModules(modules);

  store.sagas = Object.keys(allSagas).map(sagaName =>
    sagaMiddleware.run(allSagas[sagaName]),
  );
  store.cancelSagas = () => store.sagas.forEach(saga => saga.cancel());

  return store;
};
