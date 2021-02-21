const { authReducer } = require("../../redux-reducers/authReducer");
const { types } = require("../../types/types");


describe('Pruebas en el authReducer', () => {

    test('el login debe funcionar correctamente', () => {
      
        const state = authReducer({}, {
            type: types.login,
            payload: {
                uid: "123",
                displayName: "Facundo"
            }
        });

        expect( state ).toEqual({
            uid: "123",
            name: "Facundo"
        });

    });

    test('el logout debe funcionar correctamente', () => {
        
        const state = authReducer({
            uid: "123",
            name: "Facundo"
        }, {
            type: types.logout,
        });

        expect( state ).toEqual({});

    });

    test('no debe hacer cambios en el state', () => {
        
        const state = authReducer({
            uid: "123",
            name: "Facundo"
        }, {
            type: "asdasd",
        });

        expect( state ).toEqual({
            uid: "123",
            name: "Facundo"
        });

    });

});
