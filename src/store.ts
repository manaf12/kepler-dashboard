// src/store.ts
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import keplerGlReducer from '@kepler.gl/reducers';
import { taskMiddleware } from 'react-palm/tasks';

const rootReducer = combineReducers({
  keplerGl: keplerGlReducer.initialState({
    mapState: {
      latitude: 34.8021,
      longitude: 38.9968,
      zoom: 6,
      pitch: 30,
      bearing: 0,
      dragRotate: true
    },
    // you can also preset uiState, filters, etc.
  })
});

const enhancers = compose(applyMiddleware(taskMiddleware as any));
export const store = createStore(rootReducer, {}, enhancers);
