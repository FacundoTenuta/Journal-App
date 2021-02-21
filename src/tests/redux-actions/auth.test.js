import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const { login, logout, startLogout, startLoginEmailPassword } = require("../../redux-actions/auth");
const { types } = require("../../types/types");


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({});

describe('Pruebas con las acciones de Auth', () => {

    beforeEach( () => {
        store.clearActions();
    });
    
    test('login y logout deben crear la accion respectiva', () => {
       
        const loginAction = login("uid", "displayName");
        const logoutAction = logout();

        expect( loginAction ).toEqual({
            type: types.login,
            payload: {
                uid: "uid",
                displayName: "displayName"
            }
        });

        expect( logoutAction ).toEqual({
            type: types.logout
        });

    });

    test('debe realizar el startLogout', async() => {
        
        await store.dispatch( startLogout() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.logout
        });

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });

    });
    
    test('debe iniciar el startLoginEmailPassword', async() => {
        
        await store.dispatch( startLoginEmailPassword("test@testing.com", "123456") );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.uiStartLoading
        });

        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: "Mja8qTrUS0ZcZvXoFRK2Ua1Ly1s2",
                displayName: null
            }
        });

        expect( actions[2] ).toEqual({
            type: types.uiFinishLoading
        });

    });
    

});
