import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../redux-actions/auth';
import { startNewNote } from '../../../redux-actions/notes';

jest.mock('../../../redux-actions/auth', () => ({
    startLogout: jest.fn()
}));

jest.mock('../../../redux-actions/notes', () => ({
    startNewNote: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth: {
        uid: "1",
        name: "Facundo"
    },
    notes: {
        active: {
            id: "ABC",
            
        },
        notes: []
    }
});

store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <Sidebar /> 
    </Provider>
);

describe('Pruebas en el <Sidebar />', () => {
    
    test('debe mostrarse correctamente', () => {
       
        expect( wrapper ).toMatchSnapshot();

    });

    test('debe llamar el startLogout', () => {
        
        wrapper.find("button").prop("onClick")();
        
        expect( startLogout ).toHaveBeenCalled();
        
    });
    
    test('debe llamar el startNewNote', () => {
        
        wrapper.find(".journal__new-entry").prop("onClick")();

        expect( startNewNote ).toHaveBeenCalled();

    });
    
});
