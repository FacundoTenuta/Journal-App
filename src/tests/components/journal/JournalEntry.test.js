import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../redux-actions/notes';



const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({});

store.dispatch = jest.fn();

const note = {
    id: 10,
    date: 0,
    title: "Hola",
    body: "Mundo",
    url: "https://algunlugar.com/foto.jpg"
}

const wrapper = mount( 
    <Provider store={ store }>
        <JournalEntry { ...note } /> 
    </Provider>
);

describe('Pruebas en <JournalEntry />', () => {
    
    test('debe mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });

    test('debe activar la nota', () => {
        
        wrapper.find(".journal__entry").prop("onClick")();

        expect( store.dispatch ).toHaveBeenCalledWith(
            activeNote( note.id, { ...note } )
        );

    });
    

});
