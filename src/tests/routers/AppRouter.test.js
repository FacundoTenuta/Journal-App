import React from 'react';
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { firebase } from "../../firebase/firebase-config";

import { AppRouter } from '../../routers/AppRouter';
import { act } from '@testing-library/react';
import { login } from '../../redux-actions/auth';



jest.mock('../../redux-actions/auth', () => ({
    login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: "ABC",
            
        },
        notes: []
    }
});

store.dispatch = jest.fn();



describe('Pruebas en <AppRouter />', () => {
    
    test('debe llamar el login si estoy autenticado', async() => {

        let user;

        await act(async() => {

            const userCred = await firebase.auth().signInWithEmailAndPassword("test@testing.com", "123456");
            user = userCred.user;

            const wrapper = mount( 
                <Provider store={ store }>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        });

        expect( login ).toHaveBeenCalledWith("Mja8qTrUS0ZcZvXoFRK2Ua1Ly1s2", null);

    });

});
