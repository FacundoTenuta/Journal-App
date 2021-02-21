import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { activeNote } from '../../../redux-actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';


jest.mock('../../../redux-actions/notes', () => ({
    activeNote: jest.fn()
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
            id: 1234,
            title: "Hola",
            body: "mundo",
            date: 0
        },
        notes: []
    }
});

store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <NoteScreen /> 
    </Provider>
);

describe('Pruebas en <NoteScreen />', () => {
    
    test('debe mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });

    test('debe disparar el active note', () => {
        
        wrapper.find('input[name="title"]').simulate("change", {
            target: {
                name: "title",
                value: "Hola de nuevo"
            }
        });

        expect( activeNote ).toHaveBeenLastCalledWith(
            1234,
            {
                body: "mundo",
                title: "Hola de nuevo",
                id: 1234,
                date: 0
            }
        );

    });
    

});
