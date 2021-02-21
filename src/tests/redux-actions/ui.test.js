const { setError, removeError, startLoading, finishLoading } = require("../../redux-actions/ui");
const { types } = require("../../types/types");


describe('Pruebas en ui-actions', () => {
    
    test('todas las acciones deben funcionar', () => {
        
        const setErrorAction = setError("HELP!!!");

        expect( setErrorAction ).toEqual({
            type: types.uiSetError,
            payload: "HELP!!!"
        });

        const removeErrorAction = removeError();
        const startLoadingAction = startLoading();
        const finishLoadingAction = finishLoading();

        expect( removeErrorAction ).toEqual({
            type: types.uiRemoveError
        });

        expect( startLoadingAction ).toEqual({
            type: types.uiStartLoading
        });

        expect( finishLoadingAction ).toEqual({
            type: types.uiFinishLoading
        });
    });
    
});
