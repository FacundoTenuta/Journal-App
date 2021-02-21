import React from 'react';
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startGoogleLogin, startLoginEmailPassword } from '../../../redux-actions/auth';


jest.mock('../../../redux-actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
});

store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <LoginScreen />', () => {

    beforeEach( () => {
        store.clearActions();
        jest.clearAllMocks();
    });

    test('debe mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });

    test('debe disparar la acción de startGoogleLogin', () => {
        
        wrapper.find(".google-btn").prop("onClick")();

        expect( startGoogleLogin ).toHaveBeenCalled();

    });
    
    test('debe disparar el startLogin con los respectivos argumentos', () => {
        
        wrapper.find("form").prop("onSubmit")({ 
            preventDefault(){} 
        });

        expect( startLoginEmailPassword ).toHaveBeenCalledWith("facu@gmail.com", "123456");

    });
    
    
});
