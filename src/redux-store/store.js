import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { authReducer } from '../redux-reducers/authReducer';
import thunk from 'redux-thunk';
import { uiReducer } from '../redux-reducers/uiReducer';
import { notesReducer } from '../redux-reducers/notesReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

export const store = createStore( 
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);